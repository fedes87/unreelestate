import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import styles from './WaitingList.module.css'

const EMAILJS_SERVICE_ID = 'service_wjnl6an'
const EMAILJS_TEMPLATE_ID = 'template_u89bf0y'
const EMAILJS_PUBLIC_KEY  = 'Ee1GMS1i-dN7A6yTY'

export default function WaitingList() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     'Waitlist Signup',
          from_email:    email,
          email,
          phone:         '—',
          property_type: '—',
          service:       'WAITLIST',
          message:       `New waitlist signup: ${email}`,
          source:        'waitlist-form',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="waitlist" ref={ref}>
      <div className="container">
        <div className={styles.inner}>

          <motion.div
            className={styles.launchBadge}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.dot} />
            {t('waitlist.badge')}
          </motion.div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t('waitlist.title1')}<br />
            <em className={styles.em}>{t('waitlist.titleEm')}</em>
          </motion.h2>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('waitlist.desc')}
          </motion.p>

          <motion.div
            className={styles.offer}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className={styles.offerStar}>✦</span>
            <span>{t('waitlist.offer')}</span>
          </motion.div>

          {status === 'sent' ? (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.successIcon}>✓</span>
              {t('waitlist.success')}
            </motion.div>
          ) : (
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('waitlist.placeholder')}
                className={styles.input}
              />
              <button
                type="submit"
                className={styles.btn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('waitlist.sending') : t('waitlist.cta')}
              </button>
            </motion.form>
          )}

          {status === 'error' && (
            <p className={styles.error}>{t('waitlist.error')}</p>
          )}

          <motion.p
            className={styles.note}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {t('waitlist.note')}
          </motion.p>

        </div>
      </div>
    </section>
  )
}
