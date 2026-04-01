import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { whyUnreel } from '../data/mockData'
import styles from './WhyUnreel.module.css'

export default function WhyUnreel() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="why" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {whyUnreel.map((item, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.stat}>{item.stat}</div>
              <div className={styles.label}>{item.label}</div>
              <p className={styles.body}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
