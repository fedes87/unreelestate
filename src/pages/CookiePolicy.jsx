import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function CookiePolicy() {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://www.unreelestate.com/cookie-policy')
    document.title = 'Cookie Policy | Unreel Estate'
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
        <h1 className={styles.title}>Cookie Policy</h1>
        <p className={styles.updated}>Last updated: April 15, 2026</p>

        <section className={styles.section}>
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            the website remember your preferences and improve your experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies We Use</h2>

          <h3>Strictly Necessary Cookies</h3>
          <p>These cookies are required for the website to function. They cannot be disabled.</p>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>unreel-cookie-consent</code></td>
                  <td>Stores your cookie preferences</td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Analytics Cookies (Optional)</h3>
          <p>These cookies help us understand how visitors interact with our website. They are only set with your consent.</p>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_ga, _ga_*</code></td>
                  <td>Google Analytics (if enabled)</td>
                  <td>2 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Marketing Cookies (Optional)</h3>
          <p>These cookies are used for advertising and personalization. They are only set with your consent.</p>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_fbp</code></td>
                  <td>Meta Pixel tracking (if enabled)</td>
                  <td>3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Managing Cookies</h2>
          <p>You can manage your cookie preferences at any time:</p>
          <ul>
            <li>Use the cookie consent banner that appears on your first visit</li>
            <li>Clear cookies through your browser settings</li>
            <li>Most browsers allow you to block cookies entirely, though this may impact functionality</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Cookies</h2>
          <p>Some cookies may be set by third-party services we use:</p>
          <ul>
            <li><strong>Google</strong> &mdash; analytics and advertising cookies. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a></li>
            <li><strong>Meta</strong> &mdash; advertising tracking cookies. See <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta&apos;s Privacy Policy</a></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>
            Under the GDPR and other data protection laws, you have the right to accept or reject
            non-essential cookies. Your choice will not affect your ability to use the core features
            of our website. For more information about your data rights, see our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For questions about our cookie practices:<br />
            <a href="mailto:info@unreelestate.com">info@unreelestate.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
