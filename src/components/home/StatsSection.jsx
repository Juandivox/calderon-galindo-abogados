import { useCountUp } from '../../hooks/useCountUp'
import { stats } from '../../data/stats'

function Stat({ value, suffix, label }) {
  const [n, ref] = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="font-titulo text-5xl font-bold text-blanco-puro lg:text-6xl">
        {n}
        <span className="text-verde-institucional">{suffix}</span>
      </div>
      <p className="font-cuerpo mt-2 text-sm uppercase tracking-widest text-blanco-puro/70">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-negro-profundo py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
