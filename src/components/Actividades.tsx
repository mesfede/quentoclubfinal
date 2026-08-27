import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users, Shield, Calendar, Award, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Actividades() {
  const [activeTab, setActiveTab] = useState<'torneos' | 'clases'>('torneos');

  return (
    <section id="torneos" className="py-20 sm:py-28 bg-neutral-950 text-white scroll-mt-20 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-none text-white">
            COMPETÍ Y <span className="text-[#d21a23]">PERFECCIONÁ</span> TU JUEGO
          </h2>
          <div className="w-16 h-1 bg-[#d21a23] mt-3.5 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
            Sumate a nuestros torneos oficiales por categorías o entrená con profesores certificados en nuestras canchas de blindex.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-3 mb-10">
          <button
            onClick={() => setActiveTab('torneos')}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'torneos'
                ? 'bg-[#d21a23] text-white shadow-lg shadow-red-950/50'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-850'
            }`}
          >
            Torneos & Ligas
          </button>
          <button
            onClick={() => setActiveTab('clases')}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'clases'
                ? 'bg-[#d21a23] text-white shadow-lg shadow-red-950/50'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-850'
            }`}
          >
            Escuela & Clases
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'torneos' ? (
            <motion.div
              key="torneos-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Featured Tournament Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#d21a23]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Status and Date */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-md bg-[#d21a23]/20 border border-[#d21a23]/40 text-[#d21a23] text-[11px] font-black uppercase tracking-wider">
                      Inscripciones Abiertas • Cupos Limitados
                    </span>
                    <span className="text-xs font-bold text-[#b9a791] uppercase tracking-wider flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#b9a791]" />
                      Fin de Semana del Mes
                    </span>
                  </div>

                  {/* Title and Pitch */}
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mb-4">
                    Gran Torneo Quento Open
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                    Llegó la edición especial de nuestro torneo por zonas y llaves de eliminación directa. Partidos garantizados, hidratación incluida, servicio de confitería y el mejor ambiente de pádel de La Plata.
                  </p>

                  {/* 3 Metric Information Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 sm:p-5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b9a791] block mb-1">
                        Categorías
                      </span>
                      <p className="text-lg font-black text-white">4ta, 5ta, 6ta y 7ma</p>
                      <p className="text-xs text-neutral-400 mt-0.5">Caballeros / Damas</p>
                    </div>

                    <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 sm:p-5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b9a791] block mb-1">
                        Premios
                      </span>
                      <p className="text-lg font-black text-white">Paletas & Vouchers</p>
                      <p className="text-xs text-neutral-400 mt-0.5">Indumentaria + Trofeos</p>
                    </div>

                    <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 sm:p-5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b9a791] block mb-1">
                        Sede 100% Cubierta
                      </span>
                      <p className="text-lg font-black text-white">6 Pistas Blindex</p>
                      <p className="text-xs text-neutral-400 mt-0.5">No se suspende por lluvia</p>
                    </div>
                  </div>

                  {/* Action Banner */}
                  <div className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-neutral-300 font-semibold text-center md:text-left">
                      ¿Querés sumar a tu pareja? Consultá reglamento y fixture disponible.
                    </p>
                    <a
                      href="https://wa.me/5492216049987?text=Hola%20Quento!%20Quiero%20inscribir%20mi%20pareja%20para%20el%20Gran%20Torneo%20Quento%20Open"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full md:w-auto px-6 py-3.5 bg-[#d21a23] hover:bg-[#b9a791] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                    >
                      <span>Inscribir Pareja por WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Ligas Semanales Card */}
              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#d21a23] block mb-1">
                      Competencia Continua
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight mb-2">
                      Ligas Semanales
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed">
                      Además de los torneos relámpago de fin de semana, organizamos ligas nocturnas con ascensos y descensos mensuales.
                    </p>
                    
                    <ul className="space-y-2 text-xs text-neutral-300">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d21a23] shrink-0" />
                        <span>Pelotas oficiales provistas por el club.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d21a23] shrink-0" />
                        <span>Transmisión y cobertura en fotos en Instagram.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d21a23] shrink-0" />
                        <span>Tercer tiempo con pizzas y cervezas en nuestro bar.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="shrink-0">
                    <a
                      href="https://instagram.com/quentoclub.padel"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-neutral-950 hover:bg-[#d21a23] text-white text-xs font-black uppercase tracking-wider border border-neutral-800 transition-colors"
                    >
                      <span>Seguí los fixtures en @quento.club</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="clases-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Classes Card 1: Individuales */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-md bg-[#d21a23]/20 text-[#d21a23] text-[10px] font-black uppercase tracking-wider inline-block mb-3">
                    Personalizado
                  </span>
                  <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-2">
                    Clases Particulares & En Pareja
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    Entrenamiento técnico y táctico enfocado en corregir golpes, posicionamiento de pared, volea, bandeja y remate. Profesores federados de nivel profesional.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-300 mb-6">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23]" />
                      <span>Análisis de video y corrección biomecánica</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23]" />
                      <span>Horarios matutinos y vespertinos flexibles</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23]" />
                      <span>Pelotas y canasto profesional provistos</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/5492216049987?text=Hola%20Quento!%20Quisiera%20consultar%20por%20clases%20particulares%20de%20pádel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#d21a23] hover:bg-[#b9a791] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors text-center block"
                >
                  Consultar Disponibilidad de Clases
                </a>
              </div>

              {/* Classes Card 2: Escuela Grupal */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-md bg-neutral-800 text-[#b9a791] text-[10px] font-black uppercase tracking-wider inline-block mb-3">
                    Escuelita & Grupos
                  </span>
                  <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-2">
                    Escuela Formativa & Clínicas
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    Grupos reducidos por nivel de juego para principiantes, intermedios y avanzados. Dinámica de juego real, situaciones de partido y preparación física.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-300 mb-6">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b9a791]" />
                      <span>Máximo 4 alumnos por cancha</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b9a791]" />
                      <span>Metodología dinámica de juego y drills</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b9a791]" />
                      <span>Torneos internos de escuela periódicos</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/5492216049987?text=Hola%20Quento!%20Quisiera%20consultar%20por%20la%20escuela%20grupal%20de%20pádel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-neutral-950 hover:bg-[#d21a23] text-white text-xs font-black uppercase tracking-wider rounded-xl border border-neutral-800 transition-colors text-center block"
                >
                  Sumarme a Grupo Formativo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
