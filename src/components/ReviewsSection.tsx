import React from 'react';
import { Star, MessageSquareQuote, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { reviewsList } from '../data/wineAndFoodData';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/q45qVZ6n7MK8MYDo9';

  return (
    <section className="py-20 bg-[#15110E] relative border-t border-[#241C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#2E2420] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#B33939]" />
            {t.reviews.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEB] mb-4">
            {t.reviews.title}
          </h2>
          <p className="text-[#CDC2B8] text-base leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#1A1411] border border-[#2B211C] hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {/* Stars */}
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {review.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      {review.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#D8CDC4] leading-relaxed italic mb-4">
                  "{review.text[currentLang] || review.text.it}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#29201B] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F5EFEB]">
                  {review.author}
                </span>
                <span className="text-[#8A7C72]">
                  {review.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="mt-10 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline"
          >
            <span>Leggi tutte le oltre 650 recensioni su Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
