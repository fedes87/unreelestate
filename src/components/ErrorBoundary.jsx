import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}>
          <div>
            <div style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: 'clamp(80px, 15vw, 140px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E0BF99, #C4956A, #8B6914)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '16px',
            }}>
              500
            </div>
            <h1 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: 'clamp(24px, 4vw, 36px)',
              marginBottom: '12px',
            }}>
              Something Went Wrong
            </h1>
            <p style={{
              color: '#7A6A5A',
              fontSize: '16px',
              maxWidth: '400px',
              margin: '0 auto 32px',
            }}>
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}
