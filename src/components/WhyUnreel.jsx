import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { whyUnreel } from '../data/mockData'
import styles from './WhyUnreel.module.css'

export default function WhyUnreel() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="why" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Why Unreel Estate</span>
          <h2 className="section-title">The Difference Is<br /><em>Undeniable.</em></h2>
        </motion.div>

        <div className={styles.grid}>
          {whyUnreel.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.num}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
