/**
 * Fuente de datos canónica del equipo.
 * shortPhoto → carrusel en Home
 * detailPhoto → página /equipo
 * summary → descripción corta en carrusel
 * detailBlocks → párrafos completos en /equipo (array de strings)
 */
export const teamMembers = [
  {
    slug: 'nicolas-calderon',
    name: 'Nicolás Calderón Grisales',
    position: 'Socio Fundador',
    email: 'ncalderon@calderongalindo.com.co',
    linkedin: '#',
    shortPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP8038.jpg',
    detailPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP8041.jpg',
    summary:
      'Abogado de la Universidad Libre con especialización en Derecho Tributario de la Universidad Externado de Colombia. Experto en protección patrimonial, quiebra y fiscalidad internacional. Cuenta con más de 5 años de experiencia.',
    detailBlocks: [
      'Abogado de la Universidad Libre con especialización en Derecho Tributario de la Universidad Externado de Colombia. Cuenta con más de 5 años de experiencia asesorando en derecho laboral y seguridad social, derecho civil, derecho tributario y derecho societario.',
      'Su formación especializada y práctica profesional le permiten abordar con solvencia procesos de planeación, cumplimiento y resolución de conflictos tributarios, así como asesorías integrales en el ámbito corporativo y laboral.',
    ],
    showOnHome: true,
    showOnTeamPage: true,
  },
  {
    slug: 'johan-galindo',
    name: 'Johan Manuel Galindo Toloza',
    position: 'Socio Fundador',
    email: 'jgalindo@calderongalindo.com.co',
    linkedin: '#',
    shortPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP8267.jpg',
    detailPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP8080.jpg',
    summary:
      'Abogado de la Universidad Libre con especialización en Derecho Administrativo Laboral. Cuenta con más de 5 años de experiencia.',
    detailBlocks: [
      'Abogado de la Universidad Libre con especialización en Derecho Administrativo Laboral y especialista en Derecho Penal Integral. Cuenta con más de 5 años de experiencia en derecho laboral y seguridad social, en conciliación y negociación de obligaciones, así como en el litigio en materia laboral, civil, comercial, societaria y penal. Su práctica se ha enfocado en la defensa de los derechos de trabajadores y empleadores, la estructuración de estrategias jurídicas en procesos de negociación y la representación efectiva en escenarios judiciales y extrajudiciales.',
      'Se destaca por su habilidad para generar acuerdos que favorecen la solución pacífica de los conflictos, su capacidad de análisis jurídico integral y su compromiso con la protección de los intereses de sus clientes. Gracias a su versatilidad en distintas ramas del derecho, ofrece un acompañamiento sólido, preventivo y estratégico que garantiza confianza y resultados efectivos.',
    ],
    showOnHome: true,
    showOnTeamPage: true,
  },
  {
    slug: 'cristofer-blandon',
    name: 'Cristofer Blandón',
    position: 'Abogado',
    email: 'cblandon@calderongalindo.com.co',
    linkedin: '#',
    shortPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP80122.jpg',
    detailPhoto: '/Image/Abogados/Fotos/NICO 7 JUN CORP8283.jpg',
    summary:
      'Abogado de la Universidad Libre. Áreas de Práctica: Litigios Civiles y Comerciales, Arbitraje, Responsabilidad Civil.',
    detailBlocks: [
      'Abogado de la Universidad Libre.',
      '<strong>Áreas de Práctica:</strong> Litigios Civiles y Comerciales, Arbitraje, Responsabilidad Civil.',
    ],
    showOnHome: true,
    showOnTeamPage: true,
  },
  {
    slug: 'ivan-pardo',
    name: 'Ivan Dario Pardo Clavijo',
    position: 'Abogado',
    email: 'ipardo@calderongalindo.com.co',
    linkedin: '#',
    shortPhoto: '/Image/Abogados/Fotos/IVAN.jpeg',
    detailPhoto: '/Image/Abogados/Fotos/IVAN.jpeg',
    summary:
      'Abogado de la Universidad Santo Tomás, es especialista en Derecho Financiero y Criptoactivos de la Universidad del Rosario.',
    detailBlocks: [
      'Abogado de la Universidad Santo Tomás, es especialista en Derecho Financiero y Criptoactivos de la Universidad del Rosario.',
    ],
    showOnHome: true,
    showOnTeamPage: true,
  },
  {
    slug: 'john-sossa',
    name: 'John Fredy Sossa Buitrago',
    position: 'Abogado',
    email: 'jsossa@calderongalindo.com.co',
    linkedin: '#',
    shortPhoto: '/Image/Abogados/Fotos/JOHN.jpeg',
    detailPhoto: '/Image/Abogados/Fotos/JOHN.jpeg',
    summary:
      'Abogado de la Universidad Libre con especialización en Derecho Penal de la misma institución. Experto en litigio penal, defensa estratégica y asesoría en procesos penales complejos.',
    detailBlocks: [
      'Abogado de la Universidad Libre con especialización en Derecho Penal de la misma institución. Experto en litigio penal, defensa estratégica y asesoría en procesos penales complejos.',
    ],
    showOnHome: true,
    showOnTeamPage: false, // no estaba en equipo.html original
  },
]
