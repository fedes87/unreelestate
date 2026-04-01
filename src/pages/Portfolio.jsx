import BeforeAfterSlider from '../components/BeforeAfterSlider'
import styles from './Portfolio.module.css'

const allPairs = [
  { label: 'Living Room',  before: '/gallery/before/living.png',   after: '/gallery/after/living.png'   },
  { label: 'Kitchen',      before: '/gallery/before/kitchen.png',  after: '/gallery/after/kitchen.png'  },
  { label: 'Master Suite', before: '/gallery/before/bedroom.png',  after: '/gallery/after/bedroom.png'  },
  { label: 'Bathroom',     before: '/gallery/before/bathroom.png', after: '/gallery/after/bathroom.png' },
  { label: 'Exterior',     before: '/gallery/before/exterior.png', after: '/gallery/after/exterior.png' },
  { label: 'Backyard',     before: '/gallery/before/backyard.png', after: '/gallery/after/backyard.png' },
  { label: 'Pool',         before: '/gallery/before/pool.png',     after: '/gallery/after/pool.png'     },
  { label: 'Townhome',     before: '/gallery/before/townhome.png', after: '/gallery/after/townhome.png' },
  { label: 'Home Office',  before: '/gallery/before/office.png',   after: '/gallery/after/office.png'   },
  { label: 'Dining Room',  before: '/gallery/before/dining.png',   after: '/gallery/after/dining.png'   },
  { label: 'Entryway',     before: '/gallery/before/entryway.png', after: '/gallery/after/entryway.png' },
]

export default function Portfolio() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← Back</a>
        <img src="/logo.png" alt="Unreel Estate" className={styles.logo} />
        <span className="section-label">Full Portfolio</span>
        <h1 className={styles.title}>Every Listing,<br /><em>Transformed.</em></h1>
        <p className={styles.subtitle}>Drag each slider to reveal the transformation.</p>
      </header>

      <div className={styles.grid}>
        {allPairs.map((pair) => (
          <div key={pair.label} className={styles.item}>
            <BeforeAfterSlider
              before={pair.before}
              after={pair.after}
              label={pair.label}
            />
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <a href="/#contact" className="btn-primary">Get a Quote →</a>
      </div>
    </div>
  )
}
