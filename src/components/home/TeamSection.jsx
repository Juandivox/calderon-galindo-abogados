import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Mail, Linkedin } from 'lucide-react'
import { teamMembers } from '../../data/team'
import { useCarousel } from '../../hooks/useCarousel'
import SectionHeader from '../ui/SectionHeader'

const homeMembers = teamMembers.filter((m) => m.showOnHome)
const CARDS_PER_VIEW = 3

export default function TeamSection() {
  const { current, totalSlides, handlePrev, handleNext, handleGoTo } = useCarousel(
    homeMembers.length,
    CARDS_PER_VIEW,
  )

  const offset = -(current * 100)

  return (
    <section id="team" className="py-16 lg:py-24 bg-marfil">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Nuestro equipo"
          title="Profesionales comprometidos con su caso"
          align="center"
        />
        <div className="mt-16" />

        <div className="relative">
          {/* Carrusel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${offset}%)` }}
            >
              {homeMembers.map((member) => (
                <div key={member.slug} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-blanco-puro rounded-2xl p-6 shadow-xl ring-1 ring-niebla border-0 hover:shadow-2xl transition duration-300 card-hover flex flex-col h-full">
                    <div className="flex justify-center mb-4">
                      <img
                        src={member.shortPhoto}
                        alt={member.name}
                        className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-verde-institucional/50"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                    <h3 className="font-titulo text-2xl font-semibold text-center mb-1 text-negro-profundo">
                      {member.name}
                    </h3>
                    <p className="font-cuerpo text-verde-profundo text-center mb-3 text-lg font-medium">
                      {member.position}
                    </p>
                    <p className="font-cuerpo text-gray-700 text-sm mb-4 leading-relaxed flex-grow">
                      {member.summary}
                    </p>
                    {member.showOnTeamPage && (
                      <Link
                        to="/equipo"
                        className="btn-secundario mt-auto w-full"
                      >
                        Conocer más
                      </Link>
                    )}
                    <div className="flex justify-center space-x-4 text-negro-profundo">
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-verde-institucional transition duration-300"
                        title="Enviar correo"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-verde-institucional transition duration-300"
                        title="Ver perfil de LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flechas */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-0 bg-verde-institucional/20 hover:bg-verde-institucional/40 text-verde-institucional p-2 lg:p-3 rounded-full transition duration-300 shadow-lg backdrop-blur-sm z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 -translate-x-2 lg:translate-x-0 bg-verde-institucional/20 hover:bg-verde-institucional/40 text-verde-institucional p-2 lg:p-3 rounded-full transition duration-300 shadow-lg backdrop-blur-sm z-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => handleGoTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-verde-institucional w-8' : 'bg-verde-institucional/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
