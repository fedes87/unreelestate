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
            <img src="/logo.png" alt="Unreel Estate" className={styles.logoImg} />
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
          >
            {open ? '✕' : '☰'}
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
