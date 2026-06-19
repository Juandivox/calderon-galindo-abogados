import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { practiceAreas } from '../../data/practiceAreas'

function AreaCard({ Icon, title, teaser, paragraphs }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-full flex-col rounded-2xl bg-blanco-puro p-8 shadow-sm ring-1 ring-niebla transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-verde-claro">
        <Icon className="h-6 w-6 text-verde-profundo" />
      </span>
      <h3 className="font-titulo mt-5 text-xl font-semibold text-negro-profundo">{title}</h3>
      <p className="font-cuerpo mt-3 leading-relaxed text-piedra">{teaser}</p>

      <div className={`grid transition-all duration-300 ${open ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="space-y-3 overflow-hidden">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-cuerpo text-sm leading-relaxed text-piedra">{p}</p>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-1.5 self-start font-cuerpo text-sm font-semibold text-verde-profundo hover:gap-2.5 transition-all"
      >
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {open ? 'Ver menos' : 'Ver más'}
      </button>
    </div>
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
              <AreaCard {...area} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
