import React from 'react';
import { Wine, MapPin, Phone, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9';
  const whatsAppUrl = 'https://wa.me/39065139394';

  return (
    <footer className="bg-[#0E0B09] border-t border-[#211915] text-[#A8988C] text-xs pt-16 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#B33939] flex items-center justify-center text-white">
                <Wine className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-[#F5EFEB]">
                LA MESCITA
              </span>
            </div>
            <p className="text-xs text-[#8A7C72] leading-relaxed mb-4">
              {t.footer.tagline}
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold">
              Garbatella • 00154 Roma (RM) • Italia
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#EDE5DC] uppercase tracking-wider mb-3">
              Navigazione
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#storia" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.story}
                </a>
              </li>
              <li>
                <a href="#vini" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.wines}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                >
                  {t.nav.booking}
                </button>
              </li>
              <li>
                <a href="#posizione" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.location}
                </a>
              </li>
              <li>
                <a href="#recensioni" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#EDE5DC] uppercase tracking-wider mb-3">
              Contatti & WhatsApp
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Chat WhatsApp (+39 06 513 9394)</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="tel:+39065139394" className="hover:text-[#D4AF37]">
                  +39 06 513 9394
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B33939] shrink-0" />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37]"
                >
                  Via Luigi Fincati, 44, Roma
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Location summary */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#EDE5DC] uppercase tracking-wider mb-3">
              Orari del Locale
            </h4>
            <ul className="space-y-2 text-xs text-[#8A7C72]">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8A7C72] shrink-0" />
                <span>Lun – Gio: 18:00 – 01:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Ven – Sab: 18:00 – 02:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8A7C72] shrink-0" />
                <span>Domenica: 18:00 – 01:00</span>
              </li>
              <li className="pt-2 text-[11px] text-[#A8988C]">
                Metro B Garbatella (650m) • Vista Teatro Palladium
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E1714] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6157]">
          <div>
            © {new Date().getFullYear()} La Mescita Roma. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <span>Coordinate GPS: 41.8629911, 12.4848376</span>
            <span>•</span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              Google Maps Pin <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
