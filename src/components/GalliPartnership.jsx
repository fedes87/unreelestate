import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './GalliPartnership.module.css'

const MAILTO = 'mailto:info@unreelestate.com?subject=Houston%20In-Location%20Shoot%20%28Galli%20Productions%29'

export default function GalliPartnership() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const bullets = t('galli.bullets', { returnObjects: true })

  return (
    <section className={styles.section} id="galli-crew" ref={ref}>
      <span id="crew" style={{ position: 'absolute', marginTop: '-80px' }} aria-hidden="true" />
      <div className="container">
        <motion.div
          className={styles.shell}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.content}>
            <div className={styles.netflixBadge}>
              <span className={styles.netflixDot} aria-hidden="true" />
              {t('galli.netflixBadge')}
            </div>
            <span className="section-label">{t('galli.label')}</span>
            <h2 className={styles.title}>
              {t('galli.title1')} <em>{t('galli.titleEm')}</em>
            </h2>
            <p className={styles.desc}>{t('galli.desc')}</p>

            <ul className={styles.bullets}>
              {bullets.map((b, i) => (
                <li key={i}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Codex R4: price next to CTA on mobile (visual block hidden) so $1,200 lands when it matters */}
            <div className={styles.priceInline}>
              <span className={styles.priceInlineFrom}>{t('galli.from')}</span>
              <span className={styles.priceInlineValue}>$1,200</span>
              <span className={styles.priceInlineScope}>{t('galli.priceScope')}</span>
            </div>

            <div className={styles.actions}>
              <a href={MAILTO} className="btn-primary">{t('galli.cta')}</a>
              <span className={styles.priceHint}>{t('galli.priceHint')}</span>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.gradient} />
            <div className={styles.locationTag}>{t('galli.locationTag')}</div>
            <div className={styles.priceTag}>
              <span className={styles.priceFrom}>{t('galli.from')}</span>
              <span className={styles.priceValue}>$1,200</span>
              <span className={styles.pricePer}>{t('galli.priceScope')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
