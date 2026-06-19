import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

const pasos = [
  { n: '01', title: 'Diagnóstico', desc: 'Escuchamos su caso y analizamos la situación jurídica en una primera consulta sin tecnicismos.' },
  { n: '02', title: 'Estrategia', desc: 'Diseñamos una ruta de acción clara, con alcance, tiempos y honorarios transparentes.' },
  { n: '03', title: 'Ejecución', desc: 'Actuamos con rigor en cada etapa, judicial o extrajudicial, manteniéndole siempre informado.' },
  { n: '04', title: 'Resultado', desc: 'Buscamos la solución más eficiente, protegiendo su patrimonio y sus intereses.' },
]

export default function ProcesoSection() {
  return (
    <section id="proceso" className="bg-verde-bosque py-20 text-blanco-puro lg:py-28">
      <div className="container">
        <SectionHeader eyebrow="Cómo trabajamos" title="Un proceso claro, de principio a fin" align="center" tone="dark" />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="h-full rounded-2xl bg-carbon/40 p-8 ring-1 ring-blanco-puro/10">
                <span className="font-titulo text-5xl font-bold text-verde-institucional/50">{p.n}</span>
                <h3 className="font-titulo mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="font-cuerpo mt-2 leading-relaxed text-blanco-puro/75">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
