export default function QuienesSomosSection() {
  return (
    <section id="quienes-somos" className="py-16 lg:py-24 bg-blanco-puro">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
          <div className="mb-8 lg:mb-0 transform hover:scale-[1.01] transition duration-500 rounded-xl overflow-hidden shadow-xl">
            <img
              src="/Image/Abogados/Fotos/1NICO 7 JUN CORP7988.jpg"
              alt="Imagen institucional"
              className="w-full h-auto object-cover rounded-xl grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-titulo text-3xl lg:text-4xl font-semibold mb-6 text-left text-verde-institucional">
              ¿Quiénes somos?
            </h2>
            <p className="font-cuerpo text-negro-profundo leading-relaxed text-lg">
              Somos una firma legal que combina la solidez de equipo jurídico competitivo, con una visión innovadora y de
              crecimiento permanente.
            </p>
            <p className="font-cuerpo text-negro-profundo leading-relaxed text-lg">
              El propósito de nuestra firma es brindarle una atención integral y personalizada a cada uno de nuestros
              clientes; aspiramos a ser sus aliados estratégicos, ofreciendo soluciones claras, eficientes, adaptadas a
              las necesidades y propósitos de nuestros usuarios.
            </p>
            <p className="font-cuerpo text-negro-profundo leading-relaxed text-lg">
              Con un equipo de especialistas altamente cualificados, brindamos la tranquilidad y el respaldo que usted y
              su empresa necesitan para enfrentar cualquier desafío legal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
