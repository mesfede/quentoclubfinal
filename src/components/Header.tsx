import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { images } from '../assets';

interface HeaderProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onNavigateToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    onNavigateToSection(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none py-2 sm:py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center relative">
          
          {/* Centered Master Group with local glassy background scoped around content */}
          <div className={`transition-all duration-300 rounded-2xl sm:rounded-full px-3.5 sm:px-6 py-1 sm:py-1.5 shadow-lg border border-white/40 md:gap-6 lg:gap-8 ${
            isScrolled
              ? 'max-md:opacity-0 max-md:-translate-y-12 max-md:pointer-events-none max-md:scale-95 pointer-events-auto inline-flex items-center justify-center bg-white/75 backdrop-blur-xl border-neutral-200/60 shadow-neutral-900/10'
              : 'pointer-events-auto inline-flex items-center justify-center opacity-100 translate-y-0 scale-100 bg-white/65 backdrop-blur-lg border-white/50 shadow-black/10'
          }`}>
            {/* Protagonist Larger Logo with responsive scale */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center group focus:outline-none py-0.5"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Quento Club Logo" 
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-sm block ${
                    isScrolled 
                      ? 'h-12 sm:h-14 md:h-16 max-w-[220px] sm:max-w-[290px]' 
                      : 'h-18 sm:h-22 md:h-26 max-w-[300px] sm:max-w-[380px]'
                  }`}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex items-center justify-center space-x-2.5">
                  <div className={`rounded-xl bg-[#d21a23] flex items-center justify-center overflow-hidden shadow-md shadow-red-900/40 transition-all ${
                    isScrolled ? 'w-11 h-11' : 'w-14 h-14'
                  }`}>
                    <span className="font-display font-black text-white text-3xl tracking-tight">Q</span>
                  </div>
                  <span className="font-display font-black text-neutral-950 text-2xl sm:text-3xl tracking-wider">
                    QUENTO
                  </span>
                </div>
              )}
            </a>

            {/* Desktop Navigation - Glassy buttons with subtle red dot separators */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {navLinks.map((link, idx) => (
                <div key={link.id} className="flex items-center">
                  {idx > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23] mx-2 lg:mx-2.5 shrink-0 opacity-90 shadow-sm" />
                  )}
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-neutral-800 hover:text-[#d21a23] hover:bg-neutral-100/70 px-3 py-1.5 rounded-xl transition-all duration-200 font-extrabold tracking-tight cursor-pointer focus:outline-none relative ${
                      isScrolled ? 'text-sm lg:text-[15px]' : 'text-base lg:text-[17px]'
                    }`}
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </nav>

            {/* Instagram Action Button */}
            <div className="hidden md:flex items-center pl-1">
              <a
                href="https://instagram.com/quentoclub.padel"
                target="_blank"
                rel="noreferrer"
                className={`rounded-full bg-neutral-950 hover:bg-[#d21a23] text-white hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center group ${
                  isScrolled ? 'p-2' : 'p-2.5'
                }`}
                aria-label="Instagram de Quento Club"
                title="Seguinos en Instagram"
              >
                <Instagram className={`transition-transform group-hover:rotate-6 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
