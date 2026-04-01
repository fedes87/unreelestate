import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { services } from '../data/mockData'
import styles from './Services.module.css'

export default function Services() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="services" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Four Ways to Make<br />a Property <em>Irresistible.</em></h2>
          <p className="section-subtitle">
            Everything starts from your existing photos. No film crew, no location visits —
            just extraordinary results delivered remotely.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.imgWrap}>
                <img src={s.image} alt={s.tag} className={styles.img} loading="lazy" />
                <div className={styles.imgOverlay} />
                <div className={styles.tag}>{s.tag}</div>
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{s.title}</h3>
                <ul className={styles.list}>
                  {s.includes.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
