import React, { useState } from 'react';
import { Question, AIFeedbackResponse } from '../types';
import { CheckCircle2, XCircle, Volume2, Sparkles, ArrowRight, BookOpen, Clock, Lightbulb } from 'lucide-react';
import { speakSpanish } from '../utils/audio';

interface FeedbackDrawerProps {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({
  question,
  userAnswer,
  isCorrect,
  timeSpentSeconds,
  onNext,
  isLastQuestion,
}) => {
  const [aiFeedback, setAiFeedback] = useState<AIFeedbackResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayCorrectAudio = async () => {
    setIsPlayingAudio(true);
    const textToSpeak = question.audioText || question.correctAnswer || question.spanishSentence || question.prompt;
    await speakSpanish(textToSpeak, 0.85);
    setIsPlayingAudio(false);
  };

  const handleFetchAIFeedback = async () => {
    try {
      setIsLoadingAI(true);
      const res = await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: question.prompt,
          studentAnswer: userAnswer,
          expectedConcept: question.grammarRule || question.explanation,
          level: 'High School Spanish',
        }),
      });
      const data = await res.json();
      setAiFeedback(data);
    } catch (err) {
      console.error("AI feedback error:", err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div
      className={`rounded-3xl border-4 border-black p-6 transition-all duration-300 shadow-[8px_8px_0px_#000] ${
        isCorrect
          ? 'bg-[#34C759]/20 text-black'
          : 'bg-[#FF3B30]/15 text-black'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000] ${
              isCorrect ? 'bg-[#34C759] text-white' : 'bg-[#FF3B30] text-white'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-7 h-7 stroke-[2.5]" /> : <XCircle className="w-7 h-7 stroke-[2.5]" />}
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-black">
              {isCorrect ? '¡Excelente trabajo! / Correct!' : '¡Buen intento! / Not quite'}
            </h3>
            <div className="flex items-center gap-3 text-xs font-black text-slate-700 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black" />
                Tiempo activo en pregunta: <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-black">{timeSpentSeconds}s</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action button to continue */}
        <button
          id="next-question-btn"
          onClick={onNext}
          className={`px-6 py-3.5 rounded-2xl font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none ${
            isCorrect
              ? 'bg-black text-[#FFCC00] hover:bg-slate-900'
              : 'bg-[#FF3B30] text-white hover:bg-[#E02D23]'
          }`}
        >
          <span>{isLastQuestion ? 'Ver Resultados Finales' : 'Siguiente Pregunta'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Answer Comparison & Explanation */}
      <div className="mt-4 space-y-3">
        {!isCorrect && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="font-black text-[#FF3B30] uppercase tracking-wider block mb-1">Tu respuesta:</span>
              <p className="font-mono text-black text-sm font-bold">{userAnswer || '(Sin respuesta)'}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="font-black text-[#34C759] uppercase tracking-wider block mb-1">Respuesta correcta:</span>
              <p className="font-mono text-black text-sm font-black">{question.correctAnswer}</p>
            </div>
          </div>
        )}

        {/* Grammatical Explanation */}
        <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000] space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-black text-black flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#007AFF]" />
              Explicación Gramatical:
            </span>

            <button
              onClick={handlePlayCorrectAudio}
              disabled={isPlayingAudio}
              className="text-xs font-black uppercase tracking-tight px-3 py-1 rounded-xl bg-[#FFCC00] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-1 cursor-pointer transition-all"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>Pronunciar</span>
            </button>
          </div>

          <p className="text-slate-800 font-medium leading-relaxed text-xs sm:text-sm">
            {question.explanation}
          </p>

          {question.grammarRule && (
            <div className="pt-2 border-t-2 border-black text-xs text-black font-semibold flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
              <span>
                <strong className="font-black uppercase tracking-tight">Regla clave: </strong>
                {question.grammarRule}
              </span>
            </div>
          )}
        </div>

        {/* AI Tutor deep dive button */}
        {!aiFeedback && (
          <div className="pt-1">
            <button
              onClick={handleFetchAIFeedback}
              disabled={isLoadingAI}
              className="text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl bg-black text-[#FFCC00] border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFCC00]" />
              <span>{isLoadingAI ? 'Consultando a Gemini AI...' : 'Pedir explicación pedagógica a Gemini AI'}</span>
            </button>
          </div>
        )}

        {/* AI Feedback Expanded Panel */}
        {aiFeedback && (
          <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000] text-xs space-y-2 text-black animate-fadeIn">
            <div className="flex items-center gap-2 font-black text-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#007AFF]" />
              <span>Análisis Pedagógico con Gemini AI:</span>
            </div>
            <p className="leading-relaxed font-semibold text-slate-800">{aiFeedback.feedback}</p>
            {aiFeedback.tips && (
              <div className="p-3 rounded-xl bg-[#FFCC00]/20 border-2 border-black text-xs text-black font-bold">
                💡 Consejo: {aiFeedback.tips}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
