import React from 'react'

/**
 * Minimalist Scandinavian / Modern Tech Office Environment
 * Palette: Light Oak wood (#d4a373 / #e9edc9), Warm Slate (#334155), Matte Black accents,
 * Clean whites (#f8fafc), Sage green plants (#10b981 / #059669), Soft Ambient Light.
 */

export function MinimalistFloor() {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Main Light Oak Wood Floor */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[20, 0.2, 16]} />
        <meshStandardMaterial color="#c8a882" roughness={0.65} metalness={0.05} />
      </mesh>

      {/* Parquet / Wood Planks Sub-grid */}
      <gridHelper args={[20, 20, '#b08968', '#dfc7af']} position={[0, 0.015, 0]} />

      {/* Zone 1: Executive / Approval Suite Rug (Minimalist Charcoal Slate) */}
      <mesh receiveShadow position={[5.5, 0.02, -2.5]}>
        <boxGeometry args={[5, 0.01, 5.5]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* Zone 2: Tech Radar & Sales Coworking Rug (Warm Cream Minimalist) */}
      <mesh receiveShadow position={[-2.5, 0.02, -2.5]}>
        <boxGeometry args={[9, 0.01, 5.5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.85} />
      </mesh>

      {/* Zone 3: Lounge / Coffee Corner Rug (Muted Sage Green) */}
      <mesh receiveShadow position={[-6, 0.02, 3.5]}>
        <boxGeometry args={[5.5, 0.01, 5]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Back Architectural Wall (Off-White Matte) */}
      <mesh position={[0, 3, -8]}>
        <boxGeometry args={[20, 6, 0.3]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.6} />
      </mesh>

      {/* Left Wall with Window Cutout Effect */}
      <mesh position={[-10, 3, 0]}>
        <boxGeometry args={[0.3, 6, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>

      {/* Floor Baseboards */}
      <mesh position={[0, 0.15, -7.8]}>
        <boxGeometry args={[19.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[-9.8, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 15.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Minimalist Frosted Glass Partition between Executive & Bullpen */}
      <group position={[2.6, 1.8, -2.5]}>
        <mesh>
          <boxGeometry args={[0.08, 3.2, 5.5]} />
          <meshStandardMaterial
            color="#e2e8f0"
            transparent
            opacity={0.3}
            roughness={0.1}
          />
        </mesh>
        {/* Metal Glass Framing */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.12, 0.06, 5.5]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[0.12, 0.06, 5.5]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  )
}

export function MinimalistDesk({
  position,
  rotation = [0, 0, 0],
  label,
  screenColor = '#38bdf8',
  isBusy = false,
  deskType = 'wood'
}) {
  const topColor = deskType === 'executive' ? '#1e293b' : '#ede0d4'

  return (
    <group position={position} rotation={rotation}>
      {/* Desk Surface (Clean Chamfered Minimalist Top) */}
      <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        <meshStandardMaterial color={topColor} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Sleek Trestle / Square Metal Legs (Matte Black) */}
      <mesh castShadow position={[-1.25, 0.58, 0]}>
        <boxGeometry args={[0.08, 1.15, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[1.25, 0.58, 0]}>
        <boxGeometry args={[0.08, 1.15, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* Ultra-slim Minimalist Display */}
      <group position={[0, 1.65, -0.35]}>
        {/* Display Back Chassis */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.85, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glowing Screen Glass */}
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[1.54, 0.79, 0.01]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={screenColor}
            emissiveIntensity={isBusy ? 1.6 : 0.7}
          />
        </mesh>
        {/* Aluminum Stand */}
        <mesh position={[0, -0.35, -0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.3]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Sleek Minimalist Laptop */}
      <group position={[-0.85, 1.2, -0.1]} rotation={[0, 0.25, 0]}>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.55, 0.02, 0.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.18, -0.19]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.55, 0.38, 0.015]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.18, -0.18]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.51, 0.34, 0.01]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Slim Keyboard & Ceramic Mug */}
      <mesh position={[0, 1.2, 0.18]}>
        <boxGeometry args={[0.9, 0.015, 0.28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Minimalist Ceramic Mug */}
      <group position={[0.75, 1.25, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.07, 0.14, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      </group>

      {/* Ergonomic Scandinavian Task Chair */}
      <group position={[0, 0, 0.75]}>
        {/* Fabric Cushion Seat */}
        <mesh castShadow position={[0, 0.78, 0]}>
          <boxGeometry args={[0.75, 0.08, 0.7]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Contoured Backrest */}
        <mesh castShadow position={[0, 1.25, 0.32]}>
          <boxGeometry args={[0.7, 0.8, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Metal Spine & 5-Star Base */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.75, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 5]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  )
}

export function MinimalistLounge({ position }) {
  return (
    <group position={position}>
      {/* Modern 2-Seater Sofa (Muted Sage Grey) */}
      <group position={[0, 0, 0]}>
        {/* Base Seat */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[2.4, 0.35, 1.1]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Backrest Cushion */}
        <mesh castShadow position={[0, 0.9, -0.42]}>
          <boxGeometry args={[2.4, 0.65, 0.28]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        {/* Left Armrest */}
        <mesh castShadow position={[-1.25, 0.68, 0]}>
          <boxGeometry args={[0.2, 0.45, 1.1]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Right Armrest */}
        <mesh castShadow position={[1.25, 0.68, 0]}>
          <boxGeometry args={[0.2, 0.45, 1.1]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Wooden Peg Legs */}
        {[-1.1, 1.1].map((x) =>
          [-0.4, 0.4].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.15, z]}>
              <cylinderGeometry args={[0.03, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#c8a882" roughness={0.5} />
            </mesh>
          ))
        )}
      </group>

      {/* Round Wooden Minimalist Coffee Table */}
      <group position={[0, 0, 1.5]}>
        <mesh castShadow position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
          <meshStandardMaterial color="#ede0d4" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.42, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Ceramic Plant or Carafe on Table */}
        <mesh position={[0.2, 0.5, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.15, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export function MinimalistPlant({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Matte White Ceramic Planter */}
      <mesh castShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.25, 0.9, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color="#3e2723" roughness={0.9} />
      </mesh>
      {/* Minimalist Fiddle Leaf / Monstera Leaves */}
      <group position={[0, 1.1, 0]}>
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 0.25, 0.2 + (i % 2) * 0.2, Math.sin(rad) * 0.25]}
              rotation={[0.3 * Math.cos(rad), rad, 0.3 * Math.sin(rad)]}
            >
              <sphereGeometry args={[0.28, 8, 8]} />
              <meshStandardMaterial color="#059669" roughness={0.6} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export function ModernServerTower({ position }) {
  return (
    <group position={position}>
      {/* Sleek Minimalist Matte Obsidian AI Compute Tower (Cubi / Mac Pro style) */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[0.8, 2.8, 0.8]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Subtle LED Status Slits */}
      {[0.8, 1.2, 1.6, 2.0, 2.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0.41]}>
          <boxGeometry args={[0.5, 0.03, 0.02]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
