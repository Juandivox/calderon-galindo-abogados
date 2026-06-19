import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { teamMembers } from '../../data/team'
import SectionHeader from '../ui/SectionHeader'

const homeMembers = teamMembers.filter((m) => m.showOnHome)

/** Tarjetas visibles según el ancho de pantalla. */
function usePerView() {
  const [pv, setPv] = useState(3)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setPv(w >= 1024 ? 3 : w >= 768 ? 2 : 1)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return pv
}

export default function TeamSection() {
  const perView = usePerView()
  const maxIndex = Math.max(0, homeMembers.length - perView) // último índice de inicio (avanza de a 1)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Mantiene el índice dentro de rango al cambiar el tamaño de pantalla
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  // Auto-avance (se pausa al pasar el mouse)
  useEffect(() => {
    if (paused || maxIndex === 0) return
    const id = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), 7000)
    return () => clearInterval(id)
  }, [paused, maxIndex])

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  const offset = -(index * (100 / perView))

  return (
    <section id="team" className="py-16 lg:py-24 bg-marfil">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader eyebrow="Nuestro equipo" title="Profesionales comprometidos con su caso" align="center" />
        <div className="mt-16" />

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Carrusel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${offset}%)` }}
            >
              {homeMembers.map((member) => (
                <div key={member.slug} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-blanco-puro rounded-2xl p-6 shadow-xl ring-1 ring-niebla hover:shadow-2xl transition duration-300 card-hover flex flex-col h-full">
                    <div className="flex justify-center mb-4">
                      <img
                        src={member.shortPhoto}
                        alt={member.name}
                        loading="lazy"
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
                    <p className="font-cuerpo text-piedra text-sm mb-6 leading-relaxed flex-grow">{member.summary}</p>
                    {member.showOnTeamPage && (
                      <Link to="/equipo" className="btn-secundario mt-auto w-full">
                        Conocer más
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              {/* Flechas */}
              <button
                onClick={prev}
                className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-0 bg-verde-institucional/20 hover:bg-verde-institucional/40 text-verde-profundo p-2 lg:p-3 rounded-full transition duration-300 shadow-lg backdrop-blur-sm z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 -translate-x-2 lg:translate-x-0 bg-verde-institucional/20 hover:bg-verde-institucional/40 text-verde-profundo p-2 lg:p-3 rounded-full transition duration-300 shadow-lg backdrop-blur-sm z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Ir a la posición ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'bg-verde-institucional w-8' : 'bg-verde-institucional/30 w-2'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
