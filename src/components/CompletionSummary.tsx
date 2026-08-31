import React, { useEffect } from 'react';
import { SubmissionRecord } from '../types';
import confetti from 'canvas-confetti';
import { Award, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowRight, RotateCcw, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { playSoundEffect } from '../utils/audio';

interface CompletionSummaryProps {
  submission: SubmissionRecord;
  onReturnToHub: () => void;
}

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({
  submission,
  onReturnToHub,
}) => {
  useEffect(() => {
    playSoundEffect('complete');
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#d97706', '#10b981', '#6366f1'],
      });
    } catch {
      // ignore if confetti blocked
    }
  }, []);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Hero Score & Celebration Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FF3B30] text-white p-8 sm:p-10 border-4 border-black shadow-[8px_8px_0px_#000] text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-[#FFCC00] text-black border-2 border-black text-xs font-black uppercase tracking-wider mb-4 shadow-[2px_2px_0px_#000]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>¡Ejercicio Completado con Éxito!</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2 text-white">
          ¡Excelente esfuerzo, {submission.studentName}!
        </h1>
        <p className="text-sm text-white font-semibold max-w-lg mx-auto">
          Tus resultados y el registro detallado de tiempo activo han sido enviados a <strong className="text-[#FFCC00] bg-black/40 px-1 border border-black rounded">Mrs. Limon</strong>.
        </p>

        {/* Score Boxes */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="bg-black text-white rounded-2xl p-6 border-2 border-white shadow-[4px_4px_0px_#000] min-w-[200px]">
            <div className="text-4xl sm:text-5xl font-black text-[#FFCC00]">
              {submission.percentage}%
            </div>
            <div className="text-xs font-black text-white uppercase tracking-wider mt-1">
              Calificación ({submission.score}/{submission.totalQuestions} correctas)
            </div>
          </div>

          <div className="bg-black text-white rounded-2xl p-6 border-2 border-white shadow-[4px_4px_0px_#000] min-w-[200px]">
            <div className="text-4xl sm:text-5xl font-black text-[#34C759]">
              {formatSeconds(submission.activeFocusSeconds)}
            </div>
            <div className="text-xs font-black text-white uppercase tracking-wider mt-1">
              Tiempo Activo Enfocado
            </div>
          </div>
        </div>
      </div>

      {/* Time & Integrity Metrics Breakdown for Teacher Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border-3 border-black shadow-[5px_5px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFCC00] text-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-black text-black font-mono">
              {formatSeconds(submission.timeSpentSeconds)}
            </div>
            <div className="text-xs font-bold text-slate-700">Tiempo Total de Sesión</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border-3 border-black shadow-[5px_5px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#34C759] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-lg font-black text-[#34C759]">
              {submission.integrityScore}% Integridad
            </div>
            <div className="text-xs font-bold text-slate-700">
              {submission.tabSwitchCount === 0 ? 'Sin salidas de pestaña' : `${submission.tabSwitchCount} salida(s) de pestaña`}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border-3 border-black shadow-[5px_5px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#007AFF] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-black text-[#007AFF]">
              +150 XP
            </div>
            <div className="text-xs font-bold text-slate-700">Puntos de Dominio Ganados</div>
          </div>
        </div>
      </div>

      {/* Review Questions Breakdown */}
      <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <h2 className="font-black text-[#1A1A1A] text-lg sm:text-xl flex items-center gap-2 uppercase tracking-tight">
            <BookOpen className="w-5 h-5 text-[#FF3B30]" />
            Revisión de Preguntas y Explicaciones
          </h2>
          <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FFCC00] px-2.5 py-0.5 rounded-lg border-2 border-black shadow-[1px_1px_0px_#000]">
            {submission.questionDetails.length} Preguntas
          </span>
        </div>

        <div className="space-y-4">
          {submission.questionDetails.map((q, idx) => (
            <div
              key={q.questionId || idx}
              className={`p-4 sm:p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] transition-all ${
                q.isCorrect
                  ? 'bg-[#34C759]/10'
                  : 'bg-[#FF3B30]/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center border border-black ${
                      q.isCorrect ? 'bg-[#34C759]' : 'bg-[#FF3B30]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <h3 className="font-black text-black text-sm">{q.prompt}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-black shrink-0">
                  <span className="text-black flex items-center gap-1 font-mono bg-white px-2 py-0.5 rounded border border-black">
                    <Clock className="w-3 h-3 text-black" /> {q.timeSpentSeconds}s
                  </span>
                  {q.isCorrect ? (
                    <span className="text-[#34C759] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correcto
                    </span>
                  ) : (
                    <span className="text-[#FF3B30] flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrecto
                    </span>
                  )}
                </div>
              </div>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs my-2">
                <div className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] text-slate-600 font-black uppercase block mb-0.5">Tu respuesta:</span>
                  <span className="font-mono font-bold text-black">{q.userAnswer || '(Vacío)'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] text-[#34C759] font-black uppercase block mb-0.5">Respuesta correcta:</span>
                  <span className="font-mono font-black text-black">{q.correctAnswer}</span>
                </div>
              </div>

              <div className="text-xs text-slate-800 font-medium leading-relaxed bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] mt-2">
                <strong className="text-black font-black uppercase">Explicación: </strong>
                {q.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return Action */}
      <div className="text-center pt-2">
        <button
          onClick={onReturnToHub}
          className="px-8 py-4 rounded-2xl bg-[#FF3B30] hover:bg-[#E02D23] text-white font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <span>Regresar al Catálogo de Ejercicios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
