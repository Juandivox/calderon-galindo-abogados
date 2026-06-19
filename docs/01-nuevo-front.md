# Nuevo Front — Rediseño UI de Calderón Galindo Abogados

> **Para ejecutores agénticos:** SUB-SKILL RECOMENDADA: usar `superpowers:subagent-driven-development` (recomendado) o `superpowers:executing-plans` para implementar este plan tarea por tarea. Los pasos usan sintaxis de checkbox (`- [ ]`) para seguimiento.

**Goal (objetivo):** Rediseñar el front-end del sitio (React SPA) para que luzca como una firma legal moderna y de alto nivel — manteniendo paleta, imágenes y contenido — elevando jerarquía visual, conversión y accesibilidad.

**Architecture (enfoque):** No se reescribe la arquitectura. Se introduce un *design system* ligero (tokens en `tailwind.config.js` + `index.css`) y un set de primitivos UI reutilizables (`src/components/ui/`). El contenido textual repetido se extrae a `src/data/` siguiendo el patrón existente de `team.js`. Cada sección de la Home se reconstruye sobre esos primitivos. Sin nuevas dependencias.

**Tech Stack:** React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · lucide-react · (deploy: Docker + nginx, sin cambios).

---

## 1. Contexto y diagnóstico

### Estado actual (auditoría)
SPA en React con Home de 7 secciones + página `/equipo`. Funciona, pero el lenguaje visual es genérico ("plantilla de tarjetas"):

