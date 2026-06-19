import { useState } from 'react'
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { practiceAreas } from '../../data/practiceAreas'

const WPP = 'https://wa.me/573239326636?text=Hola,%20me%20gustar%C3%ADa%20una%20asesor%C3%ADa'

function AreaCard({ Icon, title, teaser, paragraphs, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-blanco-puro p-8 ring-1 ring-niebla transition duration-300 hover:-translate-y-1 hover:ring-verde-medio/50 hover:shadow-xl">
      {/* Barra de acento superior */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-verde-institucional transition-transform duration-300 group-hover:scale-x-100" />
      {/* Número índice */}
      <span className="pointer-events-none absolute right-6 top-5 font-titulo text-5xl font-bold leading-none text-verde-institucional/15">
        {index}
      </span>

      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-verde-claro transition-colors duration-300 group-hover:bg-verde-institucional">
        <Icon className="h-6 w-6 text-verde-profundo transition-colors duration-300 group-hover:text-negro-profundo" />
      </span>

      <h3 className="font-titulo relative mt-5 text-xl font-semibold text-negro-profundo">{title}</h3>
      <p className="font-cuerpo mt-3 leading-relaxed text-piedra">{teaser}</p>

      <div className={`grid transition-all duration-300 ${open ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="space-y-3 overflow-hidden">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-cuerpo text-sm leading-relaxed text-piedra">
              {p}
            </p>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-6 inline-flex items-center gap-1.5 self-start font-cuerpo text-sm font-semibold text-verde-profundo"
      >
        {open ? 'Ver menos' : 'Ver más'}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

function CtaCard() {
  return (
    <a
      href={WPP}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col justify-between rounded-2xl bg-verde-bosque p-8 text-blanco-puro shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blanco-puro/10">
          <MessageCircle className="h-6 w-6 text-verde-institucional" />
        </span>
        <h3 className="font-titulo mt-5 text-xl font-semibold">¿Su caso es diferente?</h3>
        <p className="font-cuerpo mt-3 leading-relaxed text-blanco-puro/75">
          Cuéntenos su situación y le orientamos sobre la mejor ruta legal, sin compromiso.
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 font-cuerpo text-sm font-semibold text-verde-institucional">
        Hablar con un abogado
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  )
}

export default function AreasPracticaSection() {
  return (
    <section id="areas-practica" className="bg-blanco-puro py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Áreas de práctica"
          title="Acompañamiento jurídico integral"
          lead="Cubrimos las principales necesidades legales de personas y empresas en Colombia."
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 100}>
              <AreaCard {...area} index={String(i + 1).padStart(2, '0')} />
            </Reveal>
          ))}
          <Reveal delay={(practiceAreas.length % 3) * 100}>
            <CtaCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
