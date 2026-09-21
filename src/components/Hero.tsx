import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, ArrowRight, Clock, Wine, MessageCircle, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang];
  const [isOpenNow, setIsOpenNow] = useState(false);
  const whatsAppUrl = 'https://wa.me/39065139394';

  useEffect(() => {
    // Check Rome local hour
    const checkRomeHours = () => {
      try {
        const romeTimeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Rome',
          hour: 'numeric',
          hour12: false,
        }).format(new Date());
        const hour = parseInt(romeTimeString, 10);
        // Open between 18:00 (6 PM) and 02:00 (2 AM)
        if (hour >= 18 || hour < 2) {
          setIsOpenNow(true);
        } else {
          setIsOpenNow(false);
        }
      } catch {
        setIsOpenNow(true);
      }
    };
    checkRomeHours();
    const interval = setInterval(checkRomeHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Visual Background with subtle vignette & warm gradient */}
      <div className="absolute inset-0 -z-10 bg-[#120F0D]">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=80"
          alt="Enoteca La Mescita Roma Garbatella"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-75 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-[#120F0D]/75 to-[#120F0D]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B33939]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1D1714]/90 border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase backdrop-blur-sm shadow-sm">
            <Wine className="w-3.5 h-3.5 text-[#B33939]" />
            {t.hero.badge}
          </span>

          {/* Real-time Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
              isOpenNow
                ? 'bg-emerald-950/60 border border-emerald-600/40 text-emerald-300'
                : 'bg-amber-950/60 border border-amber-600/40 text-amber-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <Clock className="w-3.5 h-3.5" />
            {isOpenNow ? t.hero.openNow : t.hero.closedNow}
          </span>
        </div>

        {/* Hero Title with Italian Elegance */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5EFEB] mb-4 leading-[1.15]">
          <span>{t.hero.titlePrimary}</span>{' '}
          <span className="italic font-normal text-[#E2C785] block sm:inline">
            {t.hero.titleSecondary}
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#CDC2B8] leading-relaxed mb-8">
          {t.hero.description}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#B33939] hover:bg-[#C93B3B] text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#B33939]/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.hero.ctaBook}</span>
          </button>

          <a
            id="hero-whatsapp-btn"
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.hero.ctaWhatsApp}</span>
          </a>

          <a
            href="#vini"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1D1714]/90 hover:bg-[#2A211D] border border-[#2E2420] text-[#EDE5DC] hover:text-[#D4AF37] font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
          >
            <Wine className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.hero.ctaWine}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Social Proof & Location Strip */}
        <div className="pt-6 border-t border-[#261E1A] max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#A8988C]">
          {/* Google Maps Rating */}
          <a
            href="https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-[#EDE5DC]">4.8 / 5.0</span>
            <span className="hidden sm:inline">• {t.hero.ratingText}</span>
          </a>

          {/* Location Badge */}
          <a
            href="https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#C4B7AC] hover:text-[#D4AF37] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.hero.addressSummary}</span>
          </a>

          {/* Open Google Maps Direction Link */}
          <a
            href="https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#D4AF37] hover:underline font-medium"
          >
            <MapPin className="w-3.5 h-3.5 text-[#B33939]" />
            <span>{t.hero.ctaDirections}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
