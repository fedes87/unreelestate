import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { servicesMeta } from '../data/mockData'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const items = t('services.items', { returnObjects: true })

  return (
    <section className={styles.section} id="services" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-title">{t('services.title1')}<br />{t('services.title2')} <em>{t('services.titleEm')}</em></h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {servicesMeta.map((meta, i) => {
            const item = items[i]
            return (
              <motion.div
                key={meta.number}
                className={styles.card}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.imgWrap}>
                  <img src={meta.image} alt={item.tag} className={styles.img} loading="lazy" />
                  <div className={styles.imgOverlay} />
                  <div className={styles.tag}>{item.tag}</div>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <ul className={styles.list}>
                    {item.includes.map((inc, j) => (
                      <li key={j}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
