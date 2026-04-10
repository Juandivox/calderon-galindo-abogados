# Plan de refactorizacion a React

## Resumen

Migrar este repo a una sola aplicacion con Vite + React 18 + React Router + Tailwind CSS, manteniendo la experiencia visual y funcional actual del sitio principal y de `legal-tech-landing`.

Rutas publicas objetivo:

- `/` para la pagina principal
- `/equipo` para la pagina de equipo
- `/legal-tech` para la landing de LegalTech

El despliegue se hara como una SPA servida por Nginx con fallback a `index.html` para soportar navegacion directa y refresh en cualquier ruta.

---

## Fase 1 - Setup base del proyecto

- Crear una sola app React en la raiz del repo.
- Configurar Vite, React 18, React Router y Tailwind CSS con PostCSS.
- Migrar Tailwind CDN y `lucide` CDN a dependencias de proyecto (`tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`).
- Mover la configuracion visual comun a la nueva base del proyecto.
- Definir la estructura inicial de carpetas:

```text
src/
  components/
    home/
    legal-tech/
    layout/
    team/
    ui/
  data/
    legalTech.js
    team.js
  hooks/
  pages/
    HomePage.jsx
    LegalTechPage.jsx
    TeamPage.jsx
  App.jsx
  main.jsx
```

---

## Fase 2 - Modelado de contenido y datos

- Extraer el contenido del equipo a una fuente de datos estructurada, no solo el array actual del carrusel.
- Modelar cada abogado con resumen para home y contenido detallado para `/equipo`.
- Corregir las inconsistencias actuales entre `script.js` y `equipo.html` en fotos, cantidad de perfiles y texto.
- Migrar `legal-tech-landing` como contenido independiente dentro de la misma app, con su propia ruta.

### Tipo base de equipo

Definir un tipo o shape `TeamMember` con:

- `slug`
- `name`
- `position`
- `email`
- `linkedin`
- `summary`
- `shortPhoto`
- `detailPhoto`
- `detailBlocks`
- `showOnHome`
- `showOnTeamPage`

---

## Fase 3 - Migracion de layout y navegacion

- Crear layout compartido para header, footer y elementos comunes.
- Usar `BrowserRouter`.
- Configurar las rutas `/`, `/equipo` y `/legal-tech`.
- Mantener navegacion por secciones del home con hashes: `/#home`, `/#about`, `/#areas-practica`, `/#team`, `/#testimonio`, `/#contact`.
- Resolver scroll con offset de header sticky desde cualquier ruta.
- Reemplazar `href="equipo.html"` y `href="index.html#..."` por navegacion declarativa.

---

## Fase 4 - Migracion de la home

- Migrar la pagina principal a `HomePage`.
- Convertir a componentes React las secciones del home.
- Mantener la experiencia visual actual del hero, secciones informativas, areas de practica, testimonio y contacto.
- Convertir el menu movil, el modal, el carrusel y las animaciones de scroll a React con hooks.
- Mantener el formulario en esta fase como validacion client-side sin backend.
- Mantener los enlaces de WhatsApp y contacto actuales.

---

## Fase 5 - Migracion de la pagina de equipo

- Migrar `equipo.html` a `TeamPage`.
- Renderizar el detalle completo del equipo desde la nueva fuente de datos.
- Conservar el contenido actual de perfiles sin perder informacion enriquecida.
- Unificar la navegacion entre home y equipo para que comparta header, footer y estado visual.

---

## Fase 6 - Migracion de LegalTech

- Migrar `legal-tech-landing/index.html` a `LegalTechPage`.
- Mantener la landing como ruta interna `/legal-tech`.
- Conservar la experiencia visual y funcional existente en esta primera fase.
- Si faltan assets especificos de LegalTech, usar fallbacks temporales definidos en implementacion sin bloquear la migracion.

---

## Fase 7 - Analytics

- Preservar GTM, GA4, Meta Pixel y TikTok Pixel segun la cobertura actual.
- Centralizar carga e instrumentacion para evitar duplicaciones entre paginas.
- Disparar pageviews al cambiar de ruta.

---

## Fase 8 - Despliegue

- Reemplazar el Dockerfile actual por build multi-stage: compilar con Node y servir con Nginx.
- Agregar configuracion de Nginx con `try_files $uri $uri/ /index.html;`.
- Verificar navegacion directa y refresh en todas las rutas publicas.

---

## Fase 9 - Pruebas y criterios de aceptacion

- `npm run build` debe pasar.
- Navegacion directa y refresh deben funcionar en `/`, `/equipo` y `/legal-tech`.
- La home debe conservar:
  - menu sticky
  - menu movil
  - carrusel del equipo
  - modal
  - formulario
  - boton flotante de WhatsApp
- `/equipo` debe renderizar el detalle completo del equipo sin perder contenido actual.
- `/legal-tech` debe quedar visualmente equivalente a la landing existente.
- No debe haber referencias rotas a imagenes o assets inexistentes.
- Los analytics no deben duplicar eventos por navegacion interna.

---

## Supuestos

- "reach" significa React.
- `legal-tech-landing` entra en esta fase y se migra como una ruta de la misma app.
- El objetivo es paridad visual y funcional, no rediseno.
