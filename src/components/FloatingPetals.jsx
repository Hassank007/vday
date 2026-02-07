import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const petalEmojis = ['🌹', '🥀', '💗', '🌸', '💐', '✨', '💕', '🪻', '🌺']

export default function FloatingPetals() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    let id = 0
    const interval = setInterval(() => {
      const newPetal = {
        id: id++,
        emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
        left: Math.random() * 100,
        size: Math.random() * 14 + 14,
        duration: Math.random() * 5 + 6,
        xDrift: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
      }
      setPetals(prev => [...prev.slice(-25), newPetal])
    }, 700)

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
            animate={{ y: '105vh', x: p.xDrift, opacity: [0, 0.75, 0.75, 0], rotate: p.rotation }}
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
