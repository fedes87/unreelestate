import { useState, useEffect } from 'react'
import { navLinks } from '../data/mockData'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on link click
  const handleLink = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <picture>
              <source media="(max-width: 768px)" srcSet="/logo-mobile.png" />
              <img src="/logo.png" alt="Unreel Estate" className={styles.logoImg} width="160" height="40" />
            </picture>
          </a>

          <ul className={styles.links}>
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <a href="#contact" className={`btn-primary ${styles.cta}`}>
            Get a Quote
          </a>

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
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} onClick={handleLink}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className={styles.mobileCta} onClick={handleLink}>Get a Quote →</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
