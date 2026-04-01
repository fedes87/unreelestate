import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './CTABanner.module.css'

export default function CTABanner() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">The Unreel Process</span>
          <h2 className={styles.heading}>
            Your iPhone Shot.<br /><em>Our Cinematic Standard.</em>
          </h2>
          <p className={styles.sub}>
            We take any photo — even straight from your phone — and transform it into a
            professional-grade image. Then we animate it into a 4-second cinematic clip,
            ready to publish.
          </p>
          <a href="#how" className={styles.link}>See How It Works →</a>
        </motion.div>
      </div>
    </section>
  )
}
