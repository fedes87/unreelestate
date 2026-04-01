import { useRef, useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useFrameSequence } from '../hooks/useFrameSequence'
import styles from './RoomFurnishing.module.css'

const DESKTOP_FRAMES = 60
const MOBILE_FRAMES = 20
const DESKTOP_PATH = '/img/furnishing/frame_'
const MOBILE_PATH = '/img/furnishing/mobile/frame_'
const EXT = 'webp'

const stages = [
  { start: 0.00, end: 0.12, key: 'stageEmpty' },
  { start: 0.40, end: 0.60, key: 'stageVision' },
  { start: 0.85, end: 1.00, key: 'stageComplete' },
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
  const canvasRef = useRef(null)
  const lastFrame = useRef(-1)
  const isMobile = useIsMobile()
  const { ref, progress } = useScrollProgress()
  const [shouldLoad, setShouldLoad] = useState(false)

  const frameCount = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
  const basePath = isMobile ? MOBILE_PATH : DESKTOP_PATH
  const { images, loaded, loadProgress } = useFrameSequence(frameCount, basePath, EXT, shouldLoad)

  // Start loading when section is near viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true) },
      { rootMargin: '600px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])

  // Draw frame on canvas based on scroll progress
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

  // Prefers reduced motion — show final frame
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
    const fadeIn = 0.05
    const fadeOut = 0.05
    if (progress < start || progress > end) return 0
    if (progress < start + fadeIn) return (progress - start) / fadeIn
    if (progress > end - fadeOut) return (end - progress) / fadeOut
    return 1
  }, [progress])

  return (
    <section
      className={`${styles.section} ${reducedMotion ? styles.static : ''}`}
      ref={ref}
    >
      <div className={styles.sticky}>
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

        <div className={styles.canvasWrap}>
          {!loaded && (
            <img
              src="/img/furnishing/placeholder.webp"
              alt=""
              className={styles.placeholder}
            />
          )}

          <canvas
            ref={canvasRef}
            className={`${styles.canvas} ${loaded ? styles.canvasVisible : ''}`}
          />

          <div
            className={styles.progressBar}
            style={{ width: `${progress * 100}%` }}
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

        {progress > 0.92 && loaded && (
          <p className={styles.subtitle}>{t('roomFurnishing.subtitle')}</p>
        )}
      </div>
    </section>
  )
}
