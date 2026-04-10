import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Cuando cambia pathname o hash, hace scroll al elemento correspondiente
 * con offset de 80px para el header sticky.
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const id = hash.replace('#', '')

    // Puede necesitar un tick para que el DOM esté listo tras navegación entre rutas
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id)
      if (el) {
        const headerOffset = 80
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (attempts < 5) {
        setTimeout(() => tryScroll(attempts + 1), 100)
      }
    }

    tryScroll()
  }, [pathname, hash])
}
