import { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ExternalLink, Instagram } from 'lucide-react';
import { images } from '../assets';

interface FooterProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToBooking, onNavigateToSection }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="bg-[#b8a791] text-neutral-900 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Columns Master Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14">
          
          {/* Column 1: Brand & Badge (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group focus:outline-none"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Quento Club Logo" 
                  className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-[#d21a23] flex items-center justify-center shadow-md">
                    <span className="font-display font-black text-white text-xl">Q</span>
                  </div>
                  <span className="font-display font-black text-neutral-950 text-xl tracking-wider">
                    QUENTO CLUB
                  </span>
                </div>
              )}
            </a>

            <p className="text-xs sm:text-[13px] text-neutral-900 leading-relaxed font-semibold max-w-sm">
              El club de pádel líder con 6 canchas cubiertas profesionales, césped de alta densidad, blindex, iluminación LED y el mejor ambiente deportivo y social.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-900/10 border border-neutral-900/15 text-neutral-950 text-[11px] font-black uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#d21a23] shrink-0" />
                <span>100% CANCHAS CUBIERTAS</span>
              </span>
            </div>
          </div>

          {/* Column 2: Contacto & Reservas (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-xl sm:text-2xl font-display font-black italic tracking-tight text-neutral-950 uppercase">
              CONTACTO & RESERVAS
            </h3>

            <div className="space-y-4 text-xs sm:text-[13px] font-bold text-neutral-900">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#d21a23] shrink-0" />
                <span>La Plata, Buenos Aires, Argentina</span>
              </div>

              <a 
                href="https://wa.me/5492216049987" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-3 text-neutral-950 hover:text-[#0f6f4d] transition-colors group"
              >
                <div className="w-4 h-4 text-[#0f6f4d] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 fill-emerald-800/20 text-[#0f6f4d]" />
                </div>
                <span className="underline underline-offset-4 font-extrabold">(221) 604-9987</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a 
                href="tel:+5492216049987" 
                className="flex items-center space-x-3 hover:text-neutral-950 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d21a23] shrink-0" />
                <span>+54 9 221 604-9987</span>
              </a>

              <a 
                href="mailto:contacto@quentoclub.com.ar" 
                className="flex items-center space-x-3 hover:text-neutral-950 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#d21a23] shrink-0" />
                <span>contacto@quentoclub.com.ar</span>
              </a>
            </div>
          </div>

          {/* Column 3: Comunidad (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-display font-black italic tracking-tight text-neutral-950 uppercase">
              COMUNIDAD
            </h3>

            <p className="text-xs sm:text-[13px] text-neutral-900 font-semibold leading-relaxed mb-4">
              Enterate de los próximos torneos, clínicas, eventos y novedades diarias en nuestras redes.
            </p>

            <div className="space-y-3">
              {/* Instagram Card Button */}
              <a
                href="https://instagram.com/quentoclub.padel"
                target="_blank"
                rel="noreferrer"
                className="bg-white/90 hover:bg-white p-3.5 rounded-2xl shadow-sm border border-neutral-300/60 flex items-center justify-between transition-all duration-200 hover:scale-[1.01] group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {/* Instagram Gradient Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-black text-xs sm:text-sm text-neutral-950 uppercase tracking-tight">
                      @QUENTO.CLUB
                    </span>
                    <span className="text-[11px] text-neutral-600 font-medium leading-none mt-1">
                      Seguinos en Instagram
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </a>

              {/* WhatsApp Card Button */}
              <a
                href="https://wa.me/5492216049987"
                target="_blank"
                rel="noreferrer"
                className="bg-white/90 hover:bg-white p-3.5 rounded-2xl shadow-sm border border-neutral-300/60 flex items-center justify-between transition-all duration-200 hover:scale-[1.01] group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {/* WhatsApp Green Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-black text-xs sm:text-sm text-neutral-950 uppercase tracking-tight">
                      QUENTOCLUB WHATSAPP
                    </span>
                    <span className="text-[11px] text-neutral-600 font-medium leading-none mt-1">
                      Atención al instante
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider and Copyright */}
        <div className="pt-8 border-t border-neutral-900/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-800">
          <p>
            © {new Date().getFullYear()} Quento Club. Todos los derechos reservados.
          </p>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigateToSection('el-club')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Instalaciones
            </button>
            <button
              onClick={onNavigateToBooking}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Reservas Online
            </button>
            <a
              href="https://instagram.com/quentoclub.padel"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-950 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
