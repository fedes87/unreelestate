import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useInView } from '../hooks/useInView'
import styles from './Contact.module.css'

// Replace these with your EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_wjnl6an'
const EMAILJS_TEMPLATE_ID = 'template_u89bf0y'
const EMAILJS_PUBLIC_KEY  = 'Ee1GMS1i-dN7A6yTY'

const INITIAL = { name: '', email: '', phone: '', propertyType: '', service: '', message: '', source: '' }

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     form.name,
          from_email:    form.email,
          email:         form.email,
          phone:         form.phone,
          property_type: form.propertyType,
          service:       form.service,
          message:       form.message,
          source:        form.source,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="contact" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Let's Talk</span>
            <h2 className="section-title">Tell Us About<br /><em>Your Property.</em></h2>
            <p>We respond within 24 hours with a tailored proposal.</p>
            <div className={styles.details}>
              <a href="mailto:info@unreelestate.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                info@unreelestate.com
              </a>
              <a href="https://wa.me/1" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
              </a>
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                USA · Europe · Worldwide
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {status === 'sent' ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Request Received.</h3>
                <p>We'll be in touch within 24 hours with your tailored proposal.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" placeholder="Your name" required autoComplete="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" placeholder="your@email.com" required autoComplete="email" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="+1 000 000 0000" autoComplete="tel" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="propertyType">Property Type</label>
                    <select id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange}>
                      <option value="">Select type...</option>
                      <option>Luxury Home</option>
                      <option>Condo / Apartment</option>
                      <option>Commercial Property</option>
                      <option>Land / Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className={styles.group}>
                  <label htmlFor="service">Service of Interest</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select service...</option>
                    <option>Listing Package ($399)</option>
                    <option>AI Photo Enhancement</option>
                    <option>Virtual Restyling & Staging</option>
                    <option>Cinematic Video from Photos</option>
                    <option>Full Listing Presentation</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label htmlFor="message">Message / Property Details</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us about the property and what you're looking for..." value={form.message} onChange={handleChange} />
                </div>

                <div className={styles.group}>
                  <label htmlFor="source">How did you hear about us?</label>
                  <input id="source" name="source" placeholder="Instagram, referral, Google..." value={form.source} onChange={handleChange} />
                </div>

                {status === 'error' && <p className={styles.error}>Something went wrong. Please try again or email us directly.</p>}

                <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Your Request →'}
                </button>
                <p className={styles.note}>Your data is safe with us. We will never share it with third parties.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
