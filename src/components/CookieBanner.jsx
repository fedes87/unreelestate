import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CookieBanner.module.css'

function isEuropeanTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return /^(Europe|Africa\/(Ceuta|Tunis))/.test(tz)
  } catch {
    return false
  }
}

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('cookie-ok')
    if (!dismissed && isEuropeanTimezone()) {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem('cookie-ok', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <p className={styles.text}>{t('cookies.text')}</p>
      <button className={styles.btn} onClick={dismiss}>{t('cookies.ok')}</button>
    </div>
  )
}
