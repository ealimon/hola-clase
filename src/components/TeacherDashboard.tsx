import React, { useState, useEffect } from 'react';
import { SubmissionRecord, Exercise } from '../types';
import { HIGH_SCHOOL_PERIODS } from '../data/mockRoster';
import { StudentAuditModal } from './StudentAuditModal';
import { TeacherAIQuizGenerator } from './TeacherAIQuizGenerator';
import { 
  Users, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Wand2, 
  Sparkles, 
  BarChart3, 
  Calendar, 
  RefreshCw,
  School,
  ExternalLink,
  Flame
} from 'lucide-react';

interface TeacherDashboardProps {
  submissions: SubmissionRecord[];
  onRefreshSubmissions: () => void;
  onQuizCreated: (newExercise: Exercise) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  submissions,
  onRefreshSubmissions,
  onQuizCreated,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [integrityFilter, setIntegrityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubmissionForAudit, setSelectedSubmissionForAudit] = useState<SubmissionRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'live' | 'generator'>('submissions');

  // Simulated live active students currently on task (demonstrates real-time monitoring)
  const [liveStudents, setLiveStudents] = useState([
    {
      id: 'live-1',
      name: 'Carlos Gomez',
      schoolId: 'STU-202901',
      period: 'Period 1 - Spanish 1',
      exercise: 'Ser vs. Estar: Master the Two Spanish "To Be" Verbs',
      activeSeconds: 142,
      isFocused: true,
      currentQuestion: 'Q3 de 6',
      tabSwitches: 0,
    },
    {
      id: 'live-2',
      name: 'Isabella Vance',
      schoolId: 'STU-202812',
      period: 'Period 3 - Spanish 2',
      exercise: 'Pretérito vs. Imperfecto: Narration in the Past',
      activeSeconds: 215,
      isFocused: false,
      currentQuestion: 'Q4 de 5',
      tabSwitches: 3,
    },
    {
      id: 'live-3',
      name: 'Lucas Morales',
      schoolId: 'STU-202755',
      period: 'Period 6 - AP Spanish Language',
      exercise: 'El Subjuntivo: Expressing Wishes, Doubts & Recommendations',
      activeSeconds: 320,
      isFocused: true,
      currentQuestion: 'Q4 de 4',
      tabSwitches: 0,
    },
  ]);

