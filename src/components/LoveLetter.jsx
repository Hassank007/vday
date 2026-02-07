import { motion } from 'framer-motion'

const paragraphs = [
  "There are not enough words in any language to express what you mean to me. You walked into my life and turned ordinary moments into extraordinary memories.",
  "Your laugh is my favorite sound. Your smile is my favorite sight. Your arms are my favorite place. And your heart is my favorite thing about you.",
  "You make me want to be better — not because you ask me to, but because loving you has shown me what it means to truly care about someone more than myself.",
  "Every second with you feels like a gift I never want to stop unwrapping. You are my today, my tomorrow, and my forever.",
]

export default function LoveLetter() {
  return (
    <section className="love-letter-section" id="letter">
      <motion.div
        className="envelope"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="letter-container">
          <div className="letter-seal">💌</div>
          <p className="letter-date">Valentine&apos;s Day, 2026</p>
          <h2 className="letter-greeting">My Dearest Love,</h2>
          <div className="letter-body">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.25 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
          <motion.p
            className="letter-closing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Forever & Always Yours 💕
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
