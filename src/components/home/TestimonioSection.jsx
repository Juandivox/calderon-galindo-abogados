import { Quote } from 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { useCarousel } from '../../hooks/useCarousel'

export default function TestimonioSection() {
  const { current, totalSlides, handlePrev, handleNext, handleGoTo } = useCarousel(testimonials.length, 1)
  const offset = -(current * 100)

  return (
    <section id="testimonio" className="bg-verde-institucional py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
        <Quote className="mx-auto mb-8 h-12 w-12 text-negro-profundo/60" />

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${offset}%)` }}>
            {testimonials.map((t, i) => (
              <figure key={i} className="w-full flex-shrink-0 px-2">
                <blockquote className="font-titulo text-xl font-medium italic leading-relaxed text-negro-profundo lg:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-cuerpo mt-6 text-negro-profundo/80">
                  <span className="font-semibold">{t.author}</span>
                  {t.role && <span className="opacity-70"> · {t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={handlePrev} aria-label="Anterior" className="rounded-full bg-negro-profundo/10 p-2 text-negro-profundo transition hover:bg-negro-profundo/20">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleGoTo(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-negro-profundo' : 'w-2 bg-negro-profundo/30'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} aria-label="Siguiente" className="rounded-full bg-negro-profundo/10 p-2 text-negro-profundo transition hover:bg-negro-profundo/20">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
