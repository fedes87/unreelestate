import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { pricingPackages } from '../data/mockData'
import styles from './Pricing.module.css'

export default function Pricing() {
  const [ref, inView] = useInView()
  const pkg = pricingPackages[0]

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
            One package designed to deliver everything a luxury listing needs — from raw photos
            to a cinematic reel, ready to publish.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.left}>
            <div className={styles.packageName}>{pkg.name}</div>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{pkg.price}</span>
            </div>
            <p className={styles.tagline}>{pkg.tagline}</p>
            <a href="#contact" className="btn-primary">
              Start Your Listing →
            </a>
            <div className={styles.addon}>
              <span className={styles.addonPrice}>+${pkg.addon.price}</span>
              <span className={styles.addonDesc}>{pkg.addon.description}</span>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.includesLabel}>What's included</div>
            <ul className={styles.list}>
              {pkg.includes.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                >
                  <span className={styles.check}>✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Turnaround: 48 hours · All formats included · No hidden fees
        </motion.p>
      </div>
    </section>
  )
}
