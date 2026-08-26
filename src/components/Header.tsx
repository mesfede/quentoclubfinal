import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Menu, X, Phone, Trophy, MapPin, Eye } from 'lucide-react';
import { images } from '../assets';

interface HeaderProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onNavigateToBooking, onNavigateToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Canchas', id: 'canchas' },
    { name: 'Instalaciones', id: 'instalaciones' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Actividades', id: 'actividades' },
    { name: 'Ubicación', id: 'ubicacion' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-900/95 backdrop-blur-md py-3 shadow-lg border-b border-neutral-800'
            : 'bg-gradient-to-b from-neutral-950/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Quento Club Logo" 
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <>
                  <div className="relative w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
                    <span className="relative font-display font-extrabold text-white text-lg tracking-tight">Q</span>
                    {/* Subtle tennis ball accent */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-white text-lg sm:text-xl leading-none tracking-wider">
                      QUENTO
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold leading-none mt-0.5">
                      Club de Pádel
                    </span>
                  </div>
                </>
              )}
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-semibold tracking-wide cursor-pointer focus:outline-none relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* CTA / Quick Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onNavigateToBooking}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] shadow-md shadow-blue-900/30 cursor-pointer focus:outline-none"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reservar Cancha
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden space-x-2">
              <button
                onClick={onNavigateToBooking}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                Reservar
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-20 pb-6 px-4 bg-neutral-950/98 backdrop-blur-lg flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-5 pt-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left text-neutral-200 hover:text-white text-lg font-bold tracking-wide py-2 border-b border-neutral-900 focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToBooking();
                }}
                className="w-full py-4 rounded-xl bg-blue-600 text-white text-base font-bold uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Reservar Cancha en Línea</span>
              </button>
              
              <div className="flex justify-center space-x-6 text-xs text-neutral-500 font-medium py-2">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" /> Villa Elisa</span>
                <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-blue-500" /> +54 9 221 604-9987</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
