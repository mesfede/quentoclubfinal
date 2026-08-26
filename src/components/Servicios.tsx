import { ComponentType } from 'react';
import { Users, Award, ShoppingBag, Coffee, Flame, ShieldAlert, KeyRound, ParkingCircle, Sparkles } from 'lucide-react';

interface ServiceItem {
  icon: ComponentType<any>;
  title: string;
  description: string;
  badge?: string;
}

export default function Servicios() {
  const serviceList: ServiceItem[] = [
    {
      icon: Users,
      title: 'Clases Particulares y Grupales',
      description: 'Aprendé de cero o perfeccioná tus golpes técnicos con entrenadores calificados. Niveles inicial, intermedio y avanzado para damas, caballeros y niños.',
      badge: 'Todos los niveles'
    },
    {
      icon: Award,
      title: 'Torneos y Ligas Internas',
      description: 'Competí en ligas semanales y torneos de fin de semana con sistema de ascensos por categoría, premios de patrocinadores y rankings actualizados.',
      badge: 'Competitivo'
    },
    {
      icon: ShoppingBag,
      title: 'Showroom Pro-Shop',
      description: 'Encontrá lo último en equipamiento de pádel: palas profesionales de test, grips, indumentaria deportiva y tubos de pelotas en nuestra tienda oficial.',
      badge: 'Tienda Oficial'
    },
    {
      icon: Coffee,
      title: 'SUM & Cafetería Restobar',
      description: 'Un área climatizada confortable para relajarte, pedir café de especialidad, licuados o cervezas, conectarte al Wi-Fi o mirar torneos profesionales en vivo.',
      badge: 'Climatizado'
    },
    {
      icon: Flame,
      title: 'Quincho con Parrillas',
      description: 'Disfrutá del tradicional tercer tiempo. Disponemos de un amplio quincho semicubierto con asadores completos a disposición para asados en equipo.',
      badge: 'Sin cargo'
    },
    {
      icon: KeyRound,
      title: 'Vestuarios Individuales',
      description: 'Instalaciones sanitarias de primer nivel con duchas de agua caliente de alta presión, cambiadores cómodos y lockers para dejar tus pertenencias seguras.',
      badge: 'Premium'
    },
    {
      icon: ParkingCircle,
      title: 'Estacionamiento Privado',
      description: 'Dejá tu vehículo con total tranquilidad. Contamos con un predio cerrado exclusivo para socios dentro del complejo con seguridad integrada.',
      badge: 'Gratuito'
    },
    {
      icon: Sparkles,
      title: 'Alquiler de Paletas y Pelotas',
      description: '¿No tenés pala o te olvidaste las pelotas? Alquilá palas de test de las mejores marcas y comprá tubos presurizados nuevos en el mostrador.',
      badge: 'Accesorios'
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-600 block mb-2">Servicios y Comodidades</span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            ¿QUÉ PUEDO HACER EN QUENTO?
          </h2>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400 font-medium">
            Ofrecemos un ecosistema de servicios integrales para que vivas el pádel no solo como un deporte, sino como un estilo de vida social y activo.
          </p>
        </div>

        {/* Dynamic Services Grid (Highly structured, beautiful cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceList.map((srv, index) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon container */}
                    <div className="p-3 rounded-xl bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Tiny badge */}
                    {srv.badge && (
                      <span className="text-[9px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 font-bold uppercase rounded-md tracking-wider">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-wide leading-tight mb-2.5">
                    {srv.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-50 dark:border-neutral-900/40 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center">
                  Saber más <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom micro CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/10">
          <div>
            <h4 className="text-lg font-black uppercase tracking-tight">¿Querés tomar clases de pádel en Quento Club?</h4>
            <p className="text-xs text-blue-100 mt-1 font-semibold">Coordiná días y horarios directamente con nuestros profesores vía WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/5492216049987?text=Hola!%20Quiero%20consultar%20por%20clases%20de%20padel%20individuales%20o%20grupales%20en%20Quento%20Club."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-neutral-50 text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center"
          >
            Contactar Profesores
          </a>
        </div>

      </div>
    </section>
  );
}
