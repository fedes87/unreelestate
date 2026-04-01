import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './StyleTransformer.module.css'

const STYLES = [
  { key: 'neutral',       label: 'Neutral'        },
  { key: 'luxury',        label: 'Luxury'         },
  { key: 'scandinavian',  label: 'Scandinavian'   },
  { key: 'modern',        label: 'Modern'         },
  { key: 'contemporary',  label: 'Contemporary'   },
  { key: 'industrial',    label: 'Industrial'     },
  { key: 'mediterranean', label: 'Mediterranean'  },
  { key: 'transitional',  label: 'Transitional'   },
]

const ROOMS = ['living', 'kitchen', 'bedroom']

function imgSrc(styleKey, room) {
  if (styleKey === 'neutral') return `/img/styles/base-${room}.png`
  return `/img/styles/${styleKey}-${room}.png`
}

const vp = { once: true, amount: 0.1 }

export default function StyleTransformer() {
  const { t } = useTranslation()
  const [activeStyle, setActiveStyle] = useState('neutral')
  const [displayStyle, setDisplayStyle] = useState('neutral')
  const [fading, setFading] = useState(false)
  const [activeRoom, setActiveRoom] = useState(0)
  const preloadedRef = useRef(false)

  // Preload all images
  useEffect(() => {
    if (preloadedRef.current) return
    preloadedRef.current = true
    STYLES.forEach(s => ROOMS.forEach(r => {
      const img = new Image()
      img.src = imgSrc(s.key, r)
    }))
  }, [])

  const handleStyleChange = (key) => {
    if (key === activeStyle || fading) return
    setFading(true)
    setTimeout(() => {
      setDisplayStyle(key)
      setActiveStyle(key)
      setFading(false)
    }, 280)
  }

  const roomLabels = t('styleTransformer.rooms', { returnObjects: true })
  const currentStyleLabel = STYLES.find(s => s.key === activeStyle)?.label

  return (
    <section className={styles.section} id="styles">
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('styleTransformer.label')}</span>
          <h2 className="section-title">
            {t('styleTransformer.title1')}<br />
            <em>{t('styleTransformer.titleEm')}</em>
          </h2>
          <p className="section-subtitle">{t('styleTransformer.subtitle')}</p>
          <div className={styles.hint}>
            <span className={styles.hintDot} />
            {t('styleTransformer.hint')}
          </div>
        </motion.div>

        {/* ── DESKTOP: 3-column grid + pills above ── */}
        <div className={styles.desktopLayout}>
          <motion.div
            className={styles.selector}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {STYLES.map(s => (
              <button
                key={s.key}
                className={`${styles.pill} ${activeStyle === s.key ? styles.pillActive : ''}`}
                onClick={() => handleStyleChange(s.key)}
              >
                {s.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            className={styles.activeLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.activeDot} />
            {currentStyleLabel}
          </motion.div>

          <motion.div
            className={styles.grid}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {ROOMS.map((room, i) => (
              <div key={room} className={styles.photoWrap}>
                {STYLES.map(s => (
                  <img
                    key={s.key}
                    src={imgSrc(s.key, room)}
                    alt={`${s.label} ${roomLabels[i]}`}
                    className={`${styles.photo}
                      ${s.key === displayStyle && !fading ? styles.photoVisible : ''}
                      ${fading && s.key === activeStyle ? styles.photoFading : ''}`}
                  />
                ))}
                <div className={styles.roomLabel}>{roomLabels[i]}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── MOBILE: room tabs + single photo + pills below ── */}
        <div className={styles.mobileLayout}>
          {/* Room tabs */}
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
                onClick={() => setActiveRoom(i)}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Single photo */}
          <motion.div
            className={styles.mobilePhotoWrap}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {STYLES.map(s => (
              <img
                key={s.key}
                src={imgSrc(s.key, ROOMS[activeRoom])}
                alt={`${s.label} ${roomLabels[activeRoom]}`}
                className={`${styles.photo}
                  ${s.key === displayStyle && !fading ? styles.photoVisible : ''}
                  ${fading && s.key === activeStyle ? styles.photoFading : ''}`}
              />
            ))}
            <div className={styles.roomLabel}>{roomLabels[activeRoom]}</div>
            <div className={styles.mobileStyleBadge}>{currentStyleLabel}</div>
          </motion.div>

          {/* Style pills below the photo */}
          <motion.div
            className={`${styles.selector} ${styles.mobilePills}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {STYLES.map(s => (
              <button
                key={s.key}
                className={`${styles.pill} ${activeStyle === s.key ? styles.pillActive : ''}`}
                onClick={() => handleStyleChange(s.key)}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#contact" className="btn-primary">{t('styleTransformer.cta')}</a>
        </motion.div>
      </div>
    </section>
  )
}
