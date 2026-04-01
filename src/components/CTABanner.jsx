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
          <h2 className={styles.heading}>
            Ready to Make Your Listing <em>Unreal?</em>
          </h2>
          <p className={styles.sub}>Send us your photos — we handle the rest.</p>
          <a href="#contact" className="btn-primary">Get a Quote →</a>
        </motion.div>
      </div>
    </section>
  )
}
