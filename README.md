# Calderón Galindo Abogados - Sitio Web Institucional

Sitio web institucional moderno y minimalista para el bufete colombiano Calderón Galindo Abogados.

## 🎨 Identidad Visual

### Colores Corporativos
- **Verde institucional**: `#9EBC8A`
- **Negro profundo**: `#1D1D1B`
- **Blanco puro**: `#FFFFFF`

### Tipografía
- **Principal (títulos, encabezados, citas)**: STIX Two Text
- **Secundaria (párrafos, botones, formularios)**: Inter (como alternativa a Myriad Variable Concept)

## 📁 Estructura del Proyecto

```
windsurf-project/
├── index.html          # Página principal con todas las secciones
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── encabezado_logo_blanco.png  # Logo oficial (agregar)
```

## 🚀 Características

### Secciones Implementadas

1. **Página de Inicio (#home)**
   - Banner principal con logo
   - Subtítulo institucional
   - Botón de llamada a la acción
   - Sección "¿Quiénes somos?"
   - Áreas de práctica (3 tarjetas)
   - Testimonio destacado

2. **Sobre Nosotros (#about)**
   - Historia de la firma
   - Misión y Visión
   - Valores corporativos (6 valores con íconos)
   - Imagen institucional del edificio

3. **Nuestro Equipo (#team)**
   - 5 perfiles de abogados con:
     - Foto profesional
     - Nombre y cargo
     - Descripción profesional
     - Email y LinkedIn

4. **Contacto (#contact)**
   - Información de la oficina
   - Formulario de consulta
   - Mapa de Google Maps (Hotel Tequendama)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS via CDN
- **Lucide Icons**: Iconografía minimalista
- **JavaScript Vanilla**: Interactividad
- **Google Fonts**: STIX Two Text e Inter

## 📋 Instrucciones de Uso

### 1. Agregar el Logo

Para que el sitio muestre correctamente el logo de la firma:

1. Coloque el archivo `encabezado_logo_blanco.png` en la raíz del proyecto
2. El logo debe tener fondo transparente
3. Dimensiones recomendadas: 400-500px de ancho

Si no tiene el logo, el sitio mostrará automáticamente el título "Calderón Galindo Abogados" como respaldo.

### 2. Abrir el Sitio

Simplemente abra el archivo `index.html` en su navegador web preferido:
- Doble clic en `index.html`, o
- Clic derecho → Abrir con → Navegador

### 3. Personalizar Contenido

#### Modificar información del equipo:
Edite el array `teamMembers` en `script.js` (líneas 24-75)

#### Cambiar colores:
Modifique las variables en `styles.css` (líneas 5-9) o en `script.js` (líneas 2-12)

#### Actualizar información de contacto:
Edite la sección `#contact` en `index.html`

## 🎯 Características Técnicas

### Diseño Responsivo
- Adaptado para móviles, tablets y escritorio
- Menú hamburguesa en dispositivos móviles
- Grid system flexible

### Animaciones
- Fade-in al hacer scroll
- Hover effects en tarjetas y botones
- Transiciones suaves
- Parallax sutil en el hero

### Interactividad
- Navegación smooth scroll
- Menú móvil desplegable
- Formulario de contacto con validación
- Modal personalizado para mensajes

### Optimizaciones
- Carga de fuentes optimizada
- Imágenes con lazy loading
- CSS minimalista
- JavaScript modular

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles iOS/Android

## 🔧 Personalización Avanzada

### Cambiar imágenes de fondo:
1. **Hero banner**: Línea 78 en `styles.css`
2. **Secciones**: Buscar URLs de Unsplash en `index.html`

### Modificar el mapa:
Reemplace el iframe de Google Maps en la sección `#contact` con las coordenadas de su oficina.

### Agregar más miembros del equipo:
Agregue objetos al array `teamMembers` en `script.js` siguiendo la estructura existente.

## 📞 Información de Contacto (Ejemplo)

- **Dirección**: Carrera 7 # 27-52, Hotel Tequendama, Bogotá, Colombia
- **WhatsApp**: +57 300 000 0000
- **Email**: contacto@calderongalindo.com.co
- **Horario**: Lunes a Viernes, 8:00 a.m. - 5:00 p.m.

## 📝 Notas Importantes

1. **Logo**: Asegúrese de agregar el archivo `encabezado_logo_blanco.png` para la identidad visual completa
2. **Fotos del equipo**: Las fotos actuales son placeholders. Reemplácelas con fotos profesionales reales
3. **Enlaces de LinkedIn**: Actualice los enlaces `#` con las URLs reales de los perfiles
4. **Formulario**: El formulario actualmente muestra un mensaje de confirmación. Para funcionalidad real, integre con un backend o servicio de email

## 🎨 Guía de Estilo

### Botones
- Fondo: Verde institucional (#9EBC8A)
- Texto: Blanco o Negro según contraste
- Hover: Sombra suave y ligero scale

### Tarjetas
- Fondo: Blanco
- Borde superior: Verde institucional (4px)
- Sombra: Ligera, aumenta en hover
- Hover: Elevación (-8px translateY)

### Tipografía
- Títulos grandes: 3xl - 5xl (STIX Two Text)
- Subtítulos: 2xl - 3xl (STIX Two Text)
- Cuerpo: base - lg (Inter)
- Énfasis: Verde institucional

## 🚀 Próximos Pasos Sugeridos

1. ✅ Agregar logo oficial
2. ✅ Reemplazar fotos del equipo con imágenes reales
3. ✅ Actualizar enlaces de LinkedIn
4. ✅ Configurar formulario de contacto con backend
5. ✅ Optimizar imágenes para web
6. ✅ Implementar analytics (Google Analytics)
7. ✅ Configurar SEO (meta tags, Open Graph)
8. ✅ Agregar certificado SSL para producción

## 📄 Licencia

© 2024 Calderón Galindo Abogados. Todos los derechos reservados.

---

**Desarrollado con atención al detalle siguiendo el manual de marca de Calderón Galindo Abogados**
