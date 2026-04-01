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
            <svg className={styles.logoIcon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 26L4 14L16 6L28 14V26H20V20H12V26H4Z" stroke="#C4956A" strokeWidth="1.5" fill="none"/>
              <circle cx="22" cy="10" r="4" fill="#E8342A"/>
              <polygon points="20,9 24,11 20,13" fill="#FAF7F2"/>
            </svg>
            <span>
              <span className={styles.un}>UN</span>
              <span className={styles.reel}>REEL</span>
              <span className={styles.estate}>ESTATE</span>
            </span>
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
