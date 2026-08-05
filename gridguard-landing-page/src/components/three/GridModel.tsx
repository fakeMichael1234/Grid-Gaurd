'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Line, Stars } from '@react-three/drei'
import * as THREE from 'three'

interface NodeProps {
  position: [number, number, number]
  index: number
}

const GlowingNode = ({ position, index }: NodeProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2 + index) * 0.2
      const material = ref.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 3 + index) * 0.5
    }
  })

  return (
    <Sphere ref={ref} args={[0.15, 32, 32]} position={position}>
      <meshStandardMaterial
        color="#00F0FF"
        emissive="#00F0FF"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Sphere>
  )
}

const NetworkLines = ({ points }: { points: [number, number, number][] }) => {
  const ref = useRef<any>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.3 + Math.sin(clock.elapsedTime * 1.5) * 0.2
    }
  })

  // Create connections between nodes
  const lines = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (Math.random() > 0.4) {
        lines.push([points[i], points[j]])
      }
    }
  }

  return (
    <group>
      {lines.map((pts, idx) => (
        <Line
          key={idx}
          ref={idx === 0 ? ref : undefined}
          points={pts}
          color="#8A2BE2"
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  )
}

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null!)
  
  const nodes = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 15; i++) {
      pts.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 8
      ])
    }
    return pts
  }, [])

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05
      // Mouse parallax
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * 0.2, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.2, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={3000} factor={6} saturation={0} fade speed={1.5} />
      {nodes.map((pos, i) => (
        <GlowingNode key={i} position={pos} index={i} />
      ))}
      <NetworkLines points={nodes} />
      
      {/* Ambient and point lights for depth */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8A2BE2" />
    </group>
  )
}

export default function GridModel() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <Scene />
        {/* We disable zoom/pan so it behaves like a hero background */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.2} />
      </Canvas>
    </div>
  )
}
