import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

export default function ContactSection() {
  const { showModal } = useModal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form

    if (!name || !email || !message) {
      showModal('Campos Incompletos', 'Por favor complete todos los campos del formulario.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showModal('Email Inválido', 'Por favor ingrese un correo electrónico válido.')
      return
    }

    showModal(
      '¡Mensaje Enviado con Éxito!',
      `Gracias ${name} por contactar a Calderón Galindo Abogados. Hemos recibido su consulta y nos pondremos en contacto con usted a la brevedad posible.`,
    )
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-blanco-puro">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-titulo text-4xl lg:text-5xl font-bold mb-4 text-center text-negro-profundo">
          Póngase en contacto con nosotros
        </h2>
        <p className="font-cuerpo text-xl text-gray-700 mb-16 text-center max-w-2xl mx-auto">
          Estamos listos para escucharle. Agende una consulta para analizar su caso y descubrir cómo podemos ayudarle.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            {/* Datos oficina */}
            <div className="p-8 border-l-4 border-verde-institucional rounded-xl shadow-lg bg-gray-50">
              <h3 className="font-titulo text-2xl font-semibold mb-4 text-negro-profundo">Datos de la Oficina</h3>
              <ul className="space-y-3 font-cuerpo text-gray-700">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-verde-institucional mr-3 mt-1 flex-shrink-0" />
                  <span>Bogotá Hotel Tequendama Edificio Salón Monserrate Carrera 10 #26-21 piso 8</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-verde-institucional mr-3 mt-1 flex-shrink-0" />
                  <span>
                    WhatsApp:{' '}
                    <a href="https://wa.me/573239326636" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      (+57) 323 9326636
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-verde-institucional mr-3 mt-1 flex-shrink-0" />
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
                  <Clock className="w-5 h-5 text-verde-institucional mr-3 mt-1 flex-shrink-0" />
                  <span>Lunes a Viernes de 7:00 a.m. a 6:00 p.m.</span>
                </li>
              </ul>
            </div>

            {/* Formulario */}
            <div className="p-8 bg-blanco-puro rounded-xl shadow-2xl border border-gray-100">
              <h3 className="font-titulo text-2xl font-semibold mb-6 text-negro-profundo">Formulario de Consulta</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-institucional focus:border-verde-institucional outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-institucional focus:border-verde-institucional outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-institucional focus:border-verde-institucional outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-verde-institucional text-blanco-puro font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-opacity-90 transform hover:scale-[1.01] transition duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="h-96 lg:h-full rounded-xl overflow-hidden shadow-2xl">
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
      </div>
    </section>
  )
}
