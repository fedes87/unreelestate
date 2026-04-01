import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay muted loop playsInline
        onCanPlay={e => e.target.classList.add(styles.loaded)}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.dot} />
            Luxury Real Estate Content
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Make Your Listings<br />
            <em>Unreal.</em>
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Unreel Estate turns extraordinary properties into cinematic productions
            that sell emotions before they sell square footage.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a href="#gallery" className="btn-primary">Explore Our Work →</a>
            <a href="#contact" className="btn-secondary">Tell Us About Your Property</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
