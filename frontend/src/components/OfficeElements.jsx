import React from 'react'
import { RoundedBox, Billboard, Text } from '@react-three/drei'

/**
 * 6. Floating UI Badge (Always-facing Billboard Pill Overlay)
 * Minimalist tech modern, white pill shape, drop shadow, status dot, neat text.
 * Pure WebGL Billboard - 100% immune to React 19 createRoot DOM unmount bugs!
 */
export function FloatingBadge({ position, text, dotColor = '#0284c7' }) {
  const width = text.length * 0.11 + 0.55

  return (
    <Billboard position={position} follow={true}>
      {/* White Pill Background */}
      <RoundedBox args={[width, 0.36, 0.03]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
      </RoundedBox>
      {/* Glowing Status Dot */}
      <mesh position={[-width / 2 + 0.2, 0, 0.025]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={dotColor} emissive={dotColor} emissiveIntensity={2.0} />
      </mesh>
      {/* Text Label */}
      <Text
        position={[0.08, 0, 0.025]}
        fontSize={0.13}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Billboard>
  )
}

/**
 * 3. Komponen Ruangan Diorama (Isometric Office):
 * - Lantai slab tebal putih glossy dengan list bawah kayu/cokelat.
 * - Partisi dinding kaca semi-transparan / frosted glass menggunakan MeshPhysicalMaterial (transmission: 0.9, roughness: 0.1, transparent: true).
 */
export function DioramaRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* List / Skirting Bawah Kayu / Cokelat Tebal */}
      <RoundedBox
        receiveShadow
        args={[18.2, 0.35, 14.2]}
        radius={0.12}
        smoothness={4}
        position={[0, -0.38, 0]}
      >
        <meshStandardMaterial color="#8b5a2b" roughness={0.4} metalness={0.05} />
      </RoundedBox>

      {/* Lantai Slab Tebal Putih Glossy */}
      <RoundedBox
        receiveShadow
        args={[18, 0.45, 14]}
        radius={0.15}
        smoothness={4}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.02}
        />
      </RoundedBox>

      {/* Garis Grid Minimalis di Atas Slab Lantai */}
      <gridHelper args={[17, 17, '#e2e8f0', '#f1f5f9']} position={[0, 0.185, 0]} />

      {/* Dinding Belakang Putih Minimalis */}
      <group position={[0, 3.2, -6.8]}>
        <RoundedBox
          receiveShadow
          castShadow
          args={[18, 6.0, 0.35]}
          radius={0.05}
          smoothness={3}
        >
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </RoundedBox>
        {/* Lis bawah dinding kayu */}
        <mesh position={[0, -2.85, 0.2]}>
          <boxGeometry args={[18, 0.3, 0.05]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.4} />
        </mesh>
      </group>

      {/* Dinding Kiri Putih Penutup Sudut Vault */}
      <group position={[-8.8, 3.2, 0]}>
        <RoundedBox
          receiveShadow
          castShadow
          args={[0.35, 6.0, 14]}
          radius={0.05}
          smoothness={3}
        >
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </RoundedBox>
        {/* Lis bawah dinding kayu */}
        <mesh position={[0.2, -2.85, 0]}>
          <boxGeometry args={[0.05, 0.3, 14]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.4} />
        </mesh>
      </group>

      {/* Partisi Dinding Kaca Semi-Transparan / Frosted Glass (MeshPhysicalMaterial) */}
      <group position={[1.5, 2.0, -1.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.08, 3.6, 6.0]} />
          <meshPhysicalMaterial
            transmission={0.9}
            roughness={0.1}
            transparent={true}
            thickness={0.5}
            ior={1.45}
            color="#e0f2fe"
          />
        </mesh>
        {/* Bingkai Stainless Steel Partisi Kaca */}
        <mesh position={[0, 1.82, 0]}>
          <boxGeometry args={[0.12, 0.06, 6.0]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.82, 0]}>
          <boxGeometry args={[0.12, 0.06, 6.0]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Bayangan Halus di Bawah Platform Slab */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 18]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

/**
 * 4. Meja Kerja Kayu Modern dengan Kaki Metal, Dual Monitor Coding, Mini Keyboard, Kursi Ergonomis
 */
