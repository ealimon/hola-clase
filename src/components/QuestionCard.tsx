import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { SpanishAccentsBar } from './SpanishAccentsBar';
import { Volume2, Sparkles, RefreshCw, HelpCircle, Check, Play, Lightbulb } from 'lucide-react';
import { speakSpanish, playSoundEffect } from '../utils/audio';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string;
  onChangeAnswer: (answer: string) => void;
  onPasteDetected: () => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onChangeAnswer,
  onPasteDetected,
  disabled = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.9);
  const [showHint, setShowHint] = useState(false);
  const [scrambleSelected, setScrambleSelected] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Initialize scramble state if question type is sentence_scramble
  useEffect(() => {
    if (question.type === 'sentence_scramble') {
      if (userAnswer) {
        setScrambleSelected(userAnswer.split(' ').filter(Boolean));
      } else {
        setScrambleSelected([]);
      }
    }
    setShowHint(false);
  }, [question.id, question.type]);

  const handlePlayAudio = async (text?: string) => {
    const speechText = text || question.audioText || question.contextSentence || question.spanishSentence || question.prompt;
    if (!speechText) return;
    setIsPlayingAudio(true);
    await speakSpanish(speechText, audioSpeed);
    setIsPlayingAudio(false);
  };

  const handleInsertChar = (char: string) => {
    if (disabled) return;
    if (question.type === 'sentence_scramble') return;

    if (inputRef.current) {
      const input = inputRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const current = userAnswer || '';
      const updated = current.substring(0, start) + char + current.substring(end);
      onChangeAnswer(updated);

      // Restore cursor position
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + char.length, start + char.length);
      }, 10);
    } else {
      onChangeAnswer((userAnswer || '') + char);
    }
  };

  const handleScrambleWordClick = (word: string, index: number, isSelected: boolean) => {
    if (disabled) return;
    playSoundEffect('click');
    let updated: string[];
    if (isSelected) {
      // Remove from selected
      updated = scrambleSelected.filter((_, i) => i !== index);
    } else {
      // Add to selected
      updated = [...scrambleSelected, word];
    }
    setScrambleSelected(updated);
    onChangeAnswer(updated.join(' '));
  };

  const handleResetScramble = () => {
    if (disabled) return;
    setScrambleSelected([]);
    onChangeAnswer('');
  };

  const handlePaste = () => {
    onPasteDetected();
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#FF3B30] text-white font-black text-xs flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000]">
            {questionNumber}
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-black">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-black uppercase tracking-tight px-3 py-1 rounded-xl text-black bg-[#FFCC00] border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-1 cursor-pointer transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5 text-black" />
              <span>{showHint ? 'Ocultar Pista' : 'Pista / Hint'}</span>
            </button>
          )}

          {(question.audioText || question.contextSentence || question.spanishSentence) && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handlePlayAudio()}
                disabled={isPlayingAudio}
                className="text-xs font-black uppercase tracking-tight px-3 py-1 rounded-xl bg-[#FAF9F6] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFCC00] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 transition-all"
                title="Escuchar pronunciación en español"
              >
                <Volume2 className={`w-4 h-4 text-black ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Reproduciendo...' : 'Audio'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAudioSpeed(audioSpeed === 0.9 ? 0.75 : 0.9)}
                className="text-[10px] font-mono font-black px-2 py-1 rounded-lg bg-white text-black border-2 border-black shadow-[1px_1px_0px_#000]"
                title="Cambiar velocidad de audio"
              >
                {audioSpeed}x
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hint Banner if toggled */}
      {showHint && question.hint && (
        <div className="p-4 rounded-2xl bg-[#FFCC00]/25 border-2 border-black text-xs text-black flex items-start gap-2.5 shadow-[3px_3px_0px_#000] animate-fadeIn">
          <Lightbulb className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div>
            <strong className="font-black uppercase tracking-tight">Pista pedagógica: </strong>
            <span className="font-semibold text-slate-900">{question.hint}</span>
          </div>
        </div>
      )}

      {/* Question Prompt */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight leading-snug">
          {question.prompt}
        </h2>

        {/* English Translation sub-note if present */}
        {question.englishTranslation && (
          <p className="text-xs sm:text-sm text-slate-600 font-semibold italic mt-1">
            "{question.englishTranslation}"
          </p>
        )}

        {/* Context Sentence with blank */}
        {question.contextSentence && (
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF9F6] border-3 border-black text-lg sm:text-xl font-black text-black text-center tracking-wide shadow-[4px_4px_0px_#000]">
            {question.contextSentence}
          </div>
        )}

        {question.spanishSentence && !question.contextSentence && (
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF9F6] border-3 border-black text-lg sm:text-xl font-black text-black text-center shadow-[4px_4px_0px_#000]">
            {question.spanishSentence}
          </div>
        )}
      </div>

      {/* Question Types Interaction Area */}

      {/* 1. Multiple Choice & Conjugation */}
      {(question.type === 'multiple_choice' || question.type === 'conjugation' || question.type === 'listening') && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {question.options.map((option, idx) => {
            const isSelected = userAnswer === option;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={option}
                type="button"
                disabled={disabled}
                onClick={() => {
                  playSoundEffect('click');
                  onChangeAnswer(option);
                }}
                className={`p-4 rounded-2xl border-3 text-left font-black transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-black bg-[#FFCC00] text-black shadow-[4px_4px_0px_#000] translate-x-0.5 translate-y-0.5'
                    : 'border-black bg-white hover:bg-[#FAF9F6] text-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5'
                } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs border-2 border-black shadow-[1px_1px_0px_#000] ${
                      isSelected
                        ? 'bg-black text-[#FFCC00]'
                        : 'bg-[#FAF9F6] text-black'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#1A1A1A]">{option}</span>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center border border-black shadow-[1px_1px_0px_#000]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 2. Fill in the Blank */}
      {question.type === 'fill_in_blank' && (
        <div className="space-y-4 pt-2">
          <div>
            <label htmlFor={`fill-input-${question.id}`} className="block text-xs font-black text-black uppercase tracking-wider mb-2">
              Escribe la palabra correcta en español:
            </label>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              id={`fill-input-${question.id}`}
              type="text"
              value={userAnswer}
              disabled={disabled}
              onChange={(e) => onChangeAnswer(e.target.value)}
              onPaste={handlePaste}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full px-4 py-3 rounded-2xl border-3 border-black focus:outline-none focus:bg-white text-base font-black text-black bg-[#FAF9F6] shadow-[4px_4px_0px_#000]"
              autoComplete="off"
            />
          </div>

          <SpanishAccentsBar onInsertChar={handleInsertChar} />
        </div>
      )}

      {/* 3. Sentence Scramble */}
      {question.type === 'sentence_scramble' && question.scrambledWords && (
        <div className="space-y-4 pt-2">
          {/* Constructed Sentence Display Area */}
          <div className="min-h-[76px] p-4 rounded-2xl border-3 border-dashed border-black bg-[#FAF9F6] shadow-[4px_4px_0px_#000] flex flex-wrap items-center gap-2">
            {scrambleSelected.length === 0 ? (
              <span className="text-xs sm:text-sm text-slate-500 font-bold italic">
                Haz clic en las palabras abajo para ordenar la oración en español...
              </span>
            ) : (
              scrambleSelected.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleScrambleWordClick(word, index, true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#007AFF] text-white font-black text-sm border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#0062CC] transition-all cursor-pointer animate-scaleIn hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  {word}
                </button>
              ))
            )}
          </div>

          {/* Scramble Word Bank */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                Banco de Palabras (Haz clic para seleccionar):
              </span>
              {scrambleSelected.length > 0 && !disabled && (
                <button
                  type="button"
                  onClick={handleResetScramble}
                  className="text-xs font-black uppercase text-[#FF3B30] hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reiniciar
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              {question.scrambledWords.map((word, idx) => {
                // Check if word is already selected (by count)
                const countInSelected = scrambleSelected.filter((w) => w === word).length;
                const countInTotal = question.scrambledWords!.filter((w) => w === word).length;
                const isAllSelected = countInSelected >= countInTotal;

                return (
                  <button
                    key={`${word}-${idx}`}
                    type="button"
                    disabled={disabled || isAllSelected}
                    onClick={() => handleScrambleWordClick(word, idx, false)}
                    className={`px-4 py-2 rounded-xl font-black text-sm border-2 border-black transition-all cursor-pointer ${
                      isAllSelected
                        ? 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed shadow-none'
                        : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFCC00] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. Open Translation / Sentence Writing */}
      {question.type === 'translation_open' && (
        <div className="space-y-4 pt-2">
          <div>
            <label htmlFor={`trans-input-${question.id}`} className="block text-xs font-black text-black uppercase tracking-wider mb-2">
              Escribe la traducción completa en español:
            </label>
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              id={`trans-input-${question.id}`}
              rows={3}
              value={userAnswer}
              disabled={disabled}
              onChange={(e) => onChangeAnswer(e.target.value)}
              onPaste={handlePaste}
              placeholder="Escribe la oración completa con mayúsculas y acentos..."
              className="w-full px-4 py-3 rounded-2xl border-3 border-black focus:outline-none focus:bg-white text-base font-bold text-black bg-[#FAF9F6] shadow-[4px_4px_0px_#000] resize-none"
            />
          </div>

          <SpanishAccentsBar onInsertChar={handleInsertChar} />
        </div>
      )}
    </div>
  );
};
