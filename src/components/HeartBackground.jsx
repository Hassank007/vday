import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

function HeartParticles({ isMobile }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const starsRef = useRef()

  const heartCount = isMobile ? 600 : 1200
  const starCount = isMobile ? 800 : 2000
  const ringCount = isMobile ? 200 : 400

  const heartData = useMemo(() => {
    const positions = new Float32Array(heartCount * 3)
    const colors = new Float32Array(heartCount * 3)

    for (let i = 0; i < heartCount; i++) {
      const t = Math.random() * Math.PI * 2
      const scale = 0.055
      const hx = 16 * Math.pow(Math.sin(t), 3) * scale
      const hy = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale
      const hz = (Math.random() - 0.5) * 0.8

      const spread = 0.12
      positions[i * 3] = hx + (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = hy + (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = hz

      const c = Math.random()
      if (c < 0.4) {
        colors[i * 3] = 0.91; colors[i * 3 + 1] = 0.12; colors[i * 3 + 2] = 0.39
      } else if (c < 0.7) {
        colors[i * 3] = 0.97; colors[i * 3 + 1] = 0.73; colors[i * 3 + 2] = 0.82
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.84; colors[i * 3 + 2] = 0.0
      }
    }
    return { positions, colors }
  }, [heartCount])

  const starData = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return { positions }
  }, [starCount])

  const ringData = useMemo(() => {
    const positions = new Float32Array(ringCount * 3)
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      const radius = 2.2 + Math.random() * 0.3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2 + 0.3
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return { positions }
  }, [ringCount])

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      const beat = 1 + Math.sin(t * 8) * 0.04 + Math.sin(t * 16) * 0.02
      meshRef.current.scale.set(beat, beat, beat)
      if (!isMobile) {
        meshRef.current.rotation.y += (mouse.x * 0.4 - meshRef.current.rotation.y) * 0.015
        meshRef.current.rotation.x += (-mouse.y * 0.2 - meshRef.current.rotation.x) * 0.015
      } else {
        meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
      }
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.03
      starsRef.current.rotation.x = t * 0.015
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.4
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <>
      {/* Heart particles */}
      <points ref={meshRef} position={[0, 0.3, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={heartData.positions.length / 3}
            array={heartData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={heartData.colors.length / 3}
            array={heartData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starData.positions.length / 3}
            array={starData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Orbiting ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ringData.positions.length / 3}
            array={ringData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#ffd700"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}

export default function HeartBackground() {
  const isMobile = useIsMobile()

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      >
        <HeartParticles isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
