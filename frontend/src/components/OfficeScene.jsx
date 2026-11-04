import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { 
  DioramaRoom, 
  ModernDeskWorkstation, 
  VaultSafe, 
  KanbanWall, 
  SecurityTurnstile, 
  PottedPlant 
} from './OfficeElements'
import { RobotAgent } from './AgentCharacter'

export function OfficeScene({ agents, selectedAgentId, onSelectAgent }) {
  const blueAgent = agents?.['blue-agent'] || { isTyping: true, statusText: 'Active Compute' }
  const purpleAgent = agents?.['purple-agent'] || { isTyping: false, statusText: 'Task Manager' }
  const orangeAgent = agents?.['orange-agent'] || { isTyping: false, statusText: 'Vault Storage' }
  const greenAgent = agents?.['green-agent'] || { isTyping: false, statusText: 'Gate Control' }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/50">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [28, 22, 24],
          zoom: 32,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <OrbitControls
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.28}
          minPolarAngle={Math.PI / 6}
          minZoom={18}
          maxZoom={90}
          target={[1.0, 0.8, -0.2]}
        />

        {/* Studio Lighting Bersih & Alami */}
        <ambientLight intensity={1.4} color="#ffffff" />
        
        {/* Lampu Utama Matahari / Keylight */}
        <directionalLight
          position={[18, 32, 22]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={70}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Lampu Fill Lembut Studio */}
        <pointLight position={[-8, 8, 8]} intensity={0.6} color="#e0f2fe" />
        <pointLight position={[8, 8, -6]} intensity={0.5} color="#f0f9ff" />

        {/* 3. Komponen Ruangan Diorama (Isometric Office):
            - Lantai slab tebal putih glossy dengan list bawah kayu/cokelat.
            - Partisi dinding kaca frosted glass MeshPhysicalMaterial.
        */}
        <DioramaRoom />

        {/* Bayangan Kontak Halus di Permukaan Lantai */}
        <ContactShadows
          position={[0, 0.185, 0]}
          opacity={0.55}
          scale={20}
          blur={2.2}
          far={4.0}
        />

        {/* 4. Meja Kerja Kayu Modern dengan Dual Monitor Coding, Keyboard Mini & Kursi Ergonomis
            + 6. Floating Badge "Desk 01 • Active Compute"
        */}
        <ModernDeskWorkstation
          position={[-2.8, 0.18, 0.8]}
          isTyping={blueAgent.isTyping ?? true}
        />

        {/* 4. Brankas (Vault) Baja Silver Tebal dengan Pintu Semi-Terbuka
            + 6. Floating Badge "Vault • Secure Storage"
        */}
        <VaultSafe position={[-5.8, 0.18, -4.2]} />

        {/* 4. Papan Kanban Kaca Melayang dengan Kolom (Backlog, In Progress, Review, Done) & Kartu Tugas
            + 6. Floating Badge "Kanban Wall • 12 Active"
        */}
        <KanbanWall position={[3.8, 0.18, -4.2]} />

        {/* 3. Turnstile Security Gate Stainless Steel di Dekat Pintu Masuk
            + 6. Floating Badge "Security Gate • Access Control"
        */}
        <SecurityTurnstile position={[1.4, 0.18, 2.8]} />

        {/* 4. Tanaman Hias Pot Kecil di Sudut Lantai */}
        <PottedPlant position={[7.5, 0.18, -5.5]} scale={1.1} />
        <PottedPlant position={[-7.5, 0.18, 5.0]} scale={0.9} />
        <PottedPlant position={[7.2, 0.18, 5.0]} scale={0.9} />

        {/* 5. Empat Karakter AI Robot Mini (Capsule Bot Component):
            - Tubuh: CapsuleGeometry glossy
            - Wajah: lekukan hitam pekat
            - Mata digital: dua titik bola cyan menyala (emissive="#00f3ff")
            - Tangan & kaki silinder
            - Animasi floating idle & sitting typing
        */}

        {/* 1. Robot Biru: Duduk mengetik di meja kerja (Active Compute) */}
        <RobotAgent
          color="#0284c7"
          position={[-2.8, 0.18, 1.75]}
          rotation={[0, Math.PI, 0]}
          isTyping={blueAgent.isTyping ?? true}
          label="Robot Biru"
          status={blueAgent.statusText || 'Active Compute'}
          isSelected={selectedAgentId === 'blue-agent'}
        />

        {/* 2. Robot Oranye: Berdiri di dekat Brankas baja (Vault Storage) */}
        <RobotAgent
          color="#ea580c"
          position={[-3.8, 0.18, -3.5]}
          rotation={[0, Math.PI / 4, 0]}
          isTyping={false}
          label="Robot Oranye"
          status={orangeAgent.statusText || 'Vault Storage'}
          isSelected={selectedAgentId === 'orange-agent'}
        />

        {/* 3. Robot Hijau: Berjalan di area tengah dekat gate */}
        <RobotAgent
          color="#16a34a"
          position={[2.4, 0.18, 2.2]}
          rotation={[0, -Math.PI / 3, 0]}
          isTyping={false}
          label="Robot Hijau"
          status={greenAgent.statusText || 'Gate Access'}
          isSelected={selectedAgentId === 'green-agent'}
        />

        {/* 4. Robot Ungu: Berdiri menghadap papan Kanban (Task Manager) */}
        <RobotAgent
          color="#9333ea"
          position={[3.8, 0.18, -2.6]}
          rotation={[0, Math.PI, 0]}
          isTyping={purpleAgent.isTyping ?? false}
          label="Robot Ungu"
          status={purpleAgent.statusText || 'Task Manager'}
          isSelected={selectedAgentId === 'purple-agent'}
        />
      </Canvas>
    </div>
  )
}
