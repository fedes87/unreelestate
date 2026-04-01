import { useTranslation } from 'react-i18next'
import { portfolioPairs } from '../data/mockData'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { t } = useTranslation()
  const labels = t('portfolio.labels', { returnObjects: true })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>{t('portfolio.back')}</a>
        <img src="/logo.png" alt="Unreel Estate" className={styles.logo} />
        <span className="section-label">{t('portfolio.label')}</span>
        <h1 className={styles.title}>{t('portfolio.title1')}<br /><em>{t('portfolio.titleEm')}</em></h1>
        <p className={styles.subtitle}>{t('portfolio.subtitle')}</p>
      </header>

      <div className={styles.grid}>
        {portfolioPairs.map((pair, i) => (
          <div key={i} className={styles.item}>
            <BeforeAfterSlider
              before={pair.before}
              after={pair.after}
              label={labels[i]}
            />
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <a href="/#contact" className="btn-primary">{t('portfolio.cta')}</a>
      </div>
    </div>
  )
}
