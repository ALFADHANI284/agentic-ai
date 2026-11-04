import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { 
  MinimalistFloor, 
  MinimalistDesk, 
  MinimalistLounge, 
  MinimalistPlant, 
  ModernServerTower 
} from './OfficeElements'
import { MinimalistAgentCharacter } from './AgentCharacter'

export function OfficeScene({ agentsState }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [22, 22, 22],
          zoom: 38,
          near: 0.1,
          far: 500,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.25}
          minPolarAngle={Math.PI / 6}
          minZoom={15}
          maxZoom={100}
          target={[0, 1.0, 0]}
        />

        {/* Scandinavian Warm Lighting */}
        <ambientLight intensity={1.2} color="#ffffff" />
        
        {/* Main Soft Sunlight through Studio */}
        <directionalLight
          position={[16, 26, 14]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={60}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          color="#fffbf0"
        />

        {/* Soft Ambient Accent Fills */}
        <pointLight position={[-8, 8, -6]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[6, 8, -6]} intensity={0.5} color="#10b981" />
        <pointLight position={[-5, 4, 4]} intensity={0.4} color="#fcd34d" />

        {/* Minimalist Office Architecture Floor & Walls */}
        <MinimalistFloor />

        {/* Workstation 1: Scout's Lead Radar Desk */}
        <MinimalistDesk
          position={[-3.2, 0, -2.5]}
          label="Lead Radar"
          screenColor="#06b6d4"
          isBusy={agentsState.scout.isBusy}
          deskType="wood"
        />

        {/* Workstation 2: Scribe's Sales AI Desk */}
        <MinimalistDesk
          position={[0.6, 0, -2.5]}
          label="Sales AI Desk"
          screenColor="#a855f7"
          isBusy={agentsState.sales.isBusy}
          deskType="wood"
        />

        {/* Workstation 3: Commander's Executive Approval Suite */}
        <MinimalistDesk
          position={[5.5, 0, -2.5]}
          label="Executive Approval"
          screenColor="#10b981"
          isBusy={agentsState.dispatcher.isBusy}
          deskType="executive"
        />

        {/* Lounge & Coffee Break Corner */}
        <MinimalistLounge position={[-6.2, 0, 3.2]} />

        {/* Minimalist Plants */}
        <MinimalistPlant position={[-8.5, 0, -6.5]} scale={1.2} />
        <MinimalistPlant position={[8.5, 0, -6.5]} scale={1.1} />
        <MinimalistPlant position={[8.5, 0, 4.5]} scale={1.0} />
        <MinimalistPlant position={[-3.2, 0, 5.2]} scale={0.8} />

        {/* Modern AI Compute Server Tower */}
        <ModernServerTower position={[-8.5, 0, -2.5]} />

        {/* 3D Agents: Role Tailored Characters */}
        {/* Scout: Lead Analyst */}
        <MinimalistAgentCharacter
          name="Scout"
          role="Lead Analyst"
          agentKey="scout"
          targetPos={agentsState.scout.pos}
          statusText={agentsState.scout.statusText}
          isBusy={agentsState.scout.isBusy}
          isWalking={agentsState.scout.isWalking}
          rotationY={agentsState.scout.rotationY || 0}
        />

        {/* Scribe: Sales AI Pitcher */}
        <MinimalistAgentCharacter
          name="Scribe"
          role="Sales Pitcher (Qwen)"
          agentKey="sales"
          targetPos={agentsState.sales.pos}
          statusText={agentsState.sales.statusText}
          isBusy={agentsState.sales.isBusy}
          isWalking={agentsState.sales.isWalking}
          rotationY={agentsState.sales.rotationY || 0}
        />

        {/* Commander: Approval Supervisor */}
        <MinimalistAgentCharacter
          name="Commander"
          role="Approval Supervisor"
          agentKey="dispatcher"
          targetPos={agentsState.dispatcher.pos}
          statusText={agentsState.dispatcher.statusText}
          isBusy={agentsState.dispatcher.isBusy}
          isWalking={agentsState.dispatcher.isWalking}
          rotationY={agentsState.dispatcher.rotationY || 0}
        />
      </Canvas>
    </div>
  )
}
