export default function Footer() {
  return (
    <footer className="bg-negro-profundo text-blanco-puro py-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="text-xl font-titulo font-bold flex items-center mb-4 md:mb-0 opacity-90">
          <span className="inline-block w-3 h-5 bg-verde-institucional mr-2" />
          Calderón Galindo Abogados
        </div>
        <p className="font-cuerpo text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Calderón Galindo Abogados. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
