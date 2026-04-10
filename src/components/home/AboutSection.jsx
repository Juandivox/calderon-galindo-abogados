import { Target, Eye, Award, Shield, Handshake, Lightbulb, Lock, Scale } from 'lucide-react'

const valores = [
  { Icon: Award, name: 'Excelencia', desc: 'Nos esforzamos por superar las expectativas en cada asunto que se nos confía.' },
  { Icon: Shield, name: 'Integridad', desc: 'La honestidad, la transparencia y la ética son el fundamento de todas nuestras actuaciones.' },
  { Icon: Handshake, name: 'Compromiso', desc: 'Asumimos los objetivos de nuestros clientes como propios, dedicando todo nuestro esfuerzo a su defensa.' },
  { Icon: Lightbulb, name: 'Innovación', desc: 'Estamos en constante actualización para aplicar las herramientas y enfoques más modernos.' },
  { Icon: Lock, name: 'Confidencialidad', desc: 'La protección de la información de nuestros clientes es sagrada.' },
  { Icon: Scale, name: 'Justicia', desc: 'Buscamos siempre la equidad y el respeto por los derechos.' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-blanco-puro">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-titulo text-4xl lg:text-5xl font-bold mb-16 text-center text-verde-institucional">
          Sobre Nosotros
        </h2>

        {/* Imagen panorámica */}
        <div
          className="mb-12 transform hover:scale-[1.005] transition duration-500 rounded-xl overflow-hidden shadow-xl"
          style={{ height: 300 }}
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
            alt="Edificio institucional"
            className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition duration-500"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>

        {/* Historia */}
        <div className="mb-16">
          <h3 className="font-titulo text-3xl font-semibold mb-6 text-negro-profundo">
            <span className="text-verde-institucional">Nuestra Historia</span>
          </h3>
          <div className="space-y-4 font-cuerpo text-gray-700 leading-relaxed text-lg">
            <p>
              En el corazón de Bogotá, dos jóvenes apasionados por el derecho, Calderón y Galindo unieron sus sueños y
              aspiraciones para fundar una firma jurídica consultora. Desde el inicio, su visión fue clara: crear un
              espacio donde la justicia y el derecho se entrelazarán para ofrecer soluciones efectivas a quienes más las
              necesitaban. Con una oficina ubicada en el emblemático Hotel Tequendama, comenzaron su travesía, trabajando
              arduamente todos los días para posicionarse como una de las grandes firmas del país.
            </p>
            <p>
              Gracias a la confianza que sus clientes les han depositado, Calderón y Galindo han logrado expandir su
              firma, abriendo sedes en las principales ciudades de Colombia. Este crecimiento no solo refleja su
              dedicación, sino también el compromiso de un equipo de trabajo conformado por profesionales con las mejores
              competencias en diversas áreas del derecho. Desde asesoría legal, pasando por la consultoría, hasta
              litigios complejos. Cada miembro del equipo se esfuerza por garantizar la satisfacción de quienes confían
              en ellos.
            </p>
            <p>
              Hoy, su firma no solo es reconocida por su excelencia, sino también por su enfoque humano y personalizado.
              Calderón y Galindo saben que cada caso es único y por ello se comprometen a brindar un servicio excepcional
              que supere las expectativas de sus clientes. Con cada nuevo desafío, continúan construyendo un legado de
              justicia y confianza en el ámbito jurídico colombiano.
            </p>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-gray-50 rounded-xl shadow-lg border-l-4 border-verde-institucional">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-verde-institucional mr-3" />
              <h4 className="font-titulo text-2xl font-semibold text-negro-profundo">Misión</h4>
            </div>
            <p className="font-cuerpo text-gray-700 leading-relaxed">
              Ofrecer asesoría y representación legal de la más alta calidad, generando soluciones jurídicas prácticas e
              innovadoras que permitan solucionar aquellos conflictos o dificultades jurídicas de nuestros clientes.
              Actuamos con rigor, ética y un profundo entendimiento de sus objetivos para convertirnos en un pilar
              fundamental de su éxito.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-xl shadow-lg border-l-4 border-verde-institucional">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-verde-institucional mr-3" />
              <h4 className="font-titulo text-2xl font-semibold text-negro-profundo">Visión</h4>
            </div>
            <p className="font-cuerpo text-gray-700 leading-relaxed">
              Consolidarnos como una de las firmas líderes en Colombia, siendo el referente indiscutible en derecho
              privado, laboral y seguridad social, comercial y societario; así como una empresa vanguardista en el uso de
              la tecnología en cada una de las etapas de atención y servicio de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="p-8 bg-gray-50 rounded-xl shadow-lg">
          <h4 className="font-titulo text-2xl font-semibold mb-6 text-center text-negro-profundo">
            <span className="text-verde-institucional">Nuestros Valores</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map(({ Icon, name, desc }) => (
              <div key={name} className="flex flex-col items-center text-center p-4">
                <Icon className="w-10 h-10 text-verde-institucional mb-3" />
                <h5 className="font-titulo text-lg font-semibold mb-2 text-negro-profundo">{name}</h5>
                <p className="font-cuerpo text-sm text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
