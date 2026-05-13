import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { funnelSteps, funnelComingSoon } from '../data/mockData'
import styles from './FunnelLadder.module.css'

function StepIcon({ name }) {
  const c = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'photo':    return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-9 9"/></svg>
    case 'play':     return <svg {...c}><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/></svg>
    case 'square':   return <svg {...c}><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/></svg>
    case 'layers':   return <svg {...c}><polygon points="12,3 21,8 12,13 3,8"/><polyline points="3,12 12,17 21,12"/><polyline points="3,16 12,21 21,16"/></svg>
    case 'wave':     return <svg {...c}><path d="M3 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4"/></svg>
    case 'music':    return <svg {...c}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    case 'mobile':   return <svg {...c}><rect x="7" y="2" width="10" height="20" rx="2.5"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
    default:         return null
  }
}

export default function FunnelLadder() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const steps = t('funnel.steps', { returnObjects: true })
  const soon = t('funnel.soon', { returnObjects: true })

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('funnel.label')}</span>
          <h2 className={styles.title}>
            {t('funnel.title1')} <em>{t('funnel.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('funnel.subtitle')}</p>
        </motion.div>

        <div className={styles.swipeHint} aria-hidden="true">{t('funnel.swipeHint')}</div>

        <div className={styles.scrollWrap}>
          <div className={styles.ladder}>
            {funnelSteps.map((step, i) => (
              <motion.div
                key={step.key}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <div className={styles.cardIcon}>
                  <StepIcon name={step.icon} />
                </div>
                <div className={styles.cardLabel}>{steps[i].title}</div>
                <p className={styles.cardBody}>{steps[i].body}</p>
                <div className={styles.cardMeta}>{steps[i].meta}</div>
                {i < funnelSteps.length - 1 && (
                  <span className={styles.arrow} aria-hidden="true">→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.comingStrip}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className={styles.comingStripLabel}>{t('funnel.comingSoonLabel')}</span>
          {funnelComingSoon.map((s, i) => (
            <div key={s.key} className={styles.comingItem}>
              <div className={styles.comingIcon}>
                <StepIcon name={s.icon} />
              </div>
              <div className={styles.comingTextBlock}>
                <div className={styles.comingTitle}>{soon[i].title}</div>
                <div className={styles.comingDesc}>{soon[i].body}</div>
              </div>
              <span className={styles.comingPill}>{t('funnel.comingSoon')}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://app.unreelestate.com/dashboard/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t('funnel.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
