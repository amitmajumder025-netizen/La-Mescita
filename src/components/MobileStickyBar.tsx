import React from 'react';
import { Calendar, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface MobileStickyBarProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9';
  const whatsAppUrl = 'https://wa.me/39065139394';

  return (
    <div
      id="mobile-bottom-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120F0D]/95 backdrop-blur-lg border-t border-[#291F1A] px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-8px_20px_rgba(0,0,0,0.6)]"
    >
      <a
        href="tel:+39065139394"
        className="flex-1 py-2 px-1.5 rounded-xl bg-[#1C1613] border border-[#2B201A] text-[#EDE5DC] text-[11px] font-semibold flex items-center justify-center gap-1 active:bg-[#251D19]"
      >
        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Chiama</span>
      </a>

      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-[11px] font-bold flex items-center justify-center gap-1 active:bg-[#25D366]/25"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-1.5 rounded-xl bg-[#1C1613] border border-[#2B201A] text-[#EDE5DC] text-[11px] font-semibold flex items-center justify-center gap-1 active:bg-[#251D19]"
      >
        <MapPin className="w-3.5 h-3.5 text-[#B33939]" />
        <span>Mappa</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-[1.4] py-2 px-2.5 rounded-xl bg-[#B33939] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md active:bg-[#9B2F2F] cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>{t.nav.bookNow}</span>
      </button>
    </div>
  );
};
