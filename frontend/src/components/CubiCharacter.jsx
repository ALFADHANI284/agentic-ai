import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CubiCharacter: Karakter Robot Mini bertema MSI Cubi NUC
 * - Bentuk: Mini Cube / Squircle halus (RoundedBox) berpenampilan tech-cute & konsisten.
 * - Desain Ikonik MSI Cubi NUC:
 *   - Bodi Mini PC Cubi NUC dengan sudut membulat elegan.
 *   - Cincin tombol power LED menyala di sudut atas (ciri khas MSI Cubi NUC).
 *   - Visor depan kaca hitam glossy melengkung dengan mata digital LED ekspresif.
 *   - Kisi ventilasi pendingin mini di samping dan belakang.
 *   - Tangan & kaki mini robotik dengan sendi metalik.
 * - Karakter Bos:
 *   - Mahkota emas eksekutif dengan permata ruby.
 *   - Dasi / medali emas eksekutif di dada.
 *   - Visor dengan mata digital amber bercahaya hangat.
 *   - Warna bodi Charcoal Slate elegan dengan aksen amber/emas.
 * - Karakter Reguler:
 *   - Cubi Scout (Biru): Antena sensor ganda & balok scanner holografik saat cek stok/vault.
 *   - Cubi Scribe (Ungu): Gerakan mengetik cepat & aura tablet AI drafting.
 *   - Cubi Gate (Hijau): Antena radio WhatsApp dengan suar pemancar hijau berkedip.
 *   - Cubi Vault (Oranye): Ransel dual storage cartridge NVMe data core.
 * - Animasi:
 *   - Idle: Bernapas & melayang halus (gentle floating).
 *   - Walking: Melangkah lucu bergoyang waddling.
 *   - Typing: Duduk mengetik di meja kerja.
 *   - Scanning: Menginspeksi dengan laser kerucut holografik bercahaya.
 *   - Celebrate: Melompat gembira dengan mata tersenyum saat deal disetujui.
 * - Floating Billboard Badge 3D: Menampilkan nama kustom & aksi real-time.
 */
