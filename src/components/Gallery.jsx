import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import BeforeAfterSlider from './BeforeAfterSlider'
import styles from './Gallery.module.css'

const featured = [
  { label: 'Living Room',  before: '/gallery/before/living.png',   after: '/gallery/after/living.png'   },
  { label: 'Kitchen',      before: '/gallery/before/kitchen.png',  after: '/gallery/after/kitchen.png'  },
  { label: 'Exterior',     before: '/gallery/before/exterior.png', after: '/gallery/after/exterior.png' },
  { label: 'Backyard',     before: '/gallery/before/backyard.png', after: '/gallery/after/backyard.png' },
]

export default function Gallery() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Drag to See<br /><em>The Transformation.</em></h2>
          <p className="section-subtitle">
            Every image started as a standard listing photo.<br />
            Slide left and right to see what we deliver.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {featured.map((pair, i) => (
            <motion.div
              key={pair.label}
              className={`${styles.item} ${i === 0 ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                label={pair.label}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/portfolio" className="btn-secondary">View Full Portfolio →</a>
          <a href="#contact" className="btn-primary">Get a Quote →</a>
        </motion.div>
      </div>
    </section>
  )
}
