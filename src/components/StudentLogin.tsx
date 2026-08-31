import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { DEMO_STUDENTS, HIGH_SCHOOL_PERIODS } from '../data/mockRoster';
import { IdCard, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2, User, School } from 'lucide-react';
import { StudentAvatar } from './StudentAvatar';

interface StudentLoginProps {
  onLogin: (student: StudentProfile) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onLogin }) => {
  const [schoolId, setSchoolId] = useState('');
  const [name, setName] = useState('');
  const [period, setPeriod] = useState(HIGH_SCHOOL_PERIODS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId.trim()) {
      setError('Por favor ingresa tu School ID (e.g., STU-202714 o número de estudiante).');
      return;
    }
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }

    const newStudent: StudentProfile = {
      schoolId: schoolId.trim().toUpperCase(),
      name: name.trim(),
      period,
      avatar: 'student-id-avatar',
      streakDays: 1,
      exercisesCompleted: 0,
      totalActiveTimeMinutes: 0,
      masteryScore: 85,
    };
    onLogin(newStudent);
  };

  const handleSelectDemo = (student: StudentProfile) => {
    onLogin(student);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFCC00] text-black border-2 border-black text-xs font-black uppercase tracking-wider mb-3 shadow-[3px_3px_0px_#000]">
          <School className="w-4 h-4 text-black" />
          <span>Clase de Español • Spanish Dept</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight">
          ¡Bienvenido a la Clase de Español!
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium">
          Portal de práctica interactiva de <strong className="text-black font-extrabold">Mrs. Limon</strong> para estudiantes de español. Inicia sesión con tu <strong className="text-black font-extrabold bg-[#FFCC00]/40 px-1 border-b-2 border-black">Student ID</strong> para comenzar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Login Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
            <div className="w-11 h-11 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000]">
              <IdCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-black text-lg uppercase tracking-tight">Ingreso con School ID</h2>
              <p className="text-xs font-bold text-slate-600">Student ID Verification & Active Time Sync</p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#FF3B30]/10 border-2 border-[#FF3B30] text-[#FF3B30] text-xs font-black flex items-center gap-2 shadow-[2px_2px_0px_#FF3B30]">
              <span className="w-2 h-2 rounded-full bg-[#FF3B30]"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="school-id-input" className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                School ID / Matrícula Estudiantil *
              </label>
              <div className="relative">
                <input
                  id="school-id-input"
                  type="text"
                  value={schoolId}
                  onChange={(e) => {
                    setSchoolId(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. STU-202714 o 849201"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:bg-white font-mono text-sm uppercase bg-[#FAF9F6] font-bold shadow-[3px_3px_0px_#000]"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-600 font-semibold mt-1.5">
                Utilizado por Mrs. Limon para registrar tu tiempo activo y calificación.
              </p>
            </div>

            <div>
              <label htmlFor="student-name-input" className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                Nombre y Apellido *
              </label>
              <input
                id="student-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Carlos Mendoza"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:bg-white text-sm bg-[#FAF9F6] font-bold shadow-[3px_3px_0px_#000]"
                required
              />
            </div>

            <div>
              <label htmlFor="student-period-select" className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                Periodo de Clase (Class Period) *
              </label>
              <select
                id="student-period-select"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:bg-white text-sm bg-[#FAF9F6] font-bold shadow-[3px_3px_0px_#000]"
              >
                {HIGH_SCHOOL_PERIODS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Integrity Notice */}
            <div className="p-3.5 rounded-xl bg-[#FFCC00]/20 border-2 border-black text-xs text-black space-y-1.5 shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-1.5 text-black font-black uppercase tracking-tight">
                <Clock className="w-4 h-4 text-black" />
                <span>Monitoreo de Tiempo Activo e Integridad Académica</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-800 font-semibold">
                La plataforma registra el tiempo que permaneces enfocado en la pestaña trabajando en tus ejercicios. Evita cambiar de pestañas o usar traductores automáticos para mantener tu puntaje de integridad alto.
              </p>
            </div>

            <button
              id="student-login-submit-btn"
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#FF3B30] hover:bg-[#E02D23] text-white font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span>Comenzar Práctica de Español</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Demo Student Selector */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FAF9F6] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
              <h3 className="font-black text-black text-sm uppercase tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF3B30]" />
                Perfiles de Prueba (1-Click)
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#FFCC00] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                Demo
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold mb-3">
              Selecciona un perfil de estudiante pre-configurado para probar el flujo de inmediato:
            </p>

            <div className="space-y-2.5">
              {DEMO_STUDENTS.slice(0, 4).map((demo) => (
                <button
                  key={demo.schoolId}
                  type="button"
                  onClick={() => handleSelectDemo(demo)}
                  className="w-full p-3 rounded-xl bg-white hover:bg-[#FFCC00]/30 border-2 border-black text-left transition-all flex items-center justify-between cursor-pointer group shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <StudentAvatar name={demo.name} size="sm" />
                    <div>
                      <div className="font-black text-xs text-black group-hover:text-[#FF3B30]">
                        {demo.name}
                      </div>
                      <div className="text-[10px] text-slate-600 font-mono font-bold">
                        {demo.schoolId} • {demo.period.split(' - ')[0]}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#34C759] text-white border border-black shadow-[1px_1px_0px_#000]">
                      {demo.masteryScore}% Dominio
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Teacher Info Card */}
          <div className="p-5 rounded-2xl bg-white border-3 border-black text-xs text-slate-800 shadow-[4px_4px_0px_#000]">
            <h4 className="font-black text-black text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
              ¿Eres la Profesora (Mrs. Limon)?
            </h4>
            <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
              Puedes cambiar al modo de profesora en cualquier momento desde la barra superior para ver el registro en vivo, tiempos por pregunta y auditoría de trampas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
