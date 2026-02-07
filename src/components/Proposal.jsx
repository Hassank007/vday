import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const noResponses = [
  "you sure?",
  "really though?",
  "wrong answer lol",
  "try again",
  "i'm not giving up",
]

export default function Proposal({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [noText, setNoText] = useState('No')
  const btnNoRef = useRef(null)
  const yesScale = 1 + noCount * 0.18

  const dodgeButton = useCallback(() => {
    if (!btnNoRef.current) return
    const parent = btnNoRef.current.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    // Keep within the button container bounds
    const maxX = Math.min(rect.width / 2 - 40, 150)
    const maxY = Math.min(rect.height / 2 - 20, 100)
    const x = (Math.random() - 0.5) * maxX * 2
    const y = (Math.random() - 0.5) * maxY * 2
    btnNoRef.current.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  const handleNoClick = () => {
    // On mobile, dodge on tap instead of hover
    dodgeButton()
    if (noCount < noResponses.length) {
      setNoText(noResponses[noCount])
    }
    setNoCount(c => c + 1)
  }

  return (
    <section className="proposal-section" id="proposal">
      <motion.h2
        className="proposal-title"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
      >
        be my valentine?
      </motion.h2>

      <motion.p
        className="proposal-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        you already know the answer i want
      </motion.p>

      <motion.div
        className="proposal-buttons"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.button
          className="btn-yes"
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', bounce: 0.5 }}
          whileHover={{
            scale: yesScale * 1.12,
            boxShadow: '0 0 80px rgba(233,30,99,0.6), 0 0 120px rgba(255,215,0,0.3)'
          }}
          whileTap={{ scale: yesScale * 0.95 }}
          onClick={onYes}
        >
          obviously yes
        </motion.button>

        <motion.button
          ref={btnNoRef}
          className="btn-no"
          onMouseEnter={dodgeButton}
          onTouchStart={dodgeButton}
          onClick={handleNoClick}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {noText}
        </motion.button>
      </motion.div>
    </section>
  )
}
