import { useEffect, useRef } from 'react'

/**
 * Agrega clase 'fade-in' a elementos con data-animate cuando entran al viewport.
 * Devuelve una ref para adjuntar al contenedor.
 */
export function useScrollAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' },
    )

    const targets = container.querySelectorAll('[data-animate]')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}
