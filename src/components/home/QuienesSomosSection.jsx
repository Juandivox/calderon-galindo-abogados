import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

export default function QuienesSomosSection() {
  return (
    <section id="quienes-somos" className="bg-marfil py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-6">
            <SectionHeader
              eyebrow="Quiénes somos"
              title="Solidez jurídica con visión de crecimiento"
            />
            <p className="font-cuerpo text-lg leading-relaxed text-piedra">
              Combinamos un equipo jurídico competitivo con una visión innovadora y en constante crecimiento. Nuestro
              propósito es brindar atención integral y personalizada a cada cliente.
            </p>
            <p className="font-cuerpo text-lg leading-relaxed text-piedra">
              Aspiramos a ser sus aliados estratégicos, con soluciones claras, eficientes y adaptadas a sus necesidades.
              Un equipo de especialistas altamente cualificados le da la tranquilidad y el respaldo que su empresa
              necesita para enfrentar cualquier desafío legal.
            </p>
          </Reveal>

          <Reveal delay={120} className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/Image/Abogados/Fotos/NICO 7 JUN CORP8054.webp"
              alt="Abogado de Calderón Galindo Abogados"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale transition duration-500 hover:grayscale-0"
              style={{ objectPosition: 'center 12%' }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