export function CubiCharacter({
  id = 'cubi-agent',
  name = 'Cubi Bot',
  role = 'Agent',
  color = '#0284c7',
  position = [0, 0, 0],
  targetPosition = null,
  rotationY = 0,
  isTyping = false,
  isScanning = false,
  isWalking = false,
  isBoss = false,
  isSelected = false,
  onClick,
}) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const haloRef = useRef()
  const powerLedRef = useRef()
  const scanBeamRef = useRef()
  const radioWaveRef = useRef()

  const destPos = useRef(new THREE.Vector3(...(targetPosition || position)))

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Update target jika berubah
    if (targetPosition) {
      destPos.current.set(targetPosition[0], targetPosition[1], targetPosition[2])
    } else {
      destPos.current.set(position[0], position[1], position[2])
    }

    // Hitung jarak ke target
    const distToTarget = groupRef.current.position.distanceTo(destPos.current)
    const moving = distToTarget > 0.08 || isWalking

    // Smooth lerp ke target posisi
    groupRef.current.position.lerp(destPos.current, 0.08)

    // Arah rotasi menghadap target saat bergerak
    if (moving && distToTarget > 0.15) {
      const dirX = destPos.current.x - groupRef.current.position.x
      const dirZ = destPos.current.z - groupRef.current.position.z
      const moveAngle = Math.atan2(dirX, dirZ)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        moveAngle,
        0.14
      )
    } else {
      // Rotasi normal saat diam
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationY,
        0.1
      )
    }

    // Animasi Tubuh & Anggota Tubuh
    if (bodyRef.current) {
      if (moving) {
        // Animasi Berjalan (Cute Cubi Waddling Walk)
        const walkSpeed = 16
        const step = Math.sin(t * walkSpeed)
        bodyRef.current.position.y = 0.58 + Math.abs(step) * 0.06
        bodyRef.current.rotation.z = Math.sin(t * (walkSpeed / 2)) * 0.08
        bodyRef.current.rotation.x = 0.05

        // Tangan mengayun seirama langkah
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = -Math.sin(t * walkSpeed) * 0.6
          rightArmRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.6
          leftArmRef.current.position.z = 0
          rightArmRef.current.position.z = 0
        }

        // Kaki melangkah bergantian
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.65
          rightLegRef.current.rotation.x = -Math.sin(t * walkSpeed) * 0.65
        }
      } else if (isTyping) {
        // Posisi Duduk Mengetik di Depan Meja
        bodyRef.current.position.y = 0.50 + Math.sin(t * 14) * 0.012
        bodyRef.current.rotation.z = 0
        bodyRef.current.rotation.x = 0.06

        // Tangan mengetik lincah di keyboard
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = -0.75 + Math.sin(t * 24) * 0.15
          rightArmRef.current.rotation.x = -0.75 + Math.cos(t * 24) * 0.15
          leftArmRef.current.position.z = 0.16 + Math.sin(t * 24) * 0.03
          rightArmRef.current.position.z = 0.16 + Math.cos(t * 24) * 0.03
        }

        // Kaki rileks duduk
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = -Math.PI / 2.3
          rightLegRef.current.rotation.x = -Math.PI / 2.3
        }
      } else if (isScanning) {
        // Animasi Inspeksi / Scanning Vault
        bodyRef.current.position.y = 0.62 + Math.sin(t * 3) * 0.03
        bodyRef.current.rotation.x = 0.12
        bodyRef.current.rotation.y = Math.sin(t * 2.5) * 0.28

        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = -0.85 + Math.sin(t * 4) * 0.12
          rightArmRef.current.rotation.x = -0.65
        }

        // Kerucut scanner berdenyut
        if (scanBeamRef.current) {
          scanBeamRef.current.material.opacity = 0.35 + Math.sin(t * 8) * 0.15
        }
      } else {
        // Animasi Idle: Floating & Bernapas Halus
        const idleCycle = Math.sin(t * 2.8)
        bodyRef.current.position.y = (isBoss ? 0.62 : 0.60) + idleCycle * 0.03
        bodyRef.current.rotation.x = 0
        bodyRef.current.rotation.z = Math.sin(t * 1.6) * 0.02
        bodyRef.current.rotation.y = 0

        // Tangan santai di samping bodi
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1)
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1)
          leftArmRef.current.position.z = 0
          rightArmRef.current.position.z = 0
        }

        // Kaki tegak lurus
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1)
          rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1)
        }
      }

      // Animasi Berkedip Digital (Blinking Eyes)
      const blinkCycle = Math.sin(t * 1.8)
      const isBlinking = blinkCycle > 0.96 && !isScanning
      if (leftEyeRef.current && rightEyeRef.current) {
        const eyeScaleY = isBlinking ? 0.15 : 1.0
        leftEyeRef.current.scale.y = eyeScaleY
        rightEyeRef.current.scale.y = eyeScaleY
      }

      // Breathing Power LED Ring (MSI Cubi NUC Signature)
      if (powerLedRef.current) {
        powerLedRef.current.material.emissiveIntensity = 2.0 + Math.sin(t * 3.5) * 0.8
      }

      // Gelombang radio suar gate
      if (radioWaveRef.current) {
        radioWaveRef.current.scale.setScalar(1 + (t % 1) * 0.8)
        radioWaveRef.current.material.opacity = Math.max(0, 0.8 - (t % 1) * 0.8)
      }
    }

    // Halo Seleksi di Lantai
    if (haloRef.current) {
      haloRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.07)
    }
  })

  const badgeText = isWalking
    ? `${name} • Berjalan...`
    : isTyping
    ? `${name} • Mengetik Draf AI`
    : isScanning
    ? `${name} • Riset Stok Cabang`
    : `${name} • ${role}`

  const badgeWidth = Math.max(1.3, badgeText.length * 0.092 + 0.55)

  // Bodi warna Bos: Charcoal Titanium dengan aksen Amber, agen lain sesuai warnanya
  const primaryBodyColor = isBoss ? '#1e293b' : color
  const eyeColor = isBoss ? '#fde047' : '#00f3ff'
  const powerRingColor = isBoss ? '#f59e0b' : '#38bdf8'

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick(id)
      }}
      cursor="pointer"
    >
      {/* Floating Billboard Badge di Atas Kepala */}
      <Billboard position={[0, isBoss ? 1.58 : 1.48, 0]} follow={true}>
        <RoundedBox args={[badgeWidth, 0.32, 0.03]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.05} />
        </RoundedBox>
        {/* Glowing Indicator Dot */}
        <mesh position={[-badgeWidth / 2 + 0.18, 0, 0.025]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color={isBoss ? '#f59e0b' : color}
            emissive={isBoss ? '#f59e0b' : color}
            emissiveIntensity={2.5}
          />
        </mesh>
        {/* Label Teks */}
        <Text
          position={[0.08, 0, 0.025]}
          fontSize={0.115}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          {badgeText}
        </Text>
      </Billboard>

      {/* Cincin Seleksi Bercahaya di Lantai */}
      {isSelected && (
        <group ref={haloRef} position={[0, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.68, 36]} />
            <meshStandardMaterial
              color={isBoss ? '#f59e0b' : color}
              emissive={isBoss ? '#f59e0b' : color}
              emissiveIntensity={2.4}
              transparent
              opacity={0.85}
            />
          </mesh>
          <pointLight position={[0, 0.25, 0]} intensity={1.2} distance={2.0} color={isBoss ? '#f59e0b' : color} />
        </group>
      )}

      {/* Bayangan Kontak Halus di Lantai */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 24]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>

      {/* Bodi Utama Karakter Cubi Bot */}
      <group ref={bodyRef} position={[0, 0.6, 0]}>
        
        {/* Mahkota Emas Mini Eksklusif untuk Bos Cubi */}
        {isBoss && (
          <group position={[0, 0.38, 0]}>
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.16, 0.14, 0.06, 16]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.18} />
            </mesh>
            {/* 4 Ujung Mahkota */}
            {[-0.1, 0.1].map((x) =>
              [-0.1, 0.1].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.08, z]}>
                  <coneGeometry args={[0.035, 0.09, 8]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
                </mesh>
              ))
            )}
            {/* Permata Ruby Kecil di Mahkota */}
            <mesh position={[0, 0.06, 0.15]}>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
            </mesh>
          </group>
        )}

        {/* Aksesoris Bos: Dasi / Medali Eksekutif di Dada */}
        {isBoss && (
          <group position={[0, -0.06, 0.27]}>
            <mesh position={[0, 0, 0]}>
              <coneGeometry args={[0.06, 0.13, 4]} rotation={[0, 0, Math.PI]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} />
            </mesh>
          </group>
        )}

        {/* Antena Sensor Ganda untuk Cubi Scout (Biru) */}
        {!isBoss && id === 'blue-agent' && (
          <group position={[0, 0.32, 0]}>
            <mesh position={[-0.15, 0.07, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.14, 10]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            <mesh position={[-0.15, 0.14, 0]}>
              <sphereGeometry args={[0.032, 12, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.0} />
            </mesh>
            <mesh position={[0.15, 0.07, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.14, 10]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            <mesh position={[0.15, 0.14, 0]}>
              <sphereGeometry args={[0.032, 12, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.0} />
            </mesh>
          </group>
        )}

        {/* Antena Radio WhatsApp & Suar Pemancar untuk Cubi Gate (Hijau) */}
        {!isBoss && id === 'green-agent' && (
          <group position={[0, 0.32, 0]}>
            <mesh position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.015, 0.02, 0.18, 10]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3.2} />
            </mesh>
            {/* Gelombang Denyut Pemancar */}
            <mesh ref={radioWaveRef} position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, 0.08, 24]} />
              <meshBasicMaterial color="#22c55e" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {/* AI Holographic Stylus di Pundak untuk Cubi Scribe (Ungu) */}
        {!isBoss && id === 'purple-agent' && (
          <group position={[0.22, 0.15, -0.15]} rotation={[0.2, 0, -0.3]}>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.015, 0.01, 0.22, 12]} />
              <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.8} />
            </mesh>
          </group>
        )}

        {/* Dual NVMe Storage Pods di Punggung untuk Cubi Vault (Oranye) */}
        {!isBoss && id === 'orange-agent' && (
          <group position={[0, 0.02, -0.28]}>
            <mesh position={[-0.1, 0, 0]}>
              <boxGeometry args={[0.09, 0.22, 0.06]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            <mesh position={[0.1, 0, 0]}>
              <boxGeometry args={[0.09, 0.22, 0.06]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.08, 0.035]}>
              <sphereGeometry args={[0.022, 10, 10]} />
              <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={3.0} />
            </mesh>
          </group>
        )}

        {/* MSI Cubi NUC Glowing Power LED Ring di Sudut Depan Atas */}
        <group position={[0.16, 0.28, 0.16]}>
          <mesh ref={powerLedRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.025, 0.045, 24]} />
            <meshStandardMaterial
              color={powerRingColor}
              emissive={powerRingColor}
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Bodi Utama: Rounded Cube (Bentuk Ikonik MSI Cubi NUC yang Cute) */}
        <RoundedBox
          castShadow
          receiveShadow
          args={[0.58, 0.54, 0.52]}
          radius={0.12}
          smoothness={5}
        >
          <meshStandardMaterial
            color={primaryBodyColor}
            roughness={0.18}
            metalness={isBoss ? 0.45 : 0.18}
          />
        </RoundedBox>

        {/* Bevel Aksen List Titanium / Chrome di Bagian Bawah Bodi */}
        <mesh position={[0, -0.23, 0]}>
          <boxGeometry args={[0.54, 0.04, 0.48]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Visor Layar Depan (Hitam Glossy) */}
        <group position={[0, 0.04, 0.245]}>
          <RoundedBox args={[0.44, 0.32, 0.04]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color="#020617"
              roughness={0.06}
              metalness={0.92}
            />
          </RoundedBox>

          {/* Mata Digital LED Kiri */}
          <mesh ref={leftEyeRef} position={[-0.10, 0.02, 0.025]}>
            <capsuleGeometry args={[0.032, 0.06, 12, 16]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.0}
            />
          </mesh>

          {/* Mata Digital LED Kanan */}
          <mesh ref={rightEyeRef} position={[0.10, 0.02, 0.025]}>
            <capsuleGeometry args={[0.032, 0.06, 12, 16]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.0}
            />
          </mesh>

          {/* Senyum LED Digital Mini Halus */}
          <mesh position={[0, -0.06, 0.025]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.04, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Kerucut Laser Scanner Holografik saat Cubi Scout melakukan inspeksi stok */}
        {isScanning && (
          <group position={[0, 0, 0.32]} rotation={[0.45, 0, 0]}>
            <mesh ref={scanBeamRef} position={[0, -0.65, 0.4]}>
              <coneGeometry args={[0.5, 1.3, 24, 1, true]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
            <pointLight color="#38bdf8" intensity={2.2} distance={2.0} />
          </group>
        )}

        {/* Kisi Ventilasi Pendingin Belakang (MSI Cubi NUC Cooling Exhaust) */}
        <group position={[0, 0.02, -0.265]}>
          {[-0.08, -0.02, 0.04, 0.1].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[0.36, 0.02, 0.02]} />
              <meshStandardMaterial color="#090d16" roughness={0.4} />
            </mesh>
          ))}
          {/* Logo Cubi NUC Mini di Belakang */}
          <mesh position={[0, -0.15, 0.005]}>
            <boxGeometry args={[0.18, 0.05, 0.01]} />
            <meshStandardMaterial color="#64748b" metalness={0.7} />
          </mesh>
        </group>

        {/* Tangan Kiri Mini */}
        <group ref={leftArmRef} position={[-0.34, -0.02, 0]}>
          <mesh castShadow position={[-0.04, -0.08, 0]}>
            <capsuleGeometry args={[0.05, 0.14, 12, 16]} />
            <meshStandardMaterial color={primaryBodyColor} roughness={0.2} metalness={0.2} />
          </mesh>
          {/* Sendi Tangan Metalik */}
          <mesh position={[-0.01, 0, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        </group>

        {/* Tangan Kanan Mini */}
        <group ref={rightArmRef} position={[0.34, -0.02, 0]}>
          <mesh castShadow position={[0.04, -0.08, 0]}>
            <capsuleGeometry args={[0.05, 0.14, 12, 16]} />
            <meshStandardMaterial color={primaryBodyColor} roughness={0.2} metalness={0.2} />
          </mesh>
          {/* Sendi Tangan Metalik */}
          <mesh position={[0.01, 0, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        </group>

        {/* Kaki Kiri Mini */}
        <group ref={leftLegRef} position={[-0.14, -0.28, 0]}>
          <mesh castShadow position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.18, 14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} />
          </mesh>
          {/* Sepatu Bantalan Kaki Bawah */}
          <mesh position={[0, -0.16, 0.03]}>
            <boxGeometry args={[0.13, 0.05, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>

        {/* Kaki Kanan Mini */}
        <group ref={rightLegRef} position={[0.14, -0.28, 0]}>
          <mesh castShadow position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.18, 14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} />
          </mesh>
          {/* Sepatu Bantalan Kaki Bawah */}
          <mesh position={[0, -0.16, 0.03]}>
            <boxGeometry args={[0.13, 0.05, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
