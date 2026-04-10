import { useState, useEffect, useCallback, useRef } from 'react'

export function useCarousel(totalItems, itemsPerView = 3, autoSlideMs = 8000) {
  const totalSlides = Math.ceil(totalItems / itemsPerView)
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = useCallback(
    (index) => {
      setCurrent(Math.max(0, Math.min(index, totalSlides - 1)))
    },
    [totalSlides],
  )

  const next = useCallback(() => {
    setCurrent((c) => (c < totalSlides - 1 ? c + 1 : 0))
  }, [totalSlides])

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : totalSlides - 1))
  }, [totalSlides])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, autoSlideMs)
  }, [next, autoSlideMs])

  useEffect(() => {
    timerRef.current = setInterval(next, autoSlideMs)
    return () => clearInterval(timerRef.current)
  }, [next, autoSlideMs])

  const handlePrev = useCallback(() => {
    resetTimer()
    prev()
  }, [resetTimer, prev])

  const handleNext = useCallback(() => {
    resetTimer()
    next()
  }, [resetTimer, next])

  const handleGoTo = useCallback(
    (index) => {
      resetTimer()
      goTo(index)
    },
    [resetTimer, goTo],
  )

  return { current, totalSlides, handlePrev, handleNext, handleGoTo }
}
