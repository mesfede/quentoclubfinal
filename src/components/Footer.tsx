import { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ExternalLink, Instagram, Navigation, Clock, Compass } from 'lucide-react';
import { images } from '../assets';
import quentoFooter from '../assets/images/quento_footer.jpg';

interface FooterProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToBooking, onNavigateToSection }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const mapQueryUrl = 'https://www.google.com/maps/place/Quento+Club+Padel/@-34.8565576,-58.0750761,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e6396e94a8f9:0xe96d91f24d7768a8!8m2!3d-34.856562!4d-58.0725012!16s%2Fg%2F11p6700f1h?entry=ttu';
  const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.487823547844!2d-58.0776510234125!3d-34.856557570417015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e6396e94a8f9%3A0xe96d91f24d7768a8!2sQuento%20Club%20Padel!5e0!3m2!1ses-419!2sar!4v1710000000000';

  return (
    <footer 
      id="contacto" 
      className="relative overflow-hidden bg-[#B9A791] text-neutral-900 pt-16 pb-12 transition-colors scroll-mt-20"
    >
      {/* Fondo de imagen con más presencia y transparencia (textura) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.24] pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url(${quentoFooter})` }}
      />
      
      {/* Degradé de transición de alta costura para fundir a negro con la sección superior */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-neutral-950 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Integrated Ubicación & Cómo Llegar Compact Block */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-14 shadow-2xl border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#d21a23]">UBICACIÓN</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-1">
                  ¿CÓMO LLEGAR?
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#d21a23] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">Camino Centenario N° 8907</p>
                    <p className="text-neutral-400 text-xs">Frente al Parque Ecológico • Villa Elisa, La Plata</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#d21a23] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">Todos los días: 08:00 a 00:00 hs</p>
                    <p className="text-neutral-400 text-xs">Fines de semana y feriados inclusive</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Compass className="w-5 h-5 text-[#d21a23] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-300 text-xs font-medium leading-relaxed">
                      Fácil acceso desde City Bell y Autopista. Portón de ingreso seguro y amplio estacionamiento privado gratuito.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={mapQueryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#d21a23] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  Abrir en Google Maps (GPS)
                </a>
                <a
                  href="https://wa.me/5492216049987"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-[#d21a23]" />
                  (221) 604-9987
                </a>
              </div>
            </div>

            {/* Compact Interactive Map (7 cols) */}
            <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden border border-neutral-800 shadow-inner relative">
              <iframe
                title="Quento Club Map"
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>

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
                <span>Camino Centenario 8907, Villa Elisa</span>
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
