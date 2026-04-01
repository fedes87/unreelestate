import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { whyStats } from '../data/mockData'
import styles from './WhyUnreel.module.css'

export default function WhyUnreel() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const items = t('why.items', { returnObjects: true })

  return (
    <section className={styles.section} id="why" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.stat}>{whyStats[i]}</div>
              <div className={styles.label}>{item.label}</div>
              <p className={styles.body}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
