import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Check, User, Mail, Phone, ArrowLeft, Ticket, CalendarCheck, AlertCircle, Sparkles, Trash2 } from 'lucide-react';
import { courts, generateTimeSlotsForDate, availableTimeSlots } from '../data/mockData';
import { Court, Booking } from '../types';

export default function BookingSystem() {
  // State initialization
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  
  // Filters and Step
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Date & Time, 2: Court, 3: Form, 4: Receipt
  
  // Form fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Active user bookings in local storage
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Generate 10 days of the week starting today
  const [datesList, setDatesList] = useState<{ dayName: string; dayNum: string; dateStr: string; fullLabel: string }[]>([]);

  useEffect(() => {
    // Generate dates on mount
    const dates = [];
    const daysEn = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = daysEn[d.getDay()];
      const dayNum = d.getDate().toString();
      // Format as YYYY-MM-DD
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayStr}`;
      
      const fullLabel = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
      dates.push({ dayName, dayNum, dateStr, fullLabel });
    }
    setDatesList(dates);
    setSelectedDate(dates[0].dateStr);

    // Retrieve previous bookings
    const saved = localStorage.getItem('quento_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute court availability based on date, time and storage
  const timeSlotsWithStates = generateTimeSlotsForDate(selectedDate, myBookings);
  const currentSlotDetails = timeSlotsWithStates.find(s => s.time === selectedTime);

  // Time slot filtering logic
  const isTimeInPeriod = (timeStr: string, period: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (period === 'morning') return hour < 12;
    if (period === 'afternoon') return hour >= 12 && hour < 18;
    if (period === 'evening') return hour >= 18;
    return true;
  };

  const filteredSlots = availableTimeSlots.filter(t => {
    if (timeFilter === 'all') return true;
    return isTimeInPeriod(t, timeFilter);
  });

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedCourt(null);
    setStep(2); // Advance to court selection
  };

  const handleCourtSelect = (court: Court) => {
    const state = currentSlotDetails?.slots.find(s => s.courtId === court.id)?.state || 'available';
    if (state !== 'available') return; // Cannot book occupied court
    setSelectedCourt(court);
    setStep(3); // Advance to form
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPhone) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate server side delay and sending email
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'QT-' + Math.floor(Math.random() * 90000 + 10000),
        courtId: selectedCourt!.id,
        courtName: selectedCourt!.name,
        date: selectedDate,
        timeSlot: selectedTime,
        userName,
        userEmail,
        userPhone,
        createdAt: new Date().toISOString()
      };

      const updated = [newBooking, ...myBookings];
      setMyBookings(updated);
      localStorage.setItem('quento_bookings', JSON.stringify(updated));
      
      setBookingResult(newBooking);
      setIsSubmitting(false);
      setStep(4); // Advance to receipt
    }, 1500);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      const updated = myBookings.filter(b => b.id !== id);
      setMyBookings(updated);
      localStorage.setItem('quento_bookings', JSON.stringify(updated));
    }
  };

  const resetForm = () => {
    setSelectedTime('');
    setSelectedCourt(null);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setBookingResult(null);
    setStep(1);
  };

  const getReadableDate = (dateStr: string) => {
    const matched = datesList.find(d => d.dateStr === dateStr);
    return matched ? matched.fullLabel : dateStr;
  };

  return (
    <section id="reservas" className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & SEO eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 block mb-2">
            Reservar Cancha en Línea
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            SISTEMA DE RESERVAS
          </h2>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 font-medium">
            Reservá tu cancha de pádel en menos de 1 minuto de forma automática y recibí confirmación por correo.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            <span className={`${step >= 1 ? 'text-blue-600 dark:text-blue-400 font-black' : ''}`}>1. Fecha y Hora</span>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800 mx-4" />
            <span className={`${step >= 2 ? 'text-blue-600 dark:text-blue-400 font-black' : ''}`}>2. Cancha</span>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800 mx-4" />
            <span className={`${step >= 3 ? 'text-blue-600 dark:text-blue-400 font-black' : ''}`}>3. Confirmación</span>
          </div>
        </div>

        {/* Core Wizard */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          
          <AnimatePresence mode="wait">
            {/* STEP 1: DATE & TIME */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-10"
              >
                {/* 1A: Horizontal Date Selector */}
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2.5 text-blue-500" />
                  1. Seleccioná la Fecha
                </h3>
                
                {/* Scrollable container with soft fading */}
                <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                  {datesList.map((d) => (
                    <button
                      key={d.dateStr}
                      onClick={() => {
                        setSelectedDate(d.dateStr);
                        setSelectedTime('');
                        setSelectedCourt(null);
                      }}
                      className={`flex flex-col items-center justify-center p-3.5 min-w-[76px] h-20 rounded-xl border-2 transition-all cursor-pointer focus:outline-none ${
                        selectedDate === d.dateStr
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{d.dayName}</span>
                      <span className="text-2xl font-black mt-0.5 leading-none">{d.dayNum}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-900 my-8" />

                {/* 1B: Filter & Time Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center mb-4 sm:mb-0">
                    <Clock className="w-5 h-5 mr-2.5 text-blue-500" />
                    2. Seleccioná el Horario
                  </h3>
                  
                  {/* Period Filter Pill tabs */}
                  <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg max-w-max">
                    {[
                      { key: 'all', label: 'Todos' },
                      { key: 'morning', label: 'Mañana (< 12hs)' },
                      { key: 'afternoon', label: 'Tarde (12-18hs)' },
                      { key: 'evening', label: 'Noche (>= 18hs)' },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => setTimeFilter(btn.key as any)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                          timeFilter === btn.key
                            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                            : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid layout for times */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {filteredSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-3.5 px-2 rounded-xl text-center border-2 transition-all font-bold tracking-wide text-sm cursor-pointer focus:outline-none ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {time} hs
                      </button>
                    );
                  })}
                </div>

                {filteredSlots.length === 0 && (
                  <div className="text-center py-10 text-neutral-400 font-medium">
                    No hay horarios disponibles para el filtro seleccionado.
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: COURT SELECTION */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Volver
                  </button>
                  <div className="text-xs text-neutral-500 font-bold bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-lg">
                    {getReadableDate(selectedDate)} a las {selectedTime} hs
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                  3. Elegí la Cancha
                </h3>

                {/* Status Legend */}
                <div className="flex flex-wrap gap-5 mb-8 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <div className="flex items-center">
                    <div className="w-3.5 h-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 mr-2" />
                    <span className="text-emerald-600">Disponible</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3.5 h-3.5 rounded-md bg-red-500/10 border border-red-500/20 mr-2" />
                    <span className="text-red-500">Reservada</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3.5 h-3.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mr-2" />
                    <span className="text-neutral-400">Mantenimiento</span>
                  </div>
                </div>

                {/* Grid map representation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courts.map((court) => {
                    const status = currentSlotDetails?.slots.find(s => s.courtId === court.id)?.state || 'available';
                    
                    const isAvailable = status === 'available';
                    const isReserved = status === 'reserved';
                    const isUnavailable = status === 'unavailable';

                    return (
                      <div
                        key={court.id}
                        onClick={() => isAvailable && handleCourtSelect(court)}
                        className={`relative rounded-xl border-2 p-5 flex flex-col justify-between transition-all ${
                          isAvailable
                            ? 'bg-neutral-50/50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-50/90 dark:hover:bg-neutral-900/40 cursor-pointer'
                            : 'border-neutral-100 dark:border-neutral-900 bg-neutral-50/20 dark:bg-neutral-950/20 opacity-70 cursor-not-allowed'
                        }`}
                      >
                        {/* Status tag */}
                        <div className="absolute top-4 right-4">
                          {isAvailable && (
                            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                              Disponible
                            </span>
                          )}
                          {isReserved && (
                            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-red-500/10 text-red-500 border border-red-500/25">
                              Reservada
                            </span>
                          )}
                          {isUnavailable && (
                            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-400 border border-neutral-300 dark:border-neutral-700">
                              No Disponible
                            </span>
                          )}
                        </div>

                        {/* Title, features */}
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-blue-500 block mb-1">
                            {court.type === 'covered' ? 'CUBIERTA' : 'OUTDOOR'}
                          </span>
                          <h4 className="text-lg font-black text-neutral-900 dark:text-white uppercase leading-snug">
                            {court.name}
                          </h4>
                          
                          <p className="text-xs text-neutral-500 mt-2">
                            Piso de césped sintético azul (alfombra premium), paredes de cristal templado blindex de alta resistencia.
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {court.features.slice(1, 4).map((f, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded font-semibold">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cost & action */}
                        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Valor por Turno (90 min)</span>
                            <span className="text-lg font-black text-neutral-900 dark:text-white">${court.priceHour.toLocaleString('es-AR')}</span>
                          </div>

                          {isAvailable && (
                            <button
                              className="px-4.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold uppercase tracking-wider transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCourtSelect(court);
                              }}
                            >
                              Seleccionar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: BOOKING FORM */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-10"
              >
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 mb-6 focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Volver a canchas
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Summary card */}
                  <div className="lg:col-span-1 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200/50 dark:border-neutral-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-3">Detalles de Reserva</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Cancha</span>
                          <span className="font-bold text-neutral-800 dark:text-white">{selectedCourt?.name}</span>
                        </div>
                        
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Fecha</span>
                          <span className="font-bold text-neutral-800 dark:text-white">{getReadableDate(selectedDate)}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Horario</span>
                          <span className="font-bold text-neutral-800 dark:text-white">{selectedTime} hs</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Duración</span>
                          <span className="font-bold text-neutral-800 dark:text-white">90 minutos (Turno estándar)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-bold text-neutral-500">Monto Final</span>
                        <span className="text-xl font-black text-neutral-950 dark:text-white">${selectedCourt?.priceHour.toLocaleString('es-AR')}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-semibold block leading-tight">
                        Se abona en secretaría del club antes de ingresar a la cancha.
                      </span>
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                      Completá tus datos de contacto
                    </h3>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      {errorMsg && (
                        <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-lg text-red-500 text-xs flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                          <span className="font-semibold">{errorMsg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                            Nombre y Apellido
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Juan Pérez"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                            Teléfono celular (WhatsApp)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input
                              type="tel"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              placeholder="+54 9 221 123-4567"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                          Correo Electrónico
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="juan.perez@email.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white"
                            required
                          />
                        </div>
                        <p className="mt-1.5 text-[10px] text-neutral-400 font-semibold leading-relaxed">
                          Te enviaremos los detalles de la reserva de forma automática a este email.
                        </p>
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/55 text-white font-extrabold tracking-wider uppercase shadow-lg shadow-blue-500/10 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Generando Reserva...</span>
                            </>
                          ) : (
                            <>
                              <CalendarCheck className="w-5 h-5 mr-2" />
                              <span>Confirmar Reserva</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: RECEIPT */}
            {step === 4 && bookingResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20 }}
                className="p-8 sm:p-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/35 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" />
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>¡Turno Reservado con Éxito!</span>
                </div>

                <h3 className="text-3xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                  RESERVA COMPLETADA
                </h3>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">
                  Hemos enviado una confirmación automática con los códigos de acceso y detalles del turno a <strong className="text-neutral-900 dark:text-neutral-200">{bookingResult.userEmail}</strong>.
                </p>

                {/* Receipt ticket widget */}
                <div className="max-w-md mx-auto bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl p-6 text-left my-8 shadow-sm relative overflow-hidden">
                  {/* Soft side notch details for ticket aesthetic */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full" />
                  
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                    <span className="text-xs font-black text-neutral-400 tracking-wider uppercase">Comprobante Digital</span>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-wider flex items-center">
                      <Ticket className="w-4 h-4 mr-1" />
                      {bookingResult.id}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-sm font-medium">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Cliente</span>
                      <span className="text-neutral-900 dark:text-white font-bold">{bookingResult.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Cancha</span>
                      <span className="text-neutral-900 dark:text-white font-bold">{selectedCourt?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Fecha</span>
                      <span className="text-neutral-900 dark:text-white font-bold">{getReadableDate(bookingResult.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Horario</span>
                      <span className="text-neutral-900 dark:text-white font-bold">{bookingResult.timeSlot} hs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Total a abonar</span>
                      <span className="text-neutral-900 dark:text-white font-black">${selectedCourt?.priceHour.toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider rounded-xl uppercase text-xs transition-colors cursor-pointer"
                  >
                    Hacer otra reserva
                  </button>
                  <a
                    href={`https://wa.me/5492216049987?text=Hola%20Quento%20Club!%20Realic%C3%A3%20la%20reserva%20${bookingResult.id}%20para%20el%20d%C3%ADa%20${bookingResult.date}%20a%20las%20${bookingResult.timeSlot}%20hs.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-50 text-white dark:hover:bg-emerald-700/80 font-bold tracking-wider rounded-xl uppercase text-xs transition-colors inline-flex items-center justify-center"
                  >
                    Enviar por WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Active Bookings Section - High end addition! */}
        {myBookings.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16 bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-6 uppercase tracking-wider">
              Tus Reservas Activas ({myBookings.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBookings.map((bk) => (
                <div key={bk.id} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-neutral-400">{bk.id}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Turno Reservado</span>
                    </div>
                    <h5 className="font-bold text-neutral-800 dark:text-white mt-1 leading-snug">{bk.courtName}</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">{getReadableDate(bk.date)} • {bk.timeSlot} hs</p>
                  </div>

                  <button
                    onClick={() => handleDeleteBooking(bk.id)}
                    className="p-2 bg-neutral-100 hover:bg-red-500/10 text-neutral-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    title="Cancelar reserva"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
