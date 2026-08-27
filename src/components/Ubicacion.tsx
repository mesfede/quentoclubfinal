import { MapPin, Clock, Phone, Navigation, Share2, Compass } from 'lucide-react';

export default function Ubicacion() {
  const mapQueryUrl = 'https://www.google.com/maps/place/Quento+Club+Padel/@-34.8565576,-58.0750761,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e6396e94a8f9:0xe96d91f24d7768a8!8m2!3d-34.856562!4d-58.0725012!16s%2Fg%2F11p6700f1h?entry=ttu';
  
  // Real embedded map for Quento Club Padel, Villa Elisa
  const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.487823547844!2d-58.0776510234125!3d-34.856557570417015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e6396e94a8f9%3A0xe96d91f24d7768a8!2sQuento%20Club%20Padel!5e0!3m2!1ses-419!2sar!4v1710000000000';

  return (
    <section id="contacto" className="py-24 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout container grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d21a23] block mb-2">¿Cómo llegar?</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight leading-none mb-6">
                CONTACTO Y HORARIOS
              </h2>
              
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-10">
                Estamos ubicados en una zona estratégica y accesible de Villa Elisa. Contamos con un predio seguro de facil acceso desde La Plata, City Bell y la autopista Buenos Aires - La Plata.
              </p>

              {/* Detail cards list */}
              <div className="space-y-6">
                
                {/* 1. Direccion */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-[#d21a23]/5 text-[#d21a23] border border-[#d21a23]/10 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">DIRECCIÓN</h4>
                    <p className="text-base font-bold text-neutral-800 dark:text-white mt-1 leading-snug">
                      Camino Centenario N° 8907
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">
                      Frente al Parque Ecológico • Villa Elisa, La Plata
                    </p>
                  </div>
                </div>

                {/* 2. Horarios */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-[#d21a23]/5 text-[#d21a23] border border-[#d21a23]/10 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">HORARIO DE ATENCIÓN</h4>
                    <p className="text-base font-bold text-neutral-800 dark:text-white mt-1 leading-snug">
                      Todos los días • 08:00 a 00:00 hs
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">
                      Feriados y fines de semana inclusive
                    </p>
                  </div>
                </div>

                {/* 3. Indicaciones de acceso */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-[#d21a23]/5 text-[#d21a23] border border-[#d21a23]/10 shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">CÓMO ACCEDER</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1 leading-relaxed">
                      Llegando por Camino Centenario desde City Bell, nos encontrás a mano izquierda justo enfrente del ingreso principal al Parque Ecológico. Amplio portón de entrada y estacionamiento privado gratis.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile-friendly Google Maps CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href={mapQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-neutral-950 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-[#d21a23] dark:hover:bg-[#d21a23] hover:text-white dark:hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Cómo llegar con GPS
              </a>
              <a
                href="https://wa.me/5492216049987?text=Hola!%20Quiero%20consultar%20una%20duda%20sobre%20c%C3%B3mo%20llegar%20o%20los%20horarios%20del%20club."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 font-extrabold text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar al club
              </a>
            </div>
          </div>

          {/* Interactive map side (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-950 p-3 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-lg min-h-[350px] lg:min-h-[480px] flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden relative border border-neutral-100 dark:border-neutral-900">
              <iframe
                title="Quento Club Map"
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            
            <div className="p-4 flex items-center justify-between text-xs text-neutral-400 font-bold bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900 rounded-b-xl">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-[#d21a23]" /> Camino Centenario 8907</span>
              <a
                href={mapQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#d21a23] hover:text-[#b9a791] hover:underline inline-flex items-center transition-colors"
              >
                Ver pantalla completa <Share2 className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
