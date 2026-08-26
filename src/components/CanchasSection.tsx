import { motion } from 'motion/react';
import { Shield, Sparkles, Zap, Sun, Award } from 'lucide-react';
import { courts } from '../data/mockData';

interface CanchasSectionProps {
  onNavigateToBooking: () => void;
}

export default function CanchasSection({ onNavigateToBooking }: CanchasSectionProps) {
  // Let's divide courts into groups to lay them out in an asymmetric visual sequence
  const featuredCourt = courts[0]; // Large high-contrast highlight card
  const secondaryCourts = courts.slice(1, 4); // Medium horizontal/asymmetric layout cards
  const outdoorCourts = courts.slice(4); // Outdoor cards in a balanced landscape grid

  return (
    <section id="canchas" className="py-24 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with strong editorial design */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 block mb-2">Instalaciones Deportivas</span>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight leading-none">
              NUESTRAS CANCHAS
            </h2>
            <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 font-medium">
              Contamos con 6 canchas profesionales diseñadas bajo normativas internacionales para un rebote perfecto y la máxima seguridad en tus articulaciones.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <button
              onClick={onNavigateToBooking}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Consultar Disponibilidad
            </button>
          </div>
        </div>

        {/* Asymmetrical Layout */}
        <div className="space-y-12">
          
          {/* Row 1: High Highlight Feature (Asymmetric split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual media block */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group min-h-[320px] lg:min-h-[480px]">
              <img
                src={featuredCourt.image}
                alt={featuredCourt.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              {/* Badges on image */}
              <div className="absolute top-6 left-6 flex space-x-2">
                <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center">
                  <Award className="w-3 h-3 mr-1" /> RECOMENDADA
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-neutral-900/90 text-neutral-100 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm border border-neutral-800">
                  CUBIERTA PREMIUM
                </span>
              </div>
            </div>

            {/* Informational content block */}
            <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/80 p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Cancha Insignia</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 dark:text-white uppercase leading-none">
                  {featuredCourt.name}
                </h3>
                
                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  Nuestra Cancha 1 es el corazón cubierto de Quento Club. Equipada con el césped sintético azul de última generación utilizado en torneos mundiales, ofrece un agarre óptimo y un deslizamiento seguro.
                </p>

                {/* Detailed Features list */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {featuredCourt.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="p-1 rounded-md bg-blue-500/10 text-blue-500 mt-0.5">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">PRECIO DE TURNO</span>
                  <span className="text-xl font-black text-neutral-900 dark:text-white">${featuredCourt.priceHour.toLocaleString('es-AR')}</span>
                </div>

                <button
                  onClick={onNavigateToBooking}
                  className="px-6 py-3 bg-neutral-950 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Secondary covered courts (Horizontal list with asymmetric card sizes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {secondaryCourts.map((court, i) => (
              <div
                key={court.id}
                className="group bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/60 rounded-2xl overflow-hidden flex flex-col h-full hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
              >
                {/* Media frame */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={court.image}
                    alt={court.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-neutral-900/80 text-white backdrop-blur-sm border border-neutral-800">
                      Cubierta
                    </span>
                  </div>
                </div>

                {/* Info and attributes */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase leading-tight group-hover:text-blue-500 transition-colors">
                      {court.name}
                    </h4>
                    
                    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      Estructura techada robusta para jugar sin preocuparse por la lluvia o el viento, disponible de 08 a 23 hs.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-semibold rounded">
                        Blindex 10mm
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-semibold rounded">
                        Iluminación LED
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                    <span className="text-sm font-black text-neutral-800 dark:text-neutral-200">
                      ${court.priceHour.toLocaleString('es-AR')}
                    </span>
                    <button
                      onClick={onNavigateToBooking}
                      className="text-xs font-extrabold uppercase tracking-widest text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Reservar →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Outdoor Courts (Landscape layout surrounded by greenery) */}
          <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-800/40 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Pádel al aire libre</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase">
                  CANCHAS DESCUBIERTAS AL PARQUE
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Ubicadas en nuestro sector parquizado, ideales para partidos diurnos y tardes espectaculares bajo el sol.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 px-3.5 py-1.5 rounded-lg uppercase tracking-wider">
                  Tarifas Promocionales
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outdoorCourts.map((court) => (
                <div
                  key={court.id}
                  className="bg-white dark:bg-neutral-950 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 flex flex-col sm:flex-row gap-5 items-stretch"
                >
                  <div className="sm:w-1/3 h-32 rounded-lg overflow-hidden relative shrink-0">
                    <img
                      src={court.image}
                      alt={court.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase leading-snug">
                        {court.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-normal">
                        Rodeadas de un gran espacio verde parquizado. Alfombra azul profesional con blindex y excelente sistema de luces para partidos nocturnos.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
                      <span className="text-sm font-black text-neutral-900 dark:text-white">
                        ${court.priceHour.toLocaleString('es-AR')}
                      </span>
                      <button
                        onClick={onNavigateToBooking}
                        className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider"
                      >
                        Reservar cancha →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
