import React, { useState, useEffect } from 'react';
import { Wine, Globe, Calendar, Menu as MenuIcon, X, MapPin, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];
  const whatsAppUrl = 'https://wa.me/39065139394';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'storia', label: t.nav.story },
    { id: 'vini', label: t.nav.wines },
    { id: 'menu', label: t.nav.menu },
    { id: 'prenota', label: t.nav.booking },
    { id: 'posizione', label: t.nav.location },
    { id: 'recensioni', label: t.nav.reviews },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#120F0D]/95 backdrop-blur-md border-b border-[#2E2420] shadow-xl py-3'
          : 'bg-gradient-to-b from-[#120F0D]/90 via-[#120F0D]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B33939] to-[#7B1113] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Wine className="w-5 h-5 text-[#F5EFEB]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-[#F5EFEB] block leading-none">
              LA MESCITA
            </span>
            <span className="text-[11px] tracking-widest text-[#D4AF37] font-medium uppercase block mt-1">
              Roma • Garbatella
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-medium text-[#D8CDC4] hover:text-[#D4AF37] transition-colors tracking-wide focus:outline-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Direct WhatsApp Chat Action */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 text-xs font-semibold tracking-wide transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Clean Italian / English Language Switcher */}
          <div className="flex items-center bg-[#1D1714] border border-[#2E2420] rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-[#A8988C] ml-2 mr-1" />
            {(['it', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-1 text-xs font-semibold rounded uppercase transition-colors cursor-pointer ${
                  currentLang === lang
                    ? 'bg-[#B33939] text-white shadow-sm'
                    : 'text-[#A8988C] hover:text-white'
                }`}
                title={lang === 'it' ? 'Italiano (Principale)' : 'English'}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Booking CTA Button */}
          <button
            id="nav-book-cta"
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B33939] hover:bg-[#C93B3B] text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#B33939]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.bookNow}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Direct WhatsApp Quick Icon for Mobile */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366]"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Language Switcher: IT / EN */}
          <div className="flex items-center bg-[#1D1714] border border-[#2E2420] rounded-md p-0.5">
            {(['it', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-0.5 text-[11px] font-bold rounded uppercase ${
                  currentLang === lang ? 'bg-[#B33939] text-white' : 'text-[#8A7C72]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1D1714] border border-[#2E2420] text-[#EDE5DC] hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#120F0D] border-b border-[#2E2420] px-4 pt-3 pb-6 mt-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-base font-medium text-[#D8CDC4] hover:text-[#D4AF37] py-2 border-b border-[#1E1815]"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Prenota / Scrivi su WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg bg-[#B33939] hover:bg-[#C93B3B] text-white text-center font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookNow}</span>
              </button>

              <a
                href="https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#1D1714] border border-[#2E2420] text-[#D8CDC4] text-center font-medium text-xs flex items-center justify-center gap-2 hover:border-[#D4AF37]/40"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                Via Luigi Fincati 44, Garbatella (Google Maps)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
