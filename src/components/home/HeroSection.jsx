export default function HeroSection() {
  return (
    <section id="home" className="py-16 lg:py-20 hero-bg flex items-center">
      <div className="container mx-auto px-6 lg:px-12 text-center text-blanco-puro max-w-4xl">
        <img
          src="/Image/Abogados/Logo/Logo_blanco1.png"
          alt="Calderón Galindo Abogados Logo"
          className="banner-logo mx-auto fade-in"
        />
        <p
          className="font-cuerpo text-base lg:text-lg font-light mb-4 opacity-90 fade-in"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)', maxWidth: 700, margin: '0 auto 1rem auto' }}
        >
          Asesoría jurídica de vanguardia para proteger y potenciar el crecimiento de su negocio en Colombia.
        </p>
        <a
          href="https://wa.me/573239326636?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-verde-institucional text-blanco-puro font-medium rounded-xl text-lg shadow-xl hover:scale-[1.03] hover:shadow-2xl hover:bg-opacity-95 transform fade-in transition duration-300"
        >
          Agendar una Consulta
        </a>
      </div>
    </section>
  )
}
