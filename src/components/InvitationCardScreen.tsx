import React from 'react';

const WEDDING_ILLUSTRATION_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1Ugz8LoLhjyrGF7vkbFV-nvdMkRjvDCJSL5EJzbtBaQNiilchBIiXZhHj3qcEwA0dtMqeyLxB-DdglQi_RA_RxrHZiTq41E_VuRNMG0qocG4QHkJAfYC_7lnKS1sfGE7uQVppNqy2-SdivOFB6a2qjKlLqxFXQB6e98iNAOcOMBf42GIkFWLuJX2PRY1KdGqrnqZK_pbNkp0AEMuHfYWpmWQhksfuw0l3Lm9u2iBI85s7i6Rvj3CvEksA';

export const InvitationCardScreen: React.FC = () => {
  return (
    <section
      id="screenInvitation"
      className="relative min-h-[844px] w-full bg-[#FDFBF7] py-14 px-5 flex flex-col items-center justify-between border-t border-[#D4AF37]/40"
    >
      {/* Subtle Textured Background Pattern */}
      <div className="absolute inset-0 oyuu-pattern opacity-12 pointer-events-none"></div>

      {/* Ornate Outer Frame with Golden Filigree Corners & Champagne Silk */}
      <div className="relative w-full bg-[#FAF6EE] rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37]/60 emerald-card-glow flex flex-col items-center text-center">
        {/* Double Border Inset */}
        <div className="absolute inset-2 border border-[#D4AF37]/35 rounded-[20px] pointer-events-none"></div>

        {/* Traditional Kyrgyz Oyuu Header Ornament */}
        <div className="relative w-full flex items-center justify-center my-1 overflow-hidden">
          <svg
            className="w-48 h-8 text-[#D4AF37] drop-shadow-sm transition-transform duration-700 hover:scale-105"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 160 28"
          >
            <path
              d="M10,14 C30,4 40,24 60,14 C70,9 75,19 80,14 C85,19 90,9 100,14 C120,24 130,4 150,14"
              strokeLinecap="round"
            ></path>
            <circle cx="80" cy="14" fill="#D4AF37" r="3.5"></circle>
            <circle cx="50" cy="14" fill="#185B48" r="2"></circle>
            <circle cx="110" cy="14" fill="#185B48" r="2"></circle>
          </svg>
        </div>

        {/* Upper Salutation */}
        <p className="font-serif text-sm uppercase tracking-[0.25em] text-[#0D3B2E] font-bold mt-2">
          УРМАТТУУ КАДЫРЛУУ КОНОКТОР!
        </p>
        <p className="font-cormorant italic text-stone-500 text-lg mt-1">Сиздерди</p>

        {/* Honorees Announcement 1: Wedding */}
        <div className="mt-4 mb-2">
          <h2 className="font-script text-4xl sm:text-5xl text-[#0D3B2E] drop-shadow-[0_1px_2px_rgba(13,59,46,0.15)] leading-tight transition-transform hover:scale-[1.02] duration-300">
            Болот &amp; Айперинин
          </h2>
          <p className="font-serif text-xs uppercase tracking-widest text-[#997D3D] font-semibold mt-1">
            үйлөнүү үлпөт тоюна
          </p>
        </div>

        {/* Cultural Divider with Ornamental Curls */}
        <div className="w-full flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <span className="font-cormorant italic text-lg font-bold text-[#185B48] px-2.5 py-0.5 bg-[#FDFBF7] rounded-full border border-[#D4AF37]/40 shadow-sm">
            жана
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>

        {/* Honorees Announcement 2: Sunnot Toi */}
        <div className="mb-4">
          <h3 className="font-script text-3xl sm:text-4xl text-[#0D3B2E] leading-tight transition-transform hover:scale-[1.02] duration-300">
            Алинин
          </h3>
          <p className="font-serif text-xs uppercase tracking-widest text-[#997D3D] font-semibold mt-1">
            сүннөт тоюна
          </p>
        </div>

        <p className="font-serif italic text-[#2C241E] text-sm max-w-[280px] leading-relaxed mb-4">
          арналган кубанычтуу күнүбүзгө чакырабыз.
        </p>

        {/* Artistic Ethnic Illustration Card (Ala-Too mountains, yurt, bride, groom & boy) */}
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-lg group">
          <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
            <img
              src={WEDDING_ILLUSTRATION_URL}
              alt="Кыргыз үйлөнүү тою жана сүннөт той — Болот, Айпери, Али"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover ken-burns-img transition-transform duration-700"
              onError={(e) => {
                // If remote image fails, show stylish ethnic gradient backup with yurt silhouette
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.classList.add(
                    'bg-gradient-to-br',
                    'from-[#0A3025]',
                    'via-[#124B3C]',
                    'to-[#041611]',
                    'flex',
                    'items-center',
                    'justify-center'
                  );
                }
              }}
            />
            {/* Subtle Golden Vignette Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom Ornament */}
        <div className="w-full flex items-center justify-center mt-4">
          <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] border border-[#07241C] animate-pulse"></div>
        </div>
      </div>

      {/* Scroll to next indicator */}
      <a
        href="#screenBlessing"
        className="mt-4 flex flex-col items-center text-stone-500 hover:text-[#0D3B2E] transition-colors group cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-serif font-medium group-hover:text-[#0D3B2E]">
          Ак тилек &amp; Бата
        </span>
        <svg
          className="w-4 h-4 animate-bounce mt-1 text-[#0D3B2E]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
};
