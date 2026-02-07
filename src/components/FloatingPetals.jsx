import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const petalEmojis = ['🌹', '💗', '🌸', '✨', '💕']

export default function FloatingPetals() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    let id = 0
    // Slower spawn rate — lighter on mobile
    const interval = setInterval(() => {
      const newPetal = {
        id: id++,
        emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
        left: Math.random() * 100,
        size: Math.random() * 10 + 14,
        duration: Math.random() * 4 + 7,
        xDrift: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 360,
      }
      setPetals(prev => [...prev.slice(-12), newPetal])
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="petals-container">
      <AnimatePresence>
        {petals.map(p => (
          <motion.div
            key={p.id}
            className="petal"
            style={{ left: `${p.left}vw`, fontSize: p.size }}
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{ y: '105vh', x: p.xDrift, opacity: [0, 0.6, 0.6, 0], rotate: p.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: 'linear' }}
            onAnimationComplete={() => {
              setPetals(prev => prev.filter(x => x.id !== p.id))
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
