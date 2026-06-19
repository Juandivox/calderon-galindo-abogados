import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const nav = [
  { label: 'Inicio', to: '/#home' },
  { label: 'Nosotros', to: '/#about' },
  { label: 'Áreas', to: '/#areas-practica' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'Contacto', to: '/#contact' },
]
const areas = ['Insolvencia', 'Derecho Civil', 'Laboral y Seguridad Social', 'Tributario y Patrimonial', 'Derecho de Familia']

export default function Footer() {
  return (
    <footer className="bg-negro-profundo text-blanco-puro">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/Image/Abogados/Logo/Logo_blanco1.png" alt="Calderón Galindo Abogados" className="h-12 w-auto" />
            <p className="font-cuerpo mt-4 text-sm leading-relaxed text-blanco-puro/60">
              Asesoría jurídica integral para personas y empresas en Colombia.
            </p>
          </div>

          <nav className="space-y-3">
            <h4 className="font-cuerpo text-xs font-semibold uppercase tracking-widest text-verde-institucional">Navegación</h4>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="block font-cuerpo text-sm text-blanco-puro/70 transition hover:text-verde-institucional">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3">
            <h4 className="font-cuerpo text-xs font-semibold uppercase tracking-widest text-verde-institucional">Áreas</h4>
            {areas.map((a) => (
              <p key={a} className="font-cuerpo text-sm text-blanco-puro/70">{a}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-cuerpo text-xs font-semibold uppercase tracking-widest text-verde-institucional">Contacto</h4>
            <p className="flex items-start gap-2 font-cuerpo text-sm text-blanco-puro/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-verde-institucional" /> Hotel Tequendama, Cra 10 #26-21, piso 8, Bogotá
            </p>
            <a href="https://wa.me/573239326636" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-cuerpo text-sm text-blanco-puro/70 transition hover:text-verde-institucional">
              <Phone className="h-4 w-4 text-verde-institucional" /> (+57) 323 9326636
            </a>
            <a href="mailto:contacto@calderongalindoabogados.com" className="flex items-center gap-2 font-cuerpo text-sm text-blanco-puro/70 transition hover:text-verde-institucional">
              <Mail className="h-4 w-4 text-verde-institucional" /> contacto@calderongalindoabogados.com
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-blanco-puro/10 pt-6 text-center">
          <p className="font-cuerpo text-xs text-blanco-puro/50">
            © {new Date().getFullYear()} Calderón Galindo Abogados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