| Área | Problema detectado | Archivo |
|---|---|---|
| Hero | Solo un degradado negro→verde + logo centrado; sin imagen real, sin titular de valor, impacto bajo | [HeroSection.jsx](../src/components/home/HeroSection.jsx) |
| Confianza | No hay banda de cifras/credenciales (años, áreas, sedes) | — |
| Áreas de práctica | Tarjetas con texto de longitudes muy dispares (una enorme, otra de una línea); jerarquía irregular | [AreasPracticaSection.jsx](../src/components/home/AreasPracticaSection.jsx) |
| Sobre nosotros | Usa una imagen **externa de Unsplash**, inconsistente con la marca | [AboutSection.jsx:26](../src/components/home/AboutSection.jsx#L26) |
| Testimonios | Uno solo, sin atribución real ("Cliente Satisfecho") | [TestimonioSection.jsx](../src/components/home/TestimonioSection.jsx) |
| Proceso | No existe sección de "cómo trabajamos" | — |
| FAQ | No existe (clave para SEO/GEO y conversión legal) | — |
| Footer | Mínimo: solo nombre + copyright; sin navegación, contacto ni áreas | [Footer.jsx](../src/components/layout/Footer.jsx) |
| Tipografía | Escala plana; no se explota STIX Two Text como display editorial | global |
| Color/Accesibilidad | `#9EBC8A` (verde) usado como **texto sobre blanco** ≈ 2:1 de contraste → **falla WCAG AA**; CTA con texto blanco sobre verde también falla | global |
| Motion | Solo `fade-in` básico | [useScrollAnimation.js](../src/hooks/useScrollAnimation.js) |

### Restricciones del encargo
- **Mantener la paleta** (verde `#9EBC8A`, negro `#1D1D1B`, blanco `#FFFFFF`). Se *amplía* con tintes/sombras derivados (práctica estándar de design system), no se cambia la identidad.
- **Mantener las imágenes** (fotos propias en `/Image/Abogados/`). Se reutilizan y se elimina la dependencia de Unsplash.
- **Contenido:** se puede parafrasear, resumir o crear nuevo (titulares, eyebrows, FAQ, proceso).

### Principios de diseño (derivados de la investigación de tendencias legales 2026)
1. **Tipografía sobredimensionada y editorial** como elemento visual dominante (serif para display).
2. **Layouts asimétricos con aire generoso** y reglas/líneas finas como recurso de orden.
3. **Alternancia de bloques claros y oscuros** ("visual moments") para sofisticación.
4. **Fotografía propia con tratamiento intencional** (el sitio ya hace grayscale→color en hover: se potencia ese sello).
5. **Motion sutil y con propósito**: scroll-reveals y micro-interacciones, respetando `prefers-reduced-motion`.
6. **El sitio como motor de captación**: CTAs claros, señales de confianza (cifras, proceso, testimonios, FAQ).

Fuentes: [PaperStreet — 2026 Trends](https://www.paperstreet.com/blog/2026-law-firm-website-design-trends/) · [Attorney at Work](https://www.attorneyatwork.com/law-firm-website-design-trends-2026/) · [Azuro — Best Law Firm Sites 2026](https://azurodigital.com/law-firm-website-examples/) · [Block Agency](https://blockagency.co/blog/law-firm-website-designs/).

---

## 2. Sistema de diseño (tokens)

### 2.1 Paleta extendida (derivada de los 3 colores de marca)
Se conservan los nombres actuales y se añaden derivados. Hex de partida (ajustar fino con un verificador de contraste durante la Fase 4):

| Token Tailwind | Hex | Uso |
|---|---|---|
| `blanco-puro` | `#FFFFFF` | Fondo base, texto sobre oscuro |
| `marfil` | `#F6F5F0` | Fondo cálido para secciones alternas (reemplaza `gray-50/100`) |
| `niebla` | `#E7E5DE` | Bordes, divisores, reglas finas |
| `piedra` | `#5F5E58` | Texto secundario (≈ 5.6:1 sobre blanco, **AA OK**) |
| `verde-claro` | `#E7EEE0` | Chips, fondos de tinte, hovers suaves |
| `verde-institucional` | `#9EBC8A` | **Acento de marca**: rellenos, decoración, texto sobre oscuro |
| `verde-medio` | `#7FA268` | Hover de botones, bordes |
| `verde-profundo` | `#46602F` | **Texto/enlaces verdes sobre blanco** (≈ 5.4:1, **AA OK**) |
| `verde-bosque` | `#243018` | Bloques oscuros con tinte verde, profundidad |
| `negro-profundo` | `#1D1D1B` | Texto principal, secciones oscuras |
| `carbon` | `#2B2B27` | Capas/cards sobre fondo negro |

> **Regla de accesibilidad:** el verde `#9EBC8A` **nunca** se usa como texto sobre blanco. Para texto verde sobre claro → `verde-profundo`. Para CTA verde → texto `negro-profundo` (contraste ≈ 8.5:1, además luce más premium).

### 2.2 Tipografía
Fuentes sin cambios (STIX Two Text + Inter, ya cargadas en [index.html:26](../index.html#L26)). Se añade una escala fluida y un patrón "eyebrow":
- **Display (hero):** `clamp(2.5rem, 6vw, 4.5rem)`, STIX, `font-bold`, `leading-[1.05]`.
- **Título de sección (h2):** `text-3xl md:text-4xl lg:text-[2.75rem]`, `leading-[1.1]`.
- **Eyebrow/kicker:** Inter, `text-xs`, `font-semibold`, `uppercase`, `tracking-[0.2em]`, color `verde-profundo`, con una línea corta `―` a la izquierda.
- **Lead:** `text-lg/xl`, `font-light`, color `piedra` (o `blanco/80` sobre oscuro).
- **Cuerpo:** `text-base/lg`, `leading-relaxed`.

### 2.3 Forma, profundidad y motion
- **Radios:** cards `rounded-2xl`; botones `rounded-full` (acento moderno).
- **Sombras:** sutiles (`shadow-sm` + `ring-1 ring-niebla`); elevación en hover.
- **Espaciado de sección:** `py-20 lg:py-28` (más aire que el `py-16` actual).
- **Motion:** componente `Reveal` (fade + translate-y en viewport, con stagger por `delay`); se mantiene grayscale→color en imágenes; respeta `prefers-reduced-motion` (ya contemplado en [index.css:98](../src/index.css#L98)).

---

## 3. Mapa de archivos (qué se crea / modifica)

**Crear:**
- `src/components/ui/SectionHeader.jsx` — eyebrow + título + lead reutilizable.
- `src/components/ui/Reveal.jsx` — wrapper de scroll-reveal con stagger.
- `src/components/ui/Accordion.jsx` — acordeón accesible (FAQ).
- `src/hooks/useCountUp.js` — contador animado para cifras.
- `src/data/practiceAreas.js` — áreas de práctica (contenido parafraseado/condensado).
- `src/data/stats.js` — cifras de confianza.
- `src/data/testimonials.js` — testimonios.
- `src/data/faqs.js` — preguntas frecuentes.
- `src/components/home/StatsSection.jsx` — banda de cifras (NUEVA).
- `src/components/home/ProcesoSection.jsx` — "cómo trabajamos" (NUEVA).
- `src/components/home/FaqSection.jsx` — FAQ (NUEVA).

**Modificar:**
- `tailwind.config.js` — paleta extendida.
- `src/index.css` — tokens, clases de botón, utilidades de tipografía.
- `src/components/home/HeroSection.jsx` — hero con imagen + titular.
- `src/components/home/QuienesSomosSection.jsx` — layout editorial.
- `src/components/home/AreasPracticaSection.jsx` — consume `practiceAreas`, cards uniformes con "Ver más".
- `src/components/home/TestimonioSection.jsx` → renombrar concepto a carrusel de testimonios.
- `src/components/home/AboutSection.jsx` — quitar Unsplash, usar foto propia + `SectionHeader`.
- `src/components/home/TeamSection.jsx` — `SectionHeader` + retoque de cards.
- `src/components/home/ContactSection.jsx` — `SectionHeader` + banda CTA final + retoque form.
- `src/components/layout/Header.jsx` — header transparente sobre hero → sólido al hacer scroll.
- `src/components/layout/Footer.jsx` — footer expandido (nav + áreas + contacto).
- `src/pages/HomePage.jsx` — nuevo orden de secciones.

### Nuevo orden de la Home
`Hero → Stats → Quiénes somos → Áreas de práctica → Proceso → Sobre nosotros → Equipo → Testimonios → FAQ → Contacto (+ CTA) → Footer`

---

## 4. Verificación (sin framework de tests)
El repo no tiene test runner (solo Vite). La verificación de cada tarea es:
- **Build:** `npm run build` → termina con `✓ built in …`, sin errores.
- **Visual:** `npm run dev` → abrir `http://localhost:5173/`, revisar la sección en viewport **móvil (375px)** y **desktop (1280px)**.
- **Accesibilidad (Fase 4):** Lighthouse (pestaña *Accessibility* ≥ 95) y verificación de contraste de tokens.

> Convención de commits: Conventional Commits. Cada commit de ejemplo termina con el trailer `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## FASE 0 — Fundaciones (tokens y estilos base)

### Task 1: Paleta extendida en Tailwind

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Reemplazar el bloque `colors`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blanco-puro': '#FFFFFF',
        'marfil': '#F6F5F0',
        'niebla': '#E7E5DE',
        'piedra': '#5F5E58',
        'verde-claro': '#E7EEE0',
        'verde-institucional': '#9EBC8A',
        'verde-medio': '#7FA268',
        'verde-profundo': '#46602F',
        'verde-bosque': '#243018',
        'negro-profundo': '#1D1D1B',
        'carbon': '#2B2B27',
      },
      fontFamily: {
        titulo: ['"STIX Two Text"', 'serif'],
        cuerpo: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', lg: '3rem' },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: `✓ built in …` sin errores (clases existentes como `bg-verde-institucional` siguen resolviendo).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat(ui): paleta extendida derivada de la marca"
```

---

### Task 2: Clases base, botones y utilidades en index.css

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Añadir capa de componentes al final de `src/index.css`** (dejar lo existente; agregar esto debajo)

```css
@layer components {
  /* Botones */
  .btn-primario {
    @apply inline-flex items-center justify-center gap-2 rounded-full bg-verde-institucional px-8 py-4
           font-cuerpo font-semibold text-negro-profundo shadow-lg transition duration-300
           hover:bg-verde-medio hover:-translate-y-0.5 hover:shadow-xl;
  }
  .btn-secundario {
    @apply inline-flex items-center justify-center gap-2 rounded-full border border-verde-profundo/30 px-8 py-4
           font-cuerpo font-semibold text-verde-profundo transition duration-300 hover:bg-verde-claro;
  }
  .btn-secundario-claro {
    @apply inline-flex items-center justify-center gap-2 rounded-full border border-blanco-puro/40 px-8 py-4
           font-cuerpo font-semibold text-blanco-puro transition duration-300 hover:bg-blanco-puro/10;
  }
  /* Eyebrow / kicker editorial */
  .eyebrow {
    @apply font-cuerpo inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-verde-profundo;
  }
}
```

- [ ] **Step 2: Actualizar `.hero-bg`** (ya no se usa como fondo principal del hero, pero `/equipo` lo replica inline). Dejar `.hero-bg` intacto por compatibilidad.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ built in …` sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat(ui): clases de botón y eyebrow en design system"
```

---

## FASE 1 — Primitivos UI reutilizables

### Task 3: SectionHeader

**Files:**
- Create: `src/components/ui/SectionHeader.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
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
```

- [ ] **Step 2: Verificar build** — `npm run build` → sin errores.
- [ ] **Step 3: Commit**

```bash
git add src/components/ui/SectionHeader.jsx
git commit -m "feat(ui): componente SectionHeader editorial"
```

---

### Task 4: Reveal (scroll-reveal con stagger)

**Files:**
- Create: `src/components/ui/Reveal.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import { useEffect, useRef, useState } from 'react'

/**
 * Revela su contenido (fade + translate-y) cuando entra al viewport.
 * Respeta prefers-reduced-motion. `delay` en ms permite stagger.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Step 2: Verificar build** — `npm run build` → sin errores.
- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Reveal.jsx
git commit -m "feat(ui): componente Reveal para scroll-reveal"
```

---

### Task 5: useCountUp + Accordion

**Files:**
- Create: `src/hooks/useCountUp.js`
- Create: `src/components/ui/Accordion.jsx`

- [ ] **Step 1: Crear `useCountUp`**

```js
import { useEffect, useRef, useState } from 'react'

/**
 * Cuenta de 0 a `end` cuando el elemento entra al viewport (easeOutCubic).
 * Devuelve [valor, ref]. Respeta prefers-reduced-motion.
 */
export function useCountUp(end, { duration = 1600 } = {}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return [value, ref]
}
```

- [ ] **Step 2: Crear `Accordion`**

```jsx
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

/** Acordeón accesible. `items`: [{ q, a }]. */
export default function Accordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="border-y border-niebla divide-y divide-niebla">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-titulo text-lg font-medium text-negro-profundo md:text-xl">{item.q}</span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-verde-profundo" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-verde-profundo" />
              )}
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="font-cuerpo leading-relaxed text-piedra">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Verificar build** — `npm run build` → sin errores.
- [ ] **Step 4: Commit**

```bash
git add src/hooks/useCountUp.js src/components/ui/Accordion.jsx
git commit -m "feat(ui): hook useCountUp y componente Accordion"
```

---

## FASE 2 — Datos (extracción de contenido)

### Task 6: practiceAreas.js (contenido parafraseado/condensado)

**Files:**
- Create: `src/data/practiceAreas.js`

> Contenido derivado de [AreasPracticaSection.jsx](../src/components/home/AreasPracticaSection.jsx): `teaser` uniforme (1–2 líneas) para la card + `paragraphs` para "Ver más".

- [ ] **Step 1: Crear el archivo**

```js
import { ShieldCheck, Gavel, Users, Scale, Heart } from 'lucide-react'

export const practiceAreas = [
  {
    Icon: ShieldCheck,
    title: 'Insolvencia de persona natural',
    teaser: 'Reorganizamos o liquidamos sus obligaciones para devolverle estabilidad financiera.',
    paragraphs: [
      'Asesoría legal sobre su situación financiera con propuestas que le permitan resolver sus dificultades, ya sea mediante la negociación directa con los acreedores o a través de un proceso de liquidación.',
    ],
  },
  {
    Icon: Gavel,
    title: 'Derecho Civil',
    teaser: 'Soluciones efectivas en contratos, construcción, responsabilidad y gestión de proyectos.',
    paragraphs: [
      'Una amplia gama de servicios civiles diseñados para satisfacer las necesidades de nuestra comunidad, con soluciones de calidad en áreas como construcción, asesoría legal y gestión de proyectos.',
      'Un equipo de profesionales altamente capacitados garantiza la excelencia en cada servicio, asegurando el bienestar y el desarrollo sostenible de cada caso.',
    ],
  },
  {
    Icon: Users,
    title: 'Derecho Laboral y Seguridad Social',
    teaser: 'Acompañamos a empresas y trabajadores en relaciones laborales y cumplimiento normativo.',
    paragraphs: [
      'Asesoramos a empresas en la gestión de relaciones laborales y el cumplimiento normativo para minimizar riesgos y fomentar un ambiente de trabajo productivo.',
      'Brindamos asesoría y defensa jurídica a los trabajadores para exigir los derechos y prestaciones que se hayan negado o dejado de pagar, conforme al CST.',
      'Ofrecemos un enfoque preventivo y correctivo que asegura el cumplimiento de la normativa colombiana y mitiga riesgos legales.',
    ],
  },
  {
    Icon: Scale,
    title: 'Tributario y Protección Patrimonial',
    teaser: 'Planeación fiscal, blindaje patrimonial y cumplimiento SARLAFT.',
    paragraphs: [
      'Derecho Tributario: asesoría integral en planeación fiscal, cumplimiento de obligaciones y defensa en procesos de determinación oficial y controversias fiscales.',
      'Protección Patrimonial: estrategias legales para blindar su patrimonio, estructuras societarias eficientes y asesoría en insolvencia y reorganización empresarial.',
      'Lavado de Activos: programas de cumplimiento, asesoría en riesgos SARLAFT y representación en procesos administrativos y judiciales.',
    ],
  },
  {
    Icon: Heart,
    title: 'Derecho de Familia',
    teaser: 'Divorcios, sucesiones, custodia y uniones maritales, con enfoque humano.',
    paragraphs: [
      'Divorcio y separación: procesos de mutuo acuerdo y contenciosos, liquidación de sociedad conyugal y división de activos.',
      'Sucesiones y testamentos: planeación sucesoral y tramitación de procesos para proteger el patrimonio familiar.',
      'Custodia, alimentos y régimen de visitas, priorizando el bienestar de los menores; reconocimiento y disolución de uniones maritales de hecho.',
    ],
  },
]
```

- [ ] **Step 2: Verificar build** — `npm run build` → sin errores.
- [ ] **Step 3: Commit**

```bash
git add src/data/practiceAreas.js
git commit -m "feat(data): áreas de práctica como fuente de datos"
```

---

### Task 7: stats.js, testimonials.js, faqs.js

**Files:**
- Create: `src/data/stats.js`
- Create: `src/data/testimonials.js`
- Create: `src/data/faqs.js`

> ⚠️ Valores marcados con `// CONFIRMAR` son provisionales — ver §7 Decisiones abiertas. **No publicar testimonios inventados:** los de ejemplo deben sustituirse por reseñas reales antes de producción.

- [ ] **Step 1: Crear `stats.js`**

```js
export const stats = [
  { value: 5, suffix: '+', label: 'Años de experiencia' },   // CONFIRMAR
  { value: 5, suffix: '', label: 'Áreas de práctica' },
  { value: 200, suffix: '+', label: 'Casos acompañados' },    // CONFIRMAR
  { value: 3, suffix: '', label: 'Ciudades con presencia' },  // CONFIRMAR
]
```

- [ ] **Step 2: Crear `testimonials.js`** (el primero es el actual, condensado; el resto, ejemplos a reemplazar)

```js
export const testimonials = [
  {
    quote:
      'Desde el primer contacto, su profesionalismo y empatía me hicieron sentir respaldado. El equipo se mostró comprometido con mi caso, explicando cada paso con claridad. Obtuve un resultado que superó mis expectativas.',
    author: 'Cliente del área de Familia', // CONFIRMAR atribución real
    role: 'Bogotá',
  },
  {
    quote:
      'Nos asesoraron en la reestructuración de obligaciones de la empresa con una estrategia clara y tiempos realistas. Recuperamos tranquilidad financiera.', // CONFIRMAR (ejemplo)
    author: 'Gerente PYME',
    role: 'Insolvencia empresarial',
  },
  {
    quote:
      'Acompañamiento cercano y honorarios transparentes desde el inicio. Sentimos que defendían nuestros intereses como propios.', // CONFIRMAR (ejemplo)
    author: 'Cliente del área Laboral',
    role: 'Bogotá',
  },
]
```

- [ ] **Step 3: Crear `faqs.js`**

```js
export const faqs = [
  {
    q: '¿Cómo agendo una primera consulta?',
    a: 'Escríbanos por WhatsApp o por el formulario de contacto. Coordinamos una sesión inicial para entender su caso y proponerle una ruta de acción clara.',
  },
  {
    q: '¿Atienden casos fuera de Bogotá?',
    a: 'Sí. Tenemos presencia en las principales ciudades de Colombia y atendemos de forma virtual a clientes en todo el país.', // CONFIRMAR
  },
  {
    q: '¿Qué áreas del derecho manejan?',
    a: 'Insolvencia, derecho civil, laboral y seguridad social, tributario y protección patrimonial, y derecho de familia, entre otras.',
  },
  {
    q: '¿Cómo manejan los honorarios?',
    a: 'Acordamos el alcance y los honorarios de forma transparente desde el primer contacto, sin sorpresas.', // CONFIRMAR
  },
]
```

- [ ] **Step 4: Verificar build** — `npm run build` → sin errores.
- [ ] **Step 5: Commit**

```bash
git add src/data/stats.js src/data/testimonials.js src/data/faqs.js
git commit -m "feat(data): stats, testimonios y faqs"
```

---

## FASE 3 — Secciones

### Task 8: Hero con imagen + titular de valor

**Files:**
- Modify: `src/components/home/HeroSection.jsx`

- [ ] **Step 1: Reemplazar todo el archivo**

```jsx
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
```

- [ ] **Step 2: Verificar visual** — `npm run dev` → el hero ocupa casi toda la pantalla, imagen con overlay legible, titular grande en serif, dos botones. Revisar 375px y 1280px.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.jsx
git commit -m "feat(home): hero con imagen propia y titular de valor"
```

---

### Task 9: Header transparente sobre el hero

**Files:**
- Modify: `src/components/layout/Header.jsx`

> El hero ahora es oscuro de borde a borde. El header debe iniciar **transparente con texto blanco** y volverse **sólido (blanco)** al hacer scroll (>100px, ya hay estado `scrolled`).

- [ ] **Step 1: Cambiar el `<header>` y los colores condicionados por `scrolled`.** Reemplazar la línea del `<header className=...>` ([Header.jsx:58-60](../src/components/layout/Header.jsx#L58-L60)) por:

```jsx
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-blanco-puro shadow-md' : 'bg-transparent'
      }`}
    >
```

- [ ] **Step 2: Logo condicional.** Reemplazar el `<img>` del logo ([Header.jsx:65-69](../src/components/layout/Header.jsx#L65-L69)) por una versión que use el logo blanco cuando no hay scroll:

```jsx
            <img
              src={scrolled ? '/Image/Abogados/Logo/Logo_negro.png' : '/Image/Abogados/Logo/Logo_blanco1.png'}
              alt="Calderón Galindo Abogados"
              className="h-10 w-auto transition duration-300 group-hover:opacity-80 lg:h-12"
            />
```

- [ ] **Step 3: Color de los links del nav desktop.** En el `<a>` de `NAV_LINKS` ([Header.jsx:79-83](../src/components/layout/Header.jsx#L79-L83)), cambiar el color base por uno dependiente de `scrolled`:

```jsx
                className={`font-cuerpo relative font-medium transition duration-300 group ${
                  isActive(to)
                    ? 'text-verde-profundo'
                    : scrolled
                      ? 'text-negro-profundo hover:text-verde-profundo'
                      : 'text-blanco-puro hover:text-verde-institucional'
                }`}
```

- [ ] **Step 4: Botón móvil.** En el toggle ([Header.jsx:104-107](../src/components/layout/Header.jsx#L104-L107)) cambiar `text-negro-profundo` por `${scrolled ? 'text-negro-profundo' : 'text-blanco-puro'}`.

- [ ] **Step 5:** Como el header pasa a `fixed`, el hero (`min-h-[88vh]`) ya lo compensa visualmente; **el resto de páginas** no. Añadir `pt-20` al contenedor de `/equipo` no es necesario porque su hero también es oscuro — pero verificar que el header sólido no tape contenido al recargar en `#about`. Si ocurre, el offset de scroll ya resta 80px en [Header.jsx:46](../src/components/layout/Header.jsx#L46). Mantener.

- [ ] **Step 6: Verificar visual** — `npm run dev`: header transparente sobre el hero, se vuelve blanco al bajar; logo cambia de blanco a negro. Probar también en `/equipo`.
- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Header.jsx
git commit -m "feat(layout): header transparente sobre hero, sólido al scroll"
```

---

### Task 10: StatsSection (banda de cifras)

**Files:**
- Create: `src/components/home/StatsSection.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
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
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: las cifras cuentan de 0 al valor al entrar en viewport. En móvil, 2 columnas.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/StatsSection.jsx
git commit -m "feat(home): banda de cifras con contador animado"
```

---

### Task 11: Quiénes somos (layout editorial)

**Files:**
- Modify: `src/components/home/QuienesSomosSection.jsx`

- [ ] **Step 1: Reemplazar todo el archivo** (usa `SectionHeader`, foto a la derecha con marco, párrafos condensados, fondo `marfil`)

```jsx
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

export default function QuienesSomosSection() {
  return (
    <section id="quienes-somos" className="bg-marfil py-20 lg:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-6">
            <SectionHeader
              eyebrow="Quiénes somos"
              title="Solidez jurídica con visión de crecimiento"
            />
            <p className="font-cuerpo text-lg leading-relaxed text-piedra">
              Combinamos un equipo jurídico competitivo con una visión innovadora y en constante crecimiento. Nuestro
              propósito es brindar atención integral y personalizada a cada cliente.
            </p>
            <p className="font-cuerpo text-lg leading-relaxed text-piedra">
              Aspiramos a ser sus aliados estratégicos, con soluciones claras, eficientes y adaptadas a sus necesidades.
              Un equipo de especialistas altamente cualificados le da la tranquilidad y el respaldo que su empresa
              necesita para enfrentar cualquier desafío legal.
            </p>
          </Reveal>

          <Reveal delay={120} className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/Image/Abogados/Fotos/1NICO 7 JUN CORP7988.jpg"
              alt="Equipo de Calderón Galindo Abogados"
              className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: dos columnas (texto izq / foto der), eyebrow visible, fondo marfil. En móvil apila texto y luego foto.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/QuienesSomosSection.jsx
git commit -m "feat(home): quiénes somos con layout editorial"
```

---

### Task 12: Áreas de práctica (cards uniformes con "Ver más")

**Files:**
- Modify: `src/components/home/AreasPracticaSection.jsx`

- [ ] **Step 1: Reemplazar todo el archivo** (consume `practiceAreas`; card con teaser uniforme + expandible inline)

```jsx
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { practiceAreas } from '../../data/practiceAreas'

function AreaCard({ Icon, title, teaser, paragraphs }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-full flex-col rounded-2xl bg-blanco-puro p-8 shadow-sm ring-1 ring-niebla transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-verde-claro">
        <Icon className="h-6 w-6 text-verde-profundo" />
      </span>
      <h3 className="font-titulo mt-5 text-xl font-semibold text-negro-profundo">{title}</h3>
      <p className="font-cuerpo mt-3 leading-relaxed text-piedra">{teaser}</p>

      <div className={`grid transition-all duration-300 ${open ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="space-y-3 overflow-hidden">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-cuerpo text-sm leading-relaxed text-piedra">{p}</p>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-1.5 self-start font-cuerpo text-sm font-semibold text-verde-profundo hover:gap-2.5 transition-all"
      >
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {open ? 'Ver menos' : 'Ver más'}
      </button>
    </div>
  )
}

export default function AreasPracticaSection() {
  return (
    <section id="areas-practica" className="bg-blanco-puro py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Áreas de práctica"
          title="Acompañamiento jurídico integral"
          lead="Cubrimos las principales necesidades legales de personas y empresas en Colombia."
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 100}>
              <AreaCard {...area} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: 5 cards de altura uniforme (3 columnas en desktop), ícono en chip verde, "Ver más" despliega inline. Sin saltos bruscos.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/AreasPracticaSection.jsx
git commit -m "feat(home): áreas de práctica con cards uniformes y ver más"
```

---

### Task 13: ProcesoSection (cómo trabajamos — NUEVA)

**Files:**
- Create: `src/components/home/ProcesoSection.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

const pasos = [
  { n: '01', title: 'Diagnóstico', desc: 'Escuchamos su caso y analizamos la situación jurídica en una primera consulta sin tecnicismos.' },
  { n: '02', title: 'Estrategia', desc: 'Diseñamos una ruta de acción clara, con alcance, tiempos y honorarios transparentes.' },
  { n: '03', title: 'Ejecución', desc: 'Actuamos con rigor en cada etapa, judicial o extrajudicial, manteniéndole siempre informado.' },
  { n: '04', title: 'Resultado', desc: 'Buscamos la solución más eficiente, protegiendo su patrimonio y sus intereses.' },
]

export default function ProcesoSection() {
  return (
    <section id="proceso" className="bg-verde-bosque py-20 text-blanco-puro lg:py-28">
      <div className="container">
        <SectionHeader eyebrow="Cómo trabajamos" title="Un proceso claro, de principio a fin" align="center" tone="dark" />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="h-full rounded-2xl bg-carbon/40 p-8 ring-1 ring-blanco-puro/10">
                <span className="font-titulo text-5xl font-bold text-verde-institucional/50">{p.n}</span>
                <h3 className="font-titulo mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="font-cuerpo mt-2 leading-relaxed text-blanco-puro/75">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

> Nota de diseño: este bloque es **oscuro con tinte verde** y crea el "visual moment" entre dos secciones claras (Áreas → Proceso → Sobre nosotros).

- [ ] **Step 2: Verificar visual** — `npm run dev`: 4 tarjetas con números grandes sobre fondo verde-bosque; en móvil 1–2 columnas.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/ProcesoSection.jsx
git commit -m "feat(home): sección Proceso (cómo trabajamos)"
```

---

### Task 14: Sobre nosotros (sin Unsplash, con SectionHeader)

**Files:**
- Modify: `src/components/home/AboutSection.jsx`

- [ ] **Step 1: Reemplazar la imagen externa.** Sustituir el bloque de imagen panorámica ([AboutSection.jsx:20-31](../src/components/home/AboutSection.jsx#L20-L31)) por una foto propia:

```jsx
        {/* Imagen panorámica */}
        <Reveal className="mb-12 overflow-hidden rounded-2xl shadow-xl" >
          <img
            src="/Image/Abogados/Fotos/NICO 7 JUN CORP8006.jpg"
            alt="Oficina de Calderón Galindo Abogados"
            className="h-[300px] w-full object-cover grayscale transition duration-500 hover:grayscale-0"
            style={{ objectPosition: 'center 30%' }}
          />
        </Reveal>
```

- [ ] **Step 2: Reemplazar el `<h2>` de "Sobre Nosotros"** ([AboutSection.jsx:16-18](../src/components/home/AboutSection.jsx#L16-L18)) por `SectionHeader` centrado:

```jsx
        <SectionHeader
          eyebrow="Sobre nosotros"
          title="Un legado de justicia y confianza"
          lead="De dos jóvenes apasionados por el derecho a una firma con presencia nacional."
          align="center"
        />
        <div className="mt-16" />
```

- [ ] **Step 3: Tokens de color.** Reemplazar en todo el archivo `bg-gray-50` → `bg-marfil`, `text-gray-700` → `text-piedra`, y los `rounded-xl` de las cards → `rounded-2xl`. La sección raíz pasa de `bg-blanco-puro` a `bg-blanco-puro` (sin cambio) para alternar con el Proceso oscuro previo.

- [ ] **Step 4: Imports.** Añadir al inicio:

```jsx
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
```

- [ ] **Step 5: Verificar visual** — `npm run dev`: ya no hay imagen de Unsplash (es foto propia), encabezado editorial, misión/visión/valores con tokens nuevos.
- [ ] **Step 6: Commit**

```bash
git add src/components/home/AboutSection.jsx
git commit -m "feat(home): sobre nosotros con foto propia y encabezado editorial"
```

---

### Task 15: Equipo (encabezado editorial + retoque de cards)

**Files:**
- Modify: `src/components/home/TeamSection.jsx`

- [ ] **Step 1: Importar y usar `SectionHeader`.** Añadir `import SectionHeader from '../ui/SectionHeader'` y reemplazar el `<h2>` ([TeamSection.jsx:20-22](../src/components/home/TeamSection.jsx#L20-L22)) por:

```jsx
        <SectionHeader
          eyebrow="Nuestro equipo"
          title="Profesionales comprometidos con su caso"
          align="center"
        />
        <div className="mt-16" />
```

- [ ] **Step 2: Tokens.** Cambiar la sección raíz `bg-gray-100` → `bg-marfil` ([TeamSection.jsx:18](../src/components/home/TeamSection.jsx#L18)). En la card, `border-2 border-verde-institucional/30` → `ring-1 ring-niebla border-0`, `rounded-xl` → `rounded-2xl`, y el `text-verde-institucional` del cargo → `text-verde-profundo` ([TeamSection.jsx:45](../src/components/home/TeamSection.jsx#L45)) para contraste AA.

- [ ] **Step 3: Botón "Conocer más".** Cambiar a clase del design system: reemplazar las clases del `<Link>` ([TeamSection.jsx:52-57](../src/components/home/TeamSection.jsx#L52-L57)) por `className="btn-secundario mt-auto w-full"` (texto se mantiene).

- [ ] **Step 4: Verificar visual** — `npm run dev`: carrusel intacto, encabezado editorial, cargo en verde-profundo legible, fondo marfil.
- [ ] **Step 5: Commit**

```bash
git add src/components/home/TeamSection.jsx
git commit -m "feat(home): equipo con encabezado editorial y cards refinadas"
```

---

### Task 16: Testimonios (carrusel con atribución)

**Files:**
- Modify: `src/components/home/TestimonioSection.jsx`

- [ ] **Step 1: Reemplazar todo el archivo** (reusa `useCarousel`, muestra 1 por vista, con flechas e indicadores; fondo verde institucional)

```jsx
import { Quote } from 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { useCarousel } from '../../hooks/useCarousel'

export default function TestimonioSection() {
  const { current, totalSlides, handlePrev, handleNext, handleGoTo } = useCarousel(testimonials.length, 1)
  const offset = -(current * 100)

  return (
    <section id="testimonio" className="bg-verde-institucional py-16 lg:py-24">
      <div className="container max-w-4xl text-center">
        <Quote className="mx-auto mb-8 h-12 w-12 text-negro-profundo/60" />

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${offset}%)` }}>
            {testimonials.map((t, i) => (
              <figure key={i} className="w-full flex-shrink-0 px-2">
                <blockquote className="font-titulo text-xl font-medium italic leading-relaxed text-negro-profundo lg:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-cuerpo mt-6 text-negro-profundo/80">
                  <span className="font-semibold">{t.author}</span>
                  {t.role && <span className="opacity-70"> · {t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={handlePrev} aria-label="Anterior" className="rounded-full bg-negro-profundo/10 p-2 text-negro-profundo transition hover:bg-negro-profundo/20">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleGoTo(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-negro-profundo' : 'w-2 bg-negro-profundo/30'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} aria-label="Siguiente" className="rounded-full bg-negro-profundo/10 p-2 text-negro-profundo transition hover:bg-negro-profundo/20">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: cita grande, atribución, flechas e indicadores funcionan. (Confirmado: `useCarousel(n, 1)` da `totalSlides = Math.ceil(n/1) = n`, es decir, un testimonio por vista — ver [useCarousel.js:4](../src/hooks/useCarousel.js#L4). Incluye auto-slide cada 8s, igual que el carrusel del equipo.)
- [ ] **Step 3: Commit**

```bash
git add src/components/home/TestimonioSection.jsx
git commit -m "feat(home): testimonios en carrusel con atribución"
```

---

### Task 17: FaqSection (NUEVA)

**Files:**
- Create: `src/components/home/FaqSection.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import SectionHeader from '../ui/SectionHeader'
import Accordion from '../ui/Accordion'
import { faqs } from '../../data/faqs'

export default function FaqSection() {
  return (
    <section id="faq" className="bg-marfil py-20 lg:py-28">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Resolvemos sus dudas antes de empezar"
            lead="¿No encuentra su respuesta? Escríbanos y le ayudamos personalmente."
          />
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: encabezado a la izquierda, acordeón a la derecha; abrir/cerrar anima la altura.
- [ ] **Step 3: Commit**

```bash
git add src/components/home/FaqSection.jsx
git commit -m "feat(home): sección FAQ con acordeón"
```

---

### Task 18: Contacto (encabezado editorial + banda CTA)

**Files:**
- Modify: `src/components/home/ContactSection.jsx`

- [ ] **Step 1: Importar `SectionHeader`** y reemplazar el `<h2>`/`<p>` introductorios ([ContactSection.jsx:36-41](../src/components/home/ContactSection.jsx#L36-L41)) por:

```jsx
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de su caso"
          lead="Estamos listos para escucharle. Agende una consulta y descubra cómo podemos ayudarle."
          align="center"
        />
        <div className="mt-16" />
```

- [ ] **Step 2: Tokens.** En el archivo: `bg-gray-50` → `bg-marfil`, `text-gray-700` → `text-piedra`, íconos `text-verde-institucional` → `text-verde-profundo`, `rounded-xl` → `rounded-2xl` en las cards. El botón de submit: reemplazar sus clases ([ContactSection.jsx:127-132](../src/components/home/ContactSection.jsx#L127-L132)) por `className="btn-primario w-full"`.

- [ ] **Step 3: Banda CTA final.** Antes del cierre `</section>` añadir un bloque de cierre de alto contraste:

```jsx
        <div className="mt-20 rounded-3xl bg-negro-profundo px-8 py-12 text-center lg:py-16">
          <h3 className="font-titulo text-2xl font-semibold text-blanco-puro lg:text-3xl">
            ¿Prefiere una respuesta inmediata?
          </h3>
          <p className="font-cuerpo mx-auto mt-3 max-w-xl text-blanco-puro/75">
            Escríbanos por WhatsApp y le atenderemos lo antes posible.
          </p>
          <a
            href="https://wa.me/573239326636?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primario mt-8"
          >
            Escribir por WhatsApp
          </a>
        </div>
```

- [ ] **Step 4: Verificar visual** — `npm run dev`: encabezado editorial, form/datos con tokens nuevos, banda CTA oscura al final antes del footer.
- [ ] **Step 5: Commit**

```bash
git add src/components/home/ContactSection.jsx
git commit -m "feat(home): contacto con encabezado editorial y banda CTA"
```

---

### Task 19: Footer expandido

**Files:**
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Reemplazar todo el archivo**

```jsx
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
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: footer de 4 columnas con navegación, áreas y contacto; en móvil apila.
- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat(layout): footer expandido con navegación y contacto"
```

---

### Task 20: Nuevo orden de la Home

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Reemplazar todo el archivo**

```jsx
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import QuienesSomosSection from '../components/home/QuienesSomosSection'
import AreasPracticaSection from '../components/home/AreasPracticaSection'
import ProcesoSection from '../components/home/ProcesoSection'
import AboutSection from '../components/home/AboutSection'
import TeamSection from '../components/home/TeamSection'
import TestimonioSection from '../components/home/TestimonioSection'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'

export default function HomePage() {
  const animRef = useScrollAnimation()

  return (
    <main ref={animRef}>
      <HeroSection />
      <StatsSection />
      <QuienesSomosSection />
      <AreasPracticaSection />
      <ProcesoSection />
      <AboutSection />
      <TeamSection />
      <TestimonioSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
```

- [ ] **Step 2: Verificar visual** — `npm run dev`: recorrer toda la Home; alternancia de fondos claro/oscuro coherente (Hero oscuro → Stats negro → Quiénes marfil → Áreas blanco → Proceso verde-bosque → About blanco → Equipo marfil → Testimonios verde → FAQ marfil → Contacto blanco + CTA negro → Footer negro).
- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat(home): nuevo orden de secciones con secciones nuevas"
```

---

## FASE 4 — Pulido (accesibilidad, performance, QA responsive)

### Task 21: Auditoría de contraste y accesibilidad

**Files:** (ajustes puntuales según hallazgos)

- [ ] **Step 1:** Verificar contrastes con un checker (p. ej. WebAIM). Confirmar:
  - `piedra (#5F5E58)` sobre blanco/marfil ≥ 4.5:1.
  - `verde-profundo (#46602F)` sobre blanco/marfil ≥ 4.5:1.
  - texto `negro-profundo` sobre `verde-institucional` ≥ 4.5:1.
  - Si alguno falla, oscurecer el token en `tailwind.config.js` (Task 1) y recompilar.
- [ ] **Step 2:** Revisar que toda imagen tenga `alt` significativo (decorativas con `alt=""`), que los botones-ícono tengan `aria-label` (ya en carrusel/acordeón) y que los `:focus-visible` se vean (ya en [index.css:97](../src/index.css#L97)).
- [ ] **Step 3: Lighthouse** (Chrome DevTools) en `npm run dev` o `npm run preview`: Accessibility ≥ 95.
- [ ] **Step 4: Commit** (si hubo ajustes)

```bash
git add -A
git commit -m "fix(a11y): ajustes de contraste y accesibilidad"
```

---

### Task 22: QA responsive y performance

- [ ] **Step 1:** Probar en 375px, 768px, 1024px, 1440px: hero, grids de áreas/proceso/stats, carruseles, footer. Corregir desbordes.
- [ ] **Step 2:** Imagen del hero: confirmar que la foto elegida pesa razonablemente; si es muy pesada, optimizarla (sin cambiar pipeline). Considerar `loading="eager"` solo en el hero y `loading="lazy"` en el resto (las `<img>` de secciones inferiores pueden llevar `loading="lazy"`).
- [ ] **Step 3:** `npm run build` final → sin warnings críticos.
- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(ui): QA responsive y optimización de imágenes"
```

---

## 5. Criterios de aceptación (Definition of Done)
- [ ] Paleta, fuentes y fotos propias se mantienen (cero imágenes externas / Unsplash).
- [ ] Home con el nuevo orden y las 3 secciones nuevas (Stats, Proceso, FAQ).
- [ ] Hero con imagen propia + titular de valor + doble CTA.
- [ ] Header transparente sobre el hero, sólido al hacer scroll.
- [ ] Cards de áreas con altura uniforme y "Ver más".
- [ ] Testimonios en carrusel con atribución; footer expandido.
- [ ] Contraste AA en textos; Lighthouse Accessibility ≥ 95.
- [ ] `npm run build` sin errores; responsive correcto en móvil y desktop.

## 6. Fuera de alcance (no en este plan)
- Backend real del formulario de contacto (hoy solo modal) — funcionalidad, no front.
- Páginas de detalle por área (`/areas/[slug]`) — posible Fase 2.
- SEO técnico / structured data (sitemap ya existe per git) — adyacente.
- Rediseño profundo de `/equipo` (solo hereda tokens; se puede tratar aparte).

## 7. Decisiones abiertas (confirmar con el cliente)
1. **Cifras de Stats** (`stats.js`): años, casos, ciudades — usar reales.
2. **Testimonios** (`testimonials.js`): **reemplazar los de ejemplo por reseñas reales con consentimiento.** No publicar testimonios inventados.
3. **Respuestas de FAQ** (`faqs.js`): validar cobertura geográfica y política de honorarios.
4. **Foto del hero**: elegir la mejor toma apaisada de oficina/equipo (`HERO_IMG`).
5. **Copy del titular del hero**: ¿"Estrategia legal a la altura de sus objetivos" u otra? (alternativas: "Defendemos su patrimonio. Impulsamos su crecimiento.").

## 8. (Opcional) Publicar el design system con `/design-sync`
Los primitivos de la Fase 1 (`SectionHeader`, botones, `Accordion`, cards) pueden documentarse como tarjetas de previsualización HTML y sincronizarse a un proyecto de **claude.ai/design** con la skill `/design-sync` (herramienta `DesignSync`). Útil si se quiere un *living style guide*; no es requisito para ejecutar este plan.

---

## Self-review (checklist del autor)
- **Cobertura del spec:** ✅ Mantener paleta (Task 1, regla de accesibilidad), imágenes propias (Tasks 8/11/14, elimina Unsplash), contenido parafraseable (Tasks 6/7 + copys nuevos). Investigación de referentes aplicada (§1.3 principios). Plan en `docs/01-nuevo-front.md` (este archivo). Skill writing-plans (formato y handoff). Skill de diseño: aclarada en §8.
- **Placeholders:** los `// CONFIRMAR` son datos de negocio a validar (listados en §7), no instrucciones vagas; el código es ejecutable tal cual con sus valores por defecto.
- **Consistencia de tipos/nombres:** tokens (`marfil`, `piedra`, `verde-profundo`, `verde-bosque`, `carbon`) definidos en Task 1 y usados consistentemente; `SectionHeader`/`Reveal`/`Accordion`/`useCountUp` definidos en Fase 1 y consumidos con la misma firma; data (`practiceAreas`, `stats`, `testimonials`, `faqs`) creada en Fase 2 y consumida en Fase 3.
