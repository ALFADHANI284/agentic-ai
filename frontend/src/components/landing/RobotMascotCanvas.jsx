import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function CuteCapsuleRobot({ inCapsule = false, accentColor = '#192A56', eyeColor = '#FFFFFF' }) {
  const robotGroupRef = useRef()
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Responsive dynamic pointer tracking (fluid, never stiff)
    const mouseX = Math.max(-0.4, Math.min(0.4, state.pointer.x * 0.5))
    const mouseY = Math.max(-0.35, Math.min(0.35, state.pointer.y * 0.4))

    // Fluid organic bobbing, gentle roll & breathing
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = Math.sin(t * 1.8) * 0.12
      robotGroupRef.current.position.x = Math.sin(t * 0.9) * 0.03
      robotGroupRef.current.rotation.z = Math.sin(t * 1.2) * 0.03 + mouseX * 0.12
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.y,
        (inCapsule ? Math.sin(t * 0.8) * 0.12 : 0) + mouseX * 0.55,
        0.06
      )
      robotGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.x,
        -mouseY * 0.25,
        0.06
      )
    }

    // Dynamic responsive head with subtle tilt
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.55,
        0.08
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.38,
        0.08
      )
      headRef.current.rotation.z = Math.sin(t * 2.2) * 0.03
    }

    // Left arm counterbalances with organic swing
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.28 + Math.sin(t * 1.8) * 0.08
      leftArmRef.current.rotation.x = Math.cos(t * 1.4) * 0.12 - mouseY * 0.2
    }

    // Right arm: friendly organic wave (free of clipping, lively motion)
    if (rightArmRef.current) {
      if (inCapsule) {
        rightArmRef.current.position.y = -0.28
        rightArmRef.current.rotation.z = -0.28 - Math.sin(t * 1.8) * 0.08
        rightArmRef.current.rotation.x = Math.cos(t * 1.4) * 0.12
      } else {
        rightArmRef.current.position.y = -0.20 + Math.sin(t * 2.0) * 0.03
        rightArmRef.current.rotation.z = -1.15 + Math.sin(t * 2.6) * 0.22
        rightArmRef.current.rotation.x = Math.sin(t * 1.8) * 0.15
      }
    }

    // Natural blinking and glance focus
    const blinkCycle = t % 3.6
    const isBlinking = blinkCycle > 3.35 && blinkCycle < 3.52
    const eyeScaleY = isBlinking ? 0.08 : 1.0

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY
      rightEyeRef.current.scale.y = eyeScaleY
      leftEyeRef.current.position.x = -0.14 + mouseX * 0.02
      rightEyeRef.current.position.x = 0.14 + mouseX * 0.02
    }
  })

  return (
    <group ref={robotGroupRef} position={[0, -0.05, 0]}>
      
      {/* 1. KEPALA ROBOT MONITOR BULAT HALUS (Sleek Rounded Squircle) */}
      <group ref={headRef} position={[0, 0.36, 0]}>
        {/* Casing Luar Krem/Putih Mulus dengan Sudut Membulat Organik */}
        <RoundedBox args={[0.82, 0.70, 0.64]} radius={0.16} smoothness={5} castShadow>
          <meshStandardMaterial color="#FFFFFF" roughness={0.18} metalness={0.08} />
        </RoundedBox>

        {/* Bezel Aksen Deep Navy Lembut / Custom Accent */}
        <group position={[0, 0, 0.31]}>
          <RoundedBox args={[0.68, 0.56, 0.04]} radius={0.11} smoothness={4}>
            <meshStandardMaterial color={accentColor} roughness={0.25} metalness={0.2} />
          </RoundedBox>
        </group>

        {/* Layar Kaca Hitam Mengkilap di Depan */}
        <group position={[0, 0, 0.325]}>
          <RoundedBox args={[0.60, 0.48, 0.02]} radius={0.08} smoothness={4}>
            <meshStandardMaterial color="#0A0E1A" roughness={0.08} metalness={0.88} />
          </RoundedBox>
        </group>

        {/* Mata LED Kapsul Digital Putih / Lembut Kiri */}
        <mesh ref={leftEyeRef} position={[-0.14, 0.03, 0.342]}>
          <capsuleGeometry args={[0.032, 0.07, 10, 14]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2.8} />
        </mesh>

        {/* Mata LED Kapsul Digital Putih / Lembut Kanan */}
        <mesh ref={rightEyeRef} position={[0.14, 0.03, 0.342]}>
          <capsuleGeometry args={[0.032, 0.07, 10, 14]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2.8} />
        </mesh>

        {/* Antena / Dial Samping Membulat */}
        <mesh position={[-0.43, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />
          <meshStandardMaterial color={accentColor} roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[0.43, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />
          <meshStandardMaterial color={accentColor} roughness={0.25} metalness={0.3} />
        </mesh>

        {/* Antena Mini Atas dengan LED Glowing */}
        <group position={[0, 0.37, 0]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.09, 10]} />
            <meshStandardMaterial color={accentColor} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.095, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2.0} />
          </mesh>
        </group>
      </group>

      {/* 2. LEHER MINIMALIS */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.10, 20]} />
        <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 3. BODI ROBOT PUTIH RAMPING SEIMBANG */}
      <group position={[0, -0.32, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.26, 0.30, 16, 20]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.12} />
        </mesh>

        {/* Chest Plate / Core Indicator Glowing */}
        <group position={[0, 0.05, 0.25]}>
          <RoundedBox args={[0.18, 0.11, 0.03]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2.2} />
          </RoundedBox>
        </group>
      </group>

      {/* 4. TANGAN KIRI (Floating) */}
      <group ref={leftArmRef} position={[-0.38, -0.28, 0]}>
        <mesh position={[-0.08, -0.08, 0]} castShadow>
          <capsuleGeometry args={[0.06, 0.18, 10, 14]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
        </mesh>
        <mesh position={[-0.08, -0.20, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#0E1013" metalness={0.7} />
        </mesh>
      </group>

      {/* 5. TANGAN KANAN (Floating & Waving) */}
      <group ref={rightArmRef} position={[0.38, -0.28, 0]}>
        <mesh position={[0.08, -0.08, 0]} castShadow>
          <capsuleGeometry args={[0.06, 0.18, 10, 14]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
        </mesh>
        <mesh position={[0.08, -0.20, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#0E1013" metalness={0.7} />
        </mesh>
      </group>

      {/* 6. KAKI MINI MELAYANG */}
      <group position={[-0.13, -0.62, 0.04]}>
        <mesh rotation={[-0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.14, 10, 14]} />
          <meshStandardMaterial color="#0E1013" roughness={0.35} metalness={0.6} />
        </mesh>
      </group>
      <group position={[0.13, -0.62, 0.04]}>
        <mesh rotation={[-0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.14, 10, 14]} />
          <meshStandardMaterial color="#0E1013" roughness={0.35} metalness={0.6} />
        </mesh>
      </group>

      {/* Pointlight Halus Menerangi Maskot */}
      <pointLight position={[0, 0.4, 0.8]} intensity={1.8} color="#FFFFFF" distance={3.5} />
    </group>
  )
}

function FloatingCoin() {
  const coinRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (coinRef.current) {
      // Hanya mengayun/muter kiri dan kanan sedikit (subtle oscillation +/- 22 derajat)
      coinRef.current.rotation.y = Math.sin(t * 1.6) * 0.38
      coinRef.current.rotation.x = Math.sin(t * 1.2) * 0.12
      coinRef.current.rotation.z = Math.cos(t * 1.4) * 0.05
      coinRef.current.position.y = Math.sin(t * 2.0) * 0.06
    }
  })

  return (
    <group ref={coinRef} position={[0, 0, 0]}>
      {/* Koin Silinder Utama Navy Bertekstur Logam Halus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.15, 36]} />
        <meshStandardMaterial
          color="#192A56"
          roughness={0.25}
          metalness={0.7}
          emissive="#0d1b3e"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Cincin Lis Luar Emas/Krem */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.76, 0.035, 16, 36]} />
        <meshStandardMaterial color="#F8F5EC" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Cincin Bezel Dalam Beraksen Oranye */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.015, 16, 36]} />
        <meshStandardMaterial color="#FF5B00" metalness={0.8} roughness={0.2} emissive="#FF5B00" emissiveIntensity={0.6} />
      </mesh>

      {/* Teks MBG di Muka Depan Koin */}
      <Text
        position={[0, 0, 0.082]}
        fontSize={0.29}
        color="#F8F5EC"
        anchorX="center"
        anchorY="middle"
        characters="MBG"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        MBG
      </Text>

      {/* Teks MBG di Muka Belakang Koin */}
      <Text
        position={[0, 0, -0.082]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.29}
        color="#F8F5EC"
        anchorX="center"
        anchorY="middle"
        characters="MBG"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        MBG
      </Text>
    </group>
  )
}

