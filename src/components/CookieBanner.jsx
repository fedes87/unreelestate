import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './CookieBanner.module.css'

const CONSENT_KEY = 'unreel-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (state) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
    setVisible(false)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    })
  }

  const acceptSelected = () => {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    })
  }

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    })
  }

  if (!visible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.emoji}>🍪</span>
          <div className={styles.headerText}>
            <h3 className={styles.title}>We respect your privacy</h3>
            <p className={styles.desc}>
              We use essential cookies to make our site work. With your consent, we may also use analytics and marketing cookies to improve our service.{' '}
              <Link to="/privacy-policy">Privacy Policy</Link> &middot;{' '}
              <Link to="/cookie-policy">Cookie Policy</Link>
            </p>
          </div>
        </div>

        {showDetails && (
          <div className={styles.details}>
            <label className={styles.checkRow}>
              <input type="checkbox" checked disabled />
              <div>
                <span className={styles.checkLabel}>Necessary</span>
                <span className={styles.checkDesc}>&mdash; Site functionality &amp; security</span>
              </div>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <div>
                <span className={styles.checkLabel}>Analytics</span>
                <span className={styles.checkDesc}>&mdash; Help us understand how you use our site</span>
              </div>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <div>
                <span className={styles.checkLabel}>Marketing</span>
                <span className={styles.checkDesc}>&mdash; Personalization &amp; email tracking</span>
              </div>
            </label>
          </div>
        )}

        <div className={styles.buttons}>
          {!showDetails ? (
            <>
              <button onClick={acceptAll} className={styles.btnGold}>Accept All</button>
              <button onClick={rejectAll} className={styles.btnOutline}>Reject Non-Essential</button>
              <button onClick={() => setShowDetails(true)} className={styles.btnGhost}>Customize</button>
            </>
          ) : (
            <>
              <button onClick={acceptSelected} className={styles.btnGold}>Save Preferences</button>
              <button onClick={acceptAll} className={styles.btnOutline}>Accept All</button>
              <button onClick={rejectAll} className={styles.btnGhost}>Reject All</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
