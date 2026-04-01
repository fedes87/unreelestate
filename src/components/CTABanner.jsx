import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './CTABanner.module.css'

export default function CTABanner() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('ctaBanner.label')}</span>
          <h2 className={styles.heading}>
            {t('ctaBanner.title1')}<br /><em>{t('ctaBanner.titleEm')}</em>
          </h2>
          <p className={styles.sub}>{t('ctaBanner.sub')}</p>
          <a href="#how" className={styles.link}>{t('ctaBanner.link')}</a>
        </motion.div>
      </div>
    </section>
  )
}
