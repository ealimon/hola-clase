import React, { useState } from 'react';
import { Exercise, StudentProfile, SpanishLevel } from '../types';
import { CURRICULUM_EXERCISES } from '../data/curriculum';
import { BookOpen, Clock, Award, Play, Filter, Sparkles, CheckCircle, Search, Zap } from 'lucide-react';
import { StudentAvatar } from './StudentAvatar';

interface StudentExerciseHubProps {
  student: StudentProfile;
  customExercises: Exercise[];
  completedExerciseIds: string[];
  onStartExercise: (exercise: Exercise) => void;
}

export const StudentExerciseHub: React.FC<StudentExerciseHubProps> = ({
  student,
  customExercises,
  completedExerciseIds,
  onStartExercise,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allExercises: Exercise[] = [...CURRICULUM_EXERCISES, ...customExercises];

  const filteredExercises = allExercises.filter((ex) => {
    const matchesLevel = selectedLevel === 'all' || ex.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FF3B30] border-4 border-black text-white p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <StudentAvatar name={student.name} size="xl" className="shadow-[4px_4px_0px_#000]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-md bg-[#FFCC00] text-black border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                  {student.period}
                </span>
                <span className="text-xs text-white font-mono font-bold bg-black/40 px-2 py-0.5 rounded border border-black">
                  ID: {student.schoolId}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold text-white/90 bg-black/30 px-2 py-0.5 rounded border border-black/40">
                  Español
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mt-1 text-white">
                ¡Hola, {student.name}!
              </h1>
              <p className="text-xs sm:text-sm text-white font-semibold mt-1 max-w-xl">
                Selecciona un ejercicio para practicar. Recuerda que recibirás retroalimentación instantánea y tu tiempo activo de concentración será registrado para Mrs. Limon.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-4 bg-black text-white p-3 rounded-2xl border-2 border-white shadow-[4px_4px_0px_#000] self-start md:self-auto">
            <div className="text-center px-2 sm:px-3">
              <div className="text-xl sm:text-2xl font-black text-[#FFCC00]">
                {student.streakDays}🔥
              </div>
              <div className="text-[10px] text-white uppercase tracking-wider font-black">
                Racha (Días)
              </div>
            </div>
            <div className="w-px h-8 bg-white/40"></div>
            <div className="text-center px-2 sm:px-3">
              <div className="text-xl sm:text-2xl font-black text-white">
                {completedExerciseIds.length}
              </div>
              <div className="text-[10px] text-white uppercase tracking-wider font-black">
                Completados
              </div>
            </div>
            <div className="w-px h-8 bg-white/40"></div>
            <div className="text-center px-2 sm:px-3">
              <div className="text-xl sm:text-2xl font-black text-[#34C759]">
                {student.masteryScore}%
              </div>
              <div className="text-[10px] text-white uppercase tracking-wider font-black">
                Dominio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border-3 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="exercise-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema (e.g. Ser vs Estar, Subjuntivo, Comida)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-black focus:outline-none focus:bg-white text-xs bg-[#FAF9F6] font-bold shadow-[2px_2px_0px_#000]"
          />
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-black uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Nivel:
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'spanish 1', label: 'Spanish 1' },
            { id: 'spanish 2', label: 'Spanish 2' },
            { id: 'spanish 3', label: 'Spanish 3' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight border-2 border-black transition-all cursor-pointer ${
                selectedLevel === lvl.id
                  ? 'bg-black text-[#FFCC00] shadow-[2px_2px_0px_#000]'
                  : 'bg-[#FAF9F6] text-black hover:bg-[#FFCC00]/40 shadow-[1px_1px_0px_#000]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => {
          const isCompleted = completedExerciseIds.includes(exercise.id);

          return (
            <div
              key={exercise.id}
              className={`flex flex-col justify-between rounded-2xl bg-white border-3 border-black transition-all duration-200 p-5 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#007AFF] hover:-translate-y-1 ${
                isCompleted
                  ? 'bg-[#FAF9F6]'
                  : 'bg-white'
              }`}
            >
              <div>
                {/* Header Tag and Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000] ${
                      exercise.level.includes('Spanish 1')
                        ? 'bg-[#007AFF] text-white'
                        : exercise.level.includes('Spanish 2')
                        ? 'bg-[#FFCC00] text-black'
                        : 'bg-[#AF52DE] text-white'
                    }`}
                  >
                    {exercise.level.split(' (')[0]}
                  </span>

                  <div className="flex items-center gap-2">
                    {exercise.isCustom && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF3B30] text-white border-2 border-black shadow-[1px_1px_0px_#000]">
                        ⚡ Creado por Profe
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-black bg-[#34C759] px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000]">
                        <CheckCircle className="w-3 h-3 text-black" /> Hecho
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Unit */}
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  {exercise.unit}
                </div>
                <h3 className="font-black text-[#1A1A1A] text-base mb-2 group-hover:text-[#FF3B30] transition-colors leading-snug">
                  {exercise.title}
                </h3>
                <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed mb-4 font-medium">
                  {exercise.description}
                </p>
              </div>

              {/* Card Footer: Metadata and Start Button */}
              <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-black font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    ~{exercise.estimatedMinutes}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-black" />
                    {exercise.questions.length} preg.
                  </span>
                </div>

                <button
                  id={`start-exercise-${exercise.id}`}
                  onClick={() => onStartExercise(exercise)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-black uppercase tracking-wider text-xs border-2 border-black transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-[#34C759] hover:bg-[#2EB34F] text-white shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none'
                      : 'bg-[#FF3B30] hover:bg-[#E02D23] text-white shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Repasar' : 'Comenzar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
          <BookOpen className="w-10 h-10 text-black mx-auto mb-3" />
          <h3 className="font-black text-black text-sm uppercase">No se encontraron ejercicios</h3>
          <p className="text-xs text-slate-600 mt-1 font-semibold">
            Intenta cambiar los filtros de nivel o buscar otro término.
          </p>
        </div>
      )}
    </div>
  );
};
