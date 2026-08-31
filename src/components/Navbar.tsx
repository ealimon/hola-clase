import React from 'react';
import { UserRole, StudentProfile } from '../types';
import { GraduationCap, BookOpen, ShieldAlert, Volume2, VolumeX, Flame, LogOut, Sparkles, UserCheck } from 'lucide-react';
import { isSpeechEnabled, setSpeechEnabled } from '../utils/audio';
import { StudentAvatar } from './StudentAvatar';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  student: StudentProfile | null;
  onLogoutStudent: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  activeExerciseTitle?: string;
  activeTimerFormatted?: string;
  isTabFocused?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  student,
  onLogoutStudent,
  audioEnabled,
  onToggleAudio,
  activeExerciseTitle,
  activeTimerFormatted,
  isTabFocused = true,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-black shadow-[0px_4px_0px_#00000010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center text-white font-black text-sm border-2 border-black shadow-[3px_3px_0px_#000] select-none tracking-tight">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#1A1A1A] tracking-tighter text-lg sm:text-xl uppercase">
                  ¡HolaClase!
                </span>
                <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFCC00] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                  Español
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-600 hidden md:block">
                Spanish Practice & Time Tracker • Mrs. Limon
              </p>
            </div>
          </div>

          {/* Active Exercise Live Status Pill */}
          {activeExerciseTitle && (
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full border border-black ${isTabFocused ? 'bg-[#34C759] animate-pulse' : 'bg-[#FF9500]'}`}></span>
                <span className="font-bold text-black max-w-[200px] truncate">
                  {activeExerciseTitle}
                </span>
              </div>
              {activeTimerFormatted && (
                <span className="font-mono font-black px-2 py-0.5 rounded-md bg-[#FFCC00] text-black border-2 border-black shadow-[1px_1px_0px_#000]">
                  ⏱️ {activeTimerFormatted}
                </span>
              )}
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                audioEnabled
                  ? 'bg-[#FFCC00] text-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                  : 'bg-slate-100 text-slate-600 shadow-[2px_2px_0px_#000] hover:bg-slate-200'
              }`}
              title={audioEnabled ? 'Audio / Pronunciation Enabled' : 'Audio Disabled'}
            >
              <div className="flex items-center gap-1.5">
                {audioEnabled ? <Volume2 className="w-4 h-4 text-black" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline text-xs">{audioEnabled ? 'Voz activada' : 'Mute'}</span>
              </div>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center p-1 bg-[#FAF9F6] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <button
                onClick={() => onRoleChange('student')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                  currentRole === 'student'
                    ? 'bg-[#FF3B30] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-slate-700 hover:text-black'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Estudiante</span>
              </button>

              <button
                onClick={() => onRoleChange('teacher')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                  currentRole === 'teacher'
                    ? 'bg-black text-[#FFCC00] border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-slate-700 hover:text-black'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Mrs. Limon</span>
              </button>
            </div>

            {/* Student Info or Teacher Badge */}
            {currentRole === 'student' && student && (
              <div className="flex items-center gap-2 pl-2 border-l-2 border-black">
                <StudentAvatar name={student.name} size="sm" />
                <div className="hidden md:block text-left text-xs">
                  <div className="font-extrabold text-black truncate max-w-[110px]">
                    {student.name}
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono font-bold">
                    ID: {student.schoolId}
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-[#FFCC00] rounded-lg border-2 border-black text-black text-xs font-black shadow-[2px_2px_0px_#000]" title="Daily Streak">
                  <Flame className="w-3.5 h-3.5 text-[#FF3B30] fill-[#FF3B30]" />
                  <span>{student.streakDays}d</span>
                </div>

                <button
                  onClick={onLogoutStudent}
                  className="p-1.5 text-slate-500 hover:text-black hover:bg-[#FF3B30]/20 rounded-lg border border-transparent hover:border-black transition-all cursor-pointer"
                  title="Cambiar de estudiante / Log out ID"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentRole === 'teacher' && (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l-2 border-black">
                <div className="w-8 h-8 rounded-xl bg-[#007AFF] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-white font-black text-xs">
                  ML
                </div>
                <div className="text-left text-xs">
                  <div className="font-black text-black">Mrs. Limon</div>
                  <div className="text-[10px] text-[#FF3B30] font-black uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-[#FF3B30]" /> Anti-Cheat
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
