import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { howItWorks } from '../data/mockData'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="how" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                >
                  <div className={styles.stepNum}>{step.step}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href="#contact" className="btn-primary">Start Your Listing →</a>
            </motion.div>
          </div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="/img/devices.png"
              alt="Your listings delivered across all devices"
              className={styles.mockup}
              loading="lazy"
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
