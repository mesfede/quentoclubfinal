import { motion } from 'motion/react';
import { Calendar, ChevronDown, Play, Shield } from 'lucide-react';
import { images, videos } from '../assets';

interface HeroProps {
  onNavigateToBooking: () => void;
  onNavigateToExplore: () => void;
}

export default function Hero({ onNavigateToBooking, onNavigateToExplore }: HeroProps) {
  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={images.heroBg}
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          {/* Vite imported local placeholder */}
          <source src={videos.heroVideo} type="video/mp4" />
          {/* Sports background video stream to enrich the actual visual flow in live preview */}
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=2b1464c2f42a59f5165dc6dfcf7e33e9b08b3e8e&profile_id=170&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        {/* Layer of contrast/overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Club badge banner */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 animate-pulse">
            <Shield className="w-3.5 h-3.5" />
            <span>Club Deportivo Premium • Villa Elisa</span>
          </div>

          {/* Epic Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl leading-tight uppercase tracking-tight max-w-5xl">
            SENTÍ EL PÁDEL EN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              TU MÁXIMO NIVEL
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="mt-6 text-sm sm:text-lg md:text-xl text-neutral-300 font-medium max-w-2xl tracking-wide leading-relaxed">
            Disfrutá de las mejores canchas cubiertas y descubiertas, showroom oficial, restobar climatizado, estacionamiento privado y la comunidad de pádel más activa de la región.
          </p>

          {/* Court Metrics Summary */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-neutral-400 tracking-wider uppercase">
            <span>6 Canchas Premium</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span>Alfombra Azul</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span>Vidrios Blindex</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span>Estacionamiento</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={onNavigateToBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.03] shadow-xl shadow-blue-900/40 cursor-pointer focus:outline-none"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Reservar Cancha
            </button>
            <button
              onClick={onNavigateToExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 hover:border-neutral-500 text-white font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Conocer Quento
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase mb-2 animate-pulse">
          Deslizar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-1 rounded-full border border-neutral-800 cursor-pointer"
          onClick={onNavigateToExplore}
        >
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </div>
    </section>
  );
}
