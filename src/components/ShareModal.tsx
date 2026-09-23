import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Calendar } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Урматтуу кадырлуу коноктор! Сиздерди Болот & Айперинин үйлөнүү үлпөт жана Алинин сүннөт тоюна чын жүрөктөн чакырабыз! 📅 21-Октябрь 2026, 16:00. Ресторан «Ырыскы», Бишкек. Санарип чакыруу катын ачуу үчүн шилтемени басыңыз: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#FAF6EE] rounded-3xl p-6 border-2 border-[#D4AF37] shadow-2xl text-stone-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#0D3B2E]/10 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#0D3B2E] mb-2">
            <MessageCircle className="w-6 h-6 text-[#0D3B2E]" />
          </div>
          <h4 className="font-serif text-lg font-bold text-[#0D3B2E] uppercase">
            Чакырууну бөлүшүү
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">Жакындарыңызга жана туугандарга жөнөтүңүз</p>
        </div>

        {/* Share Actions */}
        <div className="space-y-3">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp аркылуу жөнөтүү</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 rounded-2xl bg-white border border-[#D4AF37]/60 hover:border-[#D4AF37] text-stone-800 font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Шилтеме көчүрүлдү!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#997D3D]" />
                <span>Шилтемени көчүрүп алуу</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-5 pt-3 border-t border-[#D4AF37]/30 text-center">
          <p className="text-[10px] text-stone-400 font-serif">
            ОРДОЛУУ БИШКЕК • 2026-ЖЫЛ
          </p>
        </div>
      </div>
    </div>
  );
};
