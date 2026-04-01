import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <img src="/logo.png" alt="Unreel Estate" className={styles.logoImg} />
            </a>
            <p>Luxury real estate content, crafted for properties that deserve it most.</p>
          </div>
          <div className={styles.links}>
            <a href="#services">Services</a>
            <a href="#gallery">Portfolio</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.contact}>
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>
            <span>USA · Europe · Worldwide</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Unreel Estate. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
