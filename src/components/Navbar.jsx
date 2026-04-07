import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { navHrefs } from '../data/mockData'
import styles from './Navbar.module.css'

const LANGS = ['en', 'it', 'es']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <img src="/logo-mobile.webp" alt="Unreel Estate" className={styles.logoImg} />
          </a>

          <ul className={styles.links}>
            {navHrefs.map(link => (
              <li key={link.key}>
                <a href={link.href}>{t(`nav.${link.key}`)}</a>
              </li>
            ))}
          </ul>

          <div className={styles.right}>
            <div className={styles.langSwitcher} aria-label="Language selector">
              {LANGS.map((lang, idx) => (
                <span key={lang} className={styles.langGroup}>
                  <button
                    className={`${styles.langBtn} ${i18n.language === lang ? styles.langActive : ''}`}
                    onClick={() => i18n.changeLanguage(lang)}
                    aria-label={`Switch to ${lang.toUpperCase()}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                  {idx < LANGS.length - 1 && <span className={styles.langDivider} aria-hidden="true">|</span>}
                </span>
              ))}
            </div>

            <a href="#contact" className={`btn-primary ${styles.cta}`}>
              {t('nav.cta')}
            </a>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className={styles.mobileMenu}>
          <ul>
            {navHrefs.map(link => (
              <li key={link.key}>
                <a href={link.href} onClick={handleLink}>{t(`nav.${link.key}`)}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className={styles.mobileCta} onClick={handleLink}>{t('nav.ctaMobile')}</a>
            </li>
          </ul>
          <div className={styles.mobileLangSwitcher} aria-label="Language selector">
            {LANGS.map(lang => (
              <button
                key={lang}
                className={`${styles.langBtn} ${i18n.language === lang ? styles.langActive : ''}`}
                onClick={() => { i18n.changeLanguage(lang); setOpen(false) }}
                aria-label={`Switch to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
