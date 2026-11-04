import React, { useState, useEffect } from 'react'
import { OfficeScene } from './components/OfficeScene'
import { DashboardOverlay } from './components/DashboardOverlay'

const API_BASE = 'http://127.0.0.1:8000'

// Default positions matching referensi1.png diorama
const INITIAL_AGENTS = {
  'blue-agent': {
    id: 'blue-agent',
    name: 'blue-agent',
    role: 'Compute',
    color: '#0284c7',
    pos: [-3.8, 0, 1.15],
    statusText: 'Active Compute',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI,
  },
  'purple-agent': {
    id: 'purple-agent',
    name: 'purple-agent',
    role: 'Sales AI',
    color: '#9333ea',
    pos: [3.6, 0, -3.2],
    statusText: 'Kanban sync',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI,
  },
  'yellow-agent': {
    id: 'yellow-agent',
    name: 'yellow-agent',
    role: 'Gatekeeper',
    color: '#eab308',
    pos: [2.2, 0, 2.6],
    statusText: 'Access Control',
    isBusy: false,
    isWalking: false,
    rotationY: -Math.PI / 2,
  },
  'orange-agent': {
    id: 'orange-agent',
    name: 'orange-agent',
    role: 'Strategist',
    color: '#f97316',
    pos: [-2.2, 0, -3.2],
    statusText: 'Ideas & Planning',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI,
  },
  'green-agent': {
    id: 'green-agent',
    name: 'green-agent',
    role: 'Research',
    color: '#22c55e',
    pos: [-0.6, 0, -3.2],
    statusText: 'Catalog Match',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI,
  },
}

export default function App() {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [selectedAgentId, setSelectedAgentId] = useState('blue-agent')
  const [systemInfo, setSystemInfo] = useState(null)
  const [leads, setLeads] = useState([])
  const [activeLead, setActiveLead] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pitchResult, setPitchResult] = useState(null)

  // Fetch initial health and leads queue from FastAPI
  const fetchData = async () => {
    try {
      // 1. Health check
      const healthRes = await fetch(`${API_BASE}/api/v1/system/health`)
      if (healthRes.ok) {
        const data = await healthRes.json()
        setSystemInfo(data)
      }

      // 2. Leads queue
      const leadsRes = await fetch(`${API_BASE}/api/v1/leads/queue`)
      if (leadsRes.ok) {
        const data = await leadsRes.json()
        setLeads(data.leads || [])
      }
    } catch {
      // Fallback simulation when backend is offline
      setSystemInfo({
        status: 'simulated',
        appliance: 'MSI Cubi NUC AI+ B206',
        local_llm: 'qwen2.5:3b',
      })
      setLeads([
        {
          id_lead: 'LD-001',
          nama: 'Budi Hartono',
          minat: 'Cari motor gesit harian irit bensin',
          budget_dp: '4000000',
          domisili: 'Surabaya',
          score_priority: 'Hot',
        },
        {
          id_lead: 'LD-002',
          nama: 'Siti Rahma',
          minat: 'Butuh matic bagasi besar belanja',
          budget_dp: '2500000',
          domisili: 'Sidoarjo',
          score_priority: 'Warm',
        },
        {
          id_lead: 'LD-003',
          nama: 'Andi Saputra',
          minat: 'Motor sport touring akhir pekan',
          budget_dp: '5000000',
          domisili: 'Gresik',
          score_priority: 'Hot',
        },
      ])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Action: Assign lead to agent for pitch generation
  const handleSelectLead = async (lead) => {
    setActiveLead(lead)
    setIsGenerating(true)
    setPitchResult(null)
    setSelectedAgentId('purple-agent')

    // Animate Blue Agent (Scout compute) and Purple Agent (Pitch draft)
    setAgents((prev) => ({
      ...prev,
      'blue-agent': { ...prev['blue-agent'], isBusy: true, statusText: `Scoring ${lead.nama}` },
      'purple-agent': { ...prev['purple-agent'], isBusy: true, statusText: `Drafting Qwen Pitch...` },
    }))

    try {
      const res = await fetch(`${API_BASE}/api/v1/leads/generate-pitch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_lead: lead.id_lead,
          nama: lead.nama,
          minat: lead.minat,
          domisili: lead.domisili,
        }),
      })

      let data
      if (res.ok) {
        data = await res.json()
      } else {
        throw new Error('API Generate Failed')
      }

      setPitchResult(data)
      setIsGenerating(false)
      setSelectedAgentId('yellow-agent') // Select gatekeeper for approval

      setAgents((prev) => ({
        ...prev,
        'blue-agent': { ...prev['blue-agent'], isBusy: false, statusText: 'Active Compute' },
        'purple-agent': { ...prev['purple-agent'], isBusy: false, statusText: 'Pitch Ready' },
        'yellow-agent': { ...prev['yellow-agent'], isBusy: true, statusText: 'Approval Required' },
      }))
    } catch {
      // Offline fallback pitch
      const fallbackData = {
        id_lead: lead.id_lead,
        unit_rekomendasi: 'Beat Street',
        draft_pitch: `Halo Kak ${lead.nama}, kami lihat Kakak butuh motor untuk ${lead.minat}. Unit Beat Street sedang ready di ${lead.domisili} dengan diskon DP spesial hari ini. Apakah berkenan kami kirimkan rincian simulasinya?`,
        approval_required: true,
      }
      setPitchResult(fallbackData)
      setIsGenerating(false)
      setSelectedAgentId('yellow-agent')

      setAgents((prev) => ({
        ...prev,
        'blue-agent': { ...prev['blue-agent'], isBusy: false, statusText: 'Active Compute' },
        'purple-agent': { ...prev['purple-agent'], isBusy: false, statusText: 'Pitch Ready (Simulated)' },
        'yellow-agent': { ...prev['yellow-agent'], isBusy: true, statusText: 'Approval Required' },
      }))
    }
  }

  // Action: Approve & Send outreach via Gateway
  const handleApprovePitch = async (payload) => {
    if (!payload) {
      setPitchResult(null)
      setAgents((prev) => ({
        ...prev,
        'yellow-agent': { ...prev['yellow-agent'], isBusy: false, statusText: 'Access Control' },
      }))
      return
    }

    setAgents((prev) => ({
      ...prev,
      'yellow-agent': { ...prev['yellow-agent'], isBusy: true, statusText: 'Dispatching WhatsApp...' },
    }))

    try {
      await fetch(`${API_BASE}/api/v1/leads/approve-and-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // ignore
    }

    setPitchResult(null)
    setActiveLead(null)

    setTimeout(() => {
      setAgents(INITIAL_AGENTS)
      setSelectedAgentId('blue-agent')
    }, 1500)
  }

  return (
    <main className="w-screen h-screen relative bg-slate-100 overflow-hidden select-none">
      {/* 3D The Sims Isometric Office Diorama */}
      <OfficeScene
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
      />

      {/* Modern White / Blue SaaS Overlay */}
      <DashboardOverlay
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
        leads={leads}
        systemInfo={systemInfo}
        activeLead={activeLead}
        isGenerating={isGenerating}
        pitchResult={pitchResult}
        onSelectLead={handleSelectLead}
        onApprovePitch={handleApprovePitch}
        onRefresh={fetchData}
      />
    </main>
  )
}
