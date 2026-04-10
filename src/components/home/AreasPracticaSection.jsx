import { ShieldCheck, Gavel, Users, Scale, Heart } from 'lucide-react'

const areas = [
  {
    Icon: ShieldCheck,
    title: 'Insolvencia de persona natural no comerciante y pequeño comerciante',
    body: (
      <p className="font-cuerpo text-gray-700 leading-relaxed flex-grow">
        Prestamos asesoría legal relacionada con su situación financiera ofreciendo propuestas que le permitan resolver y
        solucionar sus dificultades financieras, ya sea a través de la negociación directa con los acreedores o a través
        de un proceso de liquidación.
      </p>
    ),
  },
  {
    Icon: Gavel,
    title: 'Derecho Civil',
    body: (
      <p className="font-cuerpo text-gray-700 leading-relaxed flex-grow">
        Ofrecemos una amplia gama de servicios civiles diseñados para satisfacer las necesidades de nuestra comunidad.
        Nuestro compromiso es brindar soluciones efectivas y de calidad en áreas como la construcción, asesoría legal y
        gestión de proyectos. Trabajamos con un equipo de profesionales altamente capacitados que garantizan la
        excelencia en cada uno de nuestros servicios, asegurando así el bienestar y desarrollo sostenible de cada caso.
      </p>
    ),
  },
  {
    Icon: Users,
    title: 'Derecho Laboral y Seguridad Social',
    body: (
      <div className="font-cuerpo text-gray-700 leading-relaxed flex-grow space-y-3">
        <p>
          Asesoramos a empresas en la gestión de relaciones laborales y el cumplimiento normativo para minimizar riesgos
          y fomentar un ambiente de trabajo productivo.
        </p>
        <p>
          Ofrecemos servicio de asesoría y defensa jurídica a los trabajadores, con el objetivo de exigir todos aquellos
          derechos y prestaciones que se hayan negado o dejado de pagar por parte del empleador en el desarrollo del
          trabajo según dispone el CST.
        </p>
        <p>
          Ofrecemos asesoría preventiva y correctiva para la gestión de las relaciones laborales, asegurando el
          cumplimiento de la compleja normativa colombiana y mitigando riesgos legales.
        </p>
      </div>
    ),
  },
  {
    Icon: Scale,
    title: 'Derecho Tributario, Protección Patrimonial y Lavado de Activos',
    body: (
      <div className="font-cuerpo text-gray-700 leading-relaxed flex-grow space-y-3">
        <p>
          <strong>Derecho Tributario:</strong> Asesoría integral en planeación fiscal, cumplimiento de obligaciones
          tributarias y defensa en procesos de determinación oficial y controversias fiscales.
        </p>
        <p>
          <strong>Protección Patrimonial:</strong> Diseño de estrategias legales para blindar su patrimonio, estructuras
          societarias eficientes y asesoría en procesos de insolvencia y reorganización empresarial.
        </p>
        <p>
          <strong>Lavado de Activos:</strong> Implementación de programas de cumplimiento, asesoría en riesgos SARLAFT,
          y representación legal en procesos administrativos y judiciales relacionados con delitos financieros.
        </p>
      </div>
    ),
  },
  {
    Icon: Heart,
    title: 'Derecho de Familia',
    body: (
      <div className="font-cuerpo text-gray-700 leading-relaxed flex-grow space-y-3">
        <p>
          <strong>Divorcio y Separación:</strong> Asesoría integral en procesos de divorcio de mutuo acuerdo y
          contencioso, liquidación de sociedad conyugal y división de activos.
        </p>
        <p>
          <strong>Sucesiones y Testamentos:</strong> Planeación sucesoral, elaboración de testamentos, y tramitación de
          procesos de sucesión testamentaria e intestada para proteger el patrimonio familiar.
        </p>
        <p>
          <strong>Custodia y Régimen de Visitas:</strong> Representación legal en procesos de custodia, alimentos, y
          regulación de visitas, priorizando el bienestar de los menores.
        </p>
        <p>
          <strong>Uniones Maritales de Hecho:</strong> Reconocimiento y disolución de uniones maritales, con respaldo
          patrimonial y derechos sucesorales.
        </p>
      </div>
    ),
  },
]

export default function AreasPracticaSection() {
  return (
    <section id="areas-practica" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-titulo text-3xl lg:text-4xl font-semibold mb-16 text-center text-verde-institucional">
          Nuestras Áreas de Práctica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {areas.map(({ Icon, title, body }) => (
            <div
              key={title}
              data-animate
              className="bg-blanco-puro p-8 rounded-xl shadow-lg border-t-4 border-verde-institucional hover:shadow-xl transition duration-500 transform hover:-translate-y-1 card-hover flex flex-col"
            >
              <Icon className="w-10 h-10 text-verde-institucional mb-4" />
              <h3 className="font-titulo text-2xl font-semibold mb-4 text-negro-profundo">{title}</h3>
              {body}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
