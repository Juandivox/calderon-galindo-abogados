import { Quote } from 'lucide-react'

export default function TestimonioSection() {
  return (
    <section id="testimonio" className="py-12 lg:py-16 bg-verde-institucional">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl text-center">
        <Quote className="w-12 h-12 text-negro-profundo opacity-75 mx-auto mb-6" />
        <blockquote className="font-titulo text-lg lg:text-xl font-medium italic text-negro-profundo leading-relaxed">
          "Quiero expresar mi más sincero agradecimiento a la firma de abogados que me representó en un momento tan
          crucial de mi vida. Desde el primer contacto, su profesionalismo y empatía me hicieron sentir respaldado y
          seguro. Cada miembro del equipo se mostró comprometido con mi caso, brindándome una atención personalizada y
          explicando cada paso del proceso legal de manera clara. Gracias a su dedicación y experiencia, obtuve un
          resultado favorable que superó mis expectativas. Sin duda, recomendaré sus servicios a amigos y familiares, ya
          que sé que estarán en las mejores manos. ¡Mil gracias por su apoyo incondicional!"
        </blockquote>
        <p className="font-cuerpo text-base font-semibold mt-4 text-negro-profundo opacity-90">— Cliente Satisfecho</p>
      </div>
    </section>
  )
}
