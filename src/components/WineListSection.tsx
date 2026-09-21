import React, { useState } from 'react';
import { Wine, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { Language, WineItem } from '../types';
import { translations } from '../data/translations';
import { wineCollection } from '../data/wineAndFoodData';

interface WineListSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const WineListSection: React.FC<WineListSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: t.wines.filterAll },
    { id: 'red', label: t.wines.filterRed },
    { id: 'white', label: t.wines.filterWhite },
    { id: 'sparkling', label: t.wines.filterSparkling },
    { id: 'rose', label: t.wines.filterRose },
  ];

  const filteredWines = wineCollection.filter((wine) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      wine.category === selectedCategory ||
      (selectedCategory === 'white' && wine.category === 'orange');

    const matchesSearch =
      searchQuery.trim() === '' ||
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.grape.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="vini" className="py-20 bg-[#120F0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
            <Wine className="w-3.5 h-3.5 text-[#B33939]" />
            {t.wines.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEB] mb-4">
            {t.wines.title}
          </h2>
          <p className="text-[#CDC2B8] text-base leading-relaxed">
            {t.wines.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#241C18]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#B33939] text-white shadow-md'
                    : 'bg-[#1D1714] text-[#A8988C] hover:text-[#EDE5DC] border border-[#2B211C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#8A7C72] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.wines.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1D1714] border border-[#2E2420] text-sm text-[#F5EFEB] placeholder-[#786A60] focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Wine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWines.map((wine) => (
            <div
              key={wine.id}
              className="p-6 rounded-2xl bg-[#17120F] border border-[#291F1A] hover:border-[#B33939]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                    {wine.category === 'orange' ? 'Orange / Skin Contact' : wine.category}
                  </span>
                  <span className="text-xs text-[#8A7C72] font-medium">
                    Annata {wine.year}
                  </span>
                </div>

                {/* Wine Name & Producer */}
                <h3 className="font-serif text-xl font-bold text-[#F5EFEB] group-hover:text-[#D4AF37] transition-colors mb-1">
                  {wine.name}
                </h3>
                <p className="text-sm font-medium text-[#D8CDC4] mb-2">
                  {wine.producer}
                </p>
                <p className="text-xs text-[#9E8E82] mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B33939]" />
                  {wine.region}, {wine.country} • <span className="italic">{wine.grape}</span>
                </p>

                {/* Tasting Notes */}
                <p className="text-xs text-[#C4B7AC] leading-relaxed mb-4 line-clamp-3">
                  {wine.notes[currentLang] || wine.notes.it}
                </p>

                {/* Certifications */}
                {wine.certifications && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {wine.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F1814] text-[#A8988C] border border-[#2B211C]"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Sommelier Pairing Callout */}
                <div className="p-3 rounded-lg bg-[#1F1814] border border-[#2A201A] text-[11px] text-[#D8CDC4] mb-4">
                  <span className="text-[#D4AF37] font-semibold block mb-0.5">
                    {t.wines.viewPairing}
                  </span>
                  <span className="text-[#A8988C]">
                    {wine.pairing[currentLang] || wine.pairing.it}
                  </span>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-[#261E1A] flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    {wine.priceGlass && (
                      <div>
                        <span className="text-[10px] text-[#8A7C72] uppercase block">
                          {t.wines.glass}
                        </span>
                        <span className="text-base font-bold text-[#F5EFEB]">
                          €{wine.priceGlass.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-[#8A7C72] uppercase block">
                        {t.wines.bottle}
                      </span>
                      <span className="text-base font-bold text-[#E2C785]">
                        €{wine.priceBottle.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="px-3 py-1.5 rounded-lg bg-[#1E1714] hover:bg-[#B33939] text-[#CDC2B8] hover:text-white border border-[#30241E] text-xs font-semibold tracking-wide transition-colors"
                  >
                    Degusta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote about full 350+ cellar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#17120F] border border-[#291F1A] text-center max-w-2xl mx-auto">
          <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
          <h4 className="font-serif text-lg font-bold text-[#F5EFEB] mb-1">
            Una Cantina Viva con Oltre 350 Referenze
          </h4>
          <p className="text-xs text-[#A8988C] mb-4">
            La nostra carta dei vini cambia continuamente con gli arrivi dai piccoli vignaioli indipendenti d'Europa. Chiedi al sommelier Angelo per le bottiglie fuori carta del giorno.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B33939] hover:bg-[#C93B3B] text-white text-xs font-bold tracking-wider uppercase transition-colors"
          >
            Prenota un Tavolo e Degusta
          </button>
        </div>
      </div>
    </section>
  );
};
