import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  ArrowRight,
  Phone,
  User,
  FileText,
  Trash2,
  MessageCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Language, Reservation } from '../types';
import { translations } from '../data/translations';

interface BookingSystemProps {
  currentLang: Language;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const WHATSAPP_PHONE_NUMBER = '39065139394'; // Official restaurant number (+39 06 513 9394)
  const DISPLAY_PHONE = '+39 06 513 9394';

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('20:30');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [area, setArea] = useState<'dehor' | 'bistro' | 'counter'>('dehor');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Active step: 1 (details) -> 2 (area) -> 3 (contacts) -> 4 (confirmed WhatsApp)
  const [step, setStep] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');

  // Local storage history of reservations
  const [savedReservations, setSavedReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lamescita_reservations');
      if (stored) {
        setSavedReservations(JSON.parse(stored));
      }
    } catch {
      // Local storage not available
    }
  }, []);

  const saveToLocalStorage = (list: Reservation[]) => {
    setSavedReservations(list);
    try {
      localStorage.setItem('lamescita_reservations', JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  const timeSlots = [
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
  ];

  const getAreaLabel = (areaKey: 'dehor' | 'bistro' | 'counter') => {
    if (areaKey === 'dehor') return t.booking.areaDehor;
    if (areaKey === 'bistro') return t.booking.areaBistro;
    return t.booking.areaCounter;
  };

  const buildWhatsAppMessage = (booking: {
    id: string;
    name: string;
    date: string;
    time: string;
    guests: number;
    area: 'dehor' | 'bistro' | 'counter';
    phone: string;
    notes?: string;
  }) => {
    const areaName = getAreaLabel(booking.area);
    if (currentLang === 'it') {
      return (
        `🍷 *RICHIESTA PRENOTAZIONE TAVOLO*\n` +
        `📍 *La Mescita Roma - Garbatella*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `🆔 *Rif:* ${booking.id}\n` +
        `👤 *Nome:* ${booking.name}\n` +
        `📅 *Data:* ${booking.date}\n` +
        `⏰ *Orario:* ${booking.time}\n` +
        `👥 *Ospiti:* ${booking.guests} persone\n` +
        `🪑 *Zona Preferita:* ${areaName}\n` +
        `📞 *Telefono Cliente:* ${booking.phone}\n` +
        (booking.notes ? `📝 *Note:* ${booking.notes}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `Salve! Desidero prenotare questo tavolo. Attendo vostra conferma della disponibilità. Grazie mille!`
      );
    } else {
      return (
        `🍷 *TABLE RESERVATION REQUEST*\n` +
        `📍 *La Mescita Rome - Garbatella*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `🆔 *Ref:* ${booking.id}\n` +
        `👤 *Name:* ${booking.name}\n` +
        `📅 *Date:* ${booking.date}\n` +
        `⏰ *Time:* ${booking.time}\n` +
        `👥 *Guests:* ${booking.guests} people\n` +
        `🪑 *Area:* ${areaName}\n` +
        `📞 *Contact Phone:* ${booking.phone}\n` +
        (booking.notes ? `📝 *Notes:* ${booking.notes}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `Hello! I would like to request this table booking. Please let me know if you have availability. Thank you!`
      );
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert(currentLang === 'it' ? 'Inserisci nome e numero di telefono WhatsApp.' : 'Please enter your name and phone number.');
      return;
    }

    const bookingId = `LM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Reservation = {
      id: bookingId,
      guestName,
      guestEmail: guestEmail || undefined,
      guestPhone,
      date,
      time,
      guestsCount,
      area,
      notes,
      language: currentLang,
      createdAt: new Date().toISOString(),
      status: 'in_attesa',
    };

    const messageText = buildWhatsAppMessage({
      id: bookingId,
      name: guestName,
      date,
      time,
      guests: guestsCount,
      area,
      phone: guestPhone,
      notes,
    });

    const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setLastWhatsAppUrl(waUrl);
    setConfirmedBooking(newBooking);

    const updated = [newBooking, ...savedReservations];
    saveToLocalStorage(updated);
    setStep(4);

    // Open WhatsApp directly
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Fallback handled by the UI button on step 4
    }
  };

  const handleCopyMessage = () => {
    if (!confirmedBooking) return;
    const messageText = buildWhatsAppMessage({
      id: confirmedBooking.id,
      name: confirmedBooking.guestName,
      date: confirmedBooking.date,
      time: confirmedBooking.time,
      guests: confirmedBooking.guestsCount,
      area: confirmedBooking.area,
      phone: confirmedBooking.guestPhone,
      notes: confirmedBooking.notes,
    });
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const cancelReservation = (id: string) => {
    const updated = savedReservations.filter((r) => r.id !== id);
    saveToLocalStorage(updated);
    if (confirmedBooking?.id === id) {
      setConfirmedBooking(null);
      setStep(1);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setNotes('');
    setStep(1);
  };

  const generateGoogleCalendarUrl = (booking: Reservation) => {
    const title = encodeURIComponent(`Tavolo a La Mescita Roma (${booking.guestsCount} persone)`);
    const details = encodeURIComponent(
      `Prenotazione tavolo a La Mescita Roma Garbatella.\nCodice: ${booking.id}\nZona: ${booking.area}\nTelefono WhatsApp: ${DISPLAY_PHONE}`
    );
    const location = encodeURIComponent('La Mescita, Via Luigi Fincati 44, 00154 Roma, Italia');
    const startIso = `${booking.date.replace(/-/g, '')}T${booking.time.replace(':', '')}00`;
    const [h, m] = booking.time.split(':').map(Number);
    const endH = String((h + 2) % 24).padStart(2, '0');
    const endIso = `${booking.date.replace(/-/g, '')}T${endH}${String(m).padStart(2, '0')}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const directWhatsAppQuickChat = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    currentLang === 'it'
      ? 'Salve La Mescita, vorrei informazioni per un tavolo stasera o nei prossimi giorni. Grazie!'
      : 'Hello La Mescita, I would like to inquire about table availability for tonight or this week. Thank you!'
  )}`;

  return (
    <section id="prenota" className="py-20 bg-[#120F0D] relative border-t border-[#241C18]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1714] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-widest uppercase mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            {t.booking.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEB] mb-4">
            {t.booking.title}
          </h2>
          <p className="text-[#CDC2B8] text-base leading-relaxed max-w-xl mx-auto">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Quick Instant WhatsApp Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17221A] via-[#151D18] to-[#120F0D] border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5EFEB] flex items-center gap-2">
                <span>{t.booking.quickWhatsAppTitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-semibold">
                  Risposta Rapida
                </span>
              </h4>
              <p className="text-xs text-[#A8988C] mt-0.5">
                {t.booking.quickWhatsAppDesc} <span className="text-[#EDE5DC] font-semibold">{DISPLAY_PHONE}</span>
              </p>
            </div>
          </div>
          <a
            href={directWhatsAppQuickChat}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.booking.quickWhatsAppBtn}</span>
          </a>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-8 border-b border-[#241C18] pb-4">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => step !== 4 && setStep(s)}
              className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                step === s
                  ? 'text-[#25D366]'
                  : step > s
                  ? 'text-[#D4AF37]'
                  : 'text-[#6A5E54]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s
                    ? 'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20'
                    : step > s
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                    : 'bg-[#1D1714] text-[#6A5E54] border border-[#2B211C]'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
              <span className="hidden sm:inline">
                {s === 1 ? 'Dettagli' : s === 2 ? 'Zona' : 'WhatsApp'}
              </span>
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-[#17120F] border border-[#291F1A] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#F5EFEB]">
                {t.booking.step1}
              </h3>

              {/* Date selection with quick presets */}
              <div>
                <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-2">
                  {t.booking.dateLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setDate(todayStr)}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      date === todayStr
                        ? 'bg-[#B33939] border-[#B33939] text-white font-bold shadow-sm'
                        : 'bg-[#1F1814] border-[#2A201A] text-[#A8988C] hover:text-white'
                    }`}
                  >
                    Stasera (Oggi)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const tm = new Date();
                      tm.setDate(tm.getDate() + 1);
                      setDate(tm.toISOString().split('T')[0]);
                    }}
                    className="py-2 px-3 rounded-lg border bg-[#1F1814] border-[#2A201A] text-[#A8988C] hover:text-white text-xs font-medium cursor-pointer"
                  >
                    Domani Sera
                  </button>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="py-2 px-3 rounded-lg bg-[#1F1814] border border-[#2A201A] text-xs text-[#F5EFEB] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-2">
                  {t.booking.guestsLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestsCount(num)}
                      className={`w-11 h-10 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        guestsCount === num
                          ? 'bg-[#D4AF37] text-[#120F0D] shadow-md scale-105'
                          : 'bg-[#1F1814] text-[#A8988C] hover:text-white border border-[#2A201A]'
                      }`}
                    >
                      {num} {num === 1 ? 'ospite' : 'ospiti'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-2">
                  {t.booking.timeLabel}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 px-2 text-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        time === slot
                          ? 'bg-[#B33939] text-white font-bold'
                          : 'bg-[#1F1814] text-[#A8988C] hover:text-white border border-[#2A201A]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#7A6D63] mt-2">
                  * La Mescita è aperta tutti i giorni dalle 18:00 alle 01:00 (venerdì e sabato fino alle 02:00).
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#B33939] hover:bg-[#C93B3B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{t.booking.btnNext}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#F5EFEB]">
                {t.booking.step2}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dehor */}
                <div
                  onClick={() => setArea('dehor')}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    area === 'dehor'
                      ? 'bg-[#1E1714] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#1A1411] border-[#291F1A] hover:border-[#3D2E26]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base text-[#F5EFEB]">
                      {t.booking.areaDehor}
                    </span>
                    {area === 'dehor' && <CheckCircle className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <p className="text-xs text-[#A8988C] leading-relaxed">
                    {t.booking.areaDehorDesc}
                  </p>
                  <span className="mt-3 inline-block text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                    Consigliato al tramonto
                  </span>
                </div>

                {/* Vintage Bistro Indoor */}
                <div
                  onClick={() => setArea('bistro')}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    area === 'bistro'
                      ? 'bg-[#1E1714] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#1A1411] border-[#291F1A] hover:border-[#3D2E26]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base text-[#F5EFEB]">
                      {t.booking.areaBistro}
                    </span>
                    {area === 'bistro' && <CheckCircle className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <p className="text-xs text-[#A8988C] leading-relaxed">
                    {t.booking.areaBistroDesc}
                  </p>
                  <span className="mt-3 inline-block text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                    Atmosfera romantica
                  </span>
                </div>

                {/* Counter & Bar */}
                <div
                  onClick={() => setArea('counter')}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    area === 'counter'
                      ? 'bg-[#1E1714] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#1A1411] border-[#291F1A] hover:border-[#3D2E26]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base text-[#F5EFEB]">
                      {t.booking.areaCounter}
                    </span>
                    {area === 'counter' && <CheckCircle className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <p className="text-xs text-[#A8988C] leading-relaxed">
                    {t.booking.areaCounterDesc}
                  </p>
                  <span className="mt-3 inline-block text-[10px] text-rose-300 uppercase tracking-wider font-semibold">
                    Perfetto per l'aperitivo
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-[#1D1714] border border-[#2E2420] text-xs font-semibold text-[#A8988C] hover:text-white cursor-pointer"
                >
                  {t.booking.btnBack}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#B33939] hover:bg-[#C93B3B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{t.booking.btnNext}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-[#F5EFEB]">
                  {t.booking.step3}
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-[#25D366] font-semibold">
                  <MessageCircle className="w-4 h-4" />
                  Invio Diretto WhatsApp
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-1.5">
                    {t.booking.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A6D63] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marco Rossi / John Smith"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1F1814] border border-[#2E2420] text-sm text-[#F5EFEB] focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-1.5">
                    {t.booking.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7A6D63] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +39 347 1234567"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1F1814] border border-[#2E2420] text-sm text-[#F5EFEB] focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8CDC4] uppercase tracking-wider mb-1.5">
                  {t.booking.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#7A6D63] absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Allergie (es. celiachia, lattosio), compleanno o note per il sommelier..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1F1814] border border-[#2E2420] text-sm text-[#F5EFEB] focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>

              {/* Summary Pill Before Submit */}
              <div className="p-4 rounded-xl bg-[#1E1714] border border-[#2B201A] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#D8CDC4]">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" /> {date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {guestsCount} ospiti
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B33939]" /> {area.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                  <span>Destinatario WhatsApp: {DISPLAY_PHONE}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#1D1714] border border-[#2E2420] text-xs font-semibold text-[#A8988C] hover:text-white cursor-pointer"
                >
                  {t.booking.btnBack}
                </button>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#25D366]/30 cursor-pointer transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.booking.btnConfirm}</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center mx-auto shadow-xl">
                <MessageCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-[#F5EFEB] mb-2">
                  {t.booking.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#CDC2B8] max-w-lg mx-auto">
                  {t.booking.successDesc}
                </p>
              </div>

              {/* Receipt / Booking Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#1F1814] border border-[#332620] text-left space-y-3 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#2C211B]">
                  <span className="text-xs text-[#8A7C72] uppercase font-semibold">
                    {t.booking.bookingCode}
                  </span>
                  <span className="font-mono text-base font-bold text-[#25D366] px-2.5 py-0.5 rounded bg-[#25D366]/10 border border-[#25D366]/30">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#8A7C72] block">Ospite:</span>
                    <span className="font-semibold text-[#EDE5DC]">{confirmedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7C72] block">Ospiti:</span>
                    <span className="font-semibold text-[#EDE5DC]">{confirmedBooking.guestsCount} Persone</span>
                  </div>
                  <div>
                    <span className="text-[#8A7C72] block">Data & Orario:</span>
                    <span className="font-semibold text-[#EDE5DC]">{confirmedBooking.date} alle {confirmedBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7C72] block">Zona Assegnata:</span>
                    <span className="font-semibold text-[#D4AF37] capitalize">{confirmedBooking.area}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#A8988C] border-t border-[#2C211B] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B33939]" />
                    Via Luigi Fincati 44, Garbatella
                  </span>
                  <span className="text-[#25D366] font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {DISPLAY_PHONE}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {lastWhatsAppUrl && (
                  <a
                    href={lastWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.booking.openWhatsAppAgain}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="px-4 py-2.5 rounded-xl bg-[#1D1714] border border-[#2E2420] text-xs font-semibold text-[#EDE5DC] hover:text-[#D4AF37] hover:bg-[#251E1A] flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiato!' : 'Copia Messaggio'}</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#1D1714] border border-[#2E2420] text-xs font-semibold text-[#D4AF37] hover:bg-[#251E1A] flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {t.booking.addToCalendar}
                </a>

                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl bg-[#1D1714] border border-[#2E2420] text-[#A8988C] text-xs font-semibold hover:text-white cursor-pointer"
                >
                  {t.booking.makeNewBooking}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Active Reservations Panel */}
        {savedReservations.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-[#17120F]/60 border border-[#261E1A]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8988C] mb-3 flex items-center justify-between">
              <span>Le tue richieste di prenotazione</span>
              <span className="text-[10px] text-[#7A6D63] font-normal">Sincronizzate su WhatsApp</span>
            </h4>
            <div className="space-y-2">
              {savedReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1E1714] border border-[#291F1A] text-xs text-[#D8CDC4]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold text-[#25D366]">
                      {res.id}
                    </span>
                    <span>{res.date} • {res.time}</span>
                    <span className="text-[#8A7C72] hidden sm:inline">({res.guestsCount} ospiti, {res.area})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                        `Salve La Mescita, chiedo conferma per la prenotazione ${res.id} a nome ${res.guestName} per il ${res.date} alle ${res.time}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Chat WhatsApp
                    </a>
                    <button
                      onClick={() => cancelReservation(res.id)}
                      className="p-1 rounded text-[#8A7C72] hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      title="Rimuovi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
