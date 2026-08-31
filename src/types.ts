export type UserRole = 'student' | 'teacher';

export type SpanishLevel = 'Spanish 1 (Beginner)' | 'Spanish 2 (Intermediate)' | 'Spanish 3 / AP (Advanced)';

export type QuestionType = 
  | 'multiple_choice'
  | 'fill_in_blank'
  | 'conjugation'
  | 'sentence_scramble'
  | 'listening'
  | 'translation_open';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  contextSentence?: string;
  spanishSentence?: string;
  englishTranslation?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[]; // for open/fill-in variations
  scrambledWords?: string[];
  audioText?: string; // Spanish text to speak
  explanation: string;
  grammarRule?: string;
  hint?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  level: SpanishLevel;
  category: 'Grammar' | 'Vocabulary' | 'Listening' | 'Reading' | 'Conversation' | 'Culture';
  unit: string;
  estimatedMinutes: number;
  questions: Question[];
  isCustom?: boolean;
  author?: string;
  createdAt?: string;
}

export interface StudentProfile {
  schoolId: string;
  name: string;
  period: string; // e.g. 'Period 1 - Spanish 1'
  avatar: string;
  streakDays: number;
  exercisesCompleted: number;
  totalActiveTimeMinutes: number;
  masteryScore: number;
}

export interface QuestionAuditDetail {
  questionId: string;
  questionNumber: number;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  pasted: boolean;
  keystrokeCount: number;
  explanation: string;
  grammarRule?: string;
  speedFlag: boolean; // Answered under 2.5s
}

export interface ActivityEvent {
  timestamp: number; // relative second from start
  type: 'start' | 'tab_blur' | 'tab_focus' | 'paste' | 'rapid_answer' | 'question_next' | 'idle_detected' | 'idle_resumed' | 'submit';
  description: string;
  questionIndex?: number;
}

export interface SubmissionRecord {
  id: string;
  studentId: string;
  studentName: string;
  period: string;
  exerciseId: string;
  exerciseTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  activeFocusSeconds: number;
  idleSeconds: number;
  tabSwitchCount: number;
  pasteEventCount: number;
  rapidAnswerCount: number;
  integrityScore: number; // 0-100%
  suspiciousFlags: string[];
  submittedAt: string;
  questionDetails: QuestionAuditDetail[];
  activityTimeline?: ActivityEvent[];
}

export interface AIFeedbackResponse {
  isCorrect: boolean;
  grammarScore: number;
  naturalnessScore: number;
  feedback: string;
  corrections: Array<{
    original: string;
    improved: string;
    explanation: string;
  }>;
  tips: string;
}
