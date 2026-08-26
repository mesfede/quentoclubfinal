import { motion } from 'motion/react';
import { clubInstallations } from '../data/mockData';

export default function Instalaciones() {
  return (
    <section id="instalaciones" className="py-24 bg-neutral-900 text-white overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title & Editorial focus */}
        <div className="max-w-3xl mb-20 relative">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-400 block mb-2">Mucho más que pádel</span>
          <h2 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tight leading-none">
            RECORRÉ LAS <br />
            <span className="text-neutral-400">INSTALACIONES</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mt-6" />
          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-medium leading-relaxed max-w-xl">
            Diseñamos cada sector pensando en la experiencia social y deportiva. Queremos que tu estadía antes, durante y después del partido sea de primer nivel.
          </p>
        </div>

        {/* Editorial Composition: Asymmetric Staggered blocks */}
        <div className="space-y-32">
          
          {/* Block 01: Showroom & Pro-Shop (Image Left, Overlay info offset Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Number background absolute watermarked */}
            <div className="absolute left-0 -top-16 text-[150px] sm:text-[220px] font-display font-black text-neutral-800/10 select-none leading-none z-0">
              01
            </div>

            {/* Media side */}
            <div className="lg:col-span-7 relative z-10 rounded-2xl overflow-hidden aspect-[4/3] group shadow-2xl">
              <img
                src={clubInstallations[0].image}
                alt={clubInstallations[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-neutral-950/20" />
            </div>

            {/* Info offset overlay block */}
            <div className="lg:col-span-5 lg:-ml-16 relative z-20 bg-neutral-950/90 border border-neutral-800 p-8 sm:p-10 rounded-2xl backdrop-blur-md shadow-2xl">
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest block mb-2">COMPRAS Y ASESORAMIENTO</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-4">
                {clubInstallations[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
                {clubInstallations[0].description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-neutral-900 flex space-x-6 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <span>• Palas Pro</span>
                <span>• Pelotas</span>
                <span>• Indumentaria</span>
              </div>
            </div>
          </div>

          {/* Block 02: Quincho & Parrillas (Image Right, Info offset Left) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Number background absolute watermarked */}
            <div className="absolute right-0 -top-16 text-[150px] sm:text-[220px] font-display font-black text-neutral-800/10 select-none leading-none z-0">
              02
            </div>

            {/* Info offset overlay block */}
            <div className="lg:col-span-5 lg:-mr-16 order-2 lg:order-1 relative z-20 bg-neutral-950/90 border border-neutral-800 p-8 sm:p-10 rounded-2xl backdrop-blur-md shadow-2xl">
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest block mb-2">TERCER TIEMPO Y ASADOS</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-4">
                {clubInstallations[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
                {clubInstallations[1].description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-neutral-900 flex space-x-6 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <span>• Gran Parrilla</span>
                <span>• Vajilla</span>
                <span>• Eventos</span>
              </div>
            </div>

            {/* Media side */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative z-10 rounded-2xl overflow-hidden aspect-[4/3] group shadow-2xl">
              <img
                src={clubInstallations[1].image}
                alt={clubInstallations[1].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-neutral-950/20" />
            </div>
          </div>

          {/* Block 03: SUM & Restobar (Centered Editorial block with deep negative space) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 text-[150px] sm:text-[220px] font-display font-black text-neutral-800/10 select-none leading-none z-0">
              03
            </div>

            <div className="lg:col-span-6 relative z-10 rounded-2xl overflow-hidden min-h-[300px] group shadow-2xl">
              <img
                src={clubInstallations[2].image}
                alt={clubInstallations[2].title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-neutral-950/10" />
            </div>

            <div className="lg:col-span-6 bg-neutral-950/50 border border-neutral-800/60 p-8 sm:p-12 rounded-2xl flex flex-col justify-between relative z-10">
              <div>
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest block mb-2">RELAX Y CAFETERÍA</span>
                <h3 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight mb-4">
                  {clubInstallations[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
                  {clubInstallations[2].description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-bold text-neutral-400 border-t border-neutral-800 pt-6">
                <div>
                  <span className="text-blue-500 block text-sm font-black mb-1">Café de Especialidad</span>
                  <span>Granos seleccionados y baristas profesionales.</span>
                </div>
                <div>
                  <span className="text-blue-500 block text-sm font-black mb-1">Premier Padel Live</span>
                  <span>Transmisiones en vivo de todos los torneos internacionales.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
