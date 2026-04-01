import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { howSteps } from '../data/mockData'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const steps = t('how.steps', { returnObjects: true })

  return (
    <section className={styles.section} id="how" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">{t('how.label')}</span>
              <h2 className="section-title">{t('how.title1')}<br /><em>{t('how.titleEm')}</em></h2>
            </motion.div>

            <div className={styles.steps}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className={styles.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                >
                  <div className={styles.stepNum}>{howSteps[i]}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href="#contact" className="btn-primary">{t('how.cta')}</a>
            </motion.div>
          </div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="/img/devices.png"
              alt={t('how.imgAlt')}
              className={styles.mockup}
              loading="lazy"
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
