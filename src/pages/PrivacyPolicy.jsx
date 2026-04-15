import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/privacy-policy')
    document.title = 'Privacy Policy | Unreel Estate'
    window.scrollTo(0, 0)
    return () => {
      if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/')
      document.title = 'AI Real Estate Photos & Cinematic Video | Unreel Estate'
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}>&larr; Back</Link>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 15, 2026</p>

        <section className={styles.section}>
          <h2>1. Who We Are</h2>
          <p>
            Unreel Estate is a service operated by <strong>Galli Productions LLC</strong>,
            2804 Holman Street, Houston, TX 77004, United States. We provide AI-powered real estate
            marketing services including cinematic video production, photo enhancement, and social
            media content creation.
          </p>
          <p>
            For any privacy-related inquiries, contact us at:{' '}
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Data We Collect</h2>
          <p>We collect and process the following personal data:</p>
          <ul>
            <li><strong>Contact form submissions:</strong> name, email address, phone number, property details, and any message you send.</li>
            <li><strong>Waitlist signups:</strong> email address.</li>
            <li><strong>Service requests:</strong> property photos and related details you upload or share with us.</li>
            <li><strong>Payment information:</strong> processed securely by Stripe. We do not store credit card numbers.</li>
            <li><strong>Usage data:</strong> pages visited, device type (collected via analytics, if consented).</li>
            <li><strong>Communications:</strong> emails and messages exchanged with our team.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Legal Basis for Processing (GDPR)</h2>
          <p>For users in the European Economic Area (EEA), we process your data based on:</p>
          <ul>
            <li><strong>Contract performance:</strong> to provide you with our services after you place an order.</li>
            <li><strong>Consent:</strong> for analytics cookies, marketing communications, and contact form submissions (you can withdraw at any time).</li>
            <li><strong>Legitimate interest:</strong> to improve our service, respond to inquiries, prevent fraud, and ensure security.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. How We Use Your Data</h2>
          <ul>
            <li>To respond to your inquiries and provide our services</li>
            <li>To send you a tailored proposal or quote for your property</li>
            <li>To process payments and send invoices</li>
            <li>To notify waitlist members when we have availability</li>
            <li>To improve our website and service quality</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Third-Party Services</h2>
          <p>We share your data with the following third-party processors:</p>
          <ul>
            <li><strong>EmailJS</strong> &mdash; to deliver form submissions to our inbox. Data is transmitted securely and not stored beyond delivery.</li>
            <li><strong>Stripe</strong> (payment processing) &mdash; PCI DSS Level 1 certified.</li>
            <li><strong>Vercel</strong> (hosting) &mdash; GDPR compliant, US-based with standard contractual clauses.</li>
          </ul>
          <p>We do not use behavioral advertising tools on this website. Analytics and marketing cookies are only activated with your explicit consent.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Data Retention</h2>
          <p>We retain your personal data only as long as necessary:</p>
          <ul>
            <li>Contact form and waitlist submissions: up to 2 years unless you request deletion sooner</li>
            <li>Property photos: retained for 12 months after delivery, then deleted</li>
            <li>Delivered assets (videos, enhanced photos): retained for 12 months</li>
            <li>Payment records: retained for 7 years (legal requirement)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Your Rights (GDPR)</h2>
          <p>If you are in the EEA, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Rectify</strong> inaccurate data</li>
            <li><strong>Erase</strong> your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li><strong>Restrict</strong> processing</li>
            <li><strong>Data portability</strong> &mdash; receive your data in a machine-readable format</li>
            <li><strong>Object</strong> to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> at any time</li>
          </ul>
          <p>
            To exercise these rights, email us at{' '}
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>. We will respond within 30 days.
          </p>
          <p>
            You also have the right to lodge a complaint with a supervisory authority
            (e.g., the Garante per la protezione dei dati personali in Italy).
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Cookies</h2>
          <p>
            We use cookies for essential site functionality and, with your consent, for analytics
            and marketing. For full details, see our{' '}
            <Link to="/cookie-policy">Cookie Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. International Transfers</h2>
          <p>
            Unreel Estate operates across the USA, Italy, and internationally. Your data may be
            transferred to and processed in the United States. We ensure appropriate safeguards
            are in place, including Standard Contractual Clauses (SCCs) where required by GDPR.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption in transit (TLS),
            access controls, and regular security reviews. Payment data is handled exclusively by
            Stripe and never stored on our servers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We do not knowingly
            collect personal data from minors. If you believe a minor has submitted data to us,
            please contact us and we will delete it promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes via email or a notice on our website. Continued use of our site after changes
            constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Contact</h2>
          <p>
            <strong>Galli Productions LLC</strong><br />
            2804 Holman Street<br />
            Houston, TX 77004<br />
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
