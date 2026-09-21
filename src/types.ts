export type Language = 'it' | 'en';

export interface WineItem {
  id: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  category: 'red' | 'white' | 'orange' | 'sparkling' | 'rose';
  grape: string;
  year: number;
  priceGlass?: number;
  priceBottle: number;
  notes: {
    it: string;
    en: string;
    bn?: string;
  };
  certifications?: string[]; // "Naturale", "Biodinamico", "Triple 'A'", "Senza Solfiti"
  pairing: {
    it: string;
    en: string;
    bn?: string;
  };
}

export interface MenuItem {
  id: string;
  name: {
    it: string;
    en: string;
    bn?: string;
  };
  description: {
    it: string;
    en: string;
    bn?: string;
  };
  price: number;
  category: 'antipasti' | 'taglieri' | 'primi' | 'secondi' | 'dolci';
  tags: ('vegetariano' | 'vegano' | 'senza-glutine' | 'artigianale')[];
  recommendedWine?: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail?: string;
  guestPhone: string;
  date: string;
  time: string;
  guestsCount: number;
  area: 'dehor' | 'bistro' | 'counter';
  notes?: string;
  language: Language;
  createdAt: string;
  status: 'confermata' | 'in_attesa' | 'annullata';
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google Maps' | 'Katie Parla Guide' | 'Zero Roma' | 'TripAdvisor';
  rating: number;
  date: string;
  text: {
    it: string;
    en: string;
    bn?: string;
  };
  badge?: string;
}
