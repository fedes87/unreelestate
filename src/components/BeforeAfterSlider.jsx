import { useState, useRef, useCallback } from 'react'
import styles from './BeforeAfterSlider.module.css'

export default function BeforeAfterSlider({ before, after, label }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const getPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return (x / rect.width) * 100
  }, [])

  const onMouseDown = (e) => {
    dragging.current = true
    e.preventDefault()
  }

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    setPos(getPos(e.clientX))
  }, [getPos])

  const onMouseUp = useCallback(() => { dragging.current = false }, [])

  const onTouchMove = useCallback((e) => {
    setPos(getPos(e.touches[0].clientX))
  }, [getPos])

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (bottom layer) */}
      <img src={after} alt="After" className={styles.imgAfter} draggable={false} />

      {/* Before (full size, clipped via clip-path — no scaling) */}
      <img
        src={before}
        alt="Before"
        className={styles.imgBefore}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Divider handle */}
      <div
        className={styles.handle}
        style={{ left: `${pos}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        <div className={styles.line} />
        <div className={styles.circle}>
          <span>◀</span>
          <span>▶</span>
        </div>
        <div className={styles.line} />
      </div>

      {/* Labels */}
      <span className={`${styles.label} ${styles.labelBefore}`}>BEFORE</span>
      <span className={`${styles.label} ${styles.labelAfter}`}>AFTER</span>

      {/* Room label */}
      {label && <div className={styles.roomLabel}>{label}</div>}
    </div>
  )
}
