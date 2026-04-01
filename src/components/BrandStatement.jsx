import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './BrandStatement.module.css'

export default function BrandStatement() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">What we actually do.</span>
          <h2 className={styles.headline}>
            You send us your photos —<br />
            even <em>rough ones from your phone.</em><br />
            We transform them. We <em>animate them.</em>
          </h2>
          <p className={styles.sub}>
            Your listing outperforms. Your social blows up.<br />
            And everyone will want to know how you did it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
