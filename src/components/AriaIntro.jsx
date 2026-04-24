import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AriaIntro.module.css'

// iMessage-style hero intro for Aria on the marketing landing page.
// Aria avatar on the left (looping idle clip) + chat bubbles on the right
// that cascade in as the section scrolls into view. CTA at the end opens
// the AriaWidget via a global custom event.
export default function AriaIntro() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  // Trigger the cascade when the section enters the viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const rawBubbles = t('ariaIntro.bubbles', { returnObjects: true })
  const bubbles = Array.isArray(rawBubbles) ? rawBubbles : []

  const openAria = () => {
    window.dispatchEvent(new CustomEvent('aria:open'))
  }

  return (
    <section ref={ref} className={styles.section} id="meet-aria">
      <div className="container">
        <div className={styles.inner}>
          {/* Avatar column */}
          <div className={styles.avatarCol}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarHalo} aria-hidden="true" />
              <video
                className={styles.avatarVid}
                autoPlay
                loop
                muted
                playsInline
                poster="/aria/aria_C2_pixar3d_warmskin.png"
                aria-hidden="true"
              >
                <source src="/aria/clips/aria_idle.webm" type="video/webm" />
                <source src="/aria/clips/aria_idle.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.nameplate}>
              <div className={styles.label}>{t('ariaIntro.label')}</div>
              <div className={styles.name}>Aria</div>
              <div className={styles.role}>{t('ariaIntro.role')}</div>
              <div className={styles.onlineRow}>
                <span className={styles.onlineDot} />
                <span>{t('ariaIntro.online')}</span>
              </div>
            </div>
          </div>

          {/* Chat column */}
          <div className={styles.chatCol}>
            <div className={styles.chatHeader}>
              <span className={styles.chatHeaderLabel}>{t('ariaIntro.messageHeader')}</span>
            </div>

            <div className={styles.bubbles}>
              {bubbles.map((text, i) => (
                <div
                  key={i}
                  className={`${styles.bubble} ${visible ? styles.bubbleIn : ''}`}
                  style={{ animationDelay: `${0.4 + i * 1.1}s` }}
                >
                  <span className={styles.bubbleTail} aria-hidden="true" />
                  {text}
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.cta} ${visible ? styles.ctaIn : ''}`}
              style={{
                animationDelay: `${0.4 + bubbles.length * 1.1 + 0.3}s`,
              }}
              onClick={openAria}
            >
              <span className={styles.ctaIcon} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
                </svg>
              </span>
              {t('ariaIntro.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
