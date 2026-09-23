import React, { useState, useEffect, useRef } from 'react';
import { confettiEngine } from './utils/confetti';
import { HeaderBar } from './components/HeaderBar';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { InvitationCardScreen } from './components/InvitationCardScreen';
import { BlessingScreen } from './components/BlessingScreen';
import { EventDetailsScreen } from './components/EventDetailsScreen';
import { RsvpScreen } from './components/RsvpScreen';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (confettiCanvasRef.current) {
      confettiEngine.init(confettiCanvasRef.current);
    }
    return () => {
      confettiEngine.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#041611] text-[#2C241E] flex items-center justify-center p-0 sm:p-4 selection:bg-[#D4AF37]/30">
      {/* Global Canvas for Interactive Confetti & Celebrations */}
      <canvas
        ref={confettiCanvasRef}
        id="confettiCanvas"
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]"
      />

      {/* Outer Viewport Container (Optimized for Mobile & Centered with Sovereign Frame on Desktop) */}
      <div className="relative w-full max-w-[414px] min-h-screen bg-[#FDFBF7] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-x-hidden sm:rounded-[36px] sm:border-[8px] sm:border-[#134335] flex flex-col justify-start">
        {/* Floating Top Header Bar */}
        <HeaderBar onOpenShare={() => setIsShareModalOpen(true)} />

        {/* Screen 1: Envelope Opening Experience */}
        <EnvelopeScreen
          isOpened={isEnvelopeOpened}
          onOpen={() => setIsEnvelopeOpened(true)}
        />

        {/* Screen 2: Main Invitation Card & Honorees */}
        <InvitationCardScreen />

        {/* Screen 3: Poetic Blessing & Culture Note */}
        <BlessingScreen />

        {/* Screen 4: Event Date, Location, Calendar & Countdown */}
        <EventDetailsScreen />

        {/* Screen 5: RSVP Form & Congratulations Wall */}
        <RsvpScreen />
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
