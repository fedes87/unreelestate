import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FAQ.module.css'

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{t('faq.label')}</span>
          <h2 className="section-title">
            {t('faq.title1')}<br />
            <em>{t('faq.titleEm')}</em>
          </h2>
        </div>

        <div className={styles.list}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#contact" className="btn-primary">{t('faq.cta')}</a>
        </div>
      </div>
    </section>
  )
}
