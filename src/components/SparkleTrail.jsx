import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([])

  const handleMouseMove = useCallback((e) => {
    const now = Date.now()
    const sparkle = {
      id: now + Math.random(),
      x: e.clientX,
      y: e.clientY,
      dx: (Math.random() - 0.5) * 40,
      dy: (Math.random() - 0.5) * 40,
    }
    setSparkles(prev => [...prev.slice(-15), sparkle])
  }, [])

  useEffect(() => {
    let lastTime = 0
    const throttledHandler = (e) => {
      const now = Date.now()
      if (now - lastTime < 60) return
      lastTime = now
      handleMouseMove(e)
    }
    window.addEventListener('mousemove', throttledHandler)
    return () => window.removeEventListener('mousemove', throttledHandler)
  }, [handleMouseMove])

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