  // Live timer tick for active classroom monitor
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveStudents((prev) =>
        prev.map((s) => ({
          ...s,
          activeSeconds: s.isFocused ? s.activeSeconds + 1 : s.activeSeconds,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesPeriod = selectedPeriod === 'all' || sub.period === selectedPeriod;
    const matchesSearch =
      searchQuery === '' ||
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.exerciseTitle.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesIntegrity = true;
    if (integrityFilter === 'flagged') {
      matchesIntegrity = sub.integrityScore < 80 || (sub.suspiciousFlags && sub.suspiciousFlags.length > 0);
    } else if (integrityFilter === 'clean') {
      matchesIntegrity = sub.integrityScore >= 85 && (!sub.suspiciousFlags || sub.suspiciousFlags.length === 0);
    } else if (integrityFilter === 'tab_switches') {
      matchesIntegrity = sub.tabSwitchCount >= 2;
    } else if (integrityFilter === 'rapid_speed') {
      matchesIntegrity = sub.rapidAnswerCount > 0 || (sub.activeFocusSeconds < 40 && sub.totalQuestions >= 4);
    }

    return matchesPeriod && matchesSearch && matchesIntegrity;
  });

  // Calculate high-level metrics
  const totalSubmissions = submissions.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.percentage, 0) / totalSubmissions)
    : 0;
  const avgActiveSeconds = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.activeFocusSeconds, 0) / totalSubmissions)
    : 0;
  const flaggedCount = submissions.filter(
    (s) => s.integrityScore < 80 || (s.suspiciousFlags && s.suspiciousFlags.length > 0)
  ).length;
  const integrityHealthPct = totalSubmissions > 0
    ? Math.round(((totalSubmissions - flaggedCount) / totalSubmissions) * 100)
    : 100;

  // CSV Export for Gradebook
  const handleExportCSV = () => {
    const headers = [
      'Student Name',
      'School ID',
      'Class Period',
      'Exercise Title',
      'Score',
      'Total Questions',
      'Score %',
      'Active Focus Time (sec)',
      'Active Focus Time (formatted)',
      'Idle Time (sec)',
      'Tab Switches Count',
      'Direct Paste Events',
      'Rapid Answers (<2.5s)',
      'Integrity Score (0-100)',
      'Integrity Flags',
      'Submission Timestamp',
    ];

    const rows = filteredSubmissions.map((s) => [
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.studentId}"`,
      `"${s.period}"`,
      `"${s.exerciseTitle.replace(/"/g, '""')}"`,
      s.score,
      s.totalQuestions,
      `${s.percentage}%`,
      s.activeFocusSeconds,
      `"${formatSeconds(s.activeFocusSeconds)}"`,
      s.idleSeconds,
      s.tabSwitchCount,
      s.pasteEventCount || 0,
      s.rapidAnswerCount || 0,
      s.integrityScore,
      `"${(s.suspiciousFlags || []).join('; ').replace(/"/g, '""')}"`,
      `"${new Date(s.submittedAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Spanish_Class_Integrity_Grades_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Teacher Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black text-white p-6 sm:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-xl bg-[#FF3B30] border-2 border-white text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#fff]">
              <School className="w-3.5 h-3.5 stroke-[2.5]" /> Panel Docente • Mrs. Limon
            </span>
            <span className="text-xs text-[#FFCC00] font-bold">
              Spanish Department
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Monitoreo de Ejercicios y Control de Integridad
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-2xl">
            Supervisa el tiempo activo real invertido por cada estudiante en los ejercicios de español y detecta posibles trampas (salidas de pestaña, pegado de traductores, respuestas en &lt;2s).
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#34C759] hover:bg-[#28A745] text-white font-black uppercase tracking-wider text-xs border-2 border-white shadow-[3px_3px_0px_#fff] flex items-center gap-2 cursor-pointer transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            title="Descargar calificaciones y registros de tiempo en CSV"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Exportar Notas a CSV</span>
          </button>

          <button
            onClick={onRefreshSubmissions}
            className="p-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#E6B800] text-black border-2 border-white shadow-[3px_3px_0px_#fff] cursor-pointer transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            title="Actualizar envíos"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between text-black mb-2">
            <span className="text-xs font-black uppercase tracking-wider">Total Envíos</span>
            <Users className="w-4 h-4 text-[#FF3B30] stroke-[2.5]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black">
            {totalSubmissions}
          </div>
          <div className="text-[11px] font-bold text-slate-600 mt-1">
            Envíos registrados con School ID
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between text-black mb-2">
            <span className="text-xs font-black uppercase tracking-wider">Promedio de Nota</span>
            <BarChart3 className="w-4 h-4 text-[#007AFF] stroke-[2.5]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#007AFF]">
            {avgScore}%
          </div>
          <div className="text-[11px] font-bold text-slate-600 mt-1">
            Precisión en ejercicios gramaticales
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between text-black mb-2">
            <span className="text-xs font-black uppercase tracking-wider">Tiempo Activo Promedio</span>
            <Clock className="w-4 h-4 text-[#34C759] stroke-[2.5]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#34C759] font-mono">
            {formatSeconds(avgActiveSeconds)}
          </div>
          <div className="text-[11px] font-bold text-slate-600 mt-1">
            Tiempo efectivo enfocado por prueba
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between text-black mb-2">
            <span className="text-xs font-black uppercase tracking-wider">Índice de Integridad</span>
            {flaggedCount > 0 ? (
              <ShieldAlert className="w-4 h-4 text-[#FF3B30] stroke-[2.5]" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-[#34C759] stroke-[2.5]" />
            )}
          </div>
          <div className={`text-2xl sm:text-3xl font-black ${flaggedCount > 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
            {integrityHealthPct}%
          </div>
          <div className="text-[11px] font-bold text-slate-600 mt-1">
            {flaggedCount} {flaggedCount === 1 ? 'envío con alerta' : 'envíos con alertas'}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
            activeTab === 'submissions'
              ? 'bg-black text-[#FFCC00] shadow-[3px_3px_0px_#000]'
              : 'bg-white text-black hover:bg-[#FAF9F6] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Historial de Envíos ({filteredSubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
            activeTab === 'live'
              ? 'bg-[#FF3B30] text-white shadow-[3px_3px_0px_#000]'
              : 'bg-white text-black hover:bg-[#FAF9F6] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFCC00]"></span>
          </span>
          <span>Monitor en Vivo ({liveStudents.length} activos)</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
            activeTab === 'generator'
              ? 'bg-[#007AFF] text-white shadow-[3px_3px_0px_#000]'
              : 'bg-white text-black hover:bg-[#FAF9F6] shadow-[2px_2px_0px_#000]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#FFCC00]" />
          <span>Crear Ejercicio con Gemini AI</span>
        </button>
      </div>

      {/* TAB 1: Submissions Roster & Search Filters */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por Alumno, School ID o Ejercicio..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black bg-[#FAF9F6] focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            {/* Period Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Periodo:
              </span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-black text-xs font-bold bg-[#FAF9F6] text-black focus:outline-none shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                <option value="all">Todos los Periodos</option>
                {HIGH_SCHOOL_PERIODS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              {/* Integrity Filter */}
              <select
                value={integrityFilter}
                onChange={(e) => setIntegrityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-black text-xs font-bold bg-[#FAF9F6] text-black focus:outline-none shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                <option value="all">Todos los Estados</option>
                <option value="clean">🟢 Alta Integridad (85%+)</option>
                <option value="flagged">⚠️ Con Alertas de Trampa</option>
                <option value="tab_switches">🔄 Cambios de Pestaña (≥2)</option>
                <option value="rapid_speed">⚡ Respuestas Rápidas (&lt;2.5s)</option>
              </select>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black text-white font-black uppercase tracking-wider border-b-3 border-black">
                    <th className="py-4 px-4">Estudiante / School ID</th>
                    <th className="py-4 px-4">Periodo</th>
                    <th className="py-4 px-4">Ejercicio</th>
                    <th className="py-4 px-4">Nota</th>
                    <th className="py-4 px-4">Tiempo Activo</th>
                    <th className="py-4 px-4">Salidas Pestaña</th>
                    <th className="py-4 px-4">Integridad</th>
                    <th className="py-4 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10 font-bold">
                  {filteredSubmissions.map((sub) => {
                    const hasFlags = sub.integrityScore < 80 || (sub.suspiciousFlags && sub.suspiciousFlags.length > 0);

                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-[#FFCC00]/10 transition-colors ${
                          hasFlags ? 'bg-[#FF3B30]/10' : ''
                        }`}
                      >
                        {/* Student Name & ID */}
                        <td className="py-3.5 px-4">
                          <div className="font-black text-black text-xs sm:text-sm">
                            {sub.studentName}
                          </div>
                          <div className="font-mono text-[11px] text-slate-700 font-bold">
                            {sub.studentId}
                          </div>
                        </td>

                        {/* Period */}
                        <td className="py-3.5 px-4 text-slate-800">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-black text-black text-[11px] font-black">
                            {sub.period.split(' - ')[0]}
                          </span>
                        </td>

                        {/* Exercise */}
                        <td className="py-3.5 px-4">
                          <span className="font-black text-black line-clamp-1 max-w-[220px]">
                            {sub.exerciseTitle}
                          </span>
                          <span className="text-[10px] text-slate-600 font-medium">
                            {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`font-black text-sm ${
                              sub.percentage >= 80
                                ? 'text-[#34C759]'
                                : sub.percentage >= 60
                                ? 'text-amber-800'
                                : 'text-[#FF3B30]'
                            }`}
                          >
                            {sub.percentage}%
                          </span>
                          <span className="text-[10px] text-slate-600 block font-bold">
                            {sub.score}/{sub.totalQuestions}
                          </span>
                        </td>

                        {/* Active Time */}
                        <td className="py-3.5 px-4 font-mono font-black text-black">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-black" />
                            <span>{formatSeconds(sub.activeFocusSeconds)}</span>
                          </div>
                          {sub.idleSeconds > 15 && (
                            <span className="text-[10px] text-[#FF3B30] font-sans font-bold block">
                              +{formatSeconds(sub.idleSeconds)} inactivo
                            </span>
                          )}
                        </td>

                        {/* Tab Switch count */}
                        <td className="py-3.5 px-4 font-mono font-black">
                          {sub.tabSwitchCount > 2 ? (
                            <span className="font-black text-white bg-[#FF3B30] px-2 py-0.5 rounded-lg border border-black flex items-center gap-1 w-fit shadow-[1px_1px_0px_#000]">
                              <AlertTriangle className="w-3 h-3" />
                              {sub.tabSwitchCount} salidas
                            </span>
                          ) : (
                            <span className="text-black">
                              {sub.tabSwitchCount === 0 ? '0' : `${sub.tabSwitchCount} vez`}
                            </span>
                          )}
                        </td>

                        {/* Integrity Badge */}
                        <td className="py-3.5 px-4">
                          {sub.integrityScore >= 85 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#34C759] text-white font-black text-[11px] border border-black shadow-[1px_1px_0px_#000]">
                              <ShieldCheck className="w-3 h-3 stroke-[2.5]" /> {sub.integrityScore}%
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FF3B30] text-white font-black text-[11px] border border-black shadow-[1px_1px_0px_#000]">
                              <ShieldAlert className="w-3 h-3 stroke-[2.5]" /> {sub.integrityScore}%
                            </span>
                          )}
                        </td>

                        {/* Audit CTA */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedSubmissionForAudit(sub)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black text-[#FFCC00] hover:bg-slate-900 border-2 border-black shadow-[2px_2px_0px_#000] font-black uppercase tracking-wider text-xs transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Auditar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12 text-slate-600 font-bold text-xs">
                No se encontraron registros con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Live Active Classroom Monitor */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#FFCC00] border-4 border-black shadow-[6px_6px_0px_#000] text-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
              </span>
              <span className="font-black uppercase tracking-tight text-sm">
                Monitoreo en Tiempo Real de Alumnos Activos en el Aula
              </span>
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:inline">
              Actualización en vivo de segundos de atención y cambios de pestaña
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveStudents.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-3xl border-4 border-black p-5 shadow-[6px_6px_0px_#000] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF9F6] border-2 border-black text-black text-[11px] font-black uppercase">
                      {st.period.split(' - ')[0]}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                        st.isFocused
                          ? 'bg-[#34C759] text-white'
                          : 'bg-[#FF3B30] text-white animate-pulse'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full border border-black ${st.isFocused ? 'bg-white' : 'bg-white'}`}></span>
                      {st.isFocused ? 'En Pestaña' : 'Pestaña Oculta'}
                    </span>
                  </div>

                  <h3 className="font-black text-black text-base uppercase tracking-tight">{st.name}</h3>
                  <div className="text-xs font-mono text-slate-700 font-bold mb-2">
                    {st.schoolId}
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF9F6] border-2 border-black text-xs space-y-1 my-3 shadow-[2px_2px_0px_#000]">
                    <div className="text-black font-black truncate">{st.exercise}</div>
                    <div className="text-[11px] text-slate-600 font-bold">{st.currentQuestion}</div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono font-black text-black bg-[#FFCC00] px-2 py-0.5 rounded-lg border border-black">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>{formatSeconds(st.activeSeconds)}</span>
                  </div>

                  <div>
                    {st.tabSwitches > 0 ? (
                      <span className="text-[#FF3B30] font-black uppercase text-[11px] bg-[#FF3B30]/10 px-2 py-0.5 rounded border border-[#FF3B30]">
                        ⚠️ {st.tabSwitches} salida(s)
                      </span>
                    ) : (
                      <span className="text-[#34C759] font-black uppercase text-[11px] bg-[#34C759]/10 px-2 py-0.5 rounded border border-[#34C759]">
                        0 salidas
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Teacher AI Quiz Generator */}
      {activeTab === 'generator' && (
        <TeacherAIQuizGenerator onQuizCreated={onQuizCreated} />
      )}

      {/* Forensic Audit Modal */}
      {selectedSubmissionForAudit && (
        <StudentAuditModal
          submission={selectedSubmissionForAudit}
          onClose={() => setSelectedSubmissionForAudit(null)}
        />
      )}
    </div>
  );
};
