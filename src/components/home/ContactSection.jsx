import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-blanco-puro">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de su caso"
          lead="Estamos listos para escucharle. Agende una consulta y descubra cómo podemos ayudarle."
          align="center"
        />
        <div className="mt-16" />

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            {/* Datos oficina */}
            <div className="p-8 border-l-4 border-verde-institucional rounded-2xl shadow-lg bg-marfil">
              <h3 className="font-titulo text-2xl font-semibold mb-4 text-negro-profundo">Datos de la Oficina</h3>
              <ul className="space-y-3 font-cuerpo text-piedra">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-verde-profundo mr-3 mt-1 flex-shrink-0" />
                  <span>Bogotá Hotel Tequendama Edificio Salón Monserrate Carrera 10 #26-21 piso 8</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-verde-profundo mr-3 mt-1 flex-shrink-0" />
                  <span>
                    WhatsApp:{' '}
                    <a href="https://wa.me/573182597072" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      (+57) 318 2597072
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-verde-profundo mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <a href="mailto:contacto@calderongalindoabogados.com" className="hover:underline">
                      contacto@calderongalindoabogados.com
                    </a>{' '}
                    ;{' '}
                    <a href="mailto:vyclawadvisory@gmail.com" className="hover:underline">
                      vyclawadvisory@gmail.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-verde-profundo mr-3 mt-1 flex-shrink-0" />
                  <span>Lunes a Viernes de 7:00 a.m. a 6:00 p.m.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mapa */}
          <div className="h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8341234567!2d-74.07234!3d4.6086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a7ecaaaaaa%3A0x1234567890abcdef!2sCarrera%2010%20%2326-21%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación oficina - Hotel Tequendama"
            />
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-negro-profundo px-8 py-12 text-center lg:py-16">
          <h3 className="font-titulo text-2xl font-semibold text-blanco-puro lg:text-3xl">
            ¿Prefiere una respuesta inmediata?
          </h3>
          <p className="font-cuerpo mx-auto mt-3 max-w-xl text-blanco-puro/75">
            Escríbanos por WhatsApp y le atenderemos lo antes posible.
          </p>
          <a
            href="https://wa.me/573182597072?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primario mt-8"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
