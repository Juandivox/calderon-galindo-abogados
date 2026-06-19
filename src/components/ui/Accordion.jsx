import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

/** Acordeón accesible. `items`: [{ q, a }]. */
export default function Accordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="border-y border-niebla divide-y divide-niebla">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-titulo text-lg font-medium text-negro-profundo md:text-xl">{item.q}</span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-verde-profundo" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-verde-profundo" />
              )}
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="font-cuerpo leading-relaxed text-piedra">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
