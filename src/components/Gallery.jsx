import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Gallery.module.css'

const galleryItems = [
  { id: 1, src: '/gallery/shot_01_exterior.jpg', label: 'Exterior — Twilight' },
  { id: 2, src: '/gallery/shot_02_living.jpg', label: 'Living Room' },
  { id: 3, src: '/gallery/shot_03_bedroom.jpg', label: 'Master Suite' },
  { id: 4, src: '/gallery/shot_04_pool.jpg', label: 'Infinity Pool' },
  { id: 5, src: '/gallery/shot_05_kitchen.jpg', label: 'Kitchen' },
  { id: 6, src: '/gallery/shot_06_night.jpg', label: 'Night View' },
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
          <h2 className="section-title">Properties We've Made<br /><em>Unforgettable.</em></h2>
          <p className="section-subtitle">
            Every image below started as a standard listing photo.
            This is what we deliver.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.item} ${i === 0 ? styles.featured : ''}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className={styles.imgWrap}>
                <img src={item.src} alt={item.label} loading="lazy" />
                <div className={styles.imgOverlay}>
                  <span>{item.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#contact" className="btn-primary">Transform Your Listing →</a>
        </motion.div>
      </div>
    </section>
  )
}
