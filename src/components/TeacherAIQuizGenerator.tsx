import React, { useState } from 'react';
import { Exercise, SpanishLevel } from '../types';
import { Sparkles, Plus, Check, Loader2, BookOpen, AlertCircle, Wand2 } from 'lucide-react';

interface TeacherAIQuizGeneratorProps {
  onQuizCreated: (newExercise: Exercise) => void;
}

export const TeacherAIQuizGenerator: React.FC<TeacherAIQuizGeneratorProps> = ({
  onQuizCreated,
}) => {
  const [topic, setTopic] = useState('Verbos Irregulares en Pretérito (fui, estuve, tuve, puse)');
  const [level, setLevel] = useState<SpanishLevel>('Spanish 2 (Intermediate)');
  const [questionCount, setQuestionCount] = useState(5);
  const [instructions, setInstructions] = useState('Enfócate en errores comunes de ortografía, tildes y ejercicios variados (opción múltiple, completar y ordenar oraciones).');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Por favor especifica un tema para el ejercicio.');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      setSuccessMsg('');

      const res = await fetch('/api/ai/generate-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          level,
          questionCount,
          instructions,
        }),
      });

      const data = await res.json();
      if (data.success && data.exercise) {
        setSuccessMsg(`¡Ejercicio "${data.exercise.title}" generado y publicado exitosamente!`);
        onQuizCreated(data.exercise);
      } else {
        throw new Error(data.error || 'No se pudo generar el ejercicio.');
      }
    } catch (err: any) {
      console.error("AI Generation failed:", err);
      setError(err.message || 'Error al comunicarse con Gemini AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const presetTopics = [
    'Verbos Reflexivos y Rutina Diaria (levantarse, ducharse, vestirse)',
    'El Clima y las Estaciones en Países Hispanos',
    'Pronombres de Objeto Directo e Indirecto (me, te, lo, la, nos, les)',
    'Leyendas Populares Latinoamericanas (El Sombrerón y La Llorona)',
  ];

  return (
    <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3.5 pb-4 border-b-2 border-black">
        <div className="w-12 h-12 rounded-2xl bg-black text-[#FFCC00] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
          <Wand2 className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A]">
            Generador de Ejercicios con Gemini AI
          </h2>
          <p className="text-xs text-slate-700 font-semibold">
            Crea ejercicios interactivos de español en segundos con retroalimentación inmediata y explicaciones pedagógicas
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FF3B30]/15 border-2 border-black text-black text-xs font-bold flex items-center gap-2 shadow-[3px_3px_0px_#000]">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#FF3B30]" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-[#34C759]/20 border-2 border-black text-black text-xs font-black flex items-center gap-2 shadow-[3px_3px_0px_#000]">
          <Check className="w-4 h-4 shrink-0 text-[#34C759] stroke-[3]" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleGenerate} className="space-y-5">
        <div>
          <label htmlFor="ai-topic-input" className="block text-xs font-black text-black uppercase tracking-wider mb-2">
            Tema / Unidad de Español *
          </label>
          <input
            id="ai-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Por vs Para, Comida Mexicana, Subjuntivo en deseos..."
            className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white focus:outline-none text-sm font-bold text-black shadow-[2px_2px_0px_#000]"
            required
          />

          {/* Quick preset suggestions */}
          <div className="flex flex-wrap gap-2 mt-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 self-center mr-1">Sugerencias rápidas:</span>
            {presetTopics.map((pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => setTopic(pt)}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FAF9F6] hover:bg-[#FFCC00] text-black border border-black shadow-[1px_1px_0px_#000] transition-colors cursor-pointer"
              >
                {pt.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ai-level-select" className="block text-xs font-black text-black uppercase tracking-wider mb-2">
              Nivel de Español *
            </label>
            <select
              id="ai-level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value as SpanishLevel)}
              className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white focus:outline-none text-sm font-bold text-black shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <option value="Spanish 1 (Beginner)">Spanish 1 (Beginner)</option>
              <option value="Spanish 2 (Intermediate)">Spanish 2 (Intermediate)</option>
              <option value="Spanish 3 / AP (Advanced)">Spanish 3 / AP (Advanced)</option>
            </select>
          </div>

          <div>
            <label htmlFor="ai-count-select" className="block text-xs font-black text-black uppercase tracking-wider mb-2">
              Cantidad de Preguntas
            </label>
            <select
              id="ai-count-select"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white focus:outline-none text-sm font-bold text-black shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <option value={3}>3 Preguntas (Mini-Quiz Rápido)</option>
              <option value={5}>5 Preguntas (Estándar)</option>
              <option value={7}>7 Preguntas (Examen Completo)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ai-notes-textarea" className="block text-xs font-black text-black uppercase tracking-wider mb-2">
            Instrucciones para Gemini AI (Opcional)
          </label>
          <textarea
            id="ai-notes-textarea"
            rows={2}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Especifica reglas a reforzar o vocabulario clave..."
            className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white focus:outline-none text-xs font-semibold text-black shadow-[2px_2px_0px_#000]"
          />
        </div>

        <button
          id="generate-quiz-btn"
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 px-4 rounded-2xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generando con Gemini AI... (creando preguntas y explicaciones)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#FFCC00]" />
              <span>Generar y Publicar Ejercicio para Alumnos</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
