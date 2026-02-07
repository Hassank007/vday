import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([])

  const addSparkle = useCallback((x, y) => {
    const sparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      dx: (Math.random() - 0.5) * 40,
      dy: (Math.random() - 0.5) * 40,
    }
    setSparkles(prev => [...prev.slice(-12), sparkle])
  }, [])

  useEffect(() => {
    let lastTime = 0

    // Mouse (desktop fallback)
    const onMouse = (e) => {
      const now = Date.now()
      if (now - lastTime < 60) return
      lastTime = now
      addSparkle(e.clientX, e.clientY)
    }

    // Touch — sparkle where you tap/drag
    const onTouch = (e) => {
      const now = Date.now()
      if (now - lastTime < 80) return
      lastTime = now
      const touch = e.touches[0]
      if (touch) addSparkle(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [addSparkle])

  return (
    <div className="sparkle-container">
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            className="sparkle"
            style={{ left: s.x, top: s.y }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0, x: s.dx, y: s.dy }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setSparkles(prev => prev.filter(x => x.id !== s.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
