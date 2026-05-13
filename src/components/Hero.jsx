import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay muted loop playsInline
        poster="/hero-poster.jpg"
        onCanPlay={e => e.target.classList.add(styles.loaded)}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.dot} />
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t('hero.title1')}<br />
            <em>{t('hero.titleEm')}</em>
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a
              href="https://app.unreelestate.com/dashboard/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t('hero.btnUpload')}
            </a>
            <a href="#galli-crew" className="btn-secondary">{t('hero.btnCrew')}</a>
          </motion.div>

          <motion.div
            className={styles.trustStrip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            aria-label="Trust signals"
          >
            <span className={styles.trustItem}>{t('hero.trust1')}</span>
            <span className={styles.trustDot} aria-hidden="true">·</span>
            <span className={styles.trustItem}>{t('hero.trust2')}</span>
            <span className={styles.trustDot} aria-hidden="true">·</span>
            <span className={styles.trustItem}>{t('hero.trust3')}</span>
          </motion.div>

          <motion.p
            className={styles.subnote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            {t('hero.subnote')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
