import { useRef, useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useFrameSequence } from '../hooks/useFrameSequence'
import styles from './RoomFurnishing.module.css'

const DESKTOP_FRAMES = 60
const MOBILE_FRAMES = 20
const DESKTOP_PATH = '/img/furnishing/frame_'
const MOBILE_PATH = '/img/furnishing/mobile/frame_'
const EXT = 'webp'

const stages = [
  { start: 0.00, end: 0.15, key: 'stageEmpty' },
  { start: 0.38, end: 0.62, key: 'stageVision' },
  { start: 0.82, end: 1.00, key: 'stageComplete' },
]

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

export default function RoomFurnishing() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const lastFrame = useRef(-1)
  const rafId = useRef(null)
  const isMobile = useIsMobile()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [progress, setProgress] = useState(0)

  const frameCount = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
  const basePath = isMobile ? MOBILE_PATH : DESKTOP_PATH
  const { images, loaded, loadProgress } = useFrameSequence(frameCount, basePath, EXT, shouldLoad)

  // Start loading when section is near viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true) },
      { rootMargin: '600px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Scroll handler — progress based on how far the canvas has traveled through viewport
  useEffect(() => {
    const wrap = canvasWrapRef.current
    if (!wrap) return

    let listening = false

    const compute = () => {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 = canvas top hits bottom third of viewport
      // 1 = canvas top hits top quarter of viewport
      // Slower, more gradual animation range
      const start = vh * 0.85  // starts earlier (canvas just entering viewport)
      const end = -rect.height * 0.6  // ends when canvas is 60% out of viewport top
      const current = rect.top
      const raw = (start - current) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(compute)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener('scroll', onScroll, { passive: true })
          listening = true
          onScroll()
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener('scroll', onScroll)
          listening = false
        }
      },
      { rootMargin: '100px 0px' }
    )

    obs.observe(wrap)
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Draw frame on canvas
  useEffect(() => {
    if (!loaded || !canvasRef.current) return
    const frameIdx = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(progress * (frameCount - 1)))
    )
    if (frameIdx === lastFrame.current) return
    lastFrame.current = frameIdx

    const img = images[frameIdx]
    if (!img) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
    }
    ctx.drawImage(img, 0, 0)
  }, [progress, images, loaded, frameCount])

  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!reducedMotion || !loaded || !canvasRef.current) return
    const img = images[frameCount - 1]
    if (!img) return
    const canvas = canvasRef.current
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.getContext('2d').drawImage(img, 0, 0)
  }, [reducedMotion, loaded, images, frameCount])

  const getOverlayOpacity = useCallback((stage) => {
    const { start, end } = stage
    const fadeIn = 0.06
    const fadeOut = 0.06
    if (progress < start || progress > end) return 0
    if (progress < start + fadeIn) return (progress - start) / fadeIn
    if (progress > end - fadeOut) return (end - progress) / fadeOut
    return 1
  }, [progress])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <span className="section-label">{t('roomFurnishing.label')}</span>
        <h2 className="section-title">
          {t('roomFurnishing.title1')}<br />
          <em>{t('roomFurnishing.titleEm')}</em>
        </h2>
        {!loaded && shouldLoad && (
          <p className={styles.loadingText}>
            {Math.round(loadProgress * 100)}%
          </p>
        )}
      </div>

      <div className={styles.canvasWrap} ref={canvasWrapRef}>
        {!loaded && (
          <img
            src="/img/furnishing/placeholder.webp"
            alt="AI virtual staging room furnishing preview | Unreel Estate"
            className={styles.placeholder}
            loading="lazy"
          />
        )}

        <canvas
          ref={canvasRef}
          className={`${styles.canvas} ${loaded ? styles.canvasVisible : ''}`}
        />

        <div
          className={styles.progressBar}
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
        />

        {loaded && stages.map((stage) => (
          <div
            key={stage.key}
            className={styles.overlayText}
            style={{ opacity: getOverlayOpacity(stage) }}
          >
            {t(`roomFurnishing.${stage.key}`)}
          </div>
        ))}
      </div>

      <p className={styles.subtitle}>{t('roomFurnishing.subtitle')}</p>
    </section>
  )
}
