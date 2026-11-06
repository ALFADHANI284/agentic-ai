import React, { useRef } from 'react'
import { RoundedBox, Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating UI Badge (WebGL Billboard Pill)
 */
export function FloatingBadge({ position, text, dotColor = '#0284c7' }) {
  const width = Math.max(1.2, text.length * 0.092 + 0.55)

  return (
    <Billboard position={position} follow={true}>
      <RoundedBox args={[width, 0.32, 0.03]} radius={0.14} smoothness={4}>
        <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.05} />
      </RoundedBox>
      <mesh position={[-width / 2 + 0.18, 0, 0.025]}>
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshStandardMaterial color={dotColor} emissive={dotColor} emissiveIntensity={2.5} />
      </mesh>
      <Text
        position={[0.08, 0, 0.025]}
        fontSize={0.115}
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
 * 1. DIORAMA ROOM: Lantai Parquet & Porcelain Mewah, Dinding Arsitektur, Panoramic Window
 */
export function DioramaRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Skirting / Lis Bawah Kayu Walnut Gelap */}
      <RoundedBox
        receiveShadow
        args={[19.4, 0.42, 15.4]}
        radius={0.14}
        smoothness={4}
        position={[0, -0.42, 0]}
      >
        <meshStandardMaterial color="#2d1a10" roughness={0.5} />
      </RoundedBox>

      {/* Slab Lantai Utama Putih Glossy Porcelain */}
      <RoundedBox
        receiveShadow
        args={[19.2, 0.46, 15.2]}
        radius={0.14}
        smoothness={4}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.04} />
      </RoundedBox>

      {/* Lantai Parquet Kayu Hangat untuk Zona Eksekutif & Kerja */}
      <mesh receiveShadow position={[-3.0, 0.182, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.6, 13.6]} />
        <meshStandardMaterial color="#d8c5ad" roughness={0.42} />
      </mesh>

      {/* Strip Inlay Kuningan Pembatas Zona Kayu & Porcelain */}
      <mesh position={[2.8, 0.184, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 13.6]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Grid Garis Lantai Minimalis Presisi di Area Porcelain */}
      <gridHelper args={[18, 18, '#cbd5e1', '#e2e8f0']} position={[0, 0.186, 0]} />

      {/* Dinding Belakang Modern Minimalis dengan Panel Akustik */}
      <group position={[0, 3.4, -7.3]}>
        <RoundedBox receiveShadow castShadow args={[19, 6.4, 0.38]} radius={0.06} smoothness={3}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.35} />
        </RoundedBox>

        {/* Lis Bawah Kayu Dinding Belakang */}
        <mesh position={[0, -3.05, 0.22]}>
          <boxGeometry args={[19, 0.3, 0.06]} />
          <meshStandardMaterial color="#3e2723" roughness={0.5} />
        </mesh>

        {/* Logo Dinding 3D Illuminated: NUSANTARA MOTOR DIGITAL HUB */}
        <Billboard position={[0, 2.2, 0.25]} follow={false}>
          <Text
            fontSize={0.36}
            color="#0f172a"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            MSI CUBI NUC • SALES INTELLIGENCE HUB
          </Text>
          <Text
            position={[0, -0.34, 0]}
            fontSize={0.15}
            color="#0284c7"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            LOCAL-FIRST AGENTIC AI APPLIANCE • B206 ARCHITECTURE
          </Text>
        </Billboard>

        {/* Strip LED Cahaya Biru Futuristik di Dinding */}
        <mesh position={[0, 2.7, 0.2]}>
          <boxGeometry args={[16, 0.04, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.2} />
        </mesh>

        {/* Slat Aksen Kayu Vertikal di Dinding Kanan */}
        {[-2.5, -1.8, -1.1, -0.4, 0.3, 1.0, 1.7, 2.4].map((x, i) => (
          <mesh key={i} position={[5.5 + x, 0.4, 0.21]}>
            <boxGeometry args={[0.08, 3.2, 0.02]} />
            <meshStandardMaterial color="#a16207" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Dinding Kiri dengan Jendela Kaca Panoramik */}
      <group position={[-9.3, 3.4, 0]}>
        <RoundedBox receiveShadow castShadow args={[0.38, 6.4, 15]} radius={0.06} smoothness={3}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </RoundedBox>

        {/* Kaca Panoramik Transparan */}
        <mesh position={[0.22, 0.5, 0]}>
          <boxGeometry args={[0.06, 3.8, 12]} />
          <meshPhysicalMaterial
            transmission={0.88}
            roughness={0.1}
            transparent={true}
            color="#bae6fd"
          />
        </mesh>

        {/* Latar Belakang Gedung Kota Modern di Balik Kaca */}
        <group position={[-0.2, 0.5, 0]}>
          <mesh position={[0, 0, -3]}>
            <boxGeometry args={[0.1, 5.0, 2.4]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <boxGeometry args={[0.1, 3.8, 2.8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.4, 3.2]}>
            <boxGeometry args={[0.1, 4.6, 2.2]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
          </mesh>
        </group>

        {/* Kusen Jendela Horizontal */}
        {[-1.2, 0.5, 2.2].map((y, i) => (
          <mesh key={i} position={[0.24, y, 0]}>
            <boxGeometry args={[0.08, 0.08, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Partisi Kaca Frosted Pemisah Zona Meeting/Gate */}
      <group position={[1.8, 2.0, -1.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.08, 3.6, 6.2]} />
          <meshPhysicalMaterial
            transmission={0.92}
            roughness={0.15}
            transparent={true}
            thickness={0.5}
            ior={1.5}
            color="#e0f2fe"
          />
        </mesh>
        {/* Bingkai Stainless Steel Partisi */}
        <mesh position={[0, 1.82, 0]}>
          <boxGeometry args={[0.12, 0.06, 6.2]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.82, 0]}>
          <boxGeometry args={[0.12, 0.06, 6.2]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Bayangan Halus di Bawah Platform Slab */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[23, 19]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

/**
 * 2. EXECUTIVE BOSS SUITE: Meja Eksekutif Kayu Walnut, Nameplate 3D, Monitor Ultrawide, Kursi Kulit
 */
export function ExecutiveBossSuite({
  position = [-5.2, 0.18, 2.0],
  bossName = 'Pak Alfa',
  bossRole = 'Sales Director'
}) {
  return (
    <group position={position}>
      {/* Floating Badge */}
      <FloatingBadge
        position={[0, 2.3, 0]}
        text={`Office • ${bossName} (${bossRole})`}
        dotColor="#f59e0b"
      />

      {/* Karpet Mewah Eksekutif */}
      <mesh receiveShadow position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 2.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.55, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} />
      </mesh>

      {/* Meja Eksekutif Curved Kayu Walnut */}
      <group position={[0, 0, 0]}>
        {/* Daun Meja Melengkung Mewah */}
        <RoundedBox
          castShadow
          receiveShadow
          args={[2.4, 0.12, 1.1]}
          radius={0.05}
          smoothness={4}
          position={[0, 0.76, 0]}
        >
          <meshStandardMaterial color="#451a03" roughness={0.3} metalness={0.1} />
        </RoundedBox>

        {/* Panel Depan Meja (Modesty Panel) dengan Aksen Kuningan */}
        <mesh position={[0, 0.4, 0.48]} castShadow>
          <boxGeometry args={[2.2, 0.65, 0.05]} />
          <meshStandardMaterial color="#2d1305" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0.51]}>
          <boxGeometry args={[1.8, 0.02, 0.02]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Kaki Kiri & Kanan Meja Tebal */}
        <mesh position={[-1.05, 0.38, 0]} castShadow>
          <boxGeometry args={[0.15, 0.72, 0.9]} />
          <meshStandardMaterial color="#2d1305" roughness={0.4} />
        </mesh>
        <mesh position={[1.05, 0.38, 0]} castShadow>
          <boxGeometry args={[0.15, 0.72, 0.9]} />
          <meshStandardMaterial color="#2d1305" roughness={0.4} />
        </mesh>

        {/* Papan Nama Meja 3D Akrilik & Kuningan Dinamis (Menampilkan Nama Bos Asli!) */}
        <group position={[0.65, 0.85, 0.3]} rotation={[0, -0.25, 0]}>
          {/* Base Akrilik Kaca */}
          <RoundedBox args={[0.82, 0.14, 0.2]} radius={0.02} smoothness={3}>
            <meshPhysicalMaterial
              transmission={0.8}
              roughness={0.1}
              color="#ffffff"
              transparent
            />
          </RoundedBox>
          {/* Plat Kuningan Emas */}
          <mesh position={[0, 0.01, 0.09]}>
            <boxGeometry args={[0.76, 0.1, 0.01]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
          </mesh>
          <Billboard position={[0, 0.02, 0.1]}>
            <Text fontSize={0.046} color="#451a03" anchorX="center" anchorY="middle" font="">
              {bossName.toUpperCase()}
            </Text>
            <Text position={[0, -0.025, 0]} fontSize={0.028} color="#78350f" anchorX="center" anchorY="middle" font="">
              {bossRole.toUpperCase()}
            </Text>
          </Billboard>
        </group>

        {/* Monitor Ultrawide Lengkung Eksekutif */}
        <group position={[-0.2, 0.82, 0.2]}>
          <mesh castShadow position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.24, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 24]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          {/* Layar Ultrawide Curved */}
          <RoundedBox
            position={[0, 0.38, 0]}
            args={[1.3, 0.45, 0.05]}
            radius={0.02}
            smoothness={3}
            castShadow
          >
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          {/* Tampilan Visual Grafik Dashboard Penjualan di Layar */}
          <mesh position={[0, 0.38, 0.028]}>
            <planeGeometry args={[1.25, 0.4]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#0369a1"
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Lampu Meja Emas Klasik Modern dengan Cahaya Hangat */}
        <group position={[-0.9, 0.82, 0.25]}>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.32, 12]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <coneGeometry args={[0.12, 0.1, 16]} />
            <meshStandardMaterial color="#047857" roughness={0.3} />
          </mesh>
          <pointLight position={[0, 0.3, 0]} intensity={0.65} distance={2.0} color="#fef08a" />
        </group>

        {/* Cangkir Kopi Keramik Bos */}
        <group position={[0.4, 0.84, 0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.09, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>

        {/* Piala Emas Penghargaan Prestasi Dealer */}
        <group position={[-0.95, 0.83, -0.3]}>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.06, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <coneGeometry args={[0.08, 0.14, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* Kursi Putar Eksekutif Kulit Mewah */}
      <group position={[0, 0.18, -0.65]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        {/* 5 Roda Bawah Kursi */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.03, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Bantalan Duduk Kulit Hitam */}
        <RoundedBox
          args={[0.6, 0.1, 0.55]}
          radius={0.04}
          smoothness={3}
          position={[0, 0.35, 0]}
          castShadow
        >
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </RoundedBox>
        {/* Sandaran Punggung Tinggi */}
        <RoundedBox
          args={[0.55, 0.7, 0.08]}
          radius={0.04}
          smoothness={3}
          position={[0, 0.72, -0.24]}
          rotation={[-0.1, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </RoundedBox>
        {/* Sandaran Kepala */}
        <RoundedBox
          args={[0.35, 0.2, 0.08]}
          radius={0.04}
          smoothness={3}
          position={[0, 1.12, -0.28]}
          castShadow
        >
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </RoundedBox>
      </group>
    </group>
  )
}

/**
 * 3. MODERN WORKSTATION DESK: Dual Monitor Coding, Mechanical Keyboard, MSI Cubi NUC Mini PC
 */
export function ModernDeskWorkstation({ position = [-2.8, 0.18, 0.8], isTyping = true }) {
  const ledRef = useRef()

  useFrame((state) => {
    if (ledRef.current) {
      const t = state.clock.getElapsedTime()
      ledRef.current.material.emissiveIntensity = 2.0 + Math.sin(t * 4) * 0.8
    }
  })

  return (
    <group position={position}>
      {/* Floating Badge */}
      <FloatingBadge position={[0, 2.2, 0]} text="Workstation • Compute Core" dotColor="#0284c7" />

      {/* Daun Meja Kayu Oak Terang Modern */}
      <RoundedBox
        castShadow
        receiveShadow
        args={[2.4, 0.08, 1.1]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.74, 0]}
      >
        <meshStandardMaterial color="#fef08a" roughness={0.4} />
      </RoundedBox>

      {/* Kaki Meja Metal Putih Minimalis */}
      <mesh position={[-1.1, 0.37, 0.45]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.74, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 0.37, 0.45]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.74, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[-1.1, 0.37, -0.45]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.74, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 0.37, -0.45]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.74, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Unit Mini-PC MSI Cubi NUC AI+ B206 Terpasang di Atas Meja! */}
      <group position={[0.85, 0.81, 0.25]}>
        {/* Kotak Mini PC Cubi */}
        <RoundedBox args={[0.26, 0.08, 0.26]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
        </RoundedBox>
        {/* Power LED Ring Ikonik MSI Cubi NUC (Menyala Biru Neon) */}
        <mesh ref={ledRef} position={[0.07, 0.042, 0.07]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.015, 0.025, 16]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3.0} />
        </mesh>
        {/* Badge MSI Mini */}
        <mesh position={[-0.04, 0.042, 0]}>
          <planeGeometry args={[0.08, 0.02]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        {/* Port USB Depan */}
        <mesh position={[0, 0, 0.132]}>
          <boxGeometry args={[0.12, 0.02, 0.005]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
      </group>

      {/* Dual Monitor Coding Setup */}
      {/* Monitor Kiri (Kode & Log) */}
      <group position={[-0.42, 0.78, 0.15]} rotation={[0, 0.12, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.015, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <RoundedBox position={[0, 0.34, 0]} args={[0.72, 0.44, 0.03]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        {/* Screen Visual Matrix Code */}
        <mesh position={[0, 0.34, 0.018]}>
          <planeGeometry args={[0.68, 0.4]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.85} />
        </mesh>
      </group>

      {/* Monitor Kanan (Katalog & Stock Monitor) */}
      <group position={[0.35, 0.78, 0.15]} rotation={[0, -0.12, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.015, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <RoundedBox position={[0, 0.34, 0]} args={[0.72, 0.44, 0.03]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        {/* Screen Visual Graph */}
        <mesh position={[0, 0.34, 0.018]}>
          <planeGeometry args={[0.68, 0.4]} />
          <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.85} />
        </mesh>
      </group>

      {/* Keyboard Mekanikal Mini & Mousepad */}
      <mesh position={[0, 0.785, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.38]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <RoundedBox position={[-0.08, 0.795, 0.36]} args={[0.42, 0.02, 0.15]} radius={0.01}>
        <meshStandardMaterial color="#0f172a" roughness={0.3} />
      </RoundedBox>
      {/* Mouse Ergonomis */}
      <RoundedBox position={[0.26, 0.795, 0.36]} args={[0.07, 0.025, 0.11]} radius={0.02}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </RoundedBox>

      {/* Kursi Ergonomis Mesh Modern */}
      <group position={[0, 0.18, 0.85]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        <RoundedBox position={[0, 0.3, 0]} args={[0.5, 0.07, 0.48]} radius={0.03}>
          <meshStandardMaterial color="#0284c7" roughness={0.5} />
        </RoundedBox>
        <RoundedBox position={[0, 0.65, 0.2]} args={[0.46, 0.55, 0.05]} radius={0.03}>
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </RoundedBox>
      </group>
    </group>
  )
}

/**
 * 4. MSI CUBI NUC SERVER CLUSTER & REINFORCED DATA VAULT
 */
export function MsiCubiServerClusterAndVault({ position = [-5.6, 0.18, -4.2] }) {
  const ledRef = useRef()

  useFrame((state) => {
    if (ledRef.current) {
      const t = state.clock.getElapsedTime()
      ledRef.current.intensity = 1.0 + Math.sin(t * 8) * 0.4
    }
  })

  return (
    <group position={position}>
      {/* Floating Badge */}
      <FloatingBadge position={[0, 2.5, 0]} text="Vault & Cubi Server Cluster" dotColor="#ea580c" />

      {/* Rak Server Kabinet Hitam dengan Pintu Kaca */}
      <group position={[1.4, 0, 0]}>
        <RoundedBox args={[1.1, 2.3, 0.9]} radius={0.04} smoothness={3} position={[0, 1.15, 0]}>
          <meshStandardMaterial color="#0b0f19" roughness={0.2} metalness={0.8} />
        </RoundedBox>

        {/* Pintu Kaca Depan Rak Server */}
        <mesh position={[0, 1.15, 0.46]}>
          <boxGeometry args={[0.98, 2.15, 0.02]} />
          <meshPhysicalMaterial transmission={0.7} roughness={0.1} color="#38bdf8" transparent />
        </mesh>

        {/* Stack 4 Unit MSI Cubi NUC di Dalam Rak */}
        {[0.45, 0.9, 1.35, 1.8].map((y, idx) => (
          <group key={idx} position={[0, y, 0.15]}>
            <RoundedBox args={[0.75, 0.16, 0.55]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            {/* Blinking LEDs Array */}
            <mesh position={[-0.24, 0, 0.28]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#38bdf8' : '#22c55e'}
                emissive={idx % 2 === 0 ? '#38bdf8' : '#22c55e'}
                emissiveIntensity={3.0}
              />
            </mesh>
            <mesh position={[-0.16, 0, 0.28]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.5} />
            </mesh>
          </group>
        ))}
        <pointLight ref={ledRef} position={[0, 1.2, 0.6]} color="#38bdf8" intensity={1.2} distance={3.0} />
      </group>

      {/* Brankas Baja Tebal (Vault Safe) */}
      <group position={[-0.6, 0, 0]}>
        <RoundedBox args={[1.5, 1.8, 1.4]} radius={0.06} smoothness={4} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.2} />
        </RoundedBox>

        {/* Pintu Brankas Baja Semi-Terbuka */}
        <group position={[0.75, 0.9, 0.7]} rotation={[0, 0.5, 0]}>
          <RoundedBox args={[1.4, 1.7, 0.18]} radius={0.04} smoothness={3} position={[-0.7, 0, 0]}>
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
          </RoundedBox>

          {/* Roda Pemutar Kunci Baja Tebal */}
          <mesh position={[-0.7, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.04, 16, 32]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Keypad Digital dengan Glow Hijau */}
          <mesh position={[-0.7, 0.45, 0.1]}>
            <boxGeometry args={[0.18, 0.25, 0.02]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.0} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/**
 * 5. KANBAN GLASS WALL: Papan Transparan dengan Real Dynamic Cards sesuai data Leads BE
 */
export function KanbanGlassBoard({
  position = [4.0, 0.18, -4.2],
  leads = [],
  activeLead = null,
  pitchResult = null
}) {
  // Sort leads secara dinamis ke dalam 4 kolom
  const backlogLeads = leads
    .filter((l) => l.status_kontak === 'pending' && l.id_lead !== activeLead?.id_lead)
    .slice(0, 2)

  const researchLeads = activeLead && !pitchResult ? [activeLead] : []
  const pitchReadyLeads = pitchResult && activeLead ? [activeLead] : []
  const dispatchedLeads = leads
    .filter((l) => l.status_kontak === 'dispatched' || l.status_kontak === 'approved')
    .slice(0, 2)

  return (
    <group position={position}>
      {/* Floating Badge */}
      <FloatingBadge position={[0, 2.5, 0]} text="Kanban Wall • Sales Pipeline" dotColor="#9333ea" />

      {/* Tiang Penyangga Stainless Steel */}
      <mesh position={[-1.75, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[1.75, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Papan Kaca Frosted Besar */}
      <RoundedBox args={[3.7, 1.85, 0.06]} radius={0.04} smoothness={4} position={[0, 1.25, 0]}>
        <meshPhysicalMaterial
          transmission={0.88}
          roughness={0.2}
          transparent={true}
          thickness={0.3}
          color="#f8fafc"
        />
      </RoundedBox>

      {/* Header Kolom Kanban Teks */}
      <Billboard position={[0, 1.95, 0.04]} follow={false}>
        <Text fontSize={0.105} color="#0f172a" anchorX="center" anchorY="middle">
          BACKLOG        |    IN RESEARCH    |    PITCH READY    |    DISPATCHED
        </Text>
      </Billboard>

      {/* Garis Pemisah Kolom Vertikal */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 1.15, 0.035]}>
          <boxGeometry args={[0.015, 1.35, 0.01]} />
          <meshBasicMaterial color="#cbd5e1" />
        </mesh>
      ))}

      {/* Kolom 1: BACKLOG (Kuning) */}
      {backlogLeads.map((lead, idx) => (
        <group key={lead.id_lead || idx} position={[-1.35, 1.45 - idx * 0.42, 0.045]}>
          <RoundedBox args={[0.48, 0.32, 0.015]} radius={0.01}>
            <meshStandardMaterial color="#fef08a" roughness={0.5} />
          </RoundedBox>
          <Billboard position={[0, 0, 0.012]} follow={false}>
            <Text fontSize={0.052} color="#854d0e" anchorX="center" anchorY="middle">
              {lead.id_lead || `LD-0${idx + 1}`}
            </Text>
            <Text position={[0, -0.07, 0]} fontSize={0.038} color="#713f12" anchorX="center" anchorY="middle">
              {(lead.nama || '').slice(0, 10)}
            </Text>
          </Billboard>
        </group>
      ))}

      {/* Kolom 2: IN RESEARCH (Biru Cyan) */}
      {researchLeads.map((lead, idx) => (
        <group key={lead.id_lead || idx} position={[-0.45, 1.35, 0.045]}>
          <RoundedBox args={[0.48, 0.32, 0.015]} radius={0.01}>
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </RoundedBox>
          <Billboard position={[0, 0, 0.012]} follow={false}>
            <Text fontSize={0.052} color="#0369a1" anchorX="center" anchorY="middle">
              {lead.id_lead}
            </Text>
            <Text position={[0, -0.07, 0]} fontSize={0.038} color="#075985" anchorX="center" anchorY="middle">
              Scanning Stok
            </Text>
          </Billboard>
        </group>
      ))}

      {/* Kolom 3: PITCH READY (Ungu) */}
      {pitchReadyLeads.map((lead, idx) => (
        <group key={lead.id_lead || idx} position={[0.45, 1.4, 0.045]}>
          <RoundedBox args={[0.48, 0.32, 0.015]} radius={0.01}>
            <meshStandardMaterial color="#c084fc" roughness={0.4} />
          </RoundedBox>
          <Billboard position={[0, 0, 0.012]} follow={false}>
            <Text fontSize={0.052} color="#581c87" anchorX="center" anchorY="middle">
              {lead.id_lead}
            </Text>
            <Text position={[0, -0.07, 0]} fontSize={0.038} color="#6b21a8" anchorX="center" anchorY="middle">
              Review Bos
            </Text>
          </Billboard>
        </group>
      ))}

      {/* Kolom 4: DISPATCHED (Hijau Emerald) */}
      {dispatchedLeads.map((lead, idx) => (
        <group key={lead.id_lead || idx} position={[1.35, 1.4 - idx * 0.42, 0.045]}>
          <RoundedBox args={[0.48, 0.32, 0.015]} radius={0.01}>
            <meshStandardMaterial color="#86efac" roughness={0.4} />
          </RoundedBox>
          <Billboard position={[0, 0, 0.012]} follow={false}>
            <Text fontSize={0.052} color="#14532d" anchorX="center" anchorY="middle">
              {lead.id_lead} ✓
            </Text>
            <Text position={[0, -0.07, 0]} fontSize={0.038} color="#166534" anchorX="center" anchorY="middle">
              Dispatched WA
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  )
}

/**
 * 6. SECURITY TURNSTILE GATE & WHATSAPP OUTREACH BEACON
 */
export function SecurityTurnstileGate({ position = [2.0, 0.18, 2.6] }) {
  const beaconRef = useRef()

  useFrame((state) => {
    if (beaconRef.current) {
      const t = state.clock.getElapsedTime()
      beaconRef.current.intensity = 1.2 + Math.sin(t * 6) * 0.6
    }
  })

  return (
    <group position={position}>
      {/* Floating Badge */}
      <FloatingBadge position={[0, 2.4, 0]} text="Security Gate • WA Dispatch" dotColor="#16a34a" />

      {/* Pedestal Kiri Stainless Steel */}
      <RoundedBox args={[0.28, 1.0, 0.9]} radius={0.04} smoothness={3} position={[-0.7, 0.5, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Pedestal Kanan Stainless Steel */}
      <RoundedBox args={[0.28, 1.0, 0.9]} radius={0.04} smoothness={3} position={[0.7, 0.5, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Palang Kaca Akrilik Hijau Bercahaya di Tengah */}
      <group position={[0, 0.55, 0]}>
        <mesh>
          <boxGeometry args={[1.1, 0.45, 0.04]} />
          <meshPhysicalMaterial
            transmission={0.8}
            roughness={0.1}
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.6}
            transparent
          />
        </mesh>
      </group>

      {/* Tiang Antena Beacon Pemancar Gateway WhatsApp */}
      <group position={[0.7, 1.0, 0]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.015, 0.02, 0.9, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        {/* Bola Sinyal Pemancar Menyala */}
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3.0} />
        </mesh>
        <pointLight ref={beaconRef} position={[0, 0.95, 0]} color="#22c55e" intensity={1.5} distance={2.5} />
      </group>
    </group>
  )
}

/**
 * 7. EXECUTIVE LOUNGE & REFRESHMENT AREA: Sofa L-Shape & Meja Kopi
 */
export function ExecutiveLounge({ position = [5.5, 0.18, 1.2] }) {
  return (
    <group position={position}>
      {/* Karpet Bulat Santai */}
      <mesh receiveShadow position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* Sofa Modern Nyaman Warna Navy / Slate Blue */}
      <group position={[0, 0, 0.4]}>
        {/* Dudukan Sofa */}
        <RoundedBox args={[2.2, 0.32, 0.85]} radius={0.06} smoothness={3} position={[0, 0.22, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </RoundedBox>
        {/* Sandaran Punggung Sofa */}
        <RoundedBox args={[2.2, 0.55, 0.25]} radius={0.06} smoothness={3} position={[0, 0.55, 0.32]}>
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>
        {/* Sandaran Lengan Kiri & Kanan */}
        <RoundedBox args={[0.25, 0.45, 0.85]} radius={0.06} smoothness={3} position={[-1.0, 0.35, 0]}>
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.25, 0.45, 0.85]} radius={0.06} smoothness={3} position={[1.0, 0.35, 0]}>
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </RoundedBox>
        {/* Bantal Aksen Kuning Mustard */}
        <RoundedBox args={[0.35, 0.32, 0.12]} radius={0.04} smoothness={3} position={[-0.6, 0.45, 0.2]}>
          <meshStandardMaterial color="#f59e0b" roughness={0.7} />
        </RoundedBox>
      </group>

      {/* Meja Kopi Skandinavia Bulat */}
      <group position={[0, 0, -0.6]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
          <meshStandardMaterial color="#e2d4c0" roughness={0.4} />
        </mesh>
        {/* 3 Kaki Meja Kayu */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.02, 0.24, 12]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        ))}
        {/* Majalah Otomotif di Meja */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.22, 0.01, 0.3]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

/**
 * 8. POTTED PLANTS: Tanaman Hias Hijau Segar
 */
export function PottedPlant({ position = [0, 0, 0], scale = 1.0 }) {
  return (
    <group position={position} scale={scale}>
      {/* Pot Keramik Putih Bergaris Minimalis */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.18, 0.5, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Tanah */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.04, 24]} />
        <meshStandardMaterial color="#291e14" roughness={0.9} />
      </mesh>
      {/* Batang & Daun Monstera / Ficus Rindang */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#15803d" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.95, 0.1]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#16a34a" roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, 0.88, -0.1]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#22c55e" roughness={0.5} />
      </mesh>
    </group>
  )
}
