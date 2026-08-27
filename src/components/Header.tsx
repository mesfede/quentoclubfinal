import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Instagram } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'El Club', id: 'el-club' },
    { name: 'Reservas', id: 'reservas' },
    { name: 'Torneos y clases', id: 'torneos' },
    { name: 'Contacto', id: 'contacto' },
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
            ? 'bg-white/90 backdrop-blur-md py-2 sm:py-2.5 shadow-lg border-b border-neutral-200/80'
            : 'bg-white/80 backdrop-blur-md py-3 sm:py-3.5 shadow-md border-b border-white/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between md:justify-center relative">
            
            {/* Centered Master Group on Desktop */}
            <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10">
              {/* Protagonist Larger Logo */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 group focus:outline-none py-1"
              >
                {!logoFailed ? (
                  <img 
                    src={images.quentoLogo} 
                    alt="Quento Club Logo" 
                    className="h-14 sm:h-20 md:h-24 max-w-[280px] sm:max-w-[360px] w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-sm"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#d21a23] flex items-center justify-center overflow-hidden shadow-md shadow-red-900/30">
                      <span className="relative font-display font-extrabold text-white text-2xl tracking-tight">Q</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-neutral-950 text-xl sm:text-2xl leading-none tracking-wider">
                        QUENTO
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#d21a23] font-bold leading-none mt-1">
                        Club de Pádel
                      </span>
                    </div>
                  </div>
                )}
              </a>

              {/* Desktop Navigation - With a tiny red dot separator between each button */}
              <nav className="hidden md:flex items-center space-x-3 lg:space-x-4">
                {navLinks.map((link, idx) => (
                  <div key={link.id} className="flex items-center">
                    {idx > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23] mx-2 lg:mx-3 shrink-0 opacity-80" />
                    )}
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className="text-neutral-800 hover:text-[#d21a23] transition-colors duration-200 text-base lg:text-[17px] font-extrabold tracking-tight cursor-pointer focus:outline-none relative py-1"
                    >
                      {link.name}
                    </button>
                  </div>
                ))}
              </nav>

              {/* Instagram Action Button close to the navigation bar */}
              <div className="hidden md:flex items-center pl-2">
                <a
                  href="https://instagram.com/quentoclub.padel"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 sm:p-2.5 rounded-full bg-neutral-950 hover:bg-[#d21a23] text-white hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center group"
                  aria-label="Instagram de Quento Club"
                  title="Seguinos en Instagram"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:rotate-6" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button + Quick Instagram Link */}
            <div className="flex items-center md:hidden space-x-2 absolute right-0">
              <a
                href="https://instagram.com/quentoclub.padel"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-neutral-950 hover:bg-[#d21a23] text-white transition-all shadow-sm"
                aria-label="Instagram de Quento Club"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-900 hover:bg-neutral-100 focus:outline-none transition-colors"
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
            className="fixed inset-0 z-40 md:hidden pt-24 pb-6 px-6 bg-white/98 backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left text-neutral-900 hover:text-[#d21a23] text-xl font-black tracking-tight py-2 border-b border-neutral-100 focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <a
                href="https://instagram.com/quentoclub.padel"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-neutral-950 hover:bg-[#d21a23] text-white text-sm font-bold uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Seguinos en @quentoclub.padel</span>
              </a>
              
              <div className="flex justify-center space-x-6 text-xs text-neutral-500 font-medium py-2">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-[#d21a23]" /> Villa Elisa</span>
                <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-[#d21a23]" /> +54 9 221 604-9987</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
