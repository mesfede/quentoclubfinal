import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronRight, Calendar } from 'lucide-react';
import { images } from '../assets';

interface ElClubProps {
  onNavigateToBooking: () => void;
}

interface FacilityItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  features: string[];
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'canchas',
    title: '6 Canchas Premium',
    tag: 'Blindex & Césped Monofilamento',
    image: images.quentoCanchaOk,
    description: 'Nuestras 6 pistas cubiertas de última generación cuentan con cerramiento de vidrio templado panorámico de 10mm y césped sintético monofilamento texturado con arena de sílice seleccionada para un pique perfecto.',
    features: ['100% Cubiertas techadas', 'Vidrio templado 10mm', 'Césped monofilamento pro', 'Espacios amplios entre canchas']
  },
  {
    id: 'servicios',
    title: 'Servicios Completos',
    tag: 'Bar, Vestuarios & Pro Shop',
    image: images.quentoBar,
    description: 'Espacio social pensado para relajarte después de cada partido. Contamos con cafetería, bar de bebidas y tercer tiempo, vestuarios completos con duchas de agua caliente y tienda con indumentaria y paletas.',
    features: ['Bar & Cafetería', 'Vestuarios con duchas', 'Pro Shop de Pádel', 'Espacio de Tercer Tiempo']
  },
  {
    id: 'iluminacion',
    title: 'Iluminación LED',
    tag: 'Visibilidad óptima sin sombras',
    image: images.quentoLugar,
    description: 'Sistema lumínico profesional diseñado específicamente para pistas de pádel bajo techo. Focos LED de alta potencia calibrados a la altura reglamentaria para evitar deslumbramientos durante globos y remates.',
    features: ['LED de alto rendimiento', 'Cero zonas de sombra', 'Sin deslumbramiento', 'Luz blanca natural']
  },
  {
    id: 'torneos',
    title: 'Clases & Torneos',
    tag: 'Ligas, Clases & Tercer Tiempo',
    image: images.complejo2,
    description: 'Comunidad activa durante toda la semana. Escuela de pádel para todos los niveles con entrenadores matriculados, ligas semanales nocturnas por categorías y grandes torneos abiertos de fin de semana.',
    features: ['Profesores certificados', 'Torneos por categorías', 'Ligas semanales con ascensos', 'Ambiente deportivo y familiar']
  }
];

export default function ElClub({ onNavigateToBooking }: ElClubProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  return (
    <section id="el-club" className="py-20 sm:py-28 bg-neutral-950 text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-none text-white whitespace-nowrap">
            NUESTRAS <span className="text-[#d21a23]">INSTALACIONES</span>
          </h2>
          <div className="w-16 h-1 bg-[#d21a23] mt-3.5 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
            Conocé nuestras canchas techadas de primer nivel, servicios y comodidades.
          </p>
        </div>

        {/* Asymmetric Bento Cards Grid */}
        <div className="space-y-6">
          
          {/* Row 1: Large Card (Left ~60-65%) + Smaller Card (Right ~35-40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: 6 Canchas Premium (Big Card - 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedFacility(FACILITIES[0])}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoCanchaOk} 
                alt="6 Canchas Premium Quento"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/60 text-white/70 group-hover:text-white group-hover:bg-[#d21a23] transition-all backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-[#d21a23] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 shadow-md">
                  Blindex & Césped Monofilamento
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  6 Canchas Premium
                </h3>
              </div>
            </motion.div>

            {/* Card 2: Bar, Vestuarios & Pro Shop (Smaller Card - 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedFacility(FACILITIES[1])}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoBar} 
                alt="Bar, Vestuarios & Pro Shop"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/60 text-white/70 group-hover:text-white group-hover:bg-[#d21a23] transition-all backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-neutral-950/80 border border-neutral-700 text-[#b9a791] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 backdrop-blur-sm">
                  Bar, Vestuarios & Pro Shop
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Servicios Completos
                </h3>
              </div>
            </motion.div>

          </div>

          {/* Row 2: Inverted Layout - Smaller Card (Left ~35-40%) + Large Card (Right ~60-65%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 3: Iluminación LED (Smaller Card - 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => setSelectedFacility(FACILITIES[2])}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoLugar} 
                alt="Iluminación LED Quento"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/60 text-white/70 group-hover:text-white group-hover:bg-[#d21a23] transition-all backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-neutral-950/80 border border-neutral-700 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 backdrop-blur-sm">
                  Visibilidad óptima sin sombras
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Iluminación LED
                </h3>
              </div>
            </motion.div>

            {/* Card 4: Clases & Torneos (Large Card - 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedFacility(FACILITIES[3])}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.complejo2} 
                alt="Ligas, Clases & Tercer Tiempo Quento"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/60 text-white/70 group-hover:text-white group-hover:bg-[#d21a23] transition-all backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-[#d21a23] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 shadow-md">
                  Ligas, Clases & Tercer Tiempo
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Clases & Torneos
                </h3>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-2xl rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl relative flex flex-col"
            >
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img 
                  src={selectedFacility.image} 
                  alt={selectedFacility.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#d21a23] text-white text-xs font-black uppercase tracking-wider mb-2">
                    {selectedFacility.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                    {selectedFacility.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {selectedFacility.description}
                </p>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#b9a791] mb-3">
                    Características destacadas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedFacility.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-xs text-neutral-200 bg-neutral-900/80 px-3 py-2 rounded-lg border border-neutral-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23] mr-2 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedFacility(null);
                      onNavigateToBooking();
                    }}
                    className="flex-1 py-3 bg-[#d21a23] hover:bg-[#b9a791] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar Cancha en Quento</span>
                  </button>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="py-3 px-6 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
