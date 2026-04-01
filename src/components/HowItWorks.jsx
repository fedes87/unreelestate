import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { howItWorks } from '../data/mockData'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="how" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Three Steps to<br /><em>Cinematic.</em></h2>
        </motion.div>

        <div className={styles.steps}>
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              className={styles.step}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className={styles.stepNum}>{step.step}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              {i < howItWorks.length - 1 && <div className={styles.connector} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
