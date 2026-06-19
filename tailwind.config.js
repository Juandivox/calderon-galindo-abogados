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
