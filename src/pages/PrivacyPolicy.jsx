import { useEffect } from 'react'
import styles from './PrivacyPolicy.module.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/privacy-policy')
    document.title = 'Privacy Policy | Unreel Estate'
    return () => {
      if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/')
      document.title = 'AI Real Estate Photos & Cinematic Video | Unreel Estate'
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Back</a>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 7, 2026</p>

        <section className={styles.section}>
          <p>Unreel Estate ("we," "us," or "our") operates <strong>www.unreelestate.com</strong>. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services. By using our site, you agree to the practices described here.</p>
        </section>

        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Contact form submissions:</strong> name, email address, phone number, property details, and any message you send.</li>
            <li><strong>Waitlist signups:</strong> email address.</li>
            <li><strong>Service requests:</strong> property photos and related details you upload or share with us.</li>
          </ul>
          <p>We do <strong>not</strong> use profiling cookies or behavioral tracking tools. We use only essential cookies required for the website to function properly.</p>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide our services.</li>
            <li>Send you a tailored proposal or quote for your property.</li>
            <li>Notify waitlist members when we have availability.</li>
            <li>Improve our website and service quality.</li>
          </ul>
          <p>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Legal Basis for Processing (GDPR)</h2>
          <p>If you are located in the European Union or European Economic Area, we process your data on the following legal bases:</p>
          <ul>
            <li><strong>Consent:</strong> when you submit a form or join our waitlist.</li>
            <li><strong>Legitimate interests:</strong> to respond to service inquiries and improve our offerings.</li>
            <li><strong>Contractual necessity:</strong> to deliver services you request.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Data Retention</h2>
          <p>We retain your personal data only as long as necessary to fulfill the purpose for which it was collected, or as required by law. Contact form and waitlist submissions are retained for up to 2 years unless you request deletion sooner.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
            <li><strong>EmailJS</strong> — to deliver form submissions to our inbox. Your data is transmitted securely and not stored by EmailJS beyond delivery.</li>
          </ul>
          <p>We do not use Google Analytics, Facebook Pixel, or any behavioral advertising tools on this website.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data ("right to be forgotten").</li>
            <li>Withdraw consent at any time (where processing is based on consent).</li>
            <li>Lodge a complaint with your local data protection authority (EU residents).</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data in transit.</p>
        </section>

        <section className={styles.section}>
          <h2>8. International Transfers</h2>
          <p>Unreel Estate operates across the USA, Italy, and internationally. If you are located in the EU and submit data to us, your information may be processed in the United States. We ensure appropriate safeguards are in place for any such transfers.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Children's Privacy</h2>
          <p>Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, please contact us and we will delete it promptly.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last updated" date at the top of this page. Continued use of our website after changes constitutes acceptance of the revised policy.</p>
        </section>

        <section className={styles.section}>
          <h2>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
          <p>
            <strong>Unreel Estate</strong><br />
            Email: <a href="mailto:info@unreelestate.com">info@unreelestate.com</a><br />
            USA · Europe · Worldwide
          </p>
        </section>
      </div>
    </div>
  )
}
