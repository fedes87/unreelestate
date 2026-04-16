import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <Navbar />
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: 'clamp(80px, 15vw, 140px)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '16px',
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            marginBottom: '12px',
          }}>
            {t('notFound.title', 'Page Not Found')}
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '16px',
            marginBottom: '32px',
            maxWidth: '400px',
            margin: '0 auto 32px',
          }}>
            {t('notFound.desc', "The page you're looking for doesn't exist or has been moved.")}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary">
              {t('notFound.home', 'Go Home')}
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              {t('notFound.portfolio', 'View Portfolio')}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
