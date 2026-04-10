/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-institucional': '#9EBC8A',
        'negro-profundo': '#1D1D1B',
        'blanco-puro': '#FFFFFF',
      },
      fontFamily: {
        titulo: ['"STIX Two Text"', 'serif'],
        cuerpo: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
