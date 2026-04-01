import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Maps the scroll position within a section to a 0–1 progress value.
 * Only runs the scroll listener when the section is near the viewport.
 */
export function useScrollProgress() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const rafId = useRef(null)

  const compute = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const vh = window.innerHeight
    // progress 0 = section top hits viewport bottom
    // progress 1 = section bottom hits viewport top
    const sectionH = rect.height
    const scrollRange = sectionH - vh
    if (scrollRange <= 0) return

    const raw = -rect.top / scrollRange
    const clamped = Math.max(0, Math.min(1, raw))
    setProgress(clamped)
    setIsActive(clamped > 0 && clamped < 1)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let listening = false

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(compute)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener('scroll', onScroll, { passive: true })
          listening = true
          onScroll() // compute immediately
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener('scroll', onScroll)
          listening = false
        }
      },
      { rootMargin: '400px 0px' }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [compute])

  return { ref, progress, isActive }
}
