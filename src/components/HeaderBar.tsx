import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Share2 } from 'lucide-react';
import { komuzAudio } from '../utils/audio';

interface HeaderBarProps {
  onOpenShare: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onOpenShare }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsub = komuzAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    komuzAudio.toggle();
  };

  return (
    <header className="fixed top-0 left-0 right-0 max-w-[414px] mx-auto z-50 flex items-center justify-between px-5 py-3 pointer-events-none transition-all duration-300">
      {/* Status indicator in Emerald & Champagne Gold */}
      <div className="pointer-events-auto bg-[#07241C]/90 backdrop-blur-md border border-[#D4AF37]/70 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-lg hover:border-[#D4AF37] transition-colors">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F5E6B3]">
          Той Чакыруу
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="relative w-10 h-10 rounded-full bg-[#07241C]/95 backdrop-blur-md border border-[#D4AF37]/70 text-[#F1D779] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 hover:border-[#D4AF37] hover:text-white"
          title="Чакырууну бөлүшүү"
          aria-label="Чакырууну бөлүшүү"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Floating Komuz Sound Toggle Button */}
        <button
          onClick={handleToggleSound}
          className={`relative w-11 h-11 rounded-full bg-[#07241C]/95 backdrop-blur-md border-2 border-[#D4AF37] text-[#D4AF37] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group hover:border-[#F1D779] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] ${
            isPlaying ? 'pulse-ring-gold border-[#F1D779]' : ''
          }`}
          title={isPlaying ? 'Музыканы токтотуу' : 'Султан Садыралиев - Эки жаш'}
          aria-label={isPlaying ? 'Музыканы токтотуу' : 'Султан Садыралиев - Эки жаш'}
        >
          {!isPlaying ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5E6B3] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-2v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2"
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-end justify-center gap-[3px] h-5 w-5">
              <span className="w-1 bg-[#D4AF37] rounded-full eq-bar-1"></span>
              <span className="w-1 bg-[#F1D779] rounded-full eq-bar-2"></span>
              <span className="w-1 bg-[#F5E6B3] rounded-full eq-bar-3"></span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
