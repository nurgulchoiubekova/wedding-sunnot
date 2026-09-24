import React, { useState, useEffect } from 'react';
import { confettiEngine } from '../utils/confetti';
import { komuzAudio } from '../utils/audio';
import { RsvpResponse } from '../types';

export const RsvpScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<string>('2');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedRsvp = localStorage.getItem('kyrgyz_toi_rsvp');
      if (savedRsvp) {
        const parsed = JSON.parse(savedRsvp) as RsvpResponse;
        setName(parsed.name);
        setAttendance(parsed.attending);
        setGuestCount(parsed.guestsCount);
        setSubmitted(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp: RsvpResponse = {
      id: Date.now().toString(),
      name: name.trim(),
      attending: attendance,
      guestsCount: attendance === 'yes' ? guestCount : '0',
      timestamp: Date.now(),
    };

    // Save locally to browser
    try {
      localStorage.setItem('kyrgyz_toi_rsvp', JSON.stringify(newRsvp));
    } catch {
      // Ignore
    }

    // Send to Google Sheets Web App if configured
    const scriptUrl = (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL || window.GOOGLE_SHEETS_URL || '';
    if (scriptUrl) {
      try {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            attending: attendance === 'yes' ? 'Кубаныч менен келем 🎉' : 'Тилекке каршы, келе албайм',
            guestsCount: attendance === 'yes' ? guestCount : '0',
            date: new Date().toLocaleString('ky-KG', { timeZone: 'Asia/Bishkek' }),
          }),
        }).catch((err) => console.warn('Google Sheets sync notice:', err));
      } catch {
        // Ignore network errors
      }
    }

    setSubmitted(true);

    // Audio & Confetti burst
    komuzAudio.playCelebrationChord();
    confettiEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 60);
  };

  return (
    <section
      id="screenRSVP"
      className="relative min-h-[844px] w-full bg-gradient-to-b from-[#0D3B2E] via-[#082920] to-[#041611] py-14 px-5 flex flex-col items-center justify-between text-[#FDFBF7] border-t-2 border-[#D4AF37]/70 overflow-hidden"
    >
      {/* Kyrgyz Geometric Background Glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F1D779_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* RSVP Form Container */}
      <div className="relative z-10 w-full max-w-[340px] my-auto bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-stone-800">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#0D3B2E]/10 border border-[#D4AF37]/70 mx-auto flex items-center justify-center text-[#0D3B2E] mb-2 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0D3B2E] uppercase tracking-wider">
            Катышууңузду ырастаңыз
          </h3>
          <p className="text-xs text-stone-500 font-serif mt-1">Сизди күтөбүз!</p>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              className="block text-xs font-serif font-bold text-stone-700 uppercase tracking-wider mb-1.5"
              htmlFor="guestName"
            >
              Аты-жөнүңүз *
            </label>
            <input
              id="guestName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Аты-жөнүңүздү жазыңыз"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-[#D4AF37]/60 focus:border-[#0D3B2E] focus:ring-2 focus:ring-[#0D3B2E]/30 text-[#2C241E] text-sm outline-none transition-all duration-300 placeholder:text-stone-400 shadow-inner"
            />
          </div>

          {/* Radio Options for Attendance */}
          <div className="pt-2">
            <span className="block text-xs font-serif font-bold text-stone-700 uppercase tracking-wider mb-2">
              Тойго катышууңуз:
            </span>
            <div className="space-y-2.5">
              {/* Option 1: Will attend */}
              <label
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                  attendance === 'yes'
                    ? 'border-[#D4AF37] bg-[#FAF4E5] shadow-sm'
                    : 'border-stone-200 bg-[#FAF6EE] hover:border-[#D4AF37]/50'
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')}
                  className="w-4 h-4 text-[#0D3B2E] accent-[#0D3B2E] focus:ring-[#0D3B2E]"
                />
                <span className="text-xs font-medium text-stone-800">
                  Кубаныч менен келем 🎉
                </span>
              </label>

              {/* Option 2: Decline */}
              <label
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                  attendance === 'no'
                    ? 'border-stone-500 bg-stone-100 shadow-sm'
                    : 'border-stone-200 bg-[#FAF6EE] hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={() => setAttendance('no')}
                  className="w-4 h-4 text-stone-600 accent-stone-700 focus:ring-stone-500"
                />
                <span className="text-xs font-medium text-stone-600">
                  Тилекке каршы, келе албайм
                </span>
              </label>
            </div>
          </div>

          {/* Number of Guests */}
          {attendance === 'yes' && (
            <div>
              <label
                className="block text-xs font-serif font-medium text-stone-700 mb-1"
                htmlFor="guestCount"
              >
                Коноктордун саны:
              </label>
              <select
                id="guestCount"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#D4AF37]/50 text-xs text-stone-800 outline-none focus:border-[#0D3B2E] focus:ring-2 focus:ring-[#0D3B2E]/20 transition-all"
              >
                <option value="1">1 киши (жалгыз)</option>
                <option value="2">2 киши (жубайы менен)</option>
                <option value="3">3 киши</option>
                <option value="4+">Үй-бүлөбүз менен</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="submitRsvpBtn"
              className="btn-shine w-full py-3.5 px-6 rounded-full bg-[#0D3B2E] hover:bg-[#134D3C] text-[#F5E6B3] font-serif font-bold text-xs uppercase tracking-widest border border-[#D4AF37] shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{submitted ? 'Жоопту жаңылоо' : 'Жоопту жөнөтүү'}</span>
              <span className="group-hover:translate-x-1 transition-transform">✓</span>
            </button>
          </div>

          {/* Feedback message */}
          {submitted && (
            <div className="p-4 rounded-2xl bg-[#EDF7F2] border-2 border-emerald-600/50 text-[#0D3B2E] text-center shadow-lg transition-all duration-500 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-[#0D3B2E] text-[#F5E6B3] mx-auto flex items-center justify-center text-lg mb-2 shadow-md">
                ✓
              </div>
              <p className="font-serif font-bold text-sm uppercase tracking-wide text-[#0D3B2E]">
                Ыраазычылык билдиребиз!
              </p>
              <p className="text-xs text-stone-700 mt-1">
                Сиздин жообуңуз кабыл алынды. Сизди той төрүндө күтөбүз!
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Grand Traditional Kyrgyz Closing Footer */}
      <footer className="relative z-10 w-full text-center mt-6 pt-4 border-t border-[#D4AF37]/40">
        <h4 className="font-serif text-sm tracking-[0.25em] text-[#F5E6B3] uppercase font-bold">
          ТОЙ ТӨРҮБҮЗДӨ ЖОЛУГУШКАНЧА!
        </h4>
        <p className="font-cormorant italic text-xs text-white/80 mt-1">
          Болот &amp; Айпери • Али • Узак &amp; Кымбат
        </p>
        <p className="text-[9px] text-white/40 uppercase tracking-widest mt-3">
          Кыргызстан • Бишкек 2026
        </p>
      </footer>
    </section>
  );
};
