import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './VideoDemo.module.css'

const ROOMS = [
  { key: 'living',  before: '/img/demo/before-living.webp',  after: '/img/demo/modern-living.webp',  video: '/video/demo/modern-living.mp4'  },
  { key: 'kitchen', before: '/img/demo/before-kitchen.webp', after: '/img/demo/modern-kitchen.webp', video: '/video/demo/modern-kitchen.mp4' },
  { key: 'bedroom', before: '/img/demo/before-bedroom.webp', after: '/img/demo/modern-bedroom.webp', video: '/video/demo/modern-bedroom.mp4' },
]

const STEPS = ['before', 'after', 'video']
const vp = { once: true, amount: 0.1 }

export default function VideoDemo() {
  const { t } = useTranslation()
  const [activeRoom, setActiveRoom] = useState(0)
  const [step, setStep] = useState('before') // 'before' | 'after' | 'video'
  const videoRef = useRef(null)

  const room = ROOMS[activeRoom]

  // When switching rooms or going back to 'before', reset video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [activeRoom, step])

  // Auto-play when step = 'video'
  useEffect(() => {
    if (step === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [step, activeRoom])

  const handleRoomChange = (i) => {
    setActiveRoom(i)
    setStep('before')
  }

  const roomLabels = t('videoDemo.rooms', { returnObjects: true })
  const stepLabels = t('videoDemo.steps', { returnObjects: true })

  return (
    <section className={styles.section} id="demo">
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('videoDemo.label')}</span>
          <h2 className="section-title">
            {t('videoDemo.title1')}<br />
            <em>{t('videoDemo.titleEm')}</em>
          </h2>
          <p className="section-subtitle">{t('videoDemo.subtitle')}</p>
        </motion.div>

        {/* Room selector */}
        <motion.div
          className={styles.roomTabs}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {roomLabels.map((label, i) => (
            <button
              key={i}
              className={`${styles.roomTab} ${activeRoom === i ? styles.roomTabActive : ''}`}
              onClick={() => handleRoomChange(i)}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Main content area */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Media frame */}
          <div className={styles.mediaFrame}>
            {/* Before photo */}
            <img
              src={room.before}
              alt={`Real estate listing photo before AI enhancement — ${room.key}`}
              className={`${styles.media} ${step === 'before' ? styles.mediaVisible : ''}`}
              loading="lazy"
            />

            {/* After photo */}
            <img
              src={room.after}
              alt={`AI-enhanced real estate photo after transformation — ${room.key}`}
              className={`${styles.media} ${step === 'after' ? styles.mediaVisible : ''}`}
              loading="lazy"
            />

            {/* Video */}
            <video
              ref={videoRef}
              key={room.key}
              src={room.video}
              aria-label={`Cinematic video walkthrough — ${room.key}`}
              className={`${styles.media} ${step === 'video' ? styles.mediaVisible : ''}`}
              loop
              muted
              playsInline
            />

            {/* Step badge */}
            <div className={styles.badge}>
              {step === 'before' && <span className={styles.badgeBefore}>{t('videoDemo.badgeBefore')}</span>}
              {step === 'after'  && <span className={styles.badgeAfter}>{t('videoDemo.badgeAfter')}</span>}
              {step === 'video'  && <span className={styles.badgeVideo}>▶ {t('videoDemo.badgeVideo')}</span>}
            </div>
          </div>

          {/* Step controls */}
          <div className={styles.steps}>
            {STEPS.map((s, i) => {
              const currentIdx = STEPS.indexOf(step)
              const isNext = i === currentIdx + 1
              return (
              <button
                key={s}
                className={`${styles.stepBtn} ${step === s ? styles.stepActive : ''} ${
                  currentIdx > i ? styles.stepDone : ''
                } ${isNext ? styles.stepNext : ''}`}
                onClick={() => setStep(s)}
              >
                <span className={styles.stepNum}>{i + 1}</span>
                <span className={styles.stepLabel}>{stepLabels[i]}</span>
                {currentIdx > i && <span className={styles.stepCheck}>✓</span>}
              </button>
              )
            })}

            {/* Connector lines */}
            <div className={styles.connectors}>
              <div className={`${styles.connector} ${STEPS.indexOf(step) >= 1 ? styles.connectorDone : ''}`} />
              <div className={`${styles.connector} ${STEPS.indexOf(step) >= 2 ? styles.connectorDone : ''}`} />
            </div>
          </div>

          {/* Step description */}
          <div className={styles.desc}>
            {step === 'before' && (
              <p>{t('videoDemo.descBefore')}</p>
            )}
            {step === 'after' && (
              <p>{t('videoDemo.descAfter')}</p>
            )}
            {step === 'video' && (
              <p>{t('videoDemo.descVideo')}</p>
            )}
          </div>

          {/* Arrow CTA to next step */}
          {step !== 'video' && (
            <button
              className={styles.nextBtn}
              onClick={() => setStep(STEPS[STEPS.indexOf(step) + 1])}
            >
              {step === 'before' ? t('videoDemo.ctaTransform') : t('videoDemo.ctaAnimate')}
              <span className={styles.arrow}>→</span>
            </button>
          )}
          {step === 'video' && (
            <a href="#contact" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
              {t('videoDemo.ctaContact')}
            </a>
          )}
        </motion.div>

      </div>
    </section>
  )
}
