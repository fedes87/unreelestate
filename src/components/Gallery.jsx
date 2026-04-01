import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { galleryPairs } from '../data/mockData'
import BeforeAfterSlider from './BeforeAfterSlider'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const labels = t('gallery.labels', { returnObjects: true })

  return (
    <section className={styles.section} id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('gallery.label')}</span>
          <h2 className="section-title">{t('gallery.title1')}<br /><em>{t('gallery.titleEm')}</em></h2>
          <p className="section-subtitle">
            {t('gallery.subtitle1')}<br />
            {t('gallery.subtitle2')}
          </p>
        </motion.div>

        <div className={styles.grid}>
          {galleryPairs.map((pair, i) => (
            <motion.div
              key={i}
              className={`${styles.item} ${i === 0 ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                label={labels[i]}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/portfolio" className="btn-secondary">{t('gallery.btnPortfolio')}</a>
          <a href="#contact" className="btn-primary">{t('gallery.btnQuote')}</a>
        </motion.div>
      </div>
    </section>
  )
}
