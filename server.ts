import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will use fallback responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// In-memory submissions and custom quizzes store
interface SubmissionRecord {
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
  integrityScore: number;
  suspiciousFlags: string[];
  submittedAt: string;
  questionDetails: Array<{
    questionId: string;
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timeSpentSeconds: number;
    pasted: boolean;
    explanation: string;
  }>;
}

let storedSubmissions: SubmissionRecord[] = [];
let customTeacherQuizzes: any[] = [];

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: Get all submissions (for Teacher Dashboard)
app.get('/api/submissions', (req, res) => {
  res.json({ submissions: storedSubmissions });
});

// API: Submit student completed exercise
app.post('/api/submissions', (req, res) => {
  try {
    const submission: SubmissionRecord = {
      ...req.body,
      id: req.body.id || `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      submittedAt: req.body.submittedAt || new Date().toISOString(),
    };
    
    // Add to memory
    storedSubmissions.unshift(submission);
    // Keep max 500 records
    if (storedSubmissions.length > 500) {
      storedSubmissions = storedSubmissions.slice(0, 500);
    }
    
    res.status(201).json({ success: true, submission });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to record submission' });
  }
});

// API: AI Feedback for Spanish Sentence / Open Answer
app.post('/api/ai/feedback', async (req, res) => {
  try {
    const { prompt, studentAnswer, expectedConcept, level } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback helpful rule-based guidance
      return res.json({
        isCorrect: studentAnswer && studentAnswer.trim().length > 3,
        grammarScore: 85,
        naturalnessScore: 80,
        feedback: "Buen intento. Recuerda verificar la concordancia de género y número y la correcta acentuación ortográfica (tildes).",
        corrections: [
          {
            original: studentAnswer,
            improved: studentAnswer,
            explanation: "Continúa practicando la estructura de la oración en español.",
          },
        ],
        tips: "Consejo: En español, los adjetivos suelen colocarse después del sustantivo que modifican.",
      });
    }

    const systemPrompt = `You are a warm, encouraging high school Spanish teacher.
Analyze the student's Spanish answer for an exercise.
Level: ${level || 'High School Spanish 1/2'}
Context/Prompt: "${prompt}"
Expected Concept: "${expectedConcept || 'Grammar & Vocabulary accuracy'}"
Student Answer: "${studentAnswer}"

Provide structured JSON feedback:
- isCorrect: boolean (true if essentially correct or minor punctuation error)
- grammarScore: integer 0-100
- naturalnessScore: integer 0-100
- feedback: string (1-2 sentences of encouraging, clear feedback in English and simple Spanish)
- corrections: array of { original: string, improved: string, explanation: string }
- tips: string (a helpful mnemonic or rule for high school students)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Evaluate this student Spanish answer:\nStudent: "${studentAnswer}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            grammarScore: { type: Type.INTEGER },
            naturalnessScore: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            corrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  improved: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['original', 'improved', 'explanation'],
              },
            },
            tips: { type: Type.STRING },
          },
          required: ['isCorrect', 'grammarScore', 'feedback', 'corrections', 'tips'],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return res.json(parsed);
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (err: any) {
    console.error("AI Feedback Error:", err);
    res.status(500).json({
      error: "Could not generate AI feedback at this time",
      feedback: "Buen trabajo completando el ejercicio.",
    });
  }
});

// API: Generate Custom Teacher Spanish Exercise with Gemini
app.post('/api/ai/generate-exercise', async (req, res) => {
  try {
    const { topic, level, questionCount = 5, instructions } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({ error: "Gemini API key is required to generate new AI exercises." });
    }

    const systemPrompt = `You are an expert high school Spanish curriculum developer.
Create an engaging, pedagogical Spanish practice exercise for high school students.
Topic: ${topic}
Level: ${level || 'Spanish 1'}
Target Question Count: ${questionCount}
Teacher Notes: ${instructions || 'Focus on common errors, authentic Spanish, and clear explanations.'}

Return a valid JSON object matching the schema with varied questions:
- multiple_choice: with 4 options and clear explanation
- fill_in_blank: with sentence containing ___ and correct word
- sentence_scramble: with scrambled words array and full correct sentence
- translation: with English sentence and correct Spanish translation
Ensure accents (á, é, í, ó, ú, ñ, ¿, ¡) are properly included.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Generate a Spanish exercise set on topic: "${topic}" for ${level}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            level: { type: Type.STRING },
            estimatedMinutes: { type: Type.INTEGER },
            category: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, description: "multiple_choice | fill_in_blank | sentence_scramble | translation" },
                  prompt: { type: Type.STRING },
                  spanishSentence: { type: Type.STRING },
                  englishTranslation: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswer: { type: Type.STRING },
                  scrambledWords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  explanation: { type: Type.STRING },
                  grammarRule: { type: Type.STRING },
                },
                required: ['id', 'type', 'prompt', 'correctAnswer', 'explanation'],
              },
            },
          },
          required: ['title', 'description', 'level', 'estimatedMinutes', 'category', 'questions'],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      const newExercise = {
        ...parsed,
        id: `custom-ai-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      customTeacherQuizzes.push(newExercise);
      return res.json({ success: true, exercise: newExercise });
    } else {
      throw new Error("No content generated");
    }
  } catch (err: any) {
    console.error("AI Exercise Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate exercise" });
  }
});

// API: Get custom teacher quizzes
app.get('/api/custom-exercises', (req, res) => {
  res.json({ exercises: customTeacherQuizzes });
});

// Start server and mount Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`¡HolaClase! Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
