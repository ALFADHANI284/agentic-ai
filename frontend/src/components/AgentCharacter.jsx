import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The Sims / Capsule Bean Bot Character (Matching referensi1.png)
 * Glossy vibrant bean body, large round head, dark glass visor with glowing eyes,
 * floating label badge `• [name]-agent` and ground selection ring.
 */
export function SimsAgentBot({
  id = 'blue-agent',
  name = 'blue-agent',
  role = 'Compute',
  color = '#0284c7', // Primary body color (glossy blue, purple, yellow, orange, green)
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
  const targetVec = useRef(new THREE.Vector3(...targetPos))

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Smooth movement towards target
    targetVec.current.set(targetPos[0], targetPos[1], targetPos[2])
    groupRef.current.position.lerp(targetVec.current, 0.08)

    // Smooth rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.1)

    // Cute procedural animations
    if (bodyRef.current) {
      if (isWalking) {
        // Cute bouncing walk
        bodyRef.current.position.y = 0.65 + Math.abs(Math.sin(t * 12)) * 0.12
        bodyRef.current.rotation.z = Math.sin(t * 12) * 0.08
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = Math.sin(t * 12) * 0.2
          rightHandRef.current.position.z = -Math.sin(t * 12) * 0.2
        }
      } else if (isBusy) {
        // Rapid typing / working bob
        bodyRef.current.position.y = 0.65 + Math.sin(t * 16) * 0.02
        bodyRef.current.rotation.z = 0
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = 0.28 + Math.sin(t * 20) * 0.08
          rightHandRef.current.position.z = 0.28 + Math.cos(t * 20) * 0.08
          leftHandRef.current.position.y = -0.05 + Math.sin(t * 18) * 0.04
          rightHandRef.current.position.y = -0.05 + Math.cos(t * 18) * 0.04
        }
      } else {
        // Cute breathing idle
        bodyRef.current.position.y = 0.65 + Math.sin(t * 3) * 0.03
        bodyRef.current.rotation.z = 0
        if (leftHandRef.current && rightHandRef.current) {
          leftHandRef.current.position.z = 0
          rightHandRef.current.position.z = 0
          leftHandRef.current.position.y = -0.05
          rightHandRef.current.position.y = -0.05
        }
      }
    }

    // Cute head tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={targetPos}>
      {/* 3D Floating Pill Label overhead (Exact replica from referensi1.png: `• blue-agent`) */}
      <Html
        position={[0, 2.1, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-800 text-[10px] font-semibold whitespace-nowrap">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{name}</span>
            {isBusy && (
              <span className="text-[9px] font-normal text-slate-400 italic">
                ({statusText})
              </span>
            )}
          </div>
          {/* Little pointer tail */}
          <div className="w-1.5 h-1.5 bg-white rotate-45 border-r border-b border-slate-200 -mt-0.5" />
        </div>
      </Html>

      {/* Selected Ground Aura Ring */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.65, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Soft Contact Shadow on Floor */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>

      {/* Bot Hierarchy */}
      <group ref={bodyRef} position={[0, 0.65, 0]}>
        {/* Chubby Bean Body (Capsule/Sphere with glossy finish) */}
        <mesh castShadow position={[0, -0.05, 0]}>
          <capsuleGeometry args={[0.26, 0.28, 12, 16]} />
          <meshStandardMaterial
            color={color}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          {/* Round Head Shell */}
          <mesh castShadow>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial
              color={color}
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>

          {/* Dark Glass Visor Screen Face */}
          <mesh position={[0, 0.02, 0.22]}>
            <boxGeometry args={[0.42, 0.22, 0.14]} />
            <meshStandardMaterial
              color="#090d16"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Cute Glowing Visor Eyes (Horizontal Capsule Eyes) */}
          <mesh position={[-0.1, 0.03, 0.3]}>
            <capsuleGeometry args={[0.035, 0.06, 6, 8]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={1.5}
            />
          </mesh>
          <mesh position={[0.1, 0.03, 0.3]}>
            <capsuleGeometry args={[0.035, 0.06, 6, 8]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>

        {/* Left Floating Hand */}
        <group ref={leftHandRef} position={[-0.34, -0.05, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Right Floating Hand */}
        <group ref={rightHandRef} position={[0.34, -0.05, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Cute Stubby Feet */}
        <mesh position={[-0.14, -0.42, 0.05]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[0.14, -0.42, 0.05]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
