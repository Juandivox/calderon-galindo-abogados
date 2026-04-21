import { Mail, Linkedin } from 'lucide-react'
import { teamMembers } from '../data/team'

const detailMembers = teamMembers.filter((m) => m.showOnTeamPage)

function MemberCard({ member }) {
  return (
    <div className="mb-16 bg-gray-50 rounded-xl shadow-xl p-8 lg:p-12">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Foto */}
        <div className="lg:col-span-1 flex justify-center items-start">
          {member.detailPhoto && member.circularPhoto ? (
            <div className="bg-white rounded-full shadow-xl p-2 inline-block">
              <img
                src={member.detailPhoto}
                alt={member.name}
                className="w-64 h-64 rounded-full object-cover"
                style={{ objectPosition: 'center 10%' }}
              />
            </div>
          ) : member.detailPhoto ? (
            <img
              src={member.detailPhoto}
              alt={member.name}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-verde-institucional rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-blanco-puro font-titulo text-6xl font-bold">
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-2">
          <h2 className="font-titulo text-3xl lg:text-4xl font-bold text-negro-profundo mb-2">{member.name}</h2>
          <p className="font-cuerpo text-xl text-verde-institucional font-semibold mb-6">{member.position}</p>

          <div className="font-cuerpo text-gray-700 leading-relaxed text-lg mb-6 space-y-4">
            {member.detailBlocks.map((block, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: block }} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-cuerpo text-gray-700">
              <span className="font-semibold">Email:</span>{' '}
              <a href={`mailto:${member.email}`} className="text-verde-institucional hover:underline">
                {member.email}
              </a>
            </p>
            <p className="font-cuerpo text-gray-700">
              <span className="font-semibold">LinkedIn:</span>{' '}
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-verde-institucional hover:underline">
                Ver perfil
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="py-12 lg:py-14"
        style={{ background: 'linear-gradient(135deg, rgba(29,29,27,0.95), rgba(158,188,138,0.85))' }}
      >
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-titulo text-4xl lg:text-5xl font-bold text-blanco-puro mb-4">Nuestro Equipo</h1>
          <p className="font-cuerpo text-lg text-blanco-puro opacity-90">
            Profesionales comprometidos con la excelencia jurídica
          </p>
        </div>
      </section>

      {/* Perfiles */}
      <section className="py-12 lg:py-16 bg-blanco-puro">
        <div className="container mx-auto px-6 lg:px-12">
          {detailMembers.map((member) => (
            <MemberCard key={member.slug} member={member} />
          ))}
        </div>
      </section>
    </main>
  )
}
