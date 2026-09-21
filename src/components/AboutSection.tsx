import React from 'react';
import { Wine, Sun, HeartHandshake, Award, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="storia" className="py-20 bg-[#15110E] relative border-t border-b border-[#241C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#B33939]" />
              {t.about.sectionTag}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5EFEB] leading-tight">
              {t.about.title}
            </h2>

            <p className="text-[#CDC2B8] text-base sm:text-lg leading-relaxed font-normal">
              {t.about.p1}
            </p>

            <p className="text-[#B3A499] text-sm sm:text-base leading-relaxed">
              {t.about.p2}
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#1D1714] border border-[#2B211C] hover:border-[#B33939]/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#B33939]/15 flex items-center justify-center text-[#B33939] mb-3">
                  <Wine className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#F5EFEB] mb-1">
                  {t.about.feature1Title}
                </h3>
                <p className="text-xs text-[#A8988C] leading-relaxed">
                  {t.about.feature1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1D1714] border border-[#2B211C] hover:border-[#D4AF37]/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#F5EFEB] mb-1">
                  {t.about.feature2Title}
                </h3>
                <p className="text-xs text-[#A8988C] leading-relaxed">
                  {t.about.feature2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1D1714] border border-[#2B211C] hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#F5EFEB] mb-1">
                  {t.about.feature3Title}
                </h3>
                <p className="text-xs text-[#A8988C] leading-relaxed">
                  {t.about.feature3Desc}
                </p>
              </div>
            </div>

            {/* Numbers Row */}
            <div className="pt-6 border-t border-[#261E1A] grid grid-cols-3 gap-4">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E2C785] block">
                  {t.about.statsWines}
                </span>
                <span className="text-xs text-[#A8988C] uppercase tracking-wider mt-1 block">
                  {t.about.statsWinesLabel}
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFEB] block">
                  {t.about.statsProducers}
                </span>
                <span className="text-xs text-[#A8988C] uppercase tracking-wider mt-1 block">
                  {t.about.statsProducersLabel}
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#B33939] block">
                  {t.about.statsYears}
                </span>
                <span className="text-xs text-[#A8988C] uppercase tracking-wider mt-1 block">
                  {t.about.statsYearsLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#362A24] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558001373-a387532298ca?auto=format&fit=crop&w=1000&q=80"
                alt="La Mescita Garbatella Roma Enoteca Vini Naturali"
                className="w-full h-[480px] object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#120F0D]/90 backdrop-blur-md border border-[#2E2420]">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  Garbatella Storica • Roma
                </div>
                <p className="text-xs text-[#D8CDC4]">
                  Di fronte al leggendario Teatro Palladium, un angolo di autenticità romana dove il tempo si ferma attorno a un calice sincero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
