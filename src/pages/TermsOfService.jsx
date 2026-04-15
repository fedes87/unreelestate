import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function TermsOfService() {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/terms')
    document.title = 'Terms of Service | Unreel Estate'
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
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: April 15, 2026</p>

        <section className={styles.section}>
          <h2>1. Agreement</h2>
          <p>
            By accessing or using the Unreel Estate website and services (&ldquo;Service&rdquo;),
            operated by Galli Productions LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
            you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Service Description</h2>
          <p>
            Unreel Estate provides AI-powered real estate marketing services. Clients submit property
            photos and receive professionally produced marketing content including cinematic videos,
            enhanced photos, and social media assets.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old to use the Service</li>
            <li>You must provide accurate and complete information when contacting us or placing an order</li>
            <li>You are responsible for maintaining the confidentiality of any account credentials</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Payments and Pricing</h2>
          <ul>
            <li>All prices are listed in US Dollars (USD) and are per property listing</li>
            <li>Payment is processed securely through Stripe at the time of order</li>
            <li>Prices may change at any time; existing orders are not affected</li>
            <li>All sales are final once work has begun on your project</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Refund Policy</h2>
          <ul>
            <li><strong>Before work begins:</strong> Full refund available within 48 hours of purchase if no photos have been uploaded</li>
            <li><strong>During production:</strong> No refund once photo editing or video production has started</li>
            <li><strong>Quality issues:</strong> If the delivered content does not match the package description, we will provide a revision or partial refund at our discretion</li>
            <li>Refund requests should be sent to <a href="mailto:info@unreelestate.com">info@unreelestate.com</a></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Content and Intellectual Property</h2>
          <ul>
            <li>You retain ownership of all photos you upload</li>
            <li>Upon delivery and full payment, you receive a non-exclusive, perpetual license to use the delivered content for marketing and promotional purposes</li>
            <li>We may use anonymized examples of our work in our portfolio unless you opt out in writing</li>
            <li>You represent that you have the right to use and submit the photos you upload</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Delivery Timeline</h2>
          <p>Delivery timelines are estimates and depend on the package selected:</p>
          <ul>
            <li>Essential: up to 5 business days</li>
            <li>Pro: up to 3 business days</li>
            <li>Premium: up to 48 hours (rush)</li>
          </ul>
          <p>Timelines begin once all photos have been submitted and the order is confirmed. Delays may occur during high-demand periods.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Upload content that is illegal, fraudulent, or infringes on third-party rights</li>
            <li>Use the Service for any purpose other than legitimate real estate marketing</li>
            <li>Attempt to reverse-engineer, copy, or redistribute our editing processes or technology</li>
            <li>Abuse, harass, or threaten our team or other users</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Galli Productions LLC shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages resulting from your use
            of the Service. Our total liability shall not exceed the amount paid by you for the specific
            order in question.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Termination</h2>
          <p>
            We may refuse service at any time for violations of these terms. Upon termination of a
            business relationship, your data will be handled according to our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, United States. Any disputes
            shall be resolved in the courts of Harris County, Texas.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes
            constitutes acceptance of the new terms. We will notify you of material changes via email
            or a notice on our website.
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
