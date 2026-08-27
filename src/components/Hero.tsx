import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { images, videos } from '../assets';

interface HeroProps {
  onNavigateToBooking: () => void;
  onNavigateToExplore: () => void;
}

const SLIDES = [
  'RESERVA Y JUGÁ',
  '6 CANCHAS PROFESIONALES',
  'TU PASIÓN, TU CANCHA',
  'VIVI EL MEJOR PADEL'
];

export default function Hero({ onNavigateToBooking, onNavigateToExplore }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const titleVariants = {
    enter: {
      opacity: 0,
      x: 180,
      skewX: -20,
      scaleX: 1.25,
      filter: 'blur(10px)',
    },
    center: {
      opacity: 1,
      x: 0,
      skewX: 0,
      scaleX: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 22, duration: 0.45 },
        opacity: { duration: 0.3 },
        skewX: { duration: 0.35 },
        scaleX: { duration: 0.35 },
        filter: { duration: 0.3 }
      }
    },
    exit: {
      opacity: 0,
      x: -220,
      skewX: 25,
      scaleX: 1.35,
      filter: 'blur(12px)',
      transition: {
        x: { ease: [0.32, 0, 0.67, 0], duration: 0.35 },
        opacity: { duration: 0.25 },
        skewX: { duration: 0.3 },
        scaleX: { duration: 0.3 },
        filter: { duration: 0.25 }
      }
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950 pt-20 pb-12">
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
          {/* Main requested video */}
          <source src={videos.heroVideo} type="video/mp4" />
          {/* Fallback back up stream */}
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=2b1464c2f42a59f5165dc6dfcf7e33e9b08b3e8e&profile_id=170&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Layer of contrast/overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-10 flex flex-col items-center justify-center">
        {/* Dynamic Slide Container - Unmasked, sporty, fits in max 2 lines */}
        <div className="min-h-[90px] sm:min-h-[130px] md:min-h-[150px] flex items-center justify-center w-full relative px-2">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] uppercase tracking-tight max-w-4xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              {SLIDES[currentSlide]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Fixed bajada / Subtitle debajo de cada título */}
        <div className="max-w-2xl mt-4">
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-medium tracking-wide leading-relaxed drop-shadow">
            Disfrutá del mejor pádel en Quento Club. 6 canchas de primer nivel, disponibilidad inmediata y un ambiente inmejorable.
          </p>
        </div>

        {/* Buttons: Smaller 'Reservar ahora' and brown-toned 'Ver canchas' */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto px-4 sm:px-0 justify-center items-center">
          <button
            onClick={onNavigateToBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#d21a23] hover:bg-[#b9a791] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-950/50 cursor-pointer focus:outline-none"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reservar ahora
          </button>
          <button
            onClick={onNavigateToExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#b9a791] hover:bg-[#a3917b] text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-black/30 cursor-pointer focus:outline-none"
          >
            Ver Canchas
          </button>
        </div>
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
