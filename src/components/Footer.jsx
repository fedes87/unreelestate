import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <img src="/logo.png" alt="Unreel Estate" className={styles.logoImg} width="160" height="40" />
            </a>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className={styles.links}>
            <a href="#services">{t('footer.services')}</a>
            <a href="#gallery">{t('footer.portfolio')}</a>
            <a href="#pricing">{t('footer.pricing')}</a>
            <a href="#contact">{t('footer.contact')}</a>
          </div>
          <div className={styles.contact}>
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>
            <span>USA · Europe · Worldwide</span>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/unreel_estate" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576479466293" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <a href="/privacy-policy" className={styles.privacyLink}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
