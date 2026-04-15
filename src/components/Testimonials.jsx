import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { testimonialMeta } from '../data/mockData'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const quotes = t('testimonials.items', { returnObjects: true })

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('testimonials.label')}</span>
          <h2 className="section-title">{t('testimonials.title1')}<br /><em>{t('testimonials.titleEm')}</em></h2>
        </motion.div>

        <div className={styles.grid}>
          {testimonialMeta.map((meta, i) => (
            <motion.div
              key={meta.name}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className={styles.quote}>"</div>
              <p className={styles.text}>{quotes[i]}</p>
              <div className={styles.author}>
                {meta.avatar && <img src={meta.avatar} alt={meta.name} className={styles.avatar} loading="lazy" width="56" height="56" />}
                <div>
                  <div className={styles.name}>{meta.name}</div>
                  <div className={styles.role}>{meta.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className={styles.disclaimer}>{t('testimonials.disclaimer')}</p>
      </div>
    </section>
  )
}
