import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { studioPacks, studioSubs, studioSpend } from '../data/mockData'
import styles from './StudioSection.module.css'

const STUDIO_APP_URL = 'https://app.unreelestate.com/dashboard/studio'

export default function StudioSection() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const features = t('studio.features', { returnObjects: true })

  return (
    <section className={styles.section} id="studio" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: hero image — agent handing over the keys */}
          <motion.div
            className={styles.imageWrap}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <picture>
              <source srcSet="/img/studio-keys.webp" type="image/webp" />
              <img
                src="/img/studio-keys.jpg"
                alt={t('studio.imageAlt')}
                className={styles.image}
                loading="lazy"
              />
            </picture>
            <div className={styles.imageGlow} aria-hidden="true" />
          </motion.div>

          {/* Right: copy + features + pricing + CTA */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <span className="section-label">{t('studio.label')}</span>
            <h2 className={styles.title}>
              {t('studio.title1')}<br /><em>{t('studio.titleEm')}</em>
            </h2>
            <p className={styles.subtitle}>{t('studio.subtitle')}</p>

            <div className={styles.featuresBlock}>
              <div className={styles.blockLabel}>{t('studio.featuresLabel')}</div>
              <div className={styles.featuresGrid}>
                {features.map((f, i) => (
                  <div key={i} className={styles.feature}>
                    <div className={styles.featureName}>{f.name}</div>
                    <div className={styles.featureDesc}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.pricingRow}>
              <div className={styles.pricingCol}>
                <div className={styles.blockLabel}>{t('studio.packsLabel')}</div>
                <div className={styles.chipRow}>
                  {studioPacks.map((p) => (
                    <div key={p.key} className={styles.chip}>
                      <span className={styles.chipPrice}>${p.price}</span>
                      <span className={styles.chipDetail}>
                        {p.credits} {t('studio.creditsSuffix')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.pricingCol}>
                <div className={styles.blockLabel}>{t('studio.subsLabel')}</div>
                <div className={styles.chipRow}>
                  {studioSubs.map((p) => (
                    <div
                      key={p.key}
                      className={[styles.chip, p.popular ? styles.chipPopular : ''].join(' ')}
                    >
                      {p.popular && (
                        <span className={styles.popularFlag}>{t('studio.popular')}</span>
                      )}
                      <span className={styles.chipPrice}>
                        ${p.price}
                        <span className={styles.chipPer}>{t('studio.monthSuffix')}</span>
                      </span>
                      <span className={styles.chipDetail}>
                        {p.credits} {t('studio.creditsSuffix')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.spendBlock}>
              <div className={styles.blockLabel}>{t('studio.spendLabel')}</div>
              <div className={styles.spendGrid}>
                {studioSpend.map((s) => (
                  <div key={s.key} className={styles.spendRow}>
                    <span className={styles.spendLabel}>
                      {t(`studio.spend.${s.key}`)}
                    </span>
                    <span className={styles.spendValue}>
                      {s.credits} {t('studio.creditsUnit')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.ctaRow}>
              <a
                href={STUDIO_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t('studio.cta')}
              </a>
              <span className={styles.ctaHint}>{t('studio.ctaSecondary')}</span>
            </div>

            <p className={styles.footNote}>{t('studio.footNote')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
