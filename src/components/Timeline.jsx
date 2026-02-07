import { motion } from 'framer-motion'

const milestones = [
  { emoji: '🌟', title: 'The Day We Met', text: 'The universe conspired to bring us together, and from that very first moment, I knew my life would never be the same.' },
  { emoji: '🦋', title: 'First Butterflies', text: 'Every text from you made my heart skip a beat. Every meeting felt like the most important event in the world.' },
  { emoji: '💑', title: 'Falling Deep', text: 'Somewhere between all the laughter, long talks, and little moments, I fell hopelessly and completely in love with you.' },
  { emoji: '💖', title: 'Right Now', text: "I love you more today than yesterday, and I'll love you more tomorrow than I do right now. This is just the beginning." },
]

export default function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Our Love Story
      </motion.h2>
      <div className="timeline">
        {milestones.map((m, i) => (
          <motion.div
            className={`timeline-item ${i % 2 === 0 ? '' : 'reverse'}`}
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
          >
            <div className="timeline-content">
              <span className="timeline-emoji">{m.emoji}</span>
              <h3 className="timeline-title">{m.title}</h3>
              <p className="timeline-text">{m.text}</p>
            </div>
            <div className="timeline-dot">
              <motion.span
                animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💕
              </motion.span>
            </div>
            <div className="timeline-spacer" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
