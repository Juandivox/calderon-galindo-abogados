import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Inicio', to: '/#home' },
  { label: 'Nosotros', to: '/#about' },
  { label: 'Nuestras Áreas', to: '/#areas-practica' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'Testimonio', to: '/#testimonio' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  const isActive = (to) => {
    if (to === '/equipo') return location.pathname === '/equipo'
    return false
  }

  const handleNavClick = (e, to) => {
    e.preventDefault()
    setMenuOpen(false)

    if (to.startsWith('/#')) {
      const hash = to.slice(1) // '#section'
      if (location.pathname === '/') {
        // Ya en home — sólo scroll
        const id = hash.slice(1)
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      } else {
        navigate('/' + hash)
      }
    } else {
      navigate(to)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-blanco-puro shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <a href="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="flex items-center group">
            <img
              src={scrolled ? '/Image/Abogados/Logo/Logo_negro.png' : '/Image/Abogados/Logo/Logo_blanco1.png'}
              alt="Calderón Galindo Abogados"
              className="h-10 w-auto transition duration-300 group-hover:opacity-80 lg:h-12"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map(({ label, to }) => (
              <a
                key={to}
                href={to}
                onClick={(e) => handleNavClick(e, to)}
                className={`font-cuerpo relative font-medium transition duration-300 group ${
                  isActive(to)
                    ? 'text-verde-profundo'
                    : scrolled
                      ? 'text-negro-profundo hover:text-verde-profundo'
                      : 'text-blanco-puro hover:text-verde-institucional'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-verde-institucional transition-all duration-300 ${
                    isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
            <a
              href="https://wa.me/573239326636"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cuerpo px-6 py-2.5 bg-verde-institucional text-blanco-puro rounded-lg font-medium hover:bg-opacity-90 hover:shadow-lg transition duration-300"
            >
              Contacto
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 ${scrolled ? 'text-negro-profundo' : 'text-blanco-puro'}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map(({ label, to }) => (
                <a
                  key={to}
                  href={to}
                  onClick={(e) => handleNavClick(e, to)}
                  className={`font-cuerpo py-2.5 px-4 rounded-lg transition duration-300 ${
                    isActive(to)
                      ? 'bg-verde-institucional text-blanco-puro'
                      : 'text-negro-profundo hover:bg-verde-institucional hover:text-blanco-puro'
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="https://wa.me/573239326636"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cuerpo py-2.5 px-4 bg-verde-institucional text-blanco-puro text-center rounded-lg hover:bg-opacity-90 transition duration-300"
              >
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
