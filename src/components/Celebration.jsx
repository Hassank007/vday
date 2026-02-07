import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const emojis = ['💖', '💕', '🥰', '💗', '💘', '💝', '🌹', '✨', '🎆', '🎉', '💐', '🦋']
const colors = ['#e91e63', '#ffd700', '#ff4081', '#f8bbd0', '#ff6090', '#ffffff']

export default function Celebration({ active }) {
  const [floaters, setFloaters] = useState([])

  useEffect(() => {
    if (!active) return

    // Epic side bursts
    const duration = 8000
    const animEnd = Date.now() + duration
    function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 80, origin: { x: 0, y: 0.7 }, colors })
      confetti({ particleCount: 5, angle: 120, spread: 80, origin: { x: 1, y: 0.7 }, colors })
      if (Date.now() < animEnd) requestAnimationFrame(frame)
    }
    frame()

    // Big center burst
    setTimeout(() => {
      confetti({ particleCount: 250, spread: 170, origin: { y: 0.5 }, colors, shapes: ['circle', 'square'], scalar: 1.5 })
    }, 400)

    // Fireworks sequence
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 120, startVelocity: 55, spread: 360,
          origin: { x: Math.random(), y: Math.random() * 0.4 },
          colors, ticks: 250, gravity: 0.8, scalar: 1.3
        })
      }, 1000 + i * 700)
    }

    // Sustained confetti rain
    const rain = setInterval(() => {
      confetti({
        particleCount: 4, spread: 100, startVelocity: 12,
        origin: { x: Math.random(), y: -0.1 },
        colors, gravity: 0.5, ticks: 300
      })
    }, 80)

    // Floating emoji shower
    const newFloaters = []
    for (let i = 0; i < 60; i++) {
      newFloaters.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 28 + 18,
        duration: Math.random() * 3 + 3,
      })
    }
    setFloaters(newFloaters)

    return () => clearInterval(rain)
  }, [active])

  if (!active) return null

  return (
    <motion.div
      className="celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="celebration-text"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.5, type: 'spring', bounce: 0.5 }}
      >
        knew you&apos;d say yes
      </motion.h1>

      <motion.p
        className="celebration-sub"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        happy valentine&apos;s, Deejah
      </motion.p>

      <motion.p
        className="celebration-hearts"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
        transition={{ delay: 1.5, duration: 2, scale: { repeat: Infinity, duration: 1.5 } }}
      >
        💖🥰💖
      </motion.p>

      {/* Floating emojis */}
      {floaters.map(f => (
        <motion.div
          key={f.id}
          className="floating-emoji"
          style={{ left: `${f.left}vw`, fontSize: f.size, bottom: -50 }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: '-110vh', opacity: 0, rotate: 720 }}
          transition={{ delay: f.delay, duration: f.duration, ease: 'easeOut' }}
        >
          {f.emoji}
        </motion.div>
      ))}
    </motion.div>
  )
}
