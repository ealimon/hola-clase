import React, { useState, useEffect, useRef } from 'react';
import { Exercise, Question, StudentProfile, QuestionAuditDetail, SubmissionRecord } from '../types';
import { TimeIntegrityEngine, TimeTrackerState } from '../utils/timeTracker';
import { QuestionCard } from './QuestionCard';
import { FeedbackDrawer } from './FeedbackDrawer';
import { playSoundEffect } from '../utils/audio';
import { ArrowLeft, Clock, Eye, AlertTriangle, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';

interface ExerciseSessionProps {
  exercise: Exercise;
  student: StudentProfile;
  onExit: () => void;
  onComplete: (submission: SubmissionRecord) => void;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  exercise,
  student,
  onExit,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const [pastedOnCurrentQuestion, setPastedOnCurrentQuestion] = useState(false);
  const [questionAuditLogs, setQuestionAuditLogs] = useState<QuestionAuditDetail[]>([]);
  const [trackerState, setTrackerState] = useState<TimeTrackerState>({
    isActive: true,
    totalTimeSeconds: 0,
    activeFocusSeconds: 0,
    idleSeconds: 0,
    tabSwitchCount: 0,
    pasteEventCount: 0,
    rapidAnswerCount: 0,
    currentQuestionTimeSeconds: 0,
    events: [],
  });

  const timeEngineRef = useRef<TimeIntegrityEngine | null>(null);

  // Initialize Time & Anti-Cheat Engine
  useEffect(() => {
    const engine = new TimeIntegrityEngine((state) => {
      setTrackerState(state);
    });
    timeEngineRef.current = engine;
    engine.startSession();

    return () => {
      // clean up if user leaves midway
      engine.stopSession();
    };
  }, []);

  const currentQuestion = exercise.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exercise.questions.length - 1;

  // Clean answer string for fair comparison (ignore case, trailing dots/spaces)
  const normalize = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()¿¡?]/g, '')
      .replace(/\s+/g, ' ');
  };

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;

    const timeSpent = timeEngineRef.current ? timeEngineRef.current.getCurrentQuestionSeconds() : 5;
    setQuestionTimeSpent(timeSpent);

    // Record question in time engine
    if (timeEngineRef.current) {
      timeEngineRef.current.recordQuestionAnswered(currentQuestionIndex, timeSpent);
    }

    // Determine correctness
    let correct = false;
    const userNorm = normalize(userAnswer);
    const correctNorm = normalize(currentQuestion.correctAnswer);

    if (userNorm === correctNorm) {
      correct = true;
    } else if (currentQuestion.acceptableAnswers && currentQuestion.acceptableAnswers.length > 0) {
      correct = currentQuestion.acceptableAnswers.some((ans) => normalize(ans) === userNorm);
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playSoundEffect('correct');
    } else {
      playSoundEffect('incorrect');
    }

    // Save question audit log
    const auditEntry: QuestionAuditDetail = {
      questionId: currentQuestion.id,
      questionNumber: currentQuestionIndex + 1,
      prompt: currentQuestion.prompt,
      userAnswer: userAnswer.trim(),
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: correct,
      timeSpentSeconds: timeSpent,
      pasted: pastedOnCurrentQuestion,
      keystrokeCount: Math.max(1, userAnswer.length),
      explanation: currentQuestion.explanation,
      grammarRule: currentQuestion.grammarRule,
      speedFlag: timeSpent < 2.5,
    };

    setQuestionAuditLogs((prev) => [...prev, auditEntry]);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      finishExercise();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setIsChecked(false);
      setIsCorrect(false);
      setPastedOnCurrentQuestion(false);
    }
  };

  const handlePasteDetected = () => {
    setPastedOnCurrentQuestion(true);
    if (timeEngineRef.current) {
      timeEngineRef.current.recordPasteEvent(currentQuestionIndex);
    }
  };

  const finishExercise = async () => {
    if (!timeEngineRef.current) return;

    const timeResults = timeEngineRef.current.stopSession();
    const allAudits = [...questionAuditLogs];

    // Calculate score
    const correctCount = allAudits.filter((a) => a.isCorrect).length;
    const totalCount = exercise.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    const submission: SubmissionRecord = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      studentId: student.schoolId,
      studentName: student.name,
      period: student.period,
      exerciseId: exercise.id,
      exerciseTitle: exercise.title,
      score: correctCount,
      totalQuestions: totalCount,
      percentage,
      timeSpentSeconds: timeResults.totalTimeSeconds,
      activeFocusSeconds: timeResults.activeFocusSeconds,
      idleSeconds: timeResults.idleSeconds,
      tabSwitchCount: timeResults.tabSwitchCount,
      pasteEventCount: timeResults.pasteEventCount,
      rapidAnswerCount: timeResults.rapidAnswerCount,
      integrityScore: timeResults.integrityScore,
      suspiciousFlags: timeResults.flags,
      submittedAt: new Date().toISOString(),
      questionDetails: allAudits,
      activityTimeline: timeResults.events,
    };

    // Post to server backend
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.warn("Could not sync submission to server, storing locally:", err);
    }

    onComplete(submission);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = Math.round(((currentQuestionIndex + (isChecked ? 1 : 0)) / exercise.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 text-black bg-[#FAF9F6] hover:bg-[#FF3B30] hover:text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            title="Salir del ejercicio"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-black text-[#1A1A1A] text-sm sm:text-base leading-tight uppercase tracking-tight">
              {exercise.title}
            </h1>
            <div className="text-[11px] text-slate-700 font-bold">
              {student.name} • <span className="font-mono bg-[#FFCC00] px-1.5 py-0.5 rounded border border-black text-black">{student.schoolId}</span>
            </div>
          </div>
        </div>

        {/* Live Active Anti-Cheat Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active focus vs Inactive */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
              trackerState.isActive
                ? 'bg-[#34C759] text-white'
                : 'bg-[#FFCC00] text-black animate-pulse'
            }`}
            title={trackerState.isActive ? 'Pestaña activa y enfocada' : 'Pestaña en segundo plano o inactiva'}
          >
            <span className={`w-2 h-2 rounded-full border border-black ${trackerState.isActive ? 'bg-white' : 'bg-[#FF3B30]'}`}></span>
            <span>{trackerState.isActive ? 'Enfocado' : 'Inactivo'}</span>
          </div>

          {/* Active stopwatch */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFCC00] border-2 border-black text-xs font-mono font-black text-black shadow-[2px_2px_0px_#000]">
            <Clock className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span>{formatSeconds(trackerState.activeFocusSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Question Dots */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-black uppercase tracking-wider">
          <span>Progreso del Ejercicio</span>
          <span className="font-mono">
            {currentQuestionIndex + 1} de {exercise.questions.length} preguntas ({progressPct}%)
          </span>
        </div>
        <div className="w-full h-3.5 bg-white border-2 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_#000]">
          <div
            className="h-full bg-[#FF3B30] transition-all duration-300 rounded-full border-r-2 border-black"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={exercise.questions.length}
        userAnswer={userAnswer}
        onChangeAnswer={setUserAnswer}
        onPasteDetected={handlePasteDetected}
        disabled={isChecked}
      />

      {/* Immediate Action Buttons or Feedback Drawer */}
      {!isChecked ? (
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="text-xs font-bold text-slate-700 italic">
            Selecciona o escribe tu respuesta en español y presiona "Comprobar".
          </div>

          <button
            id="check-answer-btn"
            type="button"
            disabled={!userAnswer.trim()}
            onClick={handleCheckAnswer}
            className="px-6 py-3.5 rounded-2xl bg-[#FF3B30] hover:bg-[#E02D23] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_#000] transition-all flex items-center gap-2 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Comprobar Respuesta</span>
          </button>
        </div>
      ) : (
        <FeedbackDrawer
          question={currentQuestion}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          timeSpentSeconds={questionTimeSpent}
          onNext={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};
