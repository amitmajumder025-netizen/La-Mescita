import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WineListSection } from './components/WineListSection';
import { MenuSection } from './components/MenuSection';
import { BookingSystem } from './components/BookingSystem';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  // Main language is Italian ('it'), with secondary English ('en')
  const [currentLang, setCurrentLang] = useState<Language>('it');

  const handleOpenBooking = () => {
    const bookingSection = document.getElementById('prenota');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#120F0D] text-[#F5EFEB] selection:bg-[#B33939] selection:text-white relative">
      {/* Top Restaurant Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenBooking={handleOpenBooking}
      />

      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={handleOpenBooking}
        />

        {/* Story & Roman Natural Wine Philosophy */}
        <AboutSection currentLang={currentLang} />

        {/* Natural Wine Cellar Catalog (350+ labels, filters, pairings) */}
        <WineListSection
          currentLang={currentLang}
          onOpenBooking={handleOpenBooking}
        />

        {/* Seasonal Food Menu & Artisanal Tasting Boards */}
        <MenuSection
          currentLang={currentLang}
          onOpenBooking={handleOpenBooking}
        />

        {/* Table Booking System with Integrated WhatsApp Service */}
        <BookingSystem currentLang={currentLang} />

        {/* Location, Directions & Google Maps Integration (Garbatella / Teatro Palladium) */}
        <LocationSection currentLang={currentLang} />

        {/* Verified Reviews from Google Maps & Culinary Guides */}
        <ReviewsSection currentLang={currentLang} />
      </main>

      {/* Restaurant Footer */}
      <Footer
        currentLang={currentLang}
        onOpenBooking={handleOpenBooking}
      />

      {/* Mobile Bottom Quick-Action Bar with WhatsApp, Call, Map & Book */}
      <MobileStickyBar
        currentLang={currentLang}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
