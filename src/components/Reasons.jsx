import { motion } from 'framer-motion'

const reasons = [
  { icon: '✨', title: 'Your Beautiful Soul', text: 'The way you see the world, with so much kindness and compassion, inspires me every single day.' },
  { icon: '😂', title: 'Your Laugh', text: "That laugh of yours could cure anything. It's the most beautiful melody I've ever heard." },
  { icon: '🔥', title: 'Your Strength', text: 'You handle everything life throws at you with grace. Your strength amazes me every day.' },
  { icon: '🌙', title: 'Late Night Talks', text: 'Those 3am conversations where we share our dreams and fears — I live for those moments.' },
  { icon: '🏠', title: 'You Feel Like Home', text: "No matter where I am, when I'm with you, I'm exactly where I belong." },
  { icon: '💫', title: 'You Make Me Better', text: "Loving you has made me the best version of myself. You bring out a side of me I never knew existed." },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }
  })
}

export default function Reasons() {
  return (
    <section className="reasons-section" id="reasons">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Why I Love You
      </motion.h2>
      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <motion.div
            className="reason-card"
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.04, borderColor: '#e91e63', boxShadow: '0 10px 40px rgba(233,30,99,0.25)' }}
          >
            <span className="reason-icon">{r.icon}</span>
            <h3 className="reason-title">{r.title}</h3>
            <p className="reason-text">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
