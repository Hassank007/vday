import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import HeartBackground from './components/HeartBackground'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Proposal from './components/Proposal'
import Celebration from './components/Celebration'
import FloatingPetals from './components/FloatingPetals'
import SparkleTrail from './components/SparkleTrail'
import MusicToggle from './components/MusicToggle'
import 'lenis/dist/lenis.css'
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    if (!started) return

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smooth: true,
      touchMultiplier: 2,
      touchInertiaMultiplier: 25,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [started])

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
