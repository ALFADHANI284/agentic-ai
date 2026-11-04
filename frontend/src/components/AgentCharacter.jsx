import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Role-tailored Minimalist 3D Character
 * 
 * - Scout (Lead Hunter): Casual Tech Scout (Hoodie, Over-ear Headphones, Cyan Glow)
 * - Scribe (Sales Pitcher): Creative AI Copywriter (Violet Turtleneck, Glasses, Smart Casual)
 * - Commander (Supervisor): Executive Manager (Charcoal Business Suit, Tie, Golden Badge)
 */
export function MinimalistAgentCharacter({
  name,
  role,
  agentKey = 'scout',
  targetPos = [0, 0, 0],
  statusText = 'Standby',
  isBusy = false,
  isWalking = false,
  rotationY = 0
}) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()

  // Target Vector for smooth lerp movement
  const targetVec = useRef(new THREE.Vector3(...targetPos))

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Smooth movement towards target
    targetVec.current.set(targetPos[0], targetPos[1], targetPos[2])
    groupRef.current.position.lerp(targetVec.current, 0.08)

    // Smooth rotation towards target direction
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.1)

    // Procedural Character Animations
    if (bodyRef.current) {
      if (isWalking) {
        // Walking bounce and leg/arm swing
        bodyRef.current.position.y = 0.8 + Math.abs(Math.sin(t * 10)) * 0.1
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(t * 10) * 0.7
          rightArmRef.current.rotation.x = -Math.sin(t * 10) * 0.7
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = -Math.sin(t * 10) * 0.6
          rightLegRef.current.rotation.x = Math.sin(t * 10) * 0.6
        }
      } else if (isBusy) {
        // Typing / working at desk animation
        bodyRef.current.position.y = 0.78 + Math.sin(t * 14) * 0.015
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = -0.75 + Math.sin(t * 18) * 0.12
          rightArmRef.current.rotation.x = -0.75 + Math.cos(t * 18) * 0.12
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0
          rightLegRef.current.rotation.x = 0
        }
      } else {
        // Gentle breathing idle
        bodyRef.current.position.y = 0.8 + Math.sin(t * 2.5) * 0.02
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1)
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1)
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0
          rightLegRef.current.rotation.x = 0
        }
      }
    }

    // Subtle head tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.5) * 0.12
    }
  })

  // Theme styling per agent role
  const isScout = agentKey === 'scout'
  const isScribe = agentKey === 'sales'
  const isCommander = agentKey === 'dispatcher'

  const accentColor = isScout ? '#06b6d4' : isScribe ? '#a855f7' : '#10b981'
  const clothesColor = isScout ? '#0284c7' : isScribe ? '#7c3aed' : '#1e293b'
  const pantsColor = isScout ? '#334155' : isScribe ? '#475569' : '#0f172a'

  return (
    <group ref={groupRef} position={targetPos}>
      {/* 3D Floating Speech / Status Bubble */}
      <Html
        position={[0, 2.4, 0]}
        center
        style={{ pointerEvents: 'none', transition: 'all 0.2s ease-out' }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 whitespace-nowrap min-w-max">
            <span className="relative flex h-2.5 w-2.5">
              {isBusy && (
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: accentColor }}
                />
              )}
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: accentColor }}
              />
            </span>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white tracking-wide">{name}</span>
                <span
                  className="text-[9px] px-1.5 py-0.2 rounded font-medium border"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    borderColor: `${accentColor}40`
                  }}
                >
                  {role}
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-mono italic max-w-[210px] truncate">
                {statusText}
              </span>
            </div>
          </div>
          {/* Bubble Pointer */}
          <div className="w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-700/80 -mt-1" />
        </div>
      </Html>

      {/* Soft Contact Shadow on Floor */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>

      {/* Main Body Hierarchy */}
      <group ref={bodyRef} position={[0, 0.8, 0]}>
        {/* Torso / Clothes */}
        <mesh castShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.19, 0.55, 16]} />
          <meshStandardMaterial color={clothesColor} roughness={0.5} />
        </mesh>

        {/* Commander: White Shirt Collar & Gold Tie */}
        {isCommander && (
          <group position={[0, 0.28, 0.12]}>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.14, 0.08, 0.02]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
            <mesh position={[0, -0.08, 0.01]}>
              <boxGeometry args={[0.06, 0.22, 0.02]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
          </group>
        )}

        {/* Scribe: Minimalist Turtleneck Accent */}
        {isScribe && (
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 12]} />
            <meshStandardMaterial color="#4c1d95" roughness={0.4} />
          </mesh>
        )}

        {/* Head */}
        <group ref={headRef} position={[0, 0.62, 0]}>
          {/* Stylized Minimalist Head */}
          <mesh castShadow>
            <sphereGeometry args={[0.24, 20, 20]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.3} />
          </mesh>

          {/* Minimalist Hair / Hat */}
          {isScout && (
            <mesh position={[0, 0.1, -0.02]}>
              <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
          )}

          {isScribe && (
            /* Bob hair style */
            <mesh position={[0, 0.08, -0.04]}>
              <sphereGeometry args={[0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
              <meshStandardMaterial color="#78350f" roughness={0.8} />
            </mesh>
          )}

          {isCommander && (
            /* Neatly combed hair */
            <mesh position={[0, 0.12, -0.02]}>
              <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
              <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>
          )}

          {/* Scout: Wireless Over-ear Headphones */}
          {isScout && (
            <group position={[0, 0.02, 0]}>
              <mesh>
                <torusGeometry args={[0.26, 0.035, 8, 20]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>
              <mesh position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.07, 0.07, 0.05, 12]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
              </mesh>
              <mesh position={[0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.07, 0.07, 0.05, 12]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
              </mesh>
            </group>
          )}

          {/* Scribe: Chic Minimalist Glasses */}
          {isScribe && (
            <group position={[0, 0.02, 0.22]}>
              <mesh position={[-0.08, 0, 0]}>
                <torusGeometry args={[0.055, 0.01, 8, 16]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0.08, 0, 0]}>
                <torusGeometry args={[0.055, 0.01, 8, 16]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.06, 0.01, 0.01]} />
                <meshStandardMaterial color="#f8fafc" />
              </mesh>
            </group>
          )}

          {/* Minimalist Eyes (Dark subtle dots) */}
          <mesh position={[-0.08, 0.02, 0.22]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0.08, 0.02, 0.22]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.32, 0.32, 0]}>
          <mesh position={[0, -0.16, 0]}>
            <capsuleGeometry args={[0.06, 0.25, 6, 8]} />
            <meshStandardMaterial color={clothesColor} roughness={0.5} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.32, 0.32, 0]}>
          <mesh position={[0, -0.16, 0]}>
            <capsuleGeometry args={[0.06, 0.25, 6, 8]} />
            <meshStandardMaterial color={clothesColor} roughness={0.5} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
        </group>

        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.13, -0.15, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.45, 10]} />
            <meshStandardMaterial color={pantsColor} roughness={0.6} />
          </mesh>
          {/* Minimalist Shoe */}
          <mesh position={[0, -0.5, 0.05]}>
            <boxGeometry args={[0.1, 0.08, 0.18]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.13, -0.15, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.45, 10]} />
            <meshStandardMaterial color={pantsColor} roughness={0.6} />
          </mesh>
          {/* Minimalist Shoe */}
          <mesh position={[0, -0.5, 0.05]}>
            <boxGeometry args={[0.1, 0.08, 0.18]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
