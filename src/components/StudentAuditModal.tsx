import React from 'react';
import { SubmissionRecord } from '../types';
import { X, Clock, ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Copy, Zap, ArrowDown, Activity, FileText } from 'lucide-react';

interface StudentAuditModalProps {
  submission: SubmissionRecord;
  onClose: () => void;
}

export const StudentAuditModal: React.FC<StudentAuditModalProps> = ({
  submission,
  onClose,
}) => {
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const getIntegrityBadge = (score: number) => {
    if (score >= 85) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#34C759] text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" /> Alta ({score}%)
        </span>
      );
    } else if (score >= 60) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#FFCC00] text-black border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
          <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" /> Alerta ({score}%)
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#FF3B30] text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 stroke-[2.5]" /> Sospechoso ({score}%)
        </span>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F6] rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn">
        {/* Modal Header */}
        <div className="p-6 bg-black text-white flex items-center justify-between border-b-4 border-black">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#FF3B30] border border-black text-white text-[10px] font-black uppercase tracking-wider">
                Auditoría Forense de Integridad
              </span>
              <span className="text-xs text-[#FFCC00] font-mono font-bold">
                {submission.period}
              </span>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              {submission.studentName} — <span className="font-mono text-[#FFCC00]">{submission.studentId}</span>
            </h2>
            <p className="text-xs text-slate-300 font-semibold mt-0.5">
              Ejercicio: <strong className="text-white">{submission.exerciseTitle}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white hover:bg-[#FF3B30] border-2 border-transparent hover:border-black transition-all cursor-pointer"
            title="Cerrar auditoría"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Audit Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Calificación</div>
              <div className="text-2xl font-black text-black">
                {submission.percentage}%
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {submission.score} de {submission.totalQuestions} correctas
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Tiempo Activo Enfocado</div>
              <div className="text-2xl font-black text-[#34C759] font-mono">
                {formatSeconds(submission.activeFocusSeconds)}
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {formatSeconds(submission.idleSeconds)} inactivo / idle
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Salidas de Pestaña</div>
              <div className={`text-2xl font-black font-mono ${submission.tabSwitchCount > 2 ? 'text-[#FF3B30]' : 'text-black'}`}>
                {submission.tabSwitchCount}
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {submission.tabSwitchCount > 2 ? '⚠️ Frecuentes cambios' : 'Comportamiento normal'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Puntaje Integridad</div>
              <div className="mt-1">
                {getIntegrityBadge(submission.integrityScore)}
              </div>
            </div>
          </div>

          {/* Suspicious Alerts Box if any */}
          {submission.suspiciousFlags && submission.suspiciousFlags.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FF3B30]/15 border-3 border-black shadow-[4px_4px_0px_#000] text-xs text-black space-y-1.5">
              <div className="font-black uppercase tracking-wider text-[#FF3B30] flex items-center gap-1.5 text-sm">
                <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                <span>Alertas de Integridad Detectadas:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-black font-bold pl-1">
                {submission.suspiciousFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Question by Question Detailed Forensic Breakdown */}
          <div>
            <h3 className="font-black uppercase tracking-tight text-[#1A1A1A] text-base mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF3B30]" />
              Desglose Pregunta por Pregunta y Tiempos
            </h3>

            <div className="space-y-3">
              {submission.questionDetails.map((q, idx) => (
                <div
                  key={q.questionId || idx}
                  className={`p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] ${
                    q.speedFlag || q.pasted
                      ? 'bg-[#FFCC00]/20'
                      : q.isCorrect
                      ? 'bg-[#34C759]/10'
                      : 'bg-[#FF3B30]/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-black text-[#FFCC00] font-black text-xs flex items-center justify-center border border-black">
                        Q{idx + 1}
                      </span>
                      <span className="font-black text-black text-xs sm:text-sm">
                        {q.prompt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {q.speedFlag && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-[#FFCC00] text-black border border-black flex items-center gap-1">
                          <Zap className="w-3 h-3 text-black stroke-[2.5]" /> &lt;2.5s (Muy Rápido)
                        </span>
                      )}

                      {q.pasted && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-[#FF3B30] text-white border border-black flex items-center gap-1">
                          <Copy className="w-3 h-3 text-white stroke-[2.5]" /> Pegado Portapapeles
                        </span>
                      )}

                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-black border border-black flex items-center gap-1">
                        <Clock className="w-3 h-3 text-black" /> {q.timeSpentSeconds}s
                      </span>

                      {q.isCorrect ? (
                        <span className="text-[#34C759] text-xs font-black flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correcto
                        </span>
                      ) : (
                        <span className="text-[#FF3B30] text-xs font-black flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrecto
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-sans text-slate-600 font-black uppercase block">Respuesta del Alumno:</span>
                      <span className={`font-bold ${q.isCorrect ? 'text-black' : 'text-[#FF3B30]'}`}>
                        {q.userAnswer || '(Sin respuesta)'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-sans text-[#34C759] font-black uppercase block">Respuesta Esperada:</span>
                      <span className="font-bold text-[#34C759]">{q.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          {submission.activityTimeline && submission.activityTimeline.length > 0 && (
            <div>
              <h3 className="font-black uppercase tracking-tight text-[#1A1A1A] text-base mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#007AFF]" />
                Línea de Tiempo de Eventos y Cambios de Pestaña
              </h3>

              <div className="p-4 rounded-2xl bg-black text-white border-3 border-black shadow-[4px_4px_0px_#000] font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
                {submission.activityTimeline.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[#FFCC00] shrink-0 font-bold">
                      +{ev.timestamp}s
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold shrink-0 border border-black ${
                        ev.type === 'tab_blur'
                          ? 'bg-[#FF3B30] text-white'
                          : ev.type === 'paste'
                          ? 'bg-[#FFCC00] text-black'
                          : ev.type === 'rapid_answer'
                          ? 'bg-[#007AFF] text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {ev.type}
                    </span>
                    <span className="text-slate-200 truncate">{ev.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t-3 border-black flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#FFCC00] font-black uppercase tracking-wider text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            Cerrar Auditoría
          </button>
        </div>
      </div>
    </div>
  );
};
