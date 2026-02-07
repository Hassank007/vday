import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HeartParticles() {
  const meshRef = useRef()
  const ringRef = useRef()
  const starsRef = useRef()

  const heartData = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
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
    return { positions, colors, count }
  }, [])

  const starData = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return { positions, count }
  }, [])

  const ringData = useMemo(() => {
    const count = 150
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.2 + Math.random() * 0.3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2 + 0.3
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return { positions, count }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      const beat = 1 + Math.sin(t * 8) * 0.04 + Math.sin(t * 16) * 0.02
      meshRef.current.scale.set(beat, beat, beat)
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
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
      <points ref={meshRef} position={[0, 0.3, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={heartData.count} array={heartData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={heartData.count} array={heartData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
      </points>

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starData.count} array={starData.positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={ringData.count} array={ringData.positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.028} color="#ffd700" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </>
  )
}

export default function HeartBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={1}
      >
        <HeartParticles />
      </Canvas>
    </div>
  )
}
