import React from 'react';

export const BlessingScreen: React.FC = () => {
  return (
    <section
      id="screenBlessing"
      className="relative min-h-[844px] w-full bg-[#FAF6EE] py-14 px-5 flex flex-col items-center justify-between border-t border-[#D4AF37]/40 overflow-hidden"
    >
      {/* Traditional Oyuu corner watermark background */}
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full border-[18px] border-[#D4AF37]/15 pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full border-[18px] border-[#0D3B2E]/10 pointer-events-none"></div>

      {/* Ornate Gold Border Card */}
      <div className="relative w-full my-auto bg-[#FDFBF7] rounded-3xl p-7 border-2 border-[#D4AF37]/70 shadow-xl flex flex-col items-center text-center gold-border-glow">
        {/* Ornate Corner Accents */}
        <div className="absolute top-2.5 left-2.5 text-[#D4AF37] text-sm opacity-70">❖</div>
        <div className="absolute top-2.5 right-2.5 text-[#D4AF37] text-sm opacity-70">❖</div>
        <div className="absolute bottom-2.5 left-2.5 text-[#D4AF37] text-sm opacity-70">❖</div>
        <div className="absolute bottom-2.5 right-2.5 text-[#D4AF37] text-sm opacity-70">❖</div>

        {/* Header emblem with soft breathing glow */}
        <div className="w-14 h-14 rounded-full bg-[#0D3B2E]/10 border-2 border-[#D4AF37]/60 flex items-center justify-center p-2 mb-3 shadow-inner hover:scale-110 transition-transform">
          <svg className="w-8 h-8 text-[#0D3B2E]" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
            <path
              d="M4 10 Q12 7 20 10 M4 14 Q12 11 20 14 M10 4 Q7 12 10 20 M14 4 Q11 12 14 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            ></path>
          </svg>
        </div>

        <h3 className="font-serif text-sm sm:text-base font-bold tracking-[0.18em] text-[#0D3B2E] uppercase mb-1">
          БУЛ КҮН ҮЙ БҮЛӨБҮЗ ҮЧҮН ӨЗГӨЧӨ КҮН
        </h3>

        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4"></div>

        {/* Poetic Kyrgyz Blessing Text */}
        <div className="space-y-3 font-cormorant text-xl sm:text-2xl text-[#2C241E] italic leading-relaxed">
          <p>«Ак дасторкондон даам сызып,</p>
          <p>ак баталарыңызды арнап,</p>
          <p>кубанычыбызды тең бөлүшүп,</p>
          <p>бул өзгөчө күндүн</p>
          <p className="font-bold text-[#0D3B2E] text-2xl sm:text-3xl not-italic mt-1">кадырлуу коногу болуңуздар.»</p>
        </div>

        {/* Highlight Accent Box in Champagne Silk with Shimmer */}
        <div className="relative w-full mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#F7F1DF] via-[#FDFBF7] to-[#F7F1DF] border border-[#D4AF37]/70 shadow-sm overflow-hidden group">
          <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-40"></div>
          <p className="font-serif text-xs sm:text-sm text-[#0D3B2E] font-bold tracking-wide uppercase leading-normal">
            «СИЗДЕРДИН АК БАТАҢЫЗДАР БИЗ ҮЧҮН ЭҢ ЧОҢ БЕЛЕК.»
          </p>
        </div>

        {/* Cultural Dastorkhon vignette */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[#997D3D] opacity-90">
          <span className="h-[1px] w-10 bg-[#D4AF37]/50"></span>
          <span className="text-xs font-serif tracking-widest uppercase font-medium">
            Ак Бата • Ырыс • Ынтымак
          </span>
          <span className="h-[1px] w-10 bg-[#D4AF37]/50"></span>
        </div>
      </div>

      {/* Navigation to Event Date/Location */}
      <a
        href="#screenDetails"
        className="flex flex-col items-center text-stone-500 hover:text-[#0D3B2E] transition-colors group cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-serif font-medium group-hover:text-[#0D3B2E]">
          Той убактысы &amp; Дареги
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
