import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const gainRef = useRef(null)
  const intervRef = useRef(null)

  const startAudio = useCallback(() => {
    if (audioCtxRef.current) return

    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)
    gainRef.current = gain

    // Cmaj7 chord for warm romantic ambience
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq

      const vibrato = ctx.createOscillator()
      const vibGain = ctx.createGain()
      vibrato.frequency.value = 0.4 + Math.random() * 0.4
      vibGain.gain.value = 1.5
      vibrato.connect(vibGain)
      vibGain.connect(osc.frequency)
      vibrato.start()

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 700 + i * 200
      filter.Q.value = 1

      osc.connect(filter)
      filter.connect(gain)
      osc.start()
    })

    // Evolving pad notes
    intervRef.current = setInterval(() => {
      if (!playing) return
      const pad = ctx.createOscillator()
      const padGain = ctx.createGain()
      pad.type = 'sine'
      pad.frequency.value = notes[Math.floor(Math.random() * notes.length)] * (Math.random() > 0.5 ? 2 : 1)
      padGain.gain.value = 0
      pad.connect(padGain)
      padGain.connect(ctx.destination)
      pad.start()
      padGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 2)
      padGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6)
      setTimeout(() => pad.stop(), 7000)
    }, 4000)

    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2)
    setPlaying(true)
  }, [])

  const toggle = useCallback(() => {
    if (!audioCtxRef.current) {
      startAudio()
      return
    }

    const ctx = audioCtxRef.current
    const gain = gainRef.current

    if (playing) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      setPlaying(false)
    } else {
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.5)
      setPlaying(true)
    }
  }, [playing, startAudio])

  return (
    <motion.button
      className="music-toggle"
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Toggle Music"
    >
      <div className={`music-bars ${playing ? 'playing' : ''}`}>
        <span /><span /><span /><span />
      </div>
    </motion.button>
  )
}
