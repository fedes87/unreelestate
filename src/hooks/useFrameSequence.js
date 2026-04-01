import { useState, useEffect, useRef } from 'react'

/**
 * Preloads a sequence of image frames and returns an array of Image objects.
 * Loads lazily when `shouldLoad` becomes true.
 * Priority order: first, last, middle, then fill sequentially.
 */
export function useFrameSequence(frameCount, basePath, ext, shouldLoad) {
  const [images, setImages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const loadedCount = useRef(0)
  const imageRefs = useRef([])

  useEffect(() => {
    if (!shouldLoad || loaded) return

    const arr = new Array(frameCount).fill(null)
    imageRefs.current = arr
    let cancelled = false

    // Priority order: frame 0, last, middle, then sequential fill
    const order = [0, frameCount - 1, Math.floor(frameCount / 2)]
    const remaining = []
    for (let i = 0; i < frameCount; i++) {
      if (!order.includes(i)) remaining.push(i)
    }
    const loadOrder = [...order, ...remaining]

    let queue = 0
    const concurrency = 4

    function loadNext() {
      if (cancelled || queue >= loadOrder.length) return
      const idx = loadOrder[queue++]
      const img = new Image()
      const padded = String(idx + 1).padStart(3, '0')
      img.src = `${basePath}${padded}.${ext}`
      img.onload = () => {
        if (cancelled) return
        arr[idx] = img
        loadedCount.current++
        setLoadProgress(loadedCount.current / frameCount)
        if (loadedCount.current === frameCount) {
          setImages([...arr])
          setLoaded(true)
        }
        loadNext()
      }
      img.onerror = () => {
        if (cancelled) return
        loadedCount.current++
        loadNext()
      }
    }

    // Start concurrent loads
    for (let i = 0; i < Math.min(concurrency, loadOrder.length); i++) {
      loadNext()
    }

    return () => { cancelled = true }
  }, [shouldLoad, frameCount, basePath, ext, loaded])

  return { images, loaded, loadProgress }
}
