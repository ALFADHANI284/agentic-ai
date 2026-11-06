import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { 
  DioramaRoom, 
  ExecutiveBossSuite,
  ModernDeskWorkstation, 
  MsiCubiServerClusterAndVault, 
  KanbanGlassBoard, 
  SecurityTurnstileGate, 
  ExecutiveLounge, 
  PottedPlant 
} from './OfficeElements'
import { CubiCharacter } from './CubiCharacter'

export function OfficeScene({
  agents,
  bossConfig,
  selectedAgentId,
  onSelectAgent,
  leads = [],
  activeLead = null,
  pitchResult = null,
}) {
  const boss = bossConfig || {
    name: 'Pak Alfa',
    role: 'Sales Director',
    color: '#f59e0b',
    pos: [-5.2, 0.18, 1.35],
    targetPos: [-5.2, 0.18, 1.35],
    rotationY: 0,
    isTyping: false,
    isWalking: false,
  }

  const blueAgent = agents?.['blue-agent'] || {
    id: 'blue-agent',
    name: 'Cubi Scout',
    role: 'Compute',
    color: '#0284c7',
    pos: [-2.8, 0.18, 1.65],
    targetPos: [-2.8, 0.18, 1.65],
    isTyping: true,
    isWalking: false,
  }

  const purpleAgent = agents?.['purple-agent'] || {
    id: 'purple-agent',
    name: 'Cubi Scribe',
    role: 'AI Drafter',
    color: '#9333ea',
    pos: [4.0, 0.18, -2.6],
    targetPos: [4.0, 0.18, -2.6],
    isTyping: false,
    isWalking: false,
  }

  const orangeAgent = agents?.['orange-agent'] || {
    id: 'orange-agent',
    name: 'Cubi Vault',
    role: 'Archivist',
    color: '#ea580c',
    pos: [-4.2, 0.18, -3.8],
    targetPos: [-4.2, 0.18, -3.8],
    isTyping: false,
    isWalking: false,
  }

  const greenAgent = agents?.['green-agent'] || {
    id: 'green-agent',
    name: 'Cubi Gate',
    role: 'Gatekeeper',
    color: '#16a34a',
    pos: [2.0, 0.18, 1.5],
    targetPos: [2.0, 0.18, 1.5],
    isTyping: false,
    isWalking: false,
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-gradient-to-br from-slate-200 via-slate-100 to-blue-50/70">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [30, 24, 26],
          zoom: 30,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <OrbitControls
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.25}
          minPolarAngle={Math.PI / 6}
          minZoom={16}
          maxZoom={85}
          target={[0.2, 0.7, -0.2]}
        />

        {/* Pencahayaan Studio Alami yang Bersih */}
        <ambientLight intensity={1.35} color="#ffffff" />
        
        {/* Lampu Utama Matahari / Keylight dengan Bayangan Tajam Halus */}
        <directionalLight
          position={[20, 34, 24]}
          intensity={1.9}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={80}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Lampu Fill Ambient Biru & Hangat */}
        <pointLight position={[-10, 10, 10]} intensity={0.65} color="#e0f2fe" />
        <pointLight position={[10, 9, -8]} intensity={0.5} color="#fef3c7" />

        {/* 1. Komponen Ruangan Diorama */}
        <DioramaRoom />

        {/* Bayangan Kontak Halus di Permukaan Lantai */}
        <ContactShadows
          position={[0, 0.185, 0]}
          opacity={0.55}
          scale={22}
          blur={2.4}
          far={4.5}
        />

        {/* 2. Executive Boss Suite dengan Nameplate 3D Dinamis */}
        <ExecutiveBossSuite
          position={[-5.2, 0.18, 2.0]}
          bossName={boss.name || 'Pak Alfa'}
          bossRole={boss.role || 'Sales Director'}
        />

        {/* 3. Meja Kerja Workstation Modern dengan MSI Cubi NUC PC Terpasang */}
        <ModernDeskWorkstation
          position={[-2.8, 0.18, 0.8]}
          isTyping={blueAgent.isTyping}
        />

        {/* 4. MSI Cubi NUC Server Rack Cluster & Brankas Data */}
        <MsiCubiServerClusterAndVault position={[-5.6, 0.18, -4.2]} />

        {/* 5. Papan Kanban Glass Wall Melayang Dinamis */}
        <KanbanGlassBoard
          position={[4.0, 0.18, -4.2]}
          leads={leads}
          activeLead={activeLead}
          pitchResult={pitchResult}
        />

        {/* 6. Security Turnstile Gate & WhatsApp Dispatch Beacon */}
        <SecurityTurnstileGate position={[2.0, 0.18, 2.6]} />

        {/* 7. Executive Lounge Area */}
        <ExecutiveLounge position={[5.5, 0.18, 1.2]} />

        {/* 8. Tanaman Hias Hijau Segar */}
        <PottedPlant position={[8.0, 0.18, -6.0]} scale={1.2} />
        <PottedPlant position={[-8.0, 0.18, 5.2]} scale={0.95} />
        <PottedPlant position={[7.8, 0.18, 5.2]} scale={0.95} />
        <PottedPlant position={[-8.0, 0.18, -6.0]} scale={1.0} />

        {/* 9. KARAKTER CUBI BOT MINI */}

        {/* Karakter 1: BOS CUBI (Dengan Mahkota Emas & Aksen Amber) */}
        <CubiCharacter
          id="boss"
          name={boss.name || 'Pak Alfa'}
          role={boss.role || 'Sales Director'}
          color="#f59e0b"
          position={boss.pos || [-5.2, 0.18, 1.35]}
          targetPosition={boss.targetPos || [-5.2, 0.18, 1.35]}
          rotationY={boss.rotationY ?? 0}
          isBoss={true}
          isWalking={boss.isWalking}
          isTyping={boss.isTyping}
          isSelected={selectedAgentId === 'boss'}
          onClick={onSelectAgent}
        />

        {/* Karakter 2: CUBI SCOUT (Biru - Compute & Stock Analyzer) */}
        <CubiCharacter
          id="blue-agent"
          name={blueAgent.name || 'Cubi Scout'}
          role={blueAgent.role || 'Compute'}
          color="#0284c7"
          position={blueAgent.pos || [-2.8, 0.18, 1.65]}
          targetPosition={blueAgent.targetPos || [-2.8, 0.18, 1.65]}
          rotationY={blueAgent.rotationY ?? Math.PI}
          isWalking={blueAgent.isWalking}
          isTyping={blueAgent.isTyping}
          isScanning={blueAgent.isScanning}
          isSelected={selectedAgentId === 'blue-agent'}
          onClick={onSelectAgent}
        />

        {/* Karakter 3: CUBI SCRIBE (Ungu - AI Pitch Drafter) */}
        <CubiCharacter
          id="purple-agent"
          name={purpleAgent.name || 'Cubi Scribe'}
          role={purpleAgent.role || 'AI Drafter'}
          color="#9333ea"
          position={purpleAgent.pos || [4.0, 0.18, -2.6]}
          targetPosition={purpleAgent.targetPos || [4.0, 0.18, -2.6]}
          rotationY={purpleAgent.rotationY ?? Math.PI}
          isWalking={purpleAgent.isWalking}
          isTyping={purpleAgent.isTyping}
          isSelected={selectedAgentId === 'purple-agent'}
          onClick={onSelectAgent}
        />

        {/* Karakter 4: CUBI GATE (Hijau - Gatekeeper Approval & WhatsApp Gateway) */}
        <CubiCharacter
          id="green-agent"
          name={greenAgent.name || 'Cubi Gate'}
          role={greenAgent.role || 'Gatekeeper'}
          color="#16a34a"
          position={greenAgent.pos || [2.0, 0.18, 1.5]}
          targetPosition={greenAgent.targetPos || [2.0, 0.18, 1.5]}
          rotationY={greenAgent.rotationY ?? -Math.PI / 3}
          isWalking={greenAgent.isWalking}
          isSelected={selectedAgentId === 'green-agent'}
          onClick={onSelectAgent}
        />

        {/* Karakter 5: CUBI VAULT (Oranye - Data & Deal Archivist) */}
        <CubiCharacter
          id="orange-agent"
          name={orangeAgent.name || 'Cubi Vault'}
          role={orangeAgent.role || 'Archivist'}
          color="#ea580c"
          position={orangeAgent.pos || [-4.2, 0.18, -3.8]}
          targetPosition={orangeAgent.targetPos || [-4.2, 0.18, -3.8]}
          rotationY={orangeAgent.rotationY ?? Math.PI / 4}
          isWalking={orangeAgent.isWalking}
          isSelected={selectedAgentId === 'orange-agent'}
          onClick={onSelectAgent}
        />
      </Canvas>
    </div>
  )
}
