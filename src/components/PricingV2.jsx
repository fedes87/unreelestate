import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { subscriptionTiers, creditPacks } from '../data/mockData'
import styles from './PricingV2.module.css'

const APP_URL = 'https://app.unreelestate.com/dashboard/studio'

export default function PricingV2() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const tiers = t('pricingV2.tiers', { returnObjects: true })
  const packs = t('pricingV2.packs', { returnObjects: true })
  // Codex R4 mobile fix: on small screens features are collapsed behind a toggle
  const [openFeatures, setOpenFeatures] = useState({})
  const toggle = (key) => setOpenFeatures(o => ({ ...o, [key]: !o[key] }))

  return (
    <section className={styles.section} id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('pricingV2.label')}</span>
          <h2 className={styles.title}>
            {t('pricingV2.title1')} <em>{t('pricingV2.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('pricingV2.subtitle')}</p>
        </motion.div>

        <div className={styles.tiersGrid}>
          {subscriptionTiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              className={`${styles.tier} ${tier.popular ? styles.tierPopular : ''}`}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              {tier.popular && (
                <div className={styles.popularBadge}>{t('pricingV2.popular')}</div>
              )}
              <div className={styles.tierName}>{tiers[i].name}</div>
              <div className={styles.priceRow}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{tier.price}</span>
                <span className={styles.per}>{t('pricingV2.perMonth')}</span>
              </div>
              <div className={styles.credits}>
                <strong>{tier.credits.toLocaleString()}</strong> {t('pricingV2.creditsPerMonth')}
              </div>
              <p className={styles.tagline}>{tiers[i].tagline}</p>

              <a
                href={tier.key === 'agency' ? 'mailto:info@unreelestate.com?subject=Agency%20Plan%20Inquiry' : APP_URL}
                target={tier.key === 'agency' ? undefined : '_blank'}
                rel={tier.key === 'agency' ? undefined : 'noopener noreferrer'}
                className={tier.popular ? 'btn-primary' : 'btn-secondary'}
              >
                {tiers[i].cta}
              </a>

              <button
                type="button"
                className={styles.featuresMobileToggle}
                onClick={() => toggle(tier.key)}
                aria-expanded={!!openFeatures[tier.key]}
              >
                {openFeatures[tier.key] ? t('pricingV2.hideFeatures') : t('pricingV2.viewFeatures')}
              </button>

              <ul className={`${styles.features} ${openFeatures[tier.key] ? styles.featuresOpen : ''}`}>
                {tiers[i].features.map((f, j) => (
                  <li key={j}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.packsBlock}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.packsHeader}>
            <h3 className={styles.packsTitle}>{t('pricingV2.packsTitle')}</h3>
            <p className={styles.packsSubtitle}>{t('pricingV2.packsSubtitle')}</p>
          </div>
          <div className={styles.packsGrid}>
            {creditPacks.map((pack, i) => (
              <div key={pack.key} className={styles.pack}>
                <div className={styles.packPrice}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.packAmount}>{pack.price}</span>
                </div>
                <div className={styles.packCredits}>
                  <strong>{pack.credits}</strong> {t('pricingV2.creditsUnit')}
                </div>
                <div className={styles.packPerCredit}>
                  ${(pack.price / pack.credits).toFixed(3)} / cr
                </div>
                <div className={styles.packLabel}>{packs[i].label}</div>
              </div>
            ))}
          </div>
          <p className={styles.packsNote}>{t('pricingV2.packsNote')}</p>
        </motion.div>

        <motion.div
          className={styles.enterprise}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className={styles.enterpriseInner}>
            <div>
              <div className={styles.enterpriseLabel}>{t('pricingV2.enterpriseLabel')}</div>
              <div className={styles.enterpriseTitle}>{t('pricingV2.enterpriseTitle')}</div>
              <p className={styles.enterpriseDesc}>{t('pricingV2.enterpriseDesc')}</p>
            </div>
            <a
              href="mailto:info@unreelestate.com?subject=Enterprise%20Pricing%20Inquiry"
              className="btn-primary"
            >
              {t('pricingV2.enterpriseCta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
