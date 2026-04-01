import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="about" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">{t('about.label')}</span>
            <h2 className="section-title">{t('about.title1')}<br /><em>{t('about.titleEm')}</em></h2>
            <p className={styles.desc}>{t('about.desc')}</p>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {t('about.points', { returnObjects: true }).map((point, i) => (
              <div key={i} className={styles.point}>
                <span className={styles.number}>0{i + 1}</span>
                <div>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointDesc}>{point.body}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
