import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Deejah
      </motion.p>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        you&apos;re my favorite
      </motion.h1>

      <motion.div
        className="hero-heart-divider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="line" />
        <motion.span
          className="heart"
          animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ♥
        </motion.span>
        <div className="line" />
      </motion.div>

      <motion.p
        className="hero-message"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        I don&apos;t say it enough, but you really did change everything for me.
        Just thought you should know.
      </motion.p>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.8 },
          y: { delay: 2, duration: 2, repeat: Infinity }
        }}
      >
        <span>Scroll Down</span>
        <div className="scroll-arrow" />
      </motion.div>
    </section>
  )
}
