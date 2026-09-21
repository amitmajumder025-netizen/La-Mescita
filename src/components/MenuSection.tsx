import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles, Wine, Leaf } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { foodMenu } from '../data/wineAndFoodData';

interface MenuSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tutti i Piatti' },
    { id: 'antipasti', label: t.menu.tabAntipasti },
    { id: 'taglieri', label: t.menu.tabTaglieri },
    { id: 'primi', label: t.menu.tabPrimi },
    { id: 'secondi', label: t.menu.tabSecondi },
    { id: 'dolci', label: t.menu.tabDolci },
  ];

  const filteredItems = foodMenu.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="menu" className="py-20 bg-[#15110E] relative border-t border-[#241C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#B33939]" />
            {t.menu.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEB] mb-4">
            {t.menu.title}
          </h2>
          <p className="text-[#CDC2B8] text-base leading-relaxed">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#B33939] text-white shadow-md'
                  : 'bg-[#1D1714] text-[#A8988C] hover:text-[#EDE5DC] border border-[#2B211C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#1A1411] border border-[#2B211C] hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-serif text-xl font-bold text-[#F5EFEB]">
                    {item.name[currentLang] || item.name.it}
                  </h3>
                  <span className="text-lg font-bold text-[#E2C785] whitespace-nowrap">
                    €{item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-[#B8AAA0] leading-relaxed mb-4">
                  {item.description[currentLang] || item.description.it}
                </p>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#241B17] text-[#A8988C] border border-[#30241E]"
                    >
                      {tag === 'vegetariano' && <Leaf className="w-2.5 h-2.5 text-emerald-400" />}
                      {tag === 'artigianale' && <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />}
                      {tag === 'vegetariano'
                        ? t.menu.allergenVeg
                        : tag === 'senza-glutine'
                        ? t.menu.allergenGf
                        : t.menu.allergenArtisanal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Wine Match */}
              {item.recommendedWine && (
                <div className="pt-3 border-t border-[#29201B] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#D4AF37] font-medium text-[11px]">
                    <Wine className="w-3.5 h-3.5 text-[#B33939]" />
                    {t.menu.recommendedWinePrefix}
                  </span>
                  <span className="text-xs font-semibold text-[#EDE5DC]">
                    {item.recommendedWine}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Menu Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#8A7C72] mb-3">
            I nostri ingredienti provengono quotidianamente da fattorie e casari artigiani del Lazio e dell'Appennino centrale.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B33939] hover:bg-[#C93B3B] text-white text-xs font-bold tracking-wider uppercase shadow-lg transition-all"
          >
            Prenota un Tavolo per Degustare
          </button>
        </div>
      </div>
    </section>
  );
};
