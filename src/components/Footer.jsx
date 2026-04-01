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
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
        </div>
      </div>
    </footer>
  )
}
