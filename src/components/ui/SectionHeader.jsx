/**
 * Encabezado editorial reutilizable: eyebrow + título + lead opcional.
 * @param align 'left' | 'center'
 * @param tone  'light' (sobre fondo claro) | 'dark' (sobre fondo oscuro)
 */
export default function SectionHeader({ eyebrow, title, lead, align = 'left', tone = 'light' }) {
  const titleColor = tone === 'dark' ? 'text-blanco-puro' : 'text-negro-profundo'
  const leadColor = tone === 'dark' ? 'text-blanco-puro/80' : 'text-piedra'
  const wrap = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'

  return (
    <div className={wrap}>
      {eyebrow && (
        <span className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-verde-medio" /> {eyebrow}
        </span>
      )}
      <h2 className={`font-titulo mt-4 text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-[2.75rem] ${titleColor}`}>
        {title}
      </h2>
      {lead && <p className={`font-cuerpo mt-4 text-lg leading-relaxed ${leadColor}`}>{lead}</p>}
    </div>
  )
}
