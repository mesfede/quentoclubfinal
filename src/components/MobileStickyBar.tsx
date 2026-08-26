import { useState, useEffect } from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileStickyBarProps {
  onNavigateToBooking: () => void;
}

export default function MobileStickyBar({ onNavigateToBooking }: MobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Visible after they scroll past the Hero section
      if (window.scrollY > window.innerHeight - 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 dark:bg-neutral-950/95 border-t border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-md px-4 py-3.5 flex items-center justify-between shadow-2xl"
        >
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-neutral-400 leading-none">QUENTO CLUB</span>
            <span className="text-xs font-black text-neutral-800 dark:text-neutral-100 mt-1 leading-none">Turnos de 90 min</span>
          </div>

          <div className="flex space-x-2 shrink-0">
            {/* Quick whatsapp and primary reservation button */}
            <a
              href="https://wa.me/5492216049987"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300"
              aria-label="WhatsApp Contact"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            
            <button
              onClick={onNavigateToBooking}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Cancha</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
