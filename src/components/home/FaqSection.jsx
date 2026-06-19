import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import { faqs } from '../../data/faqs'

export default function FaqSection() {
  return (
    <section id="faq" className="bg-marfil py-20 lg:py-28">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Resolvemos sus dudas antes de empezar"
            lead="¿No encuentra su respuesta? Escríbanos y le ayudamos personalmente."
          />
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  )
}
