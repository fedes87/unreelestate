import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/mockData'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">What Agents Say</span>
          <h2 className="section-title">Results That<br /><em>Speak.</em></h2>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className={styles.quote}>"</div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                {t.avatar && <img src={t.avatar} alt={t.name} className={styles.avatar} />}
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
