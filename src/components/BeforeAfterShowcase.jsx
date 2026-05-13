import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { showcaseScenes } from '../data/mockData'
import BeforeAfterSlider from './BeforeAfterSlider'
import styles from './BeforeAfterShowcase.module.css'

export default function BeforeAfterShowcase() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const [activeIdx, setActiveIdx] = useState(0)

  const tabs = t('beforeAfter.tabs', { returnObjects: true })
  const active = showcaseScenes[activeIdx]
  const activeLabel = tabs[activeIdx]

  return (
    <section className={styles.section} id="showcase" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('beforeAfter.label')}</span>
          <h2 className={styles.title}>
            {t('beforeAfter.title1')} <em>{t('beforeAfter.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('beforeAfter.subtitle')}</p>
        </motion.div>

        <motion.div
          className={styles.sliderWrap}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <BeforeAfterSlider
            before={active.before}
            after={active.after}
            label={activeLabel}
          />
          <div className={styles.dragHint} aria-hidden="true">
            <span className={styles.dragEmoji}>👆</span>
            <span>{t('beforeAfter.dragHint')}</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.tabsRow}
          role="tablist"
          aria-label={t('beforeAfter.tabsLabel')}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {showcaseScenes.map((scene, i) => (
            <button
              key={scene.key}
              role="tab"
              aria-selected={i === activeIdx}
              className={`${styles.tab} ${i === activeIdx ? styles.tabActive : ''}`}
              onClick={() => setActiveIdx(i)}
              type="button"
            >
              <img
                src={scene.after}
                alt=""
                aria-hidden="true"
                className={styles.tabThumb}
                loading="lazy"
              />
              <span className={styles.tabLabel}>{tabs[i]}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
