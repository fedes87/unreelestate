import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import { reassurancePoints } from '../data/mockData'
import styles from './ReassuranceBlock.module.css'

function Icon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'shield') return (
    <svg {...common}><path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"/></svg>
  )
  if (name === 'palette') return (
    <svg {...common}><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 100 20c.6 0 1-.5 1-1.1 0-.6-.3-1-.5-1.4-.3-.6.1-1.3.8-1.4H14a6 6 0 006-6c0-5.5-4.5-10-10-10z"/></svg>
  )
  return ( // check
    <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
  )
}

export default function ReassuranceBlock() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const points = t('reassurance.points', { returnObjects: true })

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('reassurance.label')}</span>
          <h2 className={styles.title}>
            {t('reassurance.title1')} <em>{t('reassurance.titleEm')}</em>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {reassurancePoints.map((p, i) => (
            <motion.div
              key={p.key}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <div className={styles.iconWrap}>
                <Icon name={p.icon} />
              </div>
              <div className={styles.cardTitle}>{points[i].title}</div>
              <p className={styles.cardBody}>{points[i].body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.compliance}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('reassurance.compliance')}
        </motion.p>
      </div>
    </section>
  )
}
