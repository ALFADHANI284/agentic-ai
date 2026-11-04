import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Ultra-smooth The Sims / Capsule Bean Bot
 * High-poly geometry, smooth designer-toy finish, glowing visor eyes,
 * smooth organic idle/walk animations and glowing ground halo ring.
 */
export function SimsAgentBot({
  id = 'blue-agent',
  name = 'blue-agent',
  role = 'Compute',
  color = '#0284c7',
  eyeColor = '#38bdf8',
  targetPos = [0, 0, 0],
  statusText = 'Idle',
  isBusy = false,
  isWalking = false,
  isSelected = false,
  rotationY = 0
}) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const leftHandRef = useRef()
  const rightHandRef = useRef()
  const haloRef = useRef()
  const targetVec = useRef(new THREE.Vector3(...targetPos))

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Smooth movement towards target position
    targetVec.current.set(targetPos[0], targetPos[1], targetPos[2])
    groupRef.current.position.lerp(targetVec.current, 0.08)

    // Smooth rotation with damping
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.1)

    // Smooth organic animations
    if (bodyRef.current) {
      if (isWalking) {
        // Natural bipedal bouncing walk with tilt
        bodyRef.current.position.y = 0.65 + Math.abs(Math.sin(t * 10)) * 0.1
        bodyRef.current.rotation.z = Math.sin(t * 10) * 0.06
        bodyRef.current.rotation.x = 0.08 // slight lean forward when walking
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = Math.sin(t * 10) * 0.22
          rightHandRef.current.position.z = -Math.sin(t * 10) * 0.22
          leftHandRef.current.rotation.x = Math.sin(t * 10) * 0.4
          rightHandRef.current.rotation.x = -Math.sin(t * 10) * 0.4
        }
      } else if (isBusy) {
        // Fluid typing animation
        bodyRef.current.position.y = 0.65 + Math.sin(t * 14) * 0.015
        bodyRef.current.rotation.z = 0
        bodyRef.current.rotation.x = 0.04
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = 0.26 + Math.sin(t * 18) * 0.06
          rightHandRef.current.position.z = 0.26 + Math.cos(t * 18) * 0.06
          leftHandRef.current.position.y = -0.04 + Math.sin(t * 16) * 0.03
          rightHandRef.current.position.y = -0.04 + Math.cos(t * 16) * 0.03
        }
      } else {
        // Relaxed natural breathing
        bodyRef.current.position.y = 0.65 + Math.sin(t * 2.5) * 0.025
        bodyRef.current.rotation.z = 0
        bodyRef.current.rotation.x = 0
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = THREE.MathUtils.lerp(leftHandRef.current.position.z, 0, 0.1)
          rightHandRef.current.position.z = THREE.MathUtils.lerp(rightHandRef.current.position.z, 0, 0.1)
          leftHandRef.current.position.y = THREE.MathUtils.lerp(leftHandRef.current.position.y, -0.04, 0.1)
          rightHandRef.current.position.y = THREE.MathUtils.lerp(rightHandRef.current.position.y, -0.04, 0.1)
        }
      }
    }

    // Natural head tilt and curiosity look
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.8) * 0.08
    }

    // Pulsing selection halo
    if (haloRef.current) {
      haloRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.08)
    }
  })

  return (
    <group ref={groupRef} position={targetPos}>
      {/* 3D Floating Pill Label overhead (Exact replica: `• [name]-agent`) */}
      <Html
        position={[0, 2.2, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-800 text-[10px] font-bold whitespace-nowrap">
            <span
              className="w-2 h-2 rounded-full shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span>{name}</span>
            {isBusy && (
              <span className="text-[9px] font-normal text-slate-400 italic">
                ({statusText})
              </span>
            )}
          </div>
          <div className="w-1.5 h-1.5 bg-white rotate-45 border-r border-b border-slate-200 -mt-0.5" />
        </div>
      </Html>

      {/* Glowing Ground Selection Halo (Triggers Bloom) */}
      {isSelected && (
        <group ref={haloRef} position={[0, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.68, 36]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.8}
              transparent
              opacity={0.85}
            />
          </mesh>
          <pointLight position={[0, 0.2, 0]} intensity={0.8} distance={1.8} color={color} />
        </group>
      )}

      {/* Bot Hierarchy */}
      <group ref={bodyRef} position={[0, 0.65, 0]}>
        {/* Chubby Glossy Capsule Body */}
        <mesh castShadow position={[0, -0.04, 0]}>
          <capsuleGeometry args={[0.27, 0.32, 24, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.12}
            metalness={0.08}
          />
        </mesh>

        {/* Round Head Shell */}
        <group ref={headRef} position={[0, 0.44, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.34, 32, 32]} />
            <meshStandardMaterial
              color={color}
              roughness={0.12}
              metalness={0.08}
            />
          </mesh>

          {/* Dark Curved Glass Visor Screen Face */}
          <mesh position={[0, 0.02, 0.24]}>
            <boxGeometry args={[0.44, 0.22, 0.14]} />
            <meshStandardMaterial
              color="#050811"
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>

          {/* Glowing Visor Eyes (Triggers Bloom Glow!) */}
          <mesh position={[-0.1, 0.03, 0.32]}>
            <capsuleGeometry args={[0.035, 0.07, 8, 12]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={2.5}
            />
          </mesh>
          <mesh position={[0.1, 0.03, 0.32]}>
            <capsuleGeometry args={[0.035, 0.07, 8, 12]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Left Smooth Floating Hand */}
        <group ref={leftHandRef} position={[-0.36, -0.04, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={color}
              roughness={0.15}
              metalness={0.05}
            />
          </mesh>
        </group>

        {/* Right Smooth Floating Hand */}
        <group ref={rightHandRef} position={[0.36, -0.04, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={color}
              roughness={0.15}
              metalness={0.05}
            />
          </mesh>
        </group>

        {/* Cute Feet */}
        <mesh position={[-0.14, -0.44, 0.05]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.14, -0.44, 0.05]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
