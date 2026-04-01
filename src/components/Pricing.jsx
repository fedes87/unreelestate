import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { pricingPackages } from '../data/mockData'
import styles from './Pricing.module.css'

export default function Pricing() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Simple. Transparent.<br /><em>Powerful.</em></h2>
          <p className="section-subtitle">
            Two packages, zero guesswork. Pick what fits your listing and get everything delivered.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`${styles.card} ${pkg.highlight ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
            >
              {pkg.highlight && <div className={styles.badge}>Most Popular</div>}

              <div className={styles.top}>
                <div className={styles.packageName}>{pkg.name}</div>
                <div className={styles.price}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.amount}>{pkg.price}</span>
                </div>
                <p className={styles.tagline}>{pkg.tagline}</p>
                <a href="#contact" className={pkg.highlight ? 'btn-primary' : 'btn-secondary'}>
                  Get Started →
                </a>
              </div>

              <div className={styles.divider} />

              <ul className={styles.list}>
                {pkg.includes.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.addonsSection}>
                <div className={styles.addonsLabel}>Add-ons</div>
                {pkg.addons.map((a) => (
                  <div key={a.description} className={styles.addon}>
                    <span className={styles.addonPrice}>+${a.price}</span>
                    <span className={styles.addonDesc}>{a.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          All formats included · No hidden fees
        </motion.p>
      </div>
    </section>
  )
}
