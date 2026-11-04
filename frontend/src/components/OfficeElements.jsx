import React from 'react'
import { RoundedBox, Html } from '@react-three/drei'

/**
 * 3D Floating Pill Tag (matching the reference photo)
 */
export function FloorTag({ position, title, subtitle, active = false }) {
  return (
    <Html
      position={position}
      center
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200/90 text-slate-700 whitespace-nowrap text-[10px] font-medium tracking-tight">
        <span
          className={`w-2 h-2 rounded-full ${
            active ? 'bg-sky-500 shadow-sm shadow-sky-400 animate-pulse' : 'bg-slate-400'
          }`}
        />
        <span className="font-bold text-slate-800">{title}</span>
        {subtitle && (
          <span className="text-[9px] text-slate-400 font-normal">
            / {subtitle}
          </span>
        )}
      </div>
    </Html>
  )
}

/**
 * Enclosed Isometric Diorama Room (The Sims cutaway style)
 * Back wall & Left wall are closed; Front and Right are open for viewing.
 */
export function EnclosedDioramaRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Raised Smooth Beveled White Floor Platform */}
      <RoundedBox
        receiveShadow
        args={[18, 0.4, 14]}
        radius={0.2}
        smoothness={4}
        position={[0, -0.2, 0]}
      >
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.15}
          metalness={0.04}
        />
      </RoundedBox>

      {/* Glossy Polished Floor Surface Inset */}
      <mesh receiveShadow position={[0, 0.005, 0]}>
        <planeGeometry args={[17.6, 13.6]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.02}
        />
        {/* Subtle grid helper for scale */}
      </mesh>
      <gridHelper args={[17, 17, '#e2e8f0', '#f1f5f9']} position={[0, 0.01, 0]} />

      {/* 2. Solid Back Wall (Enclosing behind Whiteboard & Kanban) */}
      <group position={[0, 3.2, -6.9]}>
        <RoundedBox
          receiveShadow
          castShadow
          args={[18, 6.4, 0.4]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </RoundedBox>
        {/* Wall Baseboard Trim */}
        <mesh position={[0, -3.05, 0.22]}>
          <boxGeometry args={[18, 0.3, 0.04]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>
        {/* Wall Top Cornice Trim */}
        <mesh position={[0, 3.15, 0.22]}>
          <boxGeometry args={[18, 0.15, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
      </group>

      {/* 3. Solid Left Wall (Enclosing behind Vault & Desk 01) */}
      <group position={[-8.9, 3.2, 0]}>
        <RoundedBox
          receiveShadow
          castShadow
          args={[0.4, 6.4, 14]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial color="#edf2f7" roughness={0.4} />
        </RoundedBox>
        {/* Left Wall Baseboard Trim */}
        <mesh position={[0.22, -3.05, 0]}>
          <boxGeometry args={[0.04, 0.3, 14]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
        </mesh>
        {/* Left Wall Top Cornice Trim */}
        <mesh position={[0.22, 3.15, 0]}>
          <boxGeometry args={[0.08, 0.15, 14]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
      </group>

      {/* Soft Contact Shadow beneath entire floating diorama */}
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 18]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

/**
 * Desk 01: Warm Walnut Dual Curved Monitor Workstation (Smooth Beveled)
 */
export function Desk01({ position = [-4, 0, 0], active = true }) {
  return (
    <group position={position}>
      {/* Desk Surface (Smooth Rounded Walnut Wood) */}
      <RoundedBox
        castShadow
        receiveShadow
        args={[3.4, 0.12, 1.5]}
        radius={0.05}
        smoothness={4}
        position={[0, 1.05, 0]}
      >
        <meshStandardMaterial color="#8b5e3c" roughness={0.3} metalness={0.05} />
      </RoundedBox>

      {/* Storage Drawers (Left side with rounded edges) */}
      <RoundedBox
        castShadow
        args={[0.85, 0.95, 1.3]}
        radius={0.04}
        smoothness={3}
        position={[-1.15, 0.52, 0]}
      >
        <meshStandardMaterial color="#6f4528" roughness={0.4} />
      </RoundedBox>
      {/* Chrome Handles */}
      {[-0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} position={[-1.15, 0.52 + y * 0.7, 0.67]}>
          <boxGeometry args={[0.3, 0.025, 0.02]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Right Metal Leg (Matte White Tubular Frame) */}
      <RoundedBox
        castShadow
        args={[0.08, 0.95, 1.3]}
        radius={0.03}
        smoothness={3}
        position={[1.5, 0.52, 0]}
      >
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Dual Curved Ultra-wide Displays */}
      {/* Left Display */}
      <group position={[-0.75, 1.6, -0.25]} rotation={[0, 0.16, 0]}>
        <RoundedBox castShadow args={[1.35, 0.75, 0.06]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Glowing Screen Face */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.28, 0.68]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={active ? 1.4 : 0.4}
          />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.45, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Right Display */}
      <group position={[0.7, 1.6, -0.25]} rotation={[0, -0.16, 0]}>
        <RoundedBox castShadow args={[1.35, 0.75, 0.06]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Glowing Screen Face */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.28, 0.68]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={active ? 1.2 : 0.4}
          />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.45, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Ambient Blue Screen Glow on Desk */}
      {active && (
        <pointLight
          position={[0, 1.4, 0.1]}
          intensity={1.2}
          distance={2.5}
          color="#38bdf8"
        />
      )}

      {/* Keyboard & Mouse */}
      <RoundedBox args={[0.9, 0.02, 0.32]} radius={0.01} smoothness={2} position={[0, 1.12, 0.22]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.025, 0.16]} radius={0.02} smoothness={2} position={[0.65, 1.12, 0.22]}>
        <meshStandardMaterial color="#0284c7" />
      </RoundedBox>

      {/* Mini Ceramic Desk Succulent */}
      <group position={[-1.35, 1.15, 0.3]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.09, 0.07, 0.16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
      </group>

      {/* Ergonomic White Swivel Chair */}
      <group position={[0, 0, 1.0]} rotation={[0, Math.PI, 0]}>
        {/* Seat Cushion */}
        <RoundedBox castShadow args={[0.85, 0.1, 0.8]} radius={0.04} smoothness={3} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </RoundedBox>
        {/* Backrest Cushion */}
        <RoundedBox castShadow args={[0.8, 0.9, 0.1]} radius={0.05} smoothness={3} position={[0, 1.28, -0.36]}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </RoundedBox>
        {/* Armrests */}
        <mesh position={[-0.4, 1.0, -0.05]}>
          <boxGeometry args={[0.06, 0.38, 0.42]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
        </mesh>
        <mesh position={[0.4, 1.0, -0.05]}>
          <boxGeometry args={[0.06, 0.38, 0.42]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
        </mesh>
        {/* Chrome Spine & 5-Star Wheels */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.7, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Floor Tag */}
      <FloorTag
        position={[0, 0.08, 1.85]}
        title="Desk 01"
        subtitle="Active Compute"
        active={active}
      />
    </group>
  )
}

/**
 * Vault: Brushed Stainless Steel Safe (Smooth Rounded Edges)
 */
export function VaultSafe({ position = [-6.5, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* Outer Safe Chassis (Rounded Brushed Stainless Steel) */}
      <RoundedBox
        castShadow
        args={[2.4, 3.2, 2.2]}
        radius={0.08}
        smoothness={4}
        position={[0, 1.6, 0]}
      >
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.25} />
      </RoundedBox>

      {/* Interior Chamber Cutout */}
      <mesh position={[0.05, 1.6, 0.18]}>
        <boxGeometry args={[1.9, 2.7, 1.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Heavy Open Vault Door */}
      <group position={[1.2, 1.6, 1.1]} rotation={[0, 1.0, 0]}>
        <RoundedBox castShadow args={[1.9, 2.9, 0.25]} radius={0.06} smoothness={3} position={[0.95, 0, 0]}>
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Locking Wheel in Center of Door */}
        <mesh position={[0.95, 0, 0.16]}>
          <torusGeometry args={[0.35, 0.05, 8, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </mesh>
      </group>

      {/* Compute Server Trays with Glowing LEDs */}
      {[-0.8, -0.2, 0.4, 1.0].map((y, i) => (
        <group key={i} position={[0.05, 1.6 + y, 0.2]}>
          <mesh>
            <boxGeometry args={[1.7, 0.38, 1.3]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Glowing LED status strips */}
          <mesh position={[-0.5, 0, 0.67]}>
            <boxGeometry args={[0.35, 0.06, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.8}
            />
          </mesh>
          <mesh position={[0.2, 0, 0.67]}>
            <boxGeometry args={[0.07, 0.07, 0.02]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      ))}

      {/* Floor Tag */}
      <FloorTag
        position={[-0.5, 0.08, 1.7]}
        title="Vault"
        subtitle="Secure Storage"
        active={true}
      />
    </group>
  )
}

/**
 * Whiteboard: Frosted Glass Planning Board (Mounted in front of back wall)
 */
export function GlassWhiteboard({ position = [-1.5, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* Frosted Glass Surface */}
      <RoundedBox castShadow args={[3.4, 2.2, 0.05]} radius={0.04} smoothness={3} position={[0, 2.0, 0]}>
        <meshStandardMaterial
          color="#f8fafc"
          transparent
          opacity={0.5}
          roughness={0.15}
        />
      </RoundedBox>

      {/* Aluminum Stand Base */}
      <mesh position={[-1.6, 0.5, 0]}>
        <boxGeometry args={[0.06, 1.0, 0.6]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      <mesh position={[1.6, 0.5, 0]}>
        <boxGeometry args={[0.06, 1.0, 0.6]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>

      {/* Planning Sketch & Color Sticky Notes on Board */}
      <mesh position={[-0.9, 2.3, 0.04]}>
        <boxGeometry args={[0.8, 0.55, 0.01]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0.2, 2.0, 0.04]}>
        <boxGeometry args={[0.65, 0.45, 0.01]} />
        <meshStandardMaterial color="#fef08a" />
      </mesh>
      <mesh position={[0.9, 2.4, 0.04]}>
        <boxGeometry args={[0.55, 0.55, 0.01]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>

      {/* Floor Tag */}
      <FloorTag
        position={[0, 0.08, 0.7]}
        title="Whiteboard"
        subtitle="Ideas & Planning"
        active={false}
      />
    </group>
  )
}

/**
 * Kanban Wall: Glowing Neon Work Items Board (Backlog | In Progress | Done)
 * With signature ambient cyan glow matching the reference image!
 */
export function KanbanWall({ position = [4.2, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* 1. Neon Cyan Edge Glow Backdrop Frame */}
      <RoundedBox args={[4.8, 2.8, 0.04]} radius={0.08} smoothness={3} position={[0, 2.2, -0.04]}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.0}
        />
      </RoundedBox>

      {/* Point Light Casting Ambient Cyan Glow onto Room & Floor */}
      <pointLight
        position={[0, 2.2, 0.4]}
        intensity={2.2}
        distance={5}
        color="#38bdf8"
      />

      {/* 2. Glass Board Front */}
      <RoundedBox castShadow args={[4.6, 2.6, 0.05]} radius={0.06} smoothness={3} position={[0, 2.2, 0]}>
        <meshStandardMaterial
          color="#f0f9ff"
          transparent
          opacity={0.65}
          roughness={0.1}
        />
      </RoundedBox>

      {/* 3. Three Columns: Backlog, In Progress, Done Headers */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <group key={i} position={[x, 3.15, 0.04]}>
          <RoundedBox args={[1.3, 0.25, 0.02]} radius={0.02} smoothness={2}>
            <meshStandardMaterial color="#e2e8f0" />
          </RoundedBox>
        </group>
      ))}

      {/* Task Cards on Kanban Board */}
      {/* Backlog Cards */}
      <RoundedBox args={[1.2, 0.45, 0.02]} radius={0.02} smoothness={2} position={[-1.5, 2.6, 0.04]}>
        <meshStandardMaterial color="#fed7aa" />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.45, 0.02]} radius={0.02} smoothness={2} position={[-1.5, 1.9, 0.04]}>
        <meshStandardMaterial color="#e2e8f0" />
      </RoundedBox>

      {/* In Progress Cards (Active Glowing Cards) */}
      <RoundedBox args={[1.2, 0.5, 0.02]} radius={0.02} smoothness={2} position={[0, 2.5, 0.04]}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
        />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.42, 0.02]} radius={0.02} smoothness={2} position={[0, 1.8, 0.04]}>
        <meshStandardMaterial color="#fef08a" />
      </RoundedBox>

      {/* Done Cards (Green Completed) */}
      <RoundedBox args={[1.2, 0.42, 0.02]} radius={0.02} smoothness={2} position={[1.5, 2.7, 0.04]}>
        <meshStandardMaterial color="#86efac" />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.42, 0.02]} radius={0.02} smoothness={2} position={[1.5, 2.1, 0.04]}>
        <meshStandardMaterial color="#86efac" />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.42, 0.02]} radius={0.02} smoothness={2} position={[1.5, 1.5, 0.04]}>
        <meshStandardMaterial color="#86efac" />
      </RoundedBox>

      {/* Chrome Base Legs */}
      <mesh position={[-2.2, 0.5, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[2.2, 0.5, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>

      {/* Floor Tag */}
      <FloorTag
        position={[0, 0.08, 0.8]}
        title="Kanban Wall"
        subtitle="Work Items • Active"
        active={true}
      />
    </group>
  )
}

/**
 * Security Turnstile: Chrome & Glowing Glass Access Gate at Foreground
 */
export function SecurityTurnstile({ position = [0.8, 0, 2.8] }) {
  return (
    <group position={position}>
      {/* Left Pedestal (Smooth Rounded Stainless Steel) */}
      <RoundedBox castShadow args={[0.36, 1.35, 1.1]} radius={0.06} smoothness={3} position={[-0.85, 0.68, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>
      {/* Glowing Scanner Strip */}
      <mesh position={[-0.85, 1.37, 0.25]}>
        <boxGeometry args={[0.22, 0.02, 0.35]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Right Pedestal (Smooth Rounded Stainless Steel) */}
      <RoundedBox castShadow args={[0.36, 1.35, 1.1]} radius={0.06} smoothness={3} position={[0.85, 0.68, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>
      {/* Glowing Scanner Strip */}
      <mesh position={[0.85, 1.37, 0.25]}>
        <boxGeometry args={[0.22, 0.02, 0.35]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Soft Glow light on the turnstile scanners */}
      <pointLight position={[0, 1.2, 0.2]} intensity={0.9} distance={2.5} color="#38bdf8" />

      {/* Glass Swing Paddle Wings */}
      <mesh position={[-0.34, 0.7, 0]}>
        <boxGeometry args={[0.62, 0.95, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.34, 0.7, 0]}>
        <boxGeometry args={[0.62, 0.95, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
          roughness={0.1}
        />
      </mesh>

      {/* Floor Tag */}
      <FloorTag
        position={[0, 0.08, 1.2]}
        title="Security Gate"
        subtitle="Access Control"
        active={false}
      />
    </group>
  )
}

/**
 * Glass Entrance Door (Right side partition)
 */
export function GlassEntryDoor({ position = [7.2, 0, 0] }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      {/* Right Wall Framing */}
      <mesh castShadow position={[0, 1.8, 0]}>
        <boxGeometry args={[3.2, 3.8, 0.06]} />
        <meshStandardMaterial
          color="#e0f2fe"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>
      {/* Stainless Steel Frame Header */}
      <mesh position={[0, 3.75, 0]}>
        <boxGeometry args={[3.3, 0.12, 0.14]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.15, 1.8, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 1.4, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[0.15, 1.8, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 1.4, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
    </group>
  )
}
