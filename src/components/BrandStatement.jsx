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
          <span className="section-label">What we actually do.</span>
          <p>
            You send us your photos — even rough ones straight from your phone.
            We transform them the way you want: enhanced, restyled, completely reimagined.
            Then we animate them into cinematic video.
          </p>
          <p>
            Your listing outperforms. Your social blows up.
            And everyone will want to know how you did it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
