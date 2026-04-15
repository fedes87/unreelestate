import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './BrandStatement.module.css'

export default function BrandStatement() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">{t('brand.label')}</span>
          <h2 className={styles.headline}>
            {t('brand.line1')}<br />
            {t('brand.line2prefix')} <em>{t('brand.line2em')}</em><br />
            {t('brand.line3')} <em>{t('brand.line3em')}</em>
          </h2>
          <p className={styles.sub}>
            {t('brand.sub1')}<br />
            {t('brand.sub2')}
          </p>
          <div className={styles.ctas}>
            <a href="https://app.unreelestate.com/auth/login" className={styles.ctaPrimary}>
              {t('brand.ctaRegister', 'Sign Up & Create Your First Listing')}
            </a>
            <a href="#contact" className={styles.ctaSecondary}>
              {t('brand.ctaQuote', 'Need a Custom Quote? Contact Us')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
