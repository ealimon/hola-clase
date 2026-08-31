import React from 'react';

interface SpanishAccentsBarProps {
  onInsertChar: (char: string) => void;
  className?: string;
}

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ'];

export const SpanishAccentsBar: React.FC<SpanishAccentsBarProps> = ({ onInsertChar, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 p-2.5 bg-[#FAF9F6] border-2 border-black rounded-xl text-xs shadow-[3px_3px_0px_#000] ${className}`}>
      <span className="text-black font-black uppercase text-[11px] tracking-wider mr-1 flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF3B30] border border-black"></span>
        Teclado de Acentos:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {ACCENT_CHARS.map((char) => (
          <button
            key={char}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onInsertChar(char);
            }}
            className="w-8 h-8 flex items-center justify-center font-black bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] hover:bg-[#FFCC00] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all text-sm cursor-pointer"
            title={`Insert ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