export function ModernDeskWorkstation({ position = [-4.0, 0.18, 0.5], isTyping = true }) {
  return (
    <group position={position}>
      {/* Daun Meja Kayu Modern */}
      <RoundedBox
        castShadow
        receiveShadow
        args={[3.4, 0.12, 1.5]}
        radius={0.04}
        smoothness={4}
        position={[0, 1.05, 0]}
      >
        <meshStandardMaterial color="#8b5e3c" roughness={0.3} metalness={0.05} />
      </RoundedBox>

      {/* Kaki Meja Metal Stainless / Matte Steel */}
      <mesh castShadow position={[-1.5, 0.52, 0]}>
        <boxGeometry args={[0.08, 0.95, 1.3]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[1.5, 0.52, 0]}>
        <boxGeometry args={[0.08, 0.95, 1.3]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Laci kayu samping */}
      <RoundedBox
        castShadow
        args={[0.8, 0.9, 1.2]}
        radius={0.04}
        smoothness={3}
        position={[-1.0, 0.52, 0]}
      >
        <meshStandardMaterial color="#6f4528" roughness={0.4} />
      </RoundedBox>

      {/* Dual Curved Monitor (Tampilan Coding / Terminal) */}
      {/* Monitor 1 (Kiri) */}
      <group position={[-0.75, 1.6, -0.25]} rotation={[0, 0.18, 0]}>
        <RoundedBox castShadow args={[1.35, 0.75, 0.06]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        {/* Layar Terminal Biru / Coding */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.28, 0.68]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00f3ff"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Dudukan Monitor Metal */}
        <mesh position={[0, -0.42, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Monitor 2 (Kanan) */}
      <group position={[0.7, 1.6, -0.25]} rotation={[0, -0.18, 0]}>
        <RoundedBox castShadow args={[1.35, 0.75, 0.06]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        {/* Layar Terminal Coding */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.28, 0.68]} />
          <meshStandardMaterial
            color="#0369a1"
            emissive="#38bdf8"
            emissiveIntensity={0.7}
          />
        </mesh>
        {/* Dudukan Monitor Metal */}
        <mesh position={[0, -0.42, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Cahaya Pendar Layar ke Meja */}
      <pointLight position={[0, 1.35, 0.1]} intensity={0.9} distance={2.5} color="#38bdf8" />

      {/* Keyboard Mini & Mousepad */}
      <RoundedBox args={[0.85, 0.02, 0.28]} radius={0.01} smoothness={2} position={[0, 1.12, 0.22]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.025, 0.16]} radius={0.02} smoothness={2} position={[0.62, 1.12, 0.22]}>
        <meshStandardMaterial color="#0284c7" />
      </RoundedBox>

      {/* Tanaman Hias Pot Kecil di Sudut Meja */}
      <group position={[-1.35, 1.15, 0.35]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.09, 0.07, 0.16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
      </group>

      {/* Kursi Kantor Ergonomis Putih Modern */}
      <group position={[0, 0, 0.95]} rotation={[0, Math.PI, 0]}>
        {/* Dudukan */}
        <RoundedBox castShadow args={[0.8, 0.08, 0.75]} radius={0.04} smoothness={3} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </RoundedBox>
        {/* Sandaran Punggung */}
        <RoundedBox castShadow args={[0.75, 0.85, 0.08]} radius={0.04} smoothness={3} position={[0, 1.25, -0.34]}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </RoundedBox>
        {/* Sandaran Tangan */}
        <mesh position={[-0.38, 0.98, -0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} />
        </mesh>
        <mesh position={[0.38, 0.98, -0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} />
        </mesh>
        {/* Tiang Tengah & Roda Bintang Metal */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.7, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* 6. Floating UI Badge */}
      <FloatingBadge
        position={[0, 2.5, -0.2]}
        text="Desk 01 • Active Compute"
        dotColor="#0284c7"
      />
    </group>
  )
}

/**
 * 4. Brankas (Vault) Baja Silver Tebal dengan Pintu Semi-Terbuka
 */
export function VaultSafe({ position = [-6.2, 0.18, -4.5] }) {
  return (
    <group position={position}>
      {/* Bodi Brankas Baja Silver Tebal */}
      <RoundedBox
        castShadow
        args={[2.4, 3.2, 2.2]}
        radius={0.08}
        smoothness={4}
        position={[0, 1.6, 0]}
      >
        <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
      </RoundedBox>

      {/* Rongga Dalam Brankas */}
      <mesh position={[0.05, 1.6, 0.18]}>
        <boxGeometry args={[1.9, 2.7, 1.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Pintu Baja Semi-Terbuka */}
      <group position={[1.2, 1.6, 1.1]} rotation={[0, 0.95, 0]}>
        <RoundedBox castShadow args={[1.9, 2.9, 0.25]} radius={0.06} smoothness={3} position={[0.95, 0, 0]}>
          <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.2} />
        </RoundedBox>
        {/* Roda Putar Kunci Kombinasi */}
        <mesh position={[0.95, 0, 0.16]}>
          <torusGeometry args={[0.35, 0.05, 8, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </mesh>
      </group>

      {/* Rak Penyimpanan di Dalam Brankas */}
      {[-0.8, -0.2, 0.4, 1.0].map((y, i) => (
        <group key={i} position={[0.05, 1.6 + y, 0.2]}>
          <mesh>
            <boxGeometry args={[1.7, 0.35, 1.3]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Lampu Status Rak Menyala */}
          <mesh position={[-0.5, 0, 0.67]}>
            <boxGeometry args={[0.35, 0.06, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#00f3ff"
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

      {/* 6. Floating UI Badge */}
      <FloatingBadge
        position={[0, 3.5, 0]}
        text="Vault • Secure Storage"
        dotColor="#10b981"
      />
    </group>
  )
}

/**
 * 4. Papan Kanban Kaca Melayang dengan Partisi Kolom (Backlog, In Progress, Review, Done) & Kartu Tugas
 */
export function KanbanWall({ position = [4.2, 0.18, -4.5] }) {
  return (
    <group position={position}>
      {/* Bingkai Pendar Cyan Neon di Belakang */}
      <RoundedBox args={[5.2, 2.9, 0.04]} radius={0.06} smoothness={3} position={[0, 2.2, -0.04]}>
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={1.8}
        />
      </RoundedBox>

      {/* Cahaya Pendar Cyan ke Ruangan */}
      <pointLight position={[0, 2.2, 0.4]} intensity={2.0} distance={5} color="#38bdf8" />

      {/* Papan Kaca Melayang Depan */}
      <RoundedBox castShadow args={[5.0, 2.7, 0.05]} radius={0.05} smoothness={3} position={[0, 2.2, 0]}>
        <meshStandardMaterial
          color="#f0f9ff"
          transparent
          opacity={0.7}
          roughness={0.1}
        />
      </RoundedBox>

      {/* 4 Kolom: Backlog, In Progress, Review, Done */}
      {[
        { x: -1.8, label: 'Backlog', cards: ['#fed7aa', '#e2e8f0'] },
        { x: -0.6, label: 'In Progress', cards: ['#38bdf8', '#fef08a'] },
        { x: 0.6, label: 'Review', cards: ['#fbcfe8', '#cbd5e1'] },
        { x: 1.8, label: 'Done', cards: ['#86efac', '#86efac', '#86efac'] }
      ].map((col, idx) => (
        <group key={idx} position={[col.x, 2.2, 0.04]}>
          {/* Header Kolom */}
          <RoundedBox args={[1.1, 0.22, 0.02]} radius={0.02} smoothness={2} position={[0, 1.0, 0]}>
            <meshStandardMaterial color="#e2e8f0" />
          </RoundedBox>

          {/* Kartu Tugas Warna-warni Mini */}
          {col.cards.map((cColor, cIdx) => (
            <RoundedBox
              key={cIdx}
              args={[1.05, 0.42, 0.02]}
              radius={0.02}
              smoothness={2}
              position={[0, 0.5 - cIdx * 0.52, 0]}
            >
              <meshStandardMaterial color={cColor} roughness={0.3} />
            </RoundedBox>
          ))}
        </group>
      ))}

      {/* Kaki Penyangga Metal */}
      <mesh position={[-2.4, 0.5, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[2.4, 0.5, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.7]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>

      {/* 6. Floating UI Badge */}
      <FloatingBadge
        position={[0, 3.8, 0]}
        text="Kanban Wall • 12 Active"
        dotColor="#0284c7"
      />
    </group>
  )
}

/**
 * 3. Turnstile Security Gate Stainless Steel di Dekat Pintu Masuk
 */
export function SecurityTurnstile({ position = [0.8, 0.18, 2.8] }) {
  return (
    <group position={position}>
      {/* Tiang Kiri Stainless Steel */}
      <RoundedBox castShadow args={[0.38, 1.35, 1.1]} radius={0.06} smoothness={3} position={[-0.85, 0.68, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>
      {/* Strip Scanner Akses Cyan Menyala */}
      <mesh position={[-0.85, 1.37, 0.25]}>
        <boxGeometry args={[0.22, 0.02, 0.35]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Tiang Kanan Stainless Steel */}
      <RoundedBox castShadow args={[0.38, 1.35, 1.1]} radius={0.06} smoothness={3} position={[0.85, 0.68, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>
      {/* Strip Scanner Akses Cyan Menyala */}
      <mesh position={[0.85, 1.37, 0.25]}>
        <boxGeometry args={[0.22, 0.02, 0.35]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Pintu Sayap Kaca Swing */}
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

      {/* 6. Floating UI Badge */}
      <FloatingBadge
        position={[0, 1.85, 0]}
        text="Security Gate • Access Control"
        dotColor="#10b981"
      />
    </group>
  )
}

/**
 * 4. Tanaman Hias Pot Kecil di Sudut Lantai
 */
export function PottedPlant({ position = [7.5, 0.18, -5.5], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Pot Keramik Putih */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.7, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Tanah */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
        <meshStandardMaterial color="#422006" roughness={0.9} />
      </mesh>
      {/* Daun Hijau Rimbun */}
      <group position={[0, 0.9, 0]}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 0.2, 0.15 + (i % 2) * 0.15, Math.sin(rad) * 0.2]}
              rotation={[0.3 * Math.cos(rad), rad, 0.3 * Math.sin(rad)]}
            >
              <sphereGeometry args={[0.22, 8, 8]} />
              <meshStandardMaterial color="#16a34a" roughness={0.6} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
