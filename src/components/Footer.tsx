import { MouseEvent, useState } from 'react';
import { Calendar, Shield, Instagram, Facebook, Phone, Mail, MapPin, ChevronUp } from 'lucide-react';
import { images } from '../assets';

interface FooterProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToBooking, onNavigateToSection }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  const handleBackToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const localKeywords = [
    'Pádel Villa Elisa',
    'Reservar Cancha La Plata',
    'Canchas Cubiertas de Pádel',
    'Quento Club Pádel',
    'Pádel City Bell',
    'Césped Sintético Azul',
    'Blindex',
    'Clases de Pádel La Plata',
    'Torneos de Pádel Buenos Aires'
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900">
      
      {/* 1. Final Action CTA block */}
      <div className="relative py-20 overflow-hidden border-b border-neutral-900">
        {/* Decorative dynamic abstract ambient lighting grids */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_40%)]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 block mb-2">Comenzá a jugar</span>
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase tracking-tight leading-none mb-6">
            ¿LISTO PARA ENTRAR <br />A LA CANCHA?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed mb-8">
            Seleccioná tu fecha, elegí el horario que mejor te convenga y reservá en menos de un minuto sin registrarte de forma complicada.
          </p>

          <button
            onClick={onNavigateToBooking}
            className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            <Calendar className="w-5 h-5 mr-3" />
            RESERVAR TURNO EN LÍNEA
          </button>
        </div>
      </div>

      {/* 2. Structured Information Directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Main profile brand summary (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <a
              href="#"
              onClick={handleBackToTop}
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
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="font-display font-black text-white text-base">Q</span>
                  </div>
                  <span className="font-display font-black text-white text-lg tracking-wider">
                    QUENTO CLUB
                  </span>
                </>
              )}
            </a>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">
              El club de pádel líder de Villa Elisa. Infraestructura deportiva de primer nivel concebida para brindar la mejor experiencia competitiva y de camaradería de la zona.
            </p>

            <div className="space-y-3.5 text-xs font-semibold text-neutral-400">
              <a href="https://wa.me/5492216049987" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
                <span>+54 9 221 604-9987</span>
              </a>
              <a href="mailto:info@quentoclub.com.ar" className="flex items-center hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
                <span>contacto@quentoclub.com.ar</span>
              </a>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
                <span>Camino Centenario 8907, Villa Elisa</span>
              </span>
            </div>
          </div>

          {/* Quick Shortcuts (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Navegación</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs font-bold">
              {[
                { name: 'Canchas', id: 'canchas' },
                { name: 'Instalaciones', id: 'instalaciones' },
                { name: 'Servicios', id: 'servicios' },
                { name: 'Actividades', id: 'actividades' },
                { name: 'Ubicación', id: 'ubicacion' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateToSection(item.id)}
                  className="text-left text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Local SEO optimization blocks (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
              <Shield className="w-4 h-4 mr-1 text-blue-500" />
              Búsquedas de Pádel Locales
            </h4>
            <p className="text-[11px] text-neutral-500 leading-normal font-medium">
              Quento Club está preparado y optimizado para búsquedas regionales y locales dentro de la zona norte de La Plata y alrededores:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {localKeywords.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded bg-neutral-900 border border-neutral-800 text-neutral-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Social indices & Legal copyright footer */}
        <div className="mt-16 pt-8 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <p className="text-neutral-600">
            © {new Date().getFullYear()} Quento Club Pádel. Todos los derechos reservados. Rediseño Profesional Premium.
          </p>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/quentoclub.padel"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-blue-600 text-neutral-500 hover:text-white rounded-lg transition-all"
                aria-label="Instagram de Quento Club"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 hover:bg-blue-600 text-neutral-500 hover:text-white rounded-lg transition-all"
                aria-label="Facebook de Quento Club"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={handleBackToTop}
              className="p-2 bg-neutral-900 hover:bg-blue-600 text-neutral-500 hover:text-white rounded-lg transition-all cursor-pointer flex items-center"
              aria-label="Volver arriba"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
