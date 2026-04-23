import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { pricingMeta } from '../data/mockData'
import styles from './Pricing.module.css'

export default function Pricing() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const packages = t('pricing.packages', { returnObjects: true })

  return (
    <section className={styles.section} id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">{t('pricing.label')}</span>
          <h2 className="section-title">{t('pricing.title1')}<br /><em>{t('pricing.titleEm')}</em></h2>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {pricingMeta.map((meta, i) => {
            const pkg = packages[i]
            const ctaLabel = meta.ctaType === 'mailto' ? t('pricing.ctaInLocation') : t('pricing.ctaRemote')
            const ctaHref = meta.ctaType === 'mailto'
              ? 'mailto:info@unreelestate.com?subject=In-Location%20Shoot%20Inquiry'
              : '#contact'
            const ctaClass = meta.highlight ? 'btn-primary' : 'btn-secondary'
            return (
              <motion.div
                key={meta.key}
                className={[
                  styles.card,
                  meta.highlight ? styles.featured : '',
                  meta.isPremium ? styles.premium : '',
                ].filter(Boolean).join(' ')}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
              >
                {meta.highlight && <div className={styles.badge}>{t('pricing.popular')}</div>}
                {meta.isPremium && (
                  <div className={styles.netflixBadge}>
                    <span className={styles.netflixDot} aria-hidden="true" />
                    {t('pricing.netflixBadge')}
                  </div>
                )}

                <div className={styles.top}>
                  <div className={styles.packageName}>{meta.name}</div>
                  {meta.isHouston && (
                    <div className={styles.locationTag}>{t('pricing.houstonOnly')}</div>
                  )}
                  <div className={styles.price}>
                    {meta.priceLabel && <span className={styles.priceLabel}>{t('pricing.from')}</span>}
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>{meta.price}</span>
                  </div>
                  <p className={styles.tagline}>{pkg.tagline}</p>
                  <a
                    href={ctaHref}
                    className={ctaClass}
                    {...(meta.ctaType === 'mailto' ? {} : {})}
                  >
                    {ctaLabel}
                  </a>
                </div>

                <div className={styles.divider} />

                <ul className={styles.list}>
                  {pkg.includes.map((item, j) => (
                    <li key={j}>
                      <span className={styles.check} aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {pkg.addons && pkg.addons.length > 0 && (
                  <div className={styles.addonsSection}>
                    <div className={styles.addonsLabel}>{t('pricing.addonsLabel')}</div>
                    {pkg.addons.map((desc, j) => (
                      <div key={j} className={styles.addon}>
                        <span className={styles.addonPrice}>+${meta.addonPrices[j]}</span>
                        <span className={styles.addonDesc}>{desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {t('pricing.note')}
        </motion.p>
      </div>
    </section>
  )
}
