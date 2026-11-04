import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { 
  PodiumFloor, 
  Desk01, 
  VaultSafe, 
  GlassWhiteboard, 
  KanbanWall, 
  SecurityTurnstile, 
  GlassEntryDoor 
} from './OfficeElements'
import { SimsAgentBot } from './AgentCharacter'

export function OfficeScene({ agents, selectedAgentId, onSelectAgent }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-gradient-to-b from-slate-100 to-slate-200">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [22, 20, 22],
          zoom: 40,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.3}
          minPolarAngle={Math.PI / 6}
          minZoom={18}
          maxZoom={90}
          target={[0, 0.8, 0]}
        />

        {/* Clean Bright Studio Lighting (Pure White & Soft Daylight) */}
        <ambientLight intensity={1.5} color="#ffffff" />
        
        <directionalLight
          position={[14, 28, 16]}
          intensity={1.9}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={65}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Soft studio fill lights */}
        <pointLight position={[-8, 6, 8]} intensity={0.5} color="#e0f2fe" />
        <pointLight position={[8, 6, -8]} intensity={0.4} color="#f0f9ff" />

        {/* Elevated White Diorama Floor */}
        <PodiumFloor />

        {/* Workstation 1: Desk 01 (Active Compute) */}
        <Desk01
          position={[-3.8, 0, 0.2]}
          active={agents['blue-agent']?.isBusy}
        />

        {/* Storage Vault in Back Left */}
        <VaultSafe position={[-6.2, 0, -4.2]} />

        {/* Glass Whiteboard in Center Back */}
        <GlassWhiteboard position={[-1.2, 0, -4.2]} />

        {/* Kanban Wall in Back Right */}
        <KanbanWall position={[4.2, 0, -4.2]} />

        {/* Security Access Turnstile in Center Foreground */}
        <SecurityTurnstile position={[0.8, 0, 2.8]} />

        {/* Glass Entrance Doorway on Right */}
        <GlassEntryDoor position={[7.2, 0, 0]} />

        {/* 5 Sims Capsule Bots (Matching referensi1.png) */}
        {/* 1. Blue Bot (Desk 01 / Compute & Lead Scout) */}
        <SimsAgentBot
          id="blue-agent"
          name="blue-agent"
          role="Compute"
          color="#0284c7"
          eyeColor="#38bdf8"
          targetPos={agents['blue-agent']?.pos || [-3.8, 0, 1.15]}
          statusText={agents['blue-agent']?.statusText || 'Scoring Leads'}
          isBusy={agents['blue-agent']?.isBusy}
          isWalking={agents['blue-agent']?.isWalking}
          isSelected={selectedAgentId === 'blue-agent'}
          rotationY={agents['blue-agent']?.rotationY ?? Math.PI}
        />

        {/* 2. Purple Bot (Kanban Wall / Sales AI Pitcher) */}
        <SimsAgentBot
          id="purple-agent"
          name="purple-agent"
          role="Sales AI"
          color="#9333ea"
          eyeColor="#c084fc"
          targetPos={agents['purple-agent']?.pos || [3.6, 0, -3.2]}
          statusText={agents['purple-agent']?.statusText || 'Syncing Kanban'}
          isBusy={agents['purple-agent']?.isBusy}
          isWalking={agents['purple-agent']?.isWalking}
          isSelected={selectedAgentId === 'purple-agent'}
          rotationY={agents['purple-agent']?.rotationY ?? Math.PI}
        />

        {/* 3. Yellow Bot (Security Turnstile / Approval Supervisor) */}
        <SimsAgentBot
          id="yellow-agent"
          name="yellow-agent"
          role="Gatekeeper"
          color="#eab308"
          eyeColor="#fef08a"
          targetPos={agents['yellow-agent']?.pos || [2.4, 0, 2.6]}
          statusText={agents['yellow-agent']?.statusText || 'Access Control'}
          isBusy={agents['yellow-agent']?.isBusy}
          isWalking={agents['yellow-agent']?.isWalking}
          isSelected={selectedAgentId === 'yellow-agent'}
          rotationY={agents['yellow-agent']?.rotationY ?? -Math.PI / 2}
        />

        {/* 4. Orange Bot (Whiteboard / Strategist) */}
        <SimsAgentBot
          id="orange-agent"
          name="orange-agent"
          role="Strategist"
          color="#f97316"
          eyeColor="#fed7aa"
          targetPos={agents['orange-agent']?.pos || [-2.2, 0, -3.2]}
          statusText={agents['orange-agent']?.statusText || 'Planning Flow'}
          isBusy={agents['orange-agent']?.isBusy}
          isWalking={agents['orange-agent']?.isWalking}
          isSelected={selectedAgentId === 'orange-agent'}
          rotationY={agents['orange-agent']?.rotationY ?? Math.PI}
        />

        {/* 5. Green Bot (Whiteboard / Researcher) */}
        <SimsAgentBot
          id="green-agent"
          name="green-agent"
          role="Research"
          color="#22c55e"
          eyeColor="#86efac"
          targetPos={agents['green-agent']?.pos || [-0.4, 0, -3.2]}
          statusText={agents['green-agent']?.statusText || 'Catalog Match'}
          isBusy={agents['green-agent']?.isBusy}
          isWalking={agents['green-agent']?.isWalking}
          isSelected={selectedAgentId === 'green-agent'}
          rotationY={agents['green-agent']?.rotationY ?? Math.PI}
        />
      </Canvas>
    </div>
  )
}