function HoloNeuralCore() {
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.9
      coreRef.current.rotation.x += delta * 0.45
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z -= delta * 0.6
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.5
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#192A56"
          wireframe
          wireframeLinewidth={2}
          emissive="#192A56"
          emissiveIntensity={1.8}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2.2} />
      </mesh>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.95, 0.025, 16, 64]} />
        <meshStandardMaterial color="#0E1013" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.15, 0.025, 16, 64]} />
        <meshStandardMaterial color="#192A56" roughness={0.2} metalness={0.9} />
      </mesh>
      <pointLight color="#192A56" intensity={3.5} distance={4} />
    </group>
  )
}

function StarConnector() {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.7
      meshRef.current.rotation.x += delta * 0.4
      meshRef.current.rotation.z += delta * 0.25
    }
  })

  // Authentic 6-axis jackstone connector matching star.webp (Zero weird triangles)
  return (
    <group ref={meshRef}>
      {/* Central Spherical Hub */}
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>
      {/* X-Axis Cylindrical Pipe Arm */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 1.35, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>
      {/* Y-Axis Cylindrical Pipe Arm */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 1.35, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>
      {/* Z-Axis Cylindrical Pipe Arm */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 1.35, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>
    </group>
  )
}

export function RobotMascotCanvas({
  mode = 'robot',
  cameraDistance = 3.8,
  inCapsule = false,
  accentColor = '#192A56',
  eyeColor = '#FFFFFF'
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, cameraDistance], fov: 38 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto', overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[6, 10, 8]} intensity={1.9} color="#FFFFFF" />
        <directionalLight position={[-6, -6, -4]} intensity={0.6} color="#192A56" />

        {mode === 'robot' && <CuteCapsuleRobot inCapsule={inCapsule} accentColor={accentColor} eyeColor={eyeColor} />}
        {mode === 'core' && <HoloNeuralCore />}
        {mode === 'coin' && <FloatingCoin />}
        {mode === 'connector' && <StarConnector />}
      </Canvas>
    </div>
  )
}
