import React, { useState, useEffect } from 'react';
import { UserRole, StudentProfile, Exercise, SubmissionRecord } from './types';
import { CURRICULUM_EXERCISES } from './data/curriculum';
import { DEMO_STUDENTS, INITIAL_SUBMISSIONS } from './data/mockRoster';
import { Navbar } from './components/Navbar';
import { StudentLogin } from './components/StudentLogin';
import { StudentExerciseHub } from './components/StudentExerciseHub';
import { ExerciseSession } from './components/ExerciseSession';
import { CompletionSummary } from './components/CompletionSummary';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [student, setStudent] = useState<StudentProfile | null>(DEMO_STUDENTS[0]); // default to demo student for instant access
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [latestSubmission, setLatestSubmission] = useState<SubmissionRecord | null>(null);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>(['sp1-u2-ser-estar']);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);

  // Load submissions from server
  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        if (data.submissions && data.submissions.length > 0) {
          // Merge server submissions with initial demo ones without duplicates
          const serverSubs: SubmissionRecord[] = data.submissions;
          const merged = [...serverSubs];
          INITIAL_SUBMISSIONS.forEach((initSub) => {
            if (!merged.some((s) => s.id === initSub.id)) {
              merged.push(initSub);
            }
          });
          setSubmissions(merged);
        }
      }
    } catch (err) {
      console.warn("Could not fetch server submissions, using local state:", err);
    }
  };

  // Load custom quizzes from server
  const fetchCustomExercises = async () => {
    try {
      const res = await fetch('/api/custom-exercises');
      if (res.ok) {
        const data = await res.json();
        if (data.exercises && data.exercises.length > 0) {
          setCustomExercises(data.exercises);
        }
      }
    } catch (err) {
      console.warn("Could not fetch custom exercises:", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchCustomExercises();
  }, []);

  const handleLogin = (loggedStudent: StudentProfile) => {
    setStudent(loggedStudent);
    setActiveExercise(null);
    setLatestSubmission(null);
  };

  const handleLogout = () => {
    setStudent(null);
    setActiveExercise(null);
    setLatestSubmission(null);
  };

  const handleStartExercise = (exercise: Exercise) => {
    setLatestSubmission(null);
    setActiveExercise(exercise);
  };

  const handleExitExercise = () => {
    setActiveExercise(null);
    setLatestSubmission(null);
  };

  const handleCompleteExercise = (sub: SubmissionRecord) => {
    setActiveExercise(null);
    setLatestSubmission(sub);
    setSubmissions((prev) => [sub, ...prev]);
    setCompletedExerciseIds((prev) => Array.from(new Set([...prev, sub.exerciseId])));

    // Update student mastery stats
    if (student) {
      setStudent({
        ...student,
        exercisesCompleted: student.exercisesCompleted + 1,
        totalActiveTimeMinutes: student.totalActiveTimeMinutes + Math.round(sub.activeFocusSeconds / 60),
        masteryScore: Math.min(100, Math.round((student.masteryScore + sub.percentage) / 2)),
      });
    }
  };

  const handleReturnToHub = () => {
    setLatestSubmission(null);
    setActiveExercise(null);
  };

  const handleQuizCreated = (newExercise: Exercise) => {
    setCustomExercises((prev) => [newExercise, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FFCC00] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'teacher') {
            setActiveExercise(null);
          }
        }}
        student={student}
        onLogoutStudent={handleLogout}
        activeExerciseTitle={activeExercise ? activeExercise.title : undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Teacher Mode */}
        {currentRole === 'teacher' && (
          <TeacherDashboard
            submissions={submissions}
            onRefreshSubmissions={fetchSubmissions}
            onQuizCreated={handleQuizCreated}
          />
        )}

        {/* Student Mode */}
        {currentRole === 'student' && (
          <>
            {/* 1. Student Login Required */}
            {!student && <StudentLogin onLogin={handleLogin} />}

            {/* 2. Logged in and in active exercise session */}
            {student && activeExercise && (
              <ExerciseSession
                exercise={activeExercise}
                student={student}
                onExit={handleExitExercise}
                onComplete={handleCompleteExercise}
              />
            )}

            {/* 3. Logged in and finished exercise -> Completion Summary */}
            {student && !activeExercise && latestSubmission && (
              <CompletionSummary
                submission={latestSubmission}
                onReturnToHub={handleReturnToHub}
              />
            )}

            {/* 4. Logged in and browsing Exercise Catalog */}
            {student && !activeExercise && !latestSubmission && (
              <StudentExerciseHub
                student={student}
                customExercises={customExercises}
                completedExerciseIds={completedExerciseIds}
                onStartExercise={handleStartExercise}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-6 text-center text-xs text-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase tracking-tight bg-[#FFCC00] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">¡HolaClase!</span>
            <span className="font-bold text-slate-800">• High School Spanish Curriculum & Integrity Engine</span>
          </div>
          <div className="text-xs font-bold text-slate-600">
            Diseñado para clases de español • Monitoreo de tiempo activo y prevención de trampas
          </div>
        </div>
      </footer>
    </div>
  );
}
