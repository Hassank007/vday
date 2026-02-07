import { motion } from 'framer-motion'

export default function Preloader({ onStart }) {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="preloader-heart"
        animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        💖
      </motion.div>

      <motion.p
        className="preloader-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        hey Deejah... just open this
      </motion.p>

      <motion.button
        className="preloader-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(233,30,99,0.7), 0 0 100px rgba(255,215,0,0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
      >
        go on, open it
      </motion.button>
    </motion.div>
  )
}
