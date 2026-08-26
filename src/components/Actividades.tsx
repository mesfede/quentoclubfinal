import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clubActivities } from '../data/mockData';
import { Calendar, Award, Trophy, Users, CheckCircle, AlertCircle, X } from 'lucide-react';
import { ClubActivity } from '../types';

export default function Actividades() {
  const [selectedActivity, setSelectedActivity] = useState<ClubActivity | null>(null);
  const [enrollName, setEnrollName] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEnrollSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!enrollName || !enrollPhone) return;
    setIsSuccess(true);
    setTimeout(() => {
      setSelectedActivity(null);
      setIsSuccess(false);
      setEnrollName('');
      setEnrollPhone('');
      alert('¡Inscripción recibida! Nos comunicaremos con vos por WhatsApp a la brevedad para finalizar los detalles.');
    }, 1000);
  };

  return (
    <section id="actividades" className="py-24 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 block mb-2">Comunidad Activa</span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            ACTIVIDADES Y EVENTOS
          </h2>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 font-medium">
            Sumate a nuestros campeonatos semanales, clínicas de perfeccionamiento técnico con entrenadores de renombre y ligas organizadas.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clubActivities.map((act) => {
            const isOpen = act.status === 'Abiertas';
            const isSoon = act.status === 'Próximamente';
            
            return (
              <div
                key={act.id}
                className="bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-md"
              >
                <div>
                  {/* Category Pill and Status */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] px-2.5 py-1 font-black uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {act.category === 'torneo' ? '🏆 Torneo' : act.category === 'clase' ? '🎾 Clínica' : '📅 Evento'}
                    </span>

                    {isOpen && (
                      <span className="text-[10px] px-2.5 py-1 font-black uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Inscripción Abierta
                      </span>
                    )}
                    {isSoon && (
                      <span className="text-[10px] px-2.5 py-1 font-black uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        Próximamente
                      </span>
                    )}
                  </div>

                  {/* Title & Info */}
                  <h3 className="text-lg sm:text-xl font-display font-black text-neutral-900 dark:text-white uppercase leading-snug">
                    {act.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-blue-500" />
                      <span>{act.date}</span>
                    </div>
                    {act.price && (
                      <div className="flex items-center">
                        <Trophy className="w-3.5 h-3.5 mr-2 text-blue-500" />
                        <span>Valor: {act.price}</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 pt-4">
                    {act.description}
                  </p>
                </div>

                {/* CTA Action */}
                <div className="mt-8">
                  {isOpen ? (
                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Inscribirse en Línea
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 font-extrabold text-xs uppercase tracking-wider cursor-not-allowed"
                    >
                      Cupos Cerrados
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Sheet for Registration Enrollment */}
        <AnimatePresence>
          {selectedActivity && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl"
              >
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <span className="text-[10px] px-2 py-1 font-black uppercase tracking-wider rounded bg-blue-500/10 text-blue-600">
                    Formulario de Inscripción
                  </span>
                  <h3 className="text-xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight mt-2.5">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Completá el formulario para reservar tu lugar. Te contactaremos por WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={enrollName}
                      onChange={(e) => setEnrollName(e.target.value)}
                      placeholder="Ej: Marcos Albornoz"
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-transparent text-sm focus:outline-none focus:border-blue-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-2">Teléfono de Contacto (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={enrollPhone}
                      onChange={(e) => setEnrollPhone(e.target.value)}
                      placeholder="Ej: +54 9 221 555-1234"
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-transparent text-sm focus:outline-none focus:border-blue-500 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Enviar Inscripción
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
