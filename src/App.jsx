import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeartBackground from './components/HeartBackground'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Proposal from './components/Proposal'
import Celebration from './components/Celebration'
import FloatingPetals from './components/FloatingPetals'
import SparkleTrail from './components/SparkleTrail'
import MusicToggle from './components/MusicToggle'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  return (
    <>
      <HeartBackground />

      <AnimatePresence>
        {!started && (
          <motion.div key="preloader" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <Preloader onStart={() => setStarted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>
          <FloatingPetals />
          <SparkleTrail />

          <motion.div
            className="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <Hero />
            <Proposal onYes={() => setCelebrate(true)} />
          </motion.div>

          <MusicToggle />
        </>
      )}

      <Celebration active={celebrate} />
    </>
  )
}
