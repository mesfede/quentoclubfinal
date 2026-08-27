import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, Check, ArrowLeft, Ticket, CalendarCheck, AlertCircle, Trash2, X } from 'lucide-react';
import { courts } from '../data/mockData';
import { Court, Booking } from '../types';
import { images } from '../assets';

export default function BookingSystem() {
  // States
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedDateLabel, setSelectedDateLabel] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Custom interactive calendar modal state
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  // Checkout Form steps
  const [checkoutStep, setCheckoutStep] = useState<'selection' | 'form' | 'success'>('selection');
  const [showMyBookings, setShowMyBookings] = useState(false);
  
  // User info
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);

  // Active bookings list
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Generate 7 days starting today
  const [sevenDays, setSevenDays] = useState<{ dayName: string; dayNum: string; dateStr: string; fullLabel: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const daysEs = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = daysEs[d.getDay()];
      const dayNum = String(d.getDate()).padStart(2, '0');
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayStr}`;
      
      const fullLabel = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
      dates.push({ dayName, dayNum, dateStr, fullLabel });
    }
    
    setSevenDays(dates);
    // Select first day by default
    setSelectedDateStr(dates[0].dateStr);
    setSelectedDateLabel(dates[0].fullLabel);
    // Select first court by default (Pista 2 or Pista 1)
    if (courts && courts.length > 0) {
      setSelectedCourt(courts[1] || courts[0]);
    }

    // Load existing bookings from local storage
    const saved = localStorage.getItem('quento_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Time slots every 1.5 hours from 09:00 to 22:30
  const TIME_SLOTS = [
    '09:00',
    '10:30',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
    '18:00',
    '19:30',
    '21:00',
    '22:30'
  ];

  // Helper to generate slot states deterministically
  const getSlotState = (time: string, date: string, courtId: string) => {
    const hasActiveUserBooking = myBookings.some(
      (b) => b.date === date && b.timeSlot === time && b.courtId === courtId
    );
    if (hasActiveUserBooking) {
      return 'reservado';
    }

    const seedString = `${time}-${date}-${courtId}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = Math.abs(hash) % 100;

    // 25% are reserved, 10% fixed monthly, 65% available
    if (score < 25) return 'reservado';
    if (score >= 25 && score < 35) return 'fijo mensual';
    return 'disponible';
  };

  const getAvailableSlotsCount = (date: string, courtId: string) => {
    return TIME_SLOTS.filter(
      (time) => getSlotState(time, date, courtId) === 'disponible'
    ).length;
  };

  const handleDateSelect = (dateStr: string, label: string) => {
    setSelectedDateStr(dateStr);
    setSelectedDateLabel(label);
    setSelectedTime(''); // Reset time selection on date change
  };

  const handleFullCalendarSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const fullLabel = date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    
    setSelectedDateStr(dateStr);
    setSelectedDateLabel(fullLabel);
    setShowFullCalendar(false);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCheckoutStep('form');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      setErrorMsg('Por favor completá todos los campos.');
      return;
    }
    if (!userEmail.includes('@')) {
      setErrorMsg('Ingresá un email válido.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (!selectedCourt) return;
      const newBooking: Booking = {
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        date: selectedDateStr,
        dateFormatted: selectedDateLabel,
        timeSlot: selectedTime,
        userName,
        userEmail,
        userPhone,
        totalPrice: selectedCourt.priceHour,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      const updated = [newBooking, ...myBookings];
      setMyBookings(updated);
      localStorage.setItem('quento_bookings', JSON.stringify(updated));

      setBookingResult(newBooking);
      setIsSubmitting(false);
      setCheckoutStep('success');
    }, 900);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = myBookings.filter(b => b.id !== bookingId);
    setMyBookings(updated);
    localStorage.setItem('quento_bookings', JSON.stringify(updated));
  };

  const getFormattedDateTitle = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return dateObj.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const generateMonthGrid = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const grid = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(new Date(currentYear, currentMonth, day));
    }
    return grid;
  };

  return (
    <section id="reservas" className="relative py-20 sm:py-28 text-white scroll-mt-20 overflow-hidden">
      
      {/* Background Image: Close-up padel blue turf with yellow ball and motion diagonal lines */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img 
          src={images.fondoReservas} 
          alt="Canchas de Pádel Quento" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-95"
        />
        
        {/* Soft Diagonal Lighting & Tint Overlay for matching the reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" />
        
        {/* Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight leading-none italic drop-shadow-md">
            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">RESERVÁ TU </span>
            <span className="text-[#d21a23] drop-shadow-[0_4px_12px_rgba(210,26,35,0.4)]">CANCHA</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-neutral-200 font-bold drop-shadow">
            Elegí el día, seleccioná tu cancha techada y reservá tu horario al instante.
          </p>
          
          {/* Mis turnos pill if exists */}
          {myBookings.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowMyBookings(true)}
                className="inline-flex items-center text-xs font-black uppercase tracking-wider text-white hover:text-red-300 transition-colors bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 mr-1.5 text-[#d21a23]" />
                Ver mis reservas ({myBookings.length})
              </button>
            </div>
          )}
        </div>

        {/* Stack of Glass Cards */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* 1. ELEGÍ EL DÍA (Glass Card) */}
          <div className="w-full bg-[#334155]/40 backdrop-blur-xl p-5 sm:p-7 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2.5">
                <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#d21a23]" />
                <h3 className="text-base sm:text-lg md:text-xl font-display font-black italic uppercase tracking-wider text-white">
                  1. ELEGÍ EL DÍA
                </h3>
              </div>

              {/* Top Right Badges / Calendar Modal Trigger */}
              <div className="flex items-center space-x-2.5">
                <div className="px-4 py-1.5 rounded-full bg-white text-neutral-950 font-black text-xs uppercase tracking-wider shadow-sm">
                  {selectedDateLabel ? selectedDateLabel.toUpperCase() : 'HOY'}
                </div>
                <button
                  onClick={() => setShowFullCalendar(!showFullCalendar)}
                  className="inline-flex items-center text-xs font-black uppercase tracking-wider text-white hover:bg-[#d21a23] transition-all bg-neutral-950 px-4 py-1.5 rounded-full border border-white/10 shadow-sm cursor-pointer"
                >
                  <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-[#d21a23]" />
                  <span>{showFullCalendar ? 'Cerrar' : 'VER CALENDARIO'}</span>
                </button>
              </div>
            </div>

            {/* Full Interactive Calendar Modal Overlay */}
            <AnimatePresence>
              {showFullCalendar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden bg-neutral-950/95 border border-white/20 rounded-2xl p-5 mb-6 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                    <span className="text-xs font-black uppercase text-neutral-400">
                      Seleccioná cualquier día del mes
                    </span>
                    <button
                      onClick={() => setShowFullCalendar(false)}
                      className="text-xs font-bold text-neutral-400 hover:text-white"
                    >
                      Cerrar [x]
                    </button>
                  </div>

                  {/* Month header */}
                  <div className="text-center font-bold text-sm text-white mb-3 uppercase tracking-wide">
                    {new Date().toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold mb-2">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                      <div key={d} className="py-1 text-neutral-400">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {generateMonthGrid().map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`} />;
                      
                      const isPast = day < new Date(new Date().setHours(0,0,0,0));
                      const isSelected = selectedDateStr === `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                      
                      return (
                        <button
                          key={`day-${idx}`}
                          disabled={isPast}
                          onClick={() => handleFullCalendarSelect(day)}
                          className={`py-2.5 rounded-lg text-center font-bold text-xs transition-all ${
                            isPast 
                              ? 'text-neutral-700 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#d21a23] text-white font-black shadow-md shadow-red-900/40'
                              : 'hover:bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 7 Days Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3.5">
              {sevenDays.map((item) => {
                const isSelected = selectedDateStr === item.dateStr;
                return (
                  <button
                    key={item.dateStr}
                    onClick={() => handleDateSelect(item.dateStr, item.fullLabel)}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border text-center transition-all cursor-pointer min-h-[92px] ${
                      isSelected
                        ? 'bg-[#d21a23] text-white border-red-400/60 shadow-xl shadow-red-950/70 scale-[1.04]'
                        : 'bg-[#cbd5e1]/90 hover:bg-white border-white/40 text-neutral-900 shadow-sm'
                    }`}
                  >
                    <span className={`text-[11px] sm:text-xs uppercase font-black tracking-wider ${isSelected ? 'text-red-100' : 'text-neutral-700'}`}>
                      {item.dayName}
                    </span>
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black mt-1 leading-none ${isSelected ? 'text-white' : 'text-neutral-950'}`}>
                      {item.dayNum}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ELEGÍ LA CANCHA (100% CUBIERTAS) (Glass Card) */}
          <div className="w-full bg-[#334155]/40 backdrop-blur-xl p-5 sm:p-7 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#d21a23]" />
                <h3 className="text-base sm:text-lg md:text-xl font-display font-black italic uppercase tracking-wider text-white">
                  2. ELEGÍ LA CANCHA (100% CUBIERTAS)
                </h3>
              </div>

              {/* Status Pill Badge */}
              <div className="flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/95 text-neutral-950 text-[11px] font-black uppercase shadow-sm">
                <span className="flex items-center font-extrabold text-neutral-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  CON TURNOS LIBRES
                </span>
                <span className="text-neutral-300 font-light">|</span>
                <span className="text-neutral-500 font-bold">COMPLETA</span>
              </div>
            </div>

            {/* 6 Clean Court Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {courts.map((court, idx) => {
                const isSelected = selectedCourt?.id === court.id;
                const courtNum = idx + 1;
                const availableCount = getAvailableSlotsCount(selectedDateStr, court.id);

                return (
                  <button
                    key={court.id}
                    onClick={() => {
                      setSelectedCourt(court);
                      setSelectedTime('');
                    }}
                    className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-950 border-2 border-red-500 shadow-2xl shadow-red-950/60 scale-[1.04]'
                        : 'bg-[#cbd5e1]/85 hover:bg-white border-white/40 shadow-sm'
                    }`}
                  >
                    {/* Top Label: PISTA */}
                    <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isSelected ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      PISTA
                    </span>

                    {/* Prominent Number Circle */}
                    <div className={`my-2.5 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-display font-black text-xl sm:text-2xl transition-all shadow-md ${
                      isSelected
                        ? 'bg-[#d21a23] text-white shadow-red-900/60 ring-2 ring-red-400/40'
                        : 'bg-neutral-950 text-white'
                    }`}>
                      {courtNum}
                    </div>

                    {/* TECHADA Label */}
                    <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                      TECHADA
                    </span>

                    {/* Bottom Status: Available slots count */}
                    <div className="mt-0.5">
                      <span className="text-[11px] font-black text-[#d21a23] block leading-tight">
                        {availableCount} {availableCount === 1 ? 'libre' : 'libres'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. HORARIOS DISPONIBLES (Glass Card) */}
          <AnimatePresence>
            {selectedDateStr && selectedCourt ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full bg-[#334155]/40 backdrop-blur-xl p-5 sm:p-7 md:p-8 rounded-3xl border border-white/20 shadow-2xl"
              >
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#d21a23]" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-display font-black italic uppercase tracking-wider text-white">
                        3. HORARIOS DISPONIBLES
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-neutral-200 mt-0.5">
                        Turnos de 1.5 hs para el <span className="text-white underline">{getFormattedDateTitle(selectedDateStr)}</span> en <span className="text-[#d21a23] font-black">Cancha {courts.findIndex(c => c.id === selectedCourt.id) + 1}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-[11px] font-black uppercase tracking-wider bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10">
                    <span className="flex items-center text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5" /> Libre
                    </span>
                    <span className="flex items-center text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-neutral-500 mr-1.5" /> Ocupado
                    </span>
                    <span className="flex items-center text-amber-400">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5" /> Fijo
                    </span>
                  </div>
                </div>

                {/* Grid of time slots */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                  {TIME_SLOTS.map((time) => {
                    const slotState = getSlotState(time, selectedDateStr, selectedCourt.id);
                    const isSelected = selectedTime === time;

                    if (slotState === 'reservado') {
                      return (
                        <div
                          key={time}
                          className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center cursor-not-allowed opacity-40"
                        >
                          <span className="block text-base font-black text-neutral-400">{time} hs</span>
                          <span className="block text-[10px] font-bold uppercase text-neutral-500 mt-1">
                            Reservado
                          </span>
                        </div>
                      );
                    }

                    if (slotState === 'fijo mensual') {
                      return (
                        <div
                          key={time}
                          className="bg-amber-950/30 p-4 rounded-2xl border border-amber-600/40 text-center cursor-not-allowed opacity-60"
                        >
                          <span className="block text-base font-black text-amber-400">{time} hs</span>
                          <span className="block text-[9px] font-black uppercase text-amber-400 mt-1 tracking-wider">
                            Fijo Mensual
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d21a23] text-white border-red-400 shadow-xl shadow-red-950/60 scale-105'
                            : 'bg-emerald-900/30 hover:bg-emerald-800/50 border-emerald-400/40 hover:border-emerald-400 text-white shadow-sm hover:scale-[1.02]'
                        }`}
                      >
                        <span className="block text-base sm:text-lg font-black">{time} hs</span>
                        <span className="block text-[10px] font-black uppercase mt-1 tracking-wider text-emerald-300">
                          Disponible
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

        </div>

      </div>

      {/* Checkout Form Modal / Popup */}
      <AnimatePresence>
        {checkoutStep === 'form' && selectedCourt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-950 text-white w-full max-w-lg rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setCheckoutStep('selection')}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-black uppercase tracking-wider text-[#d21a23] mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                CONFIRMÁ TU RESERVA
              </h3>

              {/* Summary details */}
              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl mb-6 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Cancha:</span>
                  <span className="font-bold text-white">Cancha {courts.findIndex(c => c.id === selectedCourt.id) + 1} (100% Cubierta)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Fecha:</span>
                  <span className="font-bold text-white">{selectedDateLabel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Horario:</span>
                  <span className="font-bold text-[#d21a23]">{selectedTime} hs (90 minutos)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
                  <span className="text-neutral-400">Total a pagar:</span>
                  <span className="font-black text-sm text-emerald-400">${selectedCourt.priceHour.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d21a23]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    WhatsApp de Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="Ej. 221 604-9987"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d21a23]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Email para comprobante *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Ej. juan@gmail.com"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d21a23]"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs font-bold text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-800 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('selection')}
                    className="w-1/3 py-3 rounded-xl border border-neutral-700 text-xs font-bold uppercase text-neutral-400 hover:text-white transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-3 rounded-xl bg-[#d21a23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-900/50 flex items-center justify-center cursor-pointer"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Reserva'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {checkoutStep === 'success' && bookingResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-md rounded-3xl border border-emerald-500/50 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-1">
                ¡Reserva Confirmada!
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Código de reserva: <span className="font-mono font-bold text-white">{bookingResult.id}</span>
              </p>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-xs text-left space-y-2 mb-6">
                <p><span className="text-neutral-400">Titular:</span> <span className="font-bold text-white">{bookingResult.userName}</span></p>
                <p><span className="text-neutral-400">Día:</span> <span className="font-bold text-white">{bookingResult.dateFormatted}</span></p>
                <p><span className="text-neutral-400">Horario:</span> <span className="font-bold text-[#d21a23]">{bookingResult.timeSlot} hs</span></p>
                <p><span className="text-neutral-400">Cancha:</span> <span className="font-bold text-white">{bookingResult.courtName}</span></p>
              </div>

              <button
                onClick={() => {
                  setCheckoutStep('selection');
                  setSelectedTime('');
                }}
                className="w-full py-3 rounded-xl bg-[#d21a23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Listo, volver al inicio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* My Active Bookings Modal */}
      <AnimatePresence>
        {showMyBookings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-lg rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowMyBookings(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-black uppercase tracking-wider text-[#d21a23] mb-6 flex items-center">
                <CalendarCheck className="w-5 h-5 mr-2" />
                MIS RESERVAS ({myBookings.length})
              </h3>

              {myBookings.length === 0 ? (
                <p className="text-xs text-neutral-400 text-center py-8">
                  No tenés reservas guardadas en este dispositivo.
                </p>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-sm text-white">{b.courtName}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                            {b.timeSlot} hs
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">{b.dateFormatted}</p>
                      </div>

                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                        title="Cancelar reserva"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
