import React from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, Train, Bus, Car, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LocationSectionProps {
  currentLang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9';

  return (
    <section id="posizione" className="py-20 bg-[#15110E] relative border-t border-[#241C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#B33939]" />
            {t.location.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEB] mb-4">
            {t.location.title}
          </h2>
          <p className="text-[#CDC2B8] text-base leading-relaxed">
            {t.location.neighborhood}
          </p>
        </div>

        {/* Two Column Layout: Info Cards & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address & Direct CTA */}
            <div className="p-6 rounded-2xl bg-[#1A1411] border border-[#2B211C] shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#B33939]/20 flex items-center justify-center text-[#B33939] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#F5EFEB]">
                    La Mescita Roma
                  </h3>
                  <p className="text-sm text-[#D4AF37] font-medium mt-0.5">
                    {t.location.address}
                  </p>
                  <p className="text-xs text-[#8A7C72] mt-1">
                    00154 Roma (RM) • Quartiere Garbatella
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#B33939] hover:bg-[#C93B3B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  {t.location.btnGetDirections}
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <a
                  href="https://wa.me/39065139394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+39065139394"
                  className="py-2.5 px-3 rounded-xl bg-[#241B17] hover:bg-[#30241E] border border-[#3A2E28] text-[#EDE5DC] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Chiama
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-2xl bg-[#1A1411] border border-[#2B211C] shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                <Clock className="w-4 h-4 text-[#B33939]" />
                {t.location.hoursTitle}
              </div>
              <ul className="space-y-2 text-xs text-[#CDC2B8]">
                <li className="flex justify-between pb-1 border-b border-[#241B17]">
                  <span className="text-[#8A7C72]">Lunedì – Giovedì</span>
                  <span className="font-semibold text-[#EDE5DC]">18:00 – 01:00</span>
                </li>
                <li className="flex justify-between pb-1 border-b border-[#241B17]">
                  <span className="text-[#8A7C72]">Venerdì – Sabato</span>
                  <span className="font-semibold text-[#D4AF37]">18:00 – 02:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#8A7C72]">Domenica</span>
                  <span className="font-semibold text-[#EDE5DC]">18:00 – 01:00</span>
                </li>
              </ul>
              <div className="mt-3 p-2.5 rounded-lg bg-[#221915] text-[11px] text-[#A8988C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orari verificati e aggiornati su Google Business Profile.</span>
              </div>
            </div>

            {/* Public Transit Directions */}
            <div className="p-6 rounded-2xl bg-[#1A1411] border border-[#2B211C] shadow-lg space-y-3 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                {t.location.howToReach}
              </span>

              <div className="flex items-start gap-2.5 text-[#CDC2B8]">
                <Train className="w-4 h-4 text-[#B33939] shrink-0 mt-0.5" />
                <span>{t.location.metro}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[#CDC2B8]">
                <Bus className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{t.location.bus}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[#CDC2B8]">
                <Car className="w-4 h-4 text-[#8A7C72] shrink-0 mt-0.5" />
                <span>{t.location.car}</span>
              </div>
            </div>
          </div>

          {/* Right Map Canvas & Embed */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-[#332620] shadow-2xl h-[420px] lg:h-full min-h-[380px] bg-[#17120F]">
              {/* Google Maps Embed iframe with custom coordinates */}
              <iframe
                title="Google Maps Location La Mescita Roma"
                src="https://maps.google.com/maps?q=La+Mescita+Via+Luigi+Fincati+44+Roma&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(0.95)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Verified Pin Card Overlay */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3.5 rounded-xl bg-[#120F0D]/95 backdrop-blur-md border border-[#30241E] shadow-xl text-left pointer-events-auto">
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {t.location.verifiedPin}
                </div>
                <p className="text-xs font-semibold text-[#F5EFEB]">
                  La Mescita • Garbatella
                </p>
                <p className="text-[11px] text-[#A8988C] mt-0.5">
                  Di fronte al Teatro Palladium
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] hover:underline font-semibold"
                >
                  {t.location.btnOpenMaps} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
