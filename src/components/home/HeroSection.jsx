const HERO_IMG = '/Image/Abogados/Fotos/NICO 7 JUN CORP8054.jpg' // CONFIRMAR: usar la mejor foto apaisada de oficina/equipo
const WPP = 'https://wa.me/573239326636?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20consulta'

export default function HeroSection() {
  return (
    <section id="home" className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <img src={HERO_IMG} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(100deg, rgba(29,29,27,0.92) 0%, rgba(29,29,27,0.72) 45%, rgba(36,48,24,0.5) 100%)' }}
      />
      <div className="container">
        <div className="max-w-3xl text-blanco-puro">
          <span className="font-cuerpo inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-verde-institucional">
            <span className="h-px w-8 bg-verde-institucional" /> Firma jurídica · Bogotá, Colombia
          </span>
          <h1 className="font-titulo mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
            Estrategia legal a la altura de sus objetivos
          </h1>
          <p className="font-cuerpo mt-6 max-w-xl text-lg font-light text-blanco-puro/85 lg:text-xl">
            Asesoría jurídica de vanguardia para proteger su patrimonio e impulsar el crecimiento de su negocio en Colombia.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-primario">Agendar una consulta</a>
            <a href="/#areas-practica" className="btn-secundario-claro">Ver áreas de práctica</a>
          </div>
        </div>
      </div>
    </section>
  )
}
