import React, { useState, useEffect } from 'react'
import { OfficeScene } from './components/OfficeScene'
import { DashboardOverlay } from './components/DashboardOverlay'

const API_BASE = 'http://127.0.0.1:8000'

// 4 Agen Robot Mini Sesuai Spesifikasi Poin 5
const INITIAL_AGENTS = {
  'blue-agent': {
    id: 'blue-agent',
    name: 'Robot Biru',
    role: 'Compute',
    color: '#0284c7',
    pos: [-4.0, 0.18, 1.45],
    statusText: 'Active Compute',
    isTyping: true,
    rotationY: Math.PI,
  },
  'orange-agent': {
    id: 'orange-agent',
    name: 'Robot Oranye',
    role: 'Vault Storage',
    color: '#ea580c',
    pos: [-4.2, 0.18, -3.8],
    statusText: 'Vault Storage',
    isTyping: false,
    rotationY: Math.PI / 4,
  },
  'green-agent': {
    id: 'green-agent',
    name: 'Robot Hijau',
    role: 'Gate Control',
    color: '#16a34a',
    pos: [1.8, 0.18, 2.2],
    statusText: 'Access Control',
    isTyping: false,
    rotationY: -Math.PI / 3,
  },
  'purple-agent': {
    id: 'purple-agent',
    name: 'Robot Ungu',
    role: 'Task Manager',
    color: '#9333ea',
    pos: [4.2, 0.18, -2.8],
    statusText: 'Task Manager',
    isTyping: false,
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

  // Fetch initial health & leads queue dari FastAPI
  const fetchData = async () => {
    try {
      const healthRes = await fetch(`${API_BASE}/api/v1/system/health`)
      if (healthRes.ok) {
        const data = await healthRes.json()
        setSystemInfo(data)
      }

      const leadsRes = await fetch(`${API_BASE}/api/v1/leads/queue`)
      if (leadsRes.ok) {
        const data = await leadsRes.json()
        setLeads(data.leads || [])
      }
    } catch {
      // Fallback simulasi saat backend offline
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

  // Aksi: Tugaskan lead ke agen
  const handleSelectLead = async (lead) => {
    setActiveLead(lead)
    setIsGenerating(true)
    setPitchResult(null)
    setSelectedAgentId('purple-agent')

    // Robot Ungu mulai mengetik draf di depan papan Kanban
    setAgents((prev) => ({
      ...prev,
      'purple-agent': {
        ...prev['purple-agent'],
        isTyping: true,
        statusText: `Drafting Pitch ${lead.nama}...`,
      },
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
      setSelectedAgentId('green-agent')

      setAgents((prev) => ({
        ...prev,
        'purple-agent': { ...prev['purple-agent'], isTyping: false, statusText: 'Pitch Ready' },
        'green-agent': { ...prev['green-agent'], statusText: 'Approval Required' },
      }))
    } catch {
      const fallbackData = {
        id_lead: lead.id_lead,
        unit_rekomendasi: 'Beat Street',
        draft_pitch: `Halo Kak ${lead.nama}, kami lihat Kakak butuh motor untuk ${lead.minat}. Unit Beat Street sedang ready di ${lead.domisili} dengan diskon DP spesial hari ini. Apakah berkenan kami kirimkan rincian simulasinya?`,
        approval_required: true,
      }
      setPitchResult(fallbackData)
      setIsGenerating(false)
      setSelectedAgentId('green-agent')

      setAgents((prev) => ({
        ...prev,
        'purple-agent': { ...prev['purple-agent'], isTyping: false, statusText: 'Pitch Ready (Simulated)' },
        'green-agent': { ...prev['green-agent'], statusText: 'Approval Required' },
      }))
    }
  }

  // Aksi: Setujui & Dispatch WhatsApp
  const handleApprovePitch = async (payload) => {
    if (!payload) {
      setPitchResult(null)
      setAgents((prev) => ({
        ...prev,
        'green-agent': { ...prev['green-agent'], statusText: 'Access Control' },
      }))
      return
    }

    setAgents((prev) => ({
      ...prev,
      'green-agent': { ...prev['green-agent'], statusText: 'Dispatching WA...' },
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
      {/* 3D Diorama Ruangan Kantor Isometrik */}
      <OfficeScene
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
      />

      {/* Modern White & Blue Dashboard SaaS */}
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
