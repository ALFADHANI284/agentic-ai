import React from 'react'
import { Html } from '@react-three/drei'

/**
 * 3D Floating Pill Tag (Exact replica of the reference labels)
 * e.g., "• Desk 01 / Active Compute", "• Kanban Wall / Work Items • Active"
 */
export function FloorTag({ position, title, subtitle, active = false }) {
  return (
    <Html
      position={position}
      center
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200/90 text-slate-700 whitespace-nowrap text-[10px] font-medium tracking-tight">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            active ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'
          }`}
        />
        <span className="font-semibold text-slate-900">{title}</span>
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
 * Raised Floating Clean White Podium Floor
 */
export function PodiumFloor() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Main Elevated Crisp White Diorama Platform */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[18, 0.3, 14]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Subtle floor perimeter bevel / trim */}
      <mesh position={[0, 0.051, 0]}>
        <boxGeometry args={[17.6, 0.01, 13.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.02} />
      </mesh>

      {/* Subtle Floor Grid lines (Clean architectural lines) */}
      <gridHelper args={[17, 17, '#e2e8f0', '#f1f5f9']} position={[0, 0.06, 0]} />

      {/* Drop Shadow Plane under the floating platform */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[21, 17]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

/**
 * Desk 01: Warm Walnut Dual Monitor Workstation with Ergonomic Chair
 */
export function Desk01({ position = [-4, 0, 0], active = true }) {
  return (
    <group position={position}>
      {/* Desk Surface (Warm Walnut Wood) */}
      <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[3.2, 0.1, 1.4]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.4} />
      </mesh>

      {/* Under-desk Storage Drawers (Left side) */}
      <mesh castShadow position={[-1.1, 0.52, 0]}>
        <boxGeometry args={[0.8, 0.95, 1.2]} />
        <meshStandardMaterial color="#6f4528" roughness={0.5} />
      </mesh>
      {/* Drawer handles */}
      {[-0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} position={[-1.1, 0.52 + y * 0.7, 0.61]}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      ))}

      {/* Right Metal Leg (Matte White/Chrome) */}
      <mesh castShadow position={[1.4, 0.52, 0]}>
        <boxGeometry args={[0.08, 0.95, 1.2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
      </mesh>

      {/* Dual Curved Ultra-wide Monitors */}
      {/* Monitor 1 (Left) */}
      <group position={[-0.7, 1.55, -0.25]} rotation={[0, 0.18, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.7, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen with Code Lines */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.24, 0.64, 0.01]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={active ? 0.7 : 0.2}
          />
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, -0.42, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Monitor 2 (Right) */}
      <group position={[0.65, 1.55, -0.25]} rotation={[0, -0.18, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.7, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.24, 0.64, 0.01]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0369a1"
            emissiveIntensity={active ? 0.6 : 0.2}
          />
        </mesh>
        <mesh position={[0, -0.42, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Keyboard & Mousepad */}
      <mesh position={[0, 1.11, 0.2]}>
        <boxGeometry args={[0.85, 0.02, 0.3]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      <mesh position={[0.6, 1.11, 0.2]}>
        <boxGeometry args={[0.1, 0.02, 0.16]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>

      {/* Mini Desk Plant */}
      <group position={[-1.3, 1.15, 0.3]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.09, 0.07, 0.16, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.11, 8, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
      </group>

      {/* White Ergonomic Office Chair */}
      <group position={[0, 0, 0.95]} rotation={[0, Math.PI, 0]}>
        {/* Seat */}
        <mesh castShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.75]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Backrest */}
        <mesh castShadow position={[0, 1.25, -0.34]}>
          <boxGeometry args={[0.75, 0.85, 0.08]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.38, 0.98, -0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.4]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0.38, 0.98, -0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.4]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        {/* Chrome Central Pole & Base */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.7, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 5]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Tag on floor */}
      <FloorTag
        position={[0, 0.1, 1.8]}
        title="Desk 01"
        subtitle="Active Compute"
        active={active}
      />
    </group>
  )
}

/**
 * Vault: Heavy Steel Open Safe with Compute Units
 */
export function VaultSafe({ position = [-6.5, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* Outer Safe Box (Brushed Metal) */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[2.2, 3.0, 2.0]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Safe Interior Hollow Cutout */}
      <mesh position={[0.05, 1.5, 0.15]}>
        <boxGeometry args={[1.8, 2.6, 1.7]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>

      {/* Open Heavy Door Swinging Out */}
      <group position={[1.1, 1.5, 1.0]} rotation={[0, 0.9, 0]}>
        <mesh castShadow position={[0.9, 0, 0]}>
          <boxGeometry args={[1.8, 2.8, 0.25]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Locking Bolts on Door */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <mesh key={i} position={[1.75, y, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Server Drive Bays inside Safe with Glowing LEDs */}
      {[-0.8, -0.2, 0.4, 0.9].map((y, i) => (
        <group key={i} position={[0.05, 1.5 + y, 0.2]}>
          <mesh>
            <boxGeometry args={[1.6, 0.35, 1.2]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[-0.5, 0, 0.61]}>
            <boxGeometry args={[0.3, 0.05, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[0.2, 0, 0.61]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Tag on floor */}
      <FloorTag
        position={[-0.5, 0.1, 1.6]}
        title="Vault"
        subtitle="Secure Storage"
        active={true}
      />
    </group>
  )
}

/**
 * Whiteboard: Standing Frosted Glass Planning Board
 */
export function GlassWhiteboard({ position = [-1.5, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* Vertical Glass Board */}
      <mesh castShadow position={[0, 1.8, 0]}>
        <boxGeometry args={[3.2, 2.0, 0.05]} />
        <meshStandardMaterial
          color="#f8fafc"
          transparent
          opacity={0.45}
          roughness={0.15}
        />
      </mesh>

      {/* Sleek Aluminum Frame */}
      <mesh position={[0, 2.82, 0]}>
        <boxGeometry args={[3.26, 0.06, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[3.26, 0.06, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      {/* Aluminum Stand Legs */}
      <mesh position={[-1.5, 0.4, 0]}>
        <boxGeometry args={[0.06, 0.8, 0.6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[1.5, 0.4, 0]}>
        <boxGeometry args={[0.06, 0.8, 0.6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {/* Idea / Planning Sketches & Sticky Notes on Board */}
      <mesh position={[-0.8, 2.1, 0.035]}>
        <boxGeometry args={[0.7, 0.5, 0.01]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0.2, 1.8, 0.035]}>
        <boxGeometry args={[0.6, 0.4, 0.01]} />
        <meshStandardMaterial color="#fef08a" />
      </mesh>
      <mesh position={[0.8, 2.2, 0.035]}>
        <boxGeometry args={[0.5, 0.5, 0.01]} />
        <meshStandardMaterial color="#fbcfe8" />
      </mesh>

      {/* Tag on floor */}
      <FloorTag
        position={[0, 0.1, 0.6]}
        title="Whiteboard"
        subtitle="Ideas & Planning"
        active={false}
      />
    </group>
  )
}

/**
 * Kanban Wall: Standing Glowing Work Items Board (Backlog, In Progress, Done)
 */
export function KanbanWall({ position = [3.8, 0, -4.5] }) {
  return (
    <group position={position}>
      {/* Glass Board Backing */}
      <mesh castShadow position={[0, 2.0, 0]}>
        <boxGeometry args={[4.4, 2.5, 0.06]} />
        <meshStandardMaterial
          color="#f0f9ff"
          transparent
          opacity={0.55}
          roughness={0.1}
        />
      </mesh>

      {/* Column Dividers & Header Headers (Backlog | In Progress | Done) */}
      {[-1.4, 0, 1.4].map((x, i) => (
        <group key={i} position={[x, 2.9, 0.04]}>
          <mesh>
            <boxGeometry args={[1.2, 0.22, 0.02]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        </group>
      ))}

      {/* Sticky Notes Cards (Backlog column) */}
      <mesh position={[-1.4, 2.4, 0.04]}>
        <boxGeometry args={[1.0, 0.4, 0.02]} />
        <meshStandardMaterial color="#fed7aa" />
      </mesh>
      <mesh position={[-1.4, 1.8, 0.04]}>
        <boxGeometry args={[1.0, 0.4, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* In Progress column (Active Blue & Yellow Notes) */}
      <mesh position={[0, 2.3, 0.04]}>
        <boxGeometry args={[1.0, 0.45, 0.02]} />
        <meshStandardMaterial color="#bae6fd" />
      </mesh>
      <mesh position={[0, 1.7, 0.04]}>
        <boxGeometry args={[1.0, 0.4, 0.02]} />
        <meshStandardMaterial color="#fef08a" />
      </mesh>

      {/* Done column (Green Notes) */}
      <mesh position={[1.4, 2.5, 0.04]}>
        <boxGeometry args={[1.0, 0.38, 0.02]} />
        <meshStandardMaterial color="#bbf7d0" />
      </mesh>
      <mesh position={[1.4, 2.0, 0.04]}>
        <boxGeometry args={[1.0, 0.38, 0.02]} />
        <meshStandardMaterial color="#bbf7d0" />
      </mesh>
      <mesh position={[1.4, 1.5, 0.04]}>
        <boxGeometry args={[1.0, 0.38, 0.02]} />
        <meshStandardMaterial color="#bbf7d0" />
      </mesh>

      {/* Chrome Base Legs */}
      <mesh position={[-2.1, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.8, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      <mesh position={[2.1, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.8, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>

      {/* Tag on floor */}
      <FloorTag
        position={[0, 0.1, 0.7]}
        title="Kanban Wall"
        subtitle="Work Items • Active"
        active={true}
      />
    </group>
  )
}

/**
 * Security Turnstile Gate: Chrome & Glass Access Control at the foreground
 */
export function SecurityTurnstile({ position = [0, 0, 2.5] }) {
  return (
    <group position={position}>
      {/* Left Pedestal (Brushed Stainless Steel) */}
      <mesh castShadow position={[-0.8, 0.65, 0]}>
        <boxGeometry args={[0.35, 1.3, 1.0]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Left Scanner Face */}
      <mesh position={[-0.8, 1.31, 0.2]}>
        <boxGeometry args={[0.2, 0.02, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Right Pedestal (Brushed Stainless Steel) */}
      <mesh castShadow position={[0.8, 0.65, 0]}>
        <boxGeometry args={[0.35, 1.3, 1.0]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Right Scanner Face */}
      <mesh position={[0.8, 1.31, 0.2]}>
        <boxGeometry args={[0.2, 0.02, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Glass Swing Paddle Doors (Clear Blue Tint Glass) */}
      <mesh position={[-0.32, 0.65, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.32, 0.65, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>

      {/* Tag on floor */}
      <FloorTag
        position={[0, 0.1, 1.2]}
        title="Security Gate"
        subtitle="Access Control"
        active={false}
      />
    </group>
  )
}

/**
 * Glass Entrance Door Frame (Right side entrance)
 */
export function GlassEntryDoor({ position = [7.2, 0, 0] }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      {/* Glass Door Panels */}
      <mesh castShadow position={[0, 1.8, 0]}>
        <boxGeometry args={[2.8, 3.6, 0.05]} />
        <meshStandardMaterial
          color="#e0f2fe"
          transparent
          opacity={0.35}
          roughness={0.1}
        />
      </mesh>
      {/* Door Metal Header & Frame */}
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[2.9, 0.1, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      {/* Vertical Metal Handles */}
      <mesh position={[-0.15, 1.8, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[0.15, 1.8, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
    </group>
  )
}
