import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './ChooseYourPath.module.css'

/**
 * ChooseYourPath — decision router that disambiguates the 3 pricing models.
 *
 * R11 council (Codex peer primary + DeepSeek copy + Plan agent) all converged
 * on the diagnosis: today users see "three listini alternativi" instead of
 * "three buying paths". The 3 detailed sections (PricingV2 / TeamServices /
 * GalliPartnership) live below; this component lives ABOVE them and routes
 * the user with one glance.
 *
 * Layout:
 * - desktop: 3 columns side-by-side, Studio dominant (gold accent), Team
 *   neutral, Galli premium-luxury
 * - mobile: stacked, same hierarchy
 * Each card has icon + killer headline + sub + price hint + scroll-CTA
 */

function PathIcon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  if (name === 'studio') {
    // Camera aperture + timeline cursor (per DeepSeek R11 icon concept A)
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4l3 5-3 3-3-3z" />
        <path d="M4 12h2M18 12h2M12 18v2M12 4v2" />
      </svg>
    )
  }
  if (name === 'team') {
    // Box / package transforming into image (per DeepSeek R11 icon concept B)
    return (
      <svg {...common}>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    )
  }
  // crew — director clapperboard (per DeepSeek R11 icon concept C)
  return (
    <svg {...common}>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 9l3-5 4 1-3 4z" />
      <path d="M10 5l4 1-3 4-4-1z" />
      <path d="M14 6l4 1-3 4-4-1z" />
    </svg>
  )
}

export default function ChooseYourPath() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const cards = t('chooseYourPath.cards', { returnObjects: true })

  // Static path metadata (icon + anchor + accent class). Translatable copy
  // lives in i18n locales under `chooseYourPath.cards[i]`.
  const paths = [
    { key: 'studio', icon: 'studio', anchor: '#studio-sub',   accent: styles.accentStudio },
    { key: 'team',   icon: 'team',   anchor: '#done-for-you', accent: styles.accentTeam   },
    { key: 'crew',   icon: 'crew',   anchor: '#galli-crew',   accent: styles.accentCrew   },
  ]

  return (
    <section className={styles.section} id="paths" ref={ref}>
      <div className="container">
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('chooseYourPath.label')}</span>
          <h2 className={styles.title}>
            {t('chooseYourPath.title1')} <em>{t('chooseYourPath.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('chooseYourPath.subtitle')}</p>
        </motion.header>

        <div className={styles.grid}>
          {paths.map((p, i) => (
            <motion.a
              key={p.key}
              href={p.anchor}
              className={`${styles.card} ${p.accent}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              <div className={styles.cardIcon}>
                <PathIcon name={p.icon} />
              </div>
              <div className={styles.cardHeadline}>{cards[i].headline}</div>
              <p className={styles.cardBody}>{cards[i].body}</p>
              <div className={styles.cardMeta}>
                <span className={styles.priceHint}>{cards[i].priceHint}</span>
                <span className={styles.cta}>{cards[i].cta} <span aria-hidden="true">→</span></span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          className={styles.compareLink}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('chooseYourPath.compare')} <a href="#faq">{t('chooseYourPath.compareLink')}</a>
        </motion.p>
      </div>
    </section>
  )
}
