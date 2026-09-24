import React, { useRef } from 'react';
import { GoldenDustCanvas } from './GoldenDustCanvas';
import { komuzAudio } from '../utils/audio';
import { confettiEngine } from '../utils/confetti';

interface EnvelopeScreenProps {
  isOpened: boolean;
  onOpen: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ isOpened, onOpen }) => {
  const sealBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenEnvelope = (e?: React.MouseEvent) => {
    if (isOpened) {
      // If already opened, just scroll down smoothly
      document.getElementById('screenInvitation')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Play tactile sound effect
    komuzAudio.playWaxSealPop();

    // Trigger confetti from seal position
    if (sealBtnRef.current) {
      const rect = sealBtnRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      confettiEngine.burst(originX, originY, 45);
    } else {
      confettiEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 45);
    }

    onOpen();

    // Start background music automatically if not yet playing
    komuzAudio.start();

    // Parallax scroll down to the main invitation letter after flap opens
    setTimeout(() => {
      document.getElementById('screenInvitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 1250);
  };

  return (
    <section
      id="screenEnvelope"
      className={`relative min-h-[844px] w-full bg-gradient-to-b from-[#0D3B2E] via-[#082820] to-[#041611] flex flex-col items-center justify-between py-12 px-5 overflow-hidden transition-all duration-700 ${isOpened ? 'envelope-opened' : ''
        }`}
    >
      {/* Golden Dust Particles Canvas */}
      <GoldenDustCanvas />

      {/* Background Subtle Motif */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Ornate Gold Header Arch */}
      <div className="relative z-10 w-full text-center mt-6 transition-all duration-500 transform">
        {/* Traditional Kyrgyz Oyuu Wing SVG */}
        <div className="flex items-center justify-center gap-2 mb-2 opacity-90">
          <svg className="w-12 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 50 16">
            <path d="M0,8 Q12,1 25,8 Q38,15 50,8 Q38,2 25,8 Q12,14 0,8 Z" />
          </svg>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
          <svg
            className="w-12 h-4 text-[#D4AF37] transform rotate-180"
            fill="currentColor"
            viewBox="0 0 50 16"
          >
            <path d="M0,8 Q12,1 25,8 Q38,15 50,8 Q38,2 25,8 Q12,14 0,8 Z" />
          </svg>
        </div>
        <p className="font-cormorant italic text-[#F5E6B3] text-base tracking-widest">
          Кубанычтуу кабар
        </p>
        <h1 className="font-serif text-2xl font-bold tracking-wider text-[#FDFBF7] mt-1">
          ЧАКЫРУУ КАТЫ
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2"></div>
      </div>

      {/* 3D INTERACTIVE ENVELOPE COMPONENT */}
      <div className="relative w-full max-w-[340px] my-auto envelope-perspective select-none">
        {/* Enclosed Inner Letter Card (slides up smoothly upon seal tap) */}
        <div
          id="enclosedLetter"
          className="card-letter absolute inset-x-2 top-4 h-[300px] bg-[#FAF6EE] rounded-t-xl shadow-2xl p-5 border-2 border-[#D4AF37]/50 flex flex-col items-center justify-start text-center opacity-90 pointer-events-none z-10"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 mb-2 p-0.5 bg-[#092C23] shadow-md">
            {/* Golden Tunduk Medallion Icon */}
            <svg
              className="w-full h-full text-[#D4AF37] p-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9.5"></circle>
              <line x1="2.5" x2="21.5" y1="12" y2="12"></line>
              <line x1="12" x2="12" y1="2.5" y2="21.5"></line>
              <path d="M5.5 7 Q12 10 18.5 7"></path>
              <path d="M5.5 17 Q12 14 18.5 17"></path>
              <path d="M7 5.5 Q10 12 7 18.5"></path>
              <path d="M17 5.5 Q14 12 17 18.5"></path>
            </svg>
          </div>
          <p className="font-serif font-bold text-[#0D3B2E] text-sm tracking-widest uppercase">
            Урматтуу конокторубуз
          </p>
          <p className="font-script text-2xl text-[#997D3D] my-1">Болот &amp; Айпери</p>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 my-1"></div>
          <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed">
            Үйлөнүү үлпөт жана сүннөт той салтанатына кош келиңиздер!
          </p>
          <span className="mt-auto text-[10px] tracking-wider text-[#0D3B2E] font-semibold uppercase flex items-center gap-1">
            Төмөн сыдырыңыз
            <svg
              className="w-3 h-3 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </span>
        </div>

        {/* Envelope Body Container (Royal Emerald Velvet / Silk) */}
        <div
          id="envelopeWrapper"
          className="relative z-20 w-full h-[260px] bg-[#0E3C2F] rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.7)] border-2 border-[#D4AF37]/70 overflow-hidden flex flex-col justify-end transition-shadow duration-500"
        >
          {/* Subtle Kyrgyz Oyuu Corner Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 opacity-45 pointer-events-none">
            <svg
              className="w-full h-full text-[#D4AF37] stroke-current"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 30 30"
            >
              <path d="M0,0 Q15,0 15,15 Q15,30 30,30"></path>
              <circle cx="5" cy="5" fill="#D4AF37" r="2"></circle>
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-8 h-8 opacity-45 transform scale-x-[-1] pointer-events-none">
            <svg
              className="w-full h-full text-[#D4AF37] stroke-current"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 30 30"
            >
              <path d="M0,0 Q15,0 15,15 Q15,30 30,30"></path>
              <circle cx="5" cy="5" fill="#D4AF37" r="2"></circle>
            </svg>
          </div>

          {/* Triangular Bottom Fold Lines for realism */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute bottom-0 left-0 w-1/2 h-full border-r border-[#155442]/70"
              style={{
                clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                background: 'rgba(3, 18, 14, 0.35)',
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full border-l border-[#155442]/70"
              style={{
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                background: 'rgba(2, 14, 11, 0.45)',
              }}
            ></div>
            <div
              className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#041913] to-transparent opacity-90"
              style={{ clipPath: 'polygon(0 100%, 50% 20%, 100% 100%)' }}
            ></div>
          </div>

          {/* Top Foldable Flap with Wax Seal (Deep Royal Emerald) */}
          <div
            id="envelopeFlap"
            className="envelope-flap absolute top-0 inset-x-0 h-[155px] bg-[#124738] border-b-2 border-[#D4AF37]/70 shadow-lg flex items-start justify-center pt-2"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          >
            <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#F5E6B3] uppercase drop-shadow mt-2">
              СИЗ ЧАКЫРЫЛДЫҢЫЗ
            </span>
          </div>

          {/* Centered Kyrgyz Traditional Wax Seal Button (Interactive Trigger) */}
          <div className="absolute top-[86px] inset-x-0 flex flex-col items-center justify-center z-30">
            <button
              ref={sealBtnRef}
              onClick={handleOpenEnvelope}
              className="group relative outline-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-full transition-all duration-300"
              title="Конвертти ачуу үчүн басыңыз"
              aria-label="Конвертти ачуу үчүн басыңыз"
            >
              {/* Animated Pulse ring */}
              <span className="absolute -inset-2.5 rounded-full bg-[#D4AF37]/30 animate-ping group-hover:bg-[#D4AF37]/50 pointer-events-none"></span>

              {/* Royal Emerald & Gold Wax Seal Crest */}
              <div className="relative w-24 h-24 seal-animated cursor-pointer rounded-full bg-gradient-to-br from-[#104838] via-[#092B21] to-[#041611] p-1 border-2 border-[#D4AF37] shadow-[0_12px_28px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all">
                <div className="w-full h-full rounded-full border border-[#D4AF37]/70 flex flex-col items-center justify-center p-2 bg-[#0C382C]/70 group-hover:bg-[#124b3b] transition-colors">
                  <svg
                    className="w-10 h-10 text-[#F1D779] drop-shadow transition-transform group-hover:scale-110 duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9"></circle>
                    <line x1="3" x2="21" y1="12" y2="12"></line>
                    <line x1="12" x2="12" y1="3" y2="21"></line>
                    <path d="M6 7 Q12 10 18 7"></path>
                    <path d="M6 17 Q12 14 18 17"></path>
                    <path d="M7 6 Q10 12 7 18"></path>
                    <path d="M17 6 Q14 12 17 18"></path>
                  </svg>
                  <span className="text-[7.5px] font-serif font-bold uppercase tracking-widest text-[#F5E6B3] mt-0.5">
                    МӨӨР
                  </span>
                </div>
              </div>
            </button>
            <span className="mt-2 text-[10px] font-sans uppercase tracking-widest text-[#F5E6B3] bg-[#041812]/80 backdrop-blur-sm px-3.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-md transition-transform group-hover:scale-105">
              Мөөрдү басыңыз
            </span>
          </div>

          {/* Bottom envelope label */}
          <div className="relative z-10 w-full text-center pb-3 pt-6">
            <span className="text-[10px] tracking-widest text-[#F5E6B3]/90 font-serif">
              ОРДОЛУУ БИШКЕК • 2026
            </span>
          </div>
        </div>
      </div>

      {/* Action Indicator / Guide to Scroll & Alternative Trigger */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-[#D4AF37]/80 transition-opacity duration-500">
        <button
          onClick={handleOpenEnvelope}
          className="flex flex-col items-center text-decoration-none group bg-transparent border-0 cursor-pointer outline-none"
        >
          <span className="text-xs font-serif tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F5E6B3] transition-colors drop-shadow-sm">
            Той баракчасын ачуу
          </span>
          <svg
            className="w-5 h-5 text-[#D4AF37] animate-bounce mt-1 group-hover:text-[#F5E6B3] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};
