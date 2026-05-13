import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { teamServices } from '../data/mockData'
import styles from './TeamServices.module.css'

function Icon({ name }) {
  const c = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'photo': return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-9 9"/></svg>
    case 'film':  return <svg {...c}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
    case 'grid':  return <svg {...c}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    default: return null
  }
}

const MAILTO = 'mailto:info@unreelestate.com?subject=Done-for-you%20Team%20Services%20—%20Menu%20Request'

export default function TeamServices() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const cards = t('teamServices.cards', { returnObjects: true })

  return (
    <section className={styles.section} id="done-for-you" ref={ref}>
      <span id="team" style={{ position: 'absolute', marginTop: '-80px' }} aria-hidden="true" />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('teamServices.label')}</span>
          <h2 className={styles.title}>
            {t('teamServices.title1')} <em>{t('teamServices.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('teamServices.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {teamServices.map((s, i) => (
            <motion.div
              key={s.key}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <div className={styles.iconWrap}>
                <Icon name={s.icon} />
              </div>
              <div className={styles.cardTitle}>{cards[i].title}</div>
              <div className={styles.priceRow}>
                <span className={styles.fromLabel}>{t('teamServices.fromLabel')}</span>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{cards[i].priceFrom}</span>
                <span className={styles.perListing}>{t('teamServices.perListing')}</span>
              </div>
              <p className={styles.cardBody}>{cards[i].body}</p>
              <ul className={styles.bullets}>
                {cards[i].bullets.map((b, j) => (
                  <li key={j}><span className={styles.dot} aria-hidden="true">·</span>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href={MAILTO} className="btn-primary">{t('teamServices.cta')}</a>
          <p className={styles.note}>{t('teamServices.note')}</p>
          <p className={styles.commitmentBadge}>
            <span className={styles.commitmentDot} aria-hidden="true" />
            {t('teamServices.commitmentBadge')}
          </p>
        </motion.div>

        {/* Cross-link to other paths */}
        <motion.p
          className={styles.crossLink}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {t('teamServices.crossLinkPrefix')}{' '}
          <a href="#studio-sub">{t('teamServices.crossLinkStudio')}</a>
          {' · '}
          <a href="#galli-crew">{t('teamServices.crossLinkCrew')}</a>
        </motion.p>
      </div>
    </section>
  )
}
