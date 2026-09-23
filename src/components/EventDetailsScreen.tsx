import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Copy, Check, ExternalLink } from 'lucide-react';

export const EventDetailsScreen: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  // Target Date: 21 October 2026, 16:00:00 (UTC+6 Bishkek)
  // 2026-10-21T16:00:00+06:00
  const targetDate = new Date('2026-10-21T16:00:00+06:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [secPulse, setSecPulse] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft((prev) => {
        if (prev.seconds !== seconds) {
          setSecPulse(true);
          setTimeout(() => setSecPulse(false), 300);
        }
        return { days, hours, minutes, seconds };
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleCopyAddress = () => {
    const address = 'Бишкек ш., Ресторан «Ырыскы», Фрунзе көчөсү 160 (Орозбеков кесилиши)';
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Үйлөнүү үлпөт & Сүннөт той — Болот, Айпери, Али');
    const details = encodeURIComponent(
      'Болот & Айперинин үйлөнүү тою жана Алинин сүннөт тою салтанаты. Той ээлери: Узак & Кымбат'
    );
    const location = encodeURIComponent('Ресторан Ырыскы, Фрунзе көчөсү 160, Бишкек');
    // 2026-10-21 16:00 to 23:00 UTC+6 is 10:00 to 17:00 UTC
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261021T100000Z/20261021T170000Z&details=${details}&location=${location}`;
  };

  return (
    <section
      id="screenDetails"
      className="relative min-h-[844px] w-full bg-[#FDFBF7] py-14 px-5 flex flex-col items-center justify-between border-t border-[#D4AF37]/40"
    >
      <div className="w-full space-y-6">
        {/* Section Title */}
        <div className="text-center">
          <p className="text-xs font-serif tracking-[0.25em] uppercase text-[#997D3D] font-semibold">
            Салтанаттын маалыматы
          </p>
          <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mt-1">ТОЙ ДЕТАЛДАРЫ</h3>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>

        {/* Highlight Date Banner */}
        <div className="w-full bg-gradient-to-r from-[#0A3025] via-[#124B3C] to-[#0A3025] rounded-2xl p-4 text-center text-[#FDFBF7] border-2 border-[#D4AF37] shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
          <span className="text-[11px] font-cormorant italic tracking-widest text-[#F5E6B3] uppercase">
            Салтанат күнү
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white mt-1">
            21-ОКТЯБРЬ | 16:00
          </h4>
          <p className="text-xs text-[#F1D779] font-serif mt-0.5">Шаршемби, 2026-жыл</p>
        </div>

        {/* Interactive Calendar Widget (October 2026 with Oct 21 highlighted) */}
        <div className="w-full bg-[#FAF6EE] rounded-2xl p-4 border border-[#D4AF37]/50 shadow-sm">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-serif font-bold text-[#0D3B2E] text-sm uppercase tracking-wider">
              Октябрь 2026
            </span>
            <span className="text-[11px] text-stone-500 font-medium">Күз мезгили</span>
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Day labels */}
            <span className="text-stone-400 font-semibold py-1">Дш</span>
            <span className="text-stone-400 font-semibold py-1">Шш</span>
            <span className="text-stone-400 font-semibold py-1">Шр</span>
            <span className="text-stone-400 font-semibold py-1">Бш</span>
            <span className="text-stone-400 font-semibold py-1">Жм</span>
            <span className="text-[#997D3D] font-semibold py-1">Иш</span>
            <span className="text-[#0D3B2E] font-semibold py-1">Жш</span>

            {/* Days with previous month tail */}
            <span className="text-stone-300 py-1.5 rounded">28</span>
            <span className="text-stone-300 py-1.5 rounded">29</span>
            <span className="text-stone-300 py-1.5 rounded">30</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">1</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">2</span>
            <span className="py-1.5 text-stone-600 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">3</span>
            <span className="py-1.5 text-[#0D3B2E] font-medium rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">4</span>

            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">5</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">6</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">7</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">8</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">9</span>
            <span className="py-1.5 text-stone-600 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">10</span>
            <span className="py-1.5 text-[#0D3B2E] font-medium rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">11</span>

            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">12</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">13</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">14</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">15</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">16</span>
            <span className="py-1.5 text-stone-600 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">17</span>
            <span className="py-1.5 text-[#0D3B2E] font-medium rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">18</span>

            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">19</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">20</span>

            {/* 21-OCTOBER CIRCLED IN ROYAL EMERALD & GOLD WITH PULSING RING */}
            <div className="relative py-1 flex items-center justify-center cursor-pointer group">
              <span className="absolute inset-0 bg-[#0E3E31] rounded-full text-[#F1D779] font-bold flex items-center justify-center shadow-lg border-2 border-[#D4AF37] pulse-ring-gold group-hover:scale-110 transition-transform">
                21
              </span>
              <span className="absolute -top-2 -right-1 text-[11px] animate-bounce">✨</span>
            </div>

            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">22</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">23</span>
            <span className="py-1.5 text-stone-600 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">24</span>
            <span className="py-1.5 text-[#0D3B2E] font-medium rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">25</span>

            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">26</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">27</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">28</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">29</span>
            <span className="py-1.5 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">30</span>
            <span className="py-1.5 text-stone-600 rounded hover:bg-[#D4AF37]/20 transition-all cursor-pointer">31</span>
            <span className="text-stone-300 py-1.5 rounded">1</span>
          </div>

          {/* Quick Calendar Sync Button */}
          <div className="mt-3 pt-3 border-t border-[#D4AF37]/30 flex justify-center">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#0D3B2E] hover:text-[#185B48] font-medium flex items-center gap-1.5 hover:underline"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Google Календарга сактоо</span>
            </a>
          </div>
        </div>

        {/* Live Countdown Widget with Soft Pulse on Digits */}
        <div className="w-full bg-[#F3EDE1] rounded-2xl p-4 border border-[#D4AF37]/50 text-center shadow-sm">
          <p className="text-[10px] font-serif uppercase tracking-widest text-[#0D3B2E] font-bold mb-2">
            Салтанатка чейин калды:
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#FDFBF7] rounded-xl p-2 border border-[#D4AF37]/40 shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="block font-serif text-xl font-bold text-[#0D3B2E]">
                {timeLeft.days}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500">Күн</span>
            </div>
            <div className="bg-[#FDFBF7] rounded-xl p-2 border border-[#D4AF37]/40 shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="block font-serif text-xl font-bold text-[#0D3B2E]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500">Саат</span>
            </div>
            <div className="bg-[#FDFBF7] rounded-xl p-2 border border-[#D4AF37]/40 shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="block font-serif text-xl font-bold text-[#0D3B2E]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500">Мүнөт</span>
            </div>
            <div className="bg-[#FDFBF7] rounded-xl p-2 border border-[#D4AF37]/40 shadow-sm transition-transform hover:-translate-y-0.5">
              <span
                className={`block font-serif text-xl font-bold text-[#997D3D] ${
                  secPulse ? 'digit-pulse' : ''
                }`}
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500">Секунд</span>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="w-full bg-[#FAF6EE] rounded-2xl p-5 border-2 border-[#D4AF37]/60 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D3B2E]/10 border border-[#D4AF37]/60 flex items-center justify-center text-[#0D3B2E] text-lg shrink-0 mt-0.5 shadow-sm">
              📍
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Бишкек шаары
              </p>
              <h5 className="font-serif text-xl font-bold text-[#0D3B2E] mt-0.5">
                Ресторан «Ырыскы»
              </h5>
              <p className="text-xs text-[#2C241E] mt-1 leading-relaxed">
                Фрунзе көчөсү 160 (Орозбеков кесилиши)
              </p>
            </div>
          </div>

          {/* Action Buttons: 2GIS & Copy Address */}
          <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex flex-col gap-2">
            <a
              href="https://2gis.kg/bishkek"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine w-full py-3 px-4 rounded-full bg-[#0D3B2E] hover:bg-[#124B3C] text-[#F5E6B3] hover:text-white text-xs font-serif font-bold tracking-widest uppercase flex items-center justify-center gap-2 border border-[#D4AF37] shadow-md hover:shadow-[0_0_18px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 group"
            >
              <span>2GIS'тен ачуу</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#D4AF37]/50 text-stone-700 hover:text-[#0D3B2E] text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm hover:border-[#D4AF37] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Дарек көчүрүлдү!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#997D3D]" />
                    <span>Даректи көчүрүү</span>
                  </>
                )}
              </button>

              <a
                href="https://maps.google.com/?q=Bishkek+Frunze+160"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-white border border-[#D4AF37]/50 text-stone-700 hover:text-[#0D3B2E] text-xs font-medium flex items-center justify-center gap-1 shadow-sm hover:border-[#D4AF37] transition-all"
                title="Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0D3B2E]" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Warm Closing Note & Hosts */}
        <div className="text-center pt-2 px-2">
          <p className="font-cormorant italic text-stone-600 text-sm leading-relaxed">
            «Үй-бүлөбүздүн эң кымбат күндөрүнүн биринде сиздер менен бир дасторкондо жолугушууну күтөбүз.»
          </p>
          <div className="mt-3">
            <p className="text-[11px] font-serif uppercase tracking-widest text-[#997D3D]">
              Той ээлери:
            </p>
            <p className="font-script text-3xl text-[#0D3B2E] mt-0.5">Узак &amp; Кымбат</p>
          </div>
        </div>
      </div>

      {/* Banner Footer Link to RSVP */}
      <div className="w-full text-center mt-6 py-3 border-t border-[#D4AF37]/40">
        <a
          href="#screenRSVP"
          className="inline-block py-2.5 px-6 rounded-full bg-[#0D3B2E]/10 border border-[#D4AF37] text-[#0D3B2E] font-serif font-bold text-xs uppercase tracking-widest hover:bg-[#0D3B2E]/20 transition-all duration-300 shadow-sm active:scale-95"
        >
          Катышууңузду билдириңиз ↓
        </a>
      </div>
    </section>
  );
};
