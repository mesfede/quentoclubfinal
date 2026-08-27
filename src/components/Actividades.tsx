import { Trophy, Users, Award, ExternalLink, Sparkles } from 'lucide-react';

export default function Actividades() {
  const cards = [
    {
      id: 'torneos',
      icon: Trophy,
      badge: 'Competencia Oficial',
      title: 'Torneos Open & Ligas',
      subtitle: '4ta a 7ma categoría • Damas y Caballeros',
      features: [
        'Premios, trofeos e indumentaria',
        'Partidos garantizados y zonas',
        '6 canchas de blindex techadas',
      ],
      ctaText: 'Inscribirme al Torneo',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Quento!%20Quiero%20inscribirme%20al%20próximo%20torneo',
      highlight: true,
    },
    {
      id: 'clases',
      icon: Award,
      badge: 'Personalizado',
      title: 'Clases Particulares',
      subtitle: 'Individuales o en pareja',
      features: [
        'Profesores federados certificados',
        'Corrección técnica y táctica de golpes',
        'Horarios flexibles mañana y noche',
      ],
      ctaText: 'Consultar Horarios',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Quento!%20Quisiera%20consultar%20por%20clases%20particulares',
      highlight: false,
    },
    {
      id: 'escuela',
      icon: Users,
      badge: 'Grupos Reducidos',
      title: 'Escuela & Clínicas',
      subtitle: 'Todos los niveles y edades',
      features: [
        'Máximo 4 alumnos por pista',
        'Dinámicas y situaciones de juego real',
        'Preparación física y torneos internos',
      ],
      ctaText: 'Sumarme a Escuela',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Quento!%20Quiero%20sumarme%20a%20la%20escuela%20de%20pádel',
      highlight: false,
    },
  ];

  return (
    <section id="torneos" className="py-16 sm:py-24 bg-neutral-950 text-white scroll-mt-20 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
            COMPETÍ Y <span className="text-[#d21a23]">PERFECCIONÁ</span> TU JUEGO
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-medium">
            Torneos oficiales, ligas continuas y entrenamiento con profesores federados.
          </p>
        </div>

        {/* 3 Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  card.highlight
                    ? 'bg-neutral-900/90 border-2 border-[#d21a23] shadow-2xl shadow-red-950/40'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 shadow-xl'
                }`}
              >
                {/* Glow accent for highlighted card */}
                {card.highlight && (
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d21a23]/15 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Top row: badge & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        card.highlight
                          ? 'bg-[#d21a23] text-white'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {card.badge}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        card.highlight
                          ? 'bg-[#d21a23]/20 text-[#d21a23]'
                          : 'bg-neutral-800 text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-6">
                    {card.subtitle}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d21a23] mr-2.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    card.highlight
                      ? 'bg-[#d21a23] hover:bg-[#b5141c] text-white shadow-lg shadow-red-950/60'
                      : 'bg-neutral-950 hover:bg-[#d21a23] text-white border border-neutral-800'
                  }`}
                >
                  <span>{card.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
