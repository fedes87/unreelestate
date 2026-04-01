import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './BrandStatement.module.css'

export default function BrandStatement() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Not a photo shoot. A transformation.</span>
          <p>
            Luxury real estate doesn't sell with a listing sheet and four flat photos. It sells
            with emotion, atmosphere, desire. Unreel Estate was built on the belief that every
            extraordinary property deserves visuals to match — enhanced, restyled, and brought to life.
          </p>
          <p>
            We work entirely from your existing photos. No film crew, no location visits. We enhance
            what's there — or reimagine it completely — and turn it into cinematic content that makes
            people want to live in it before they ever set foot inside.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
