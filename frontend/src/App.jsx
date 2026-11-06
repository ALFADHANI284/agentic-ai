import React, { useState, useEffect, useRef } from 'react'
import { OfficeScene } from './components/OfficeScene'
import { DashboardOverlay } from './components/DashboardOverlay'
import { TeamSetupModal } from './components/TeamSetupModal'
import { CreateLeadModal } from './components/CreateLeadModal'

const API_BASE = 'http://127.0.0.1:8000'

// Titik Koordinat Stasiun Kerja di Diorama Kantor
const STATIONS = {
  boss_desk: [-5.2, 0.18, 1.35],
  workstation_desk: [-2.8, 0.18, 1.65],
  kanban_board: [4.0, 0.18, -2.6],
  security_gate: [2.0, 0.18, 1.5],
  data_vault: [-4.2, 0.18, -3.8],
  center_hall: [0, 0.18, 0],
}

const DEFAULT_BOSS = {
  name: 'Pak Alfa',
  role: 'Sales Director',
  color: '#f59e0b',
  badge: 'DIRECTOR',
  pos: STATIONS.boss_desk,
  targetPos: STATIONS.boss_desk,
  rotationY: 0,
  isWalking: false,
  isTyping: false,
  statusText: 'Supervising Office & Deals',
}

const DEFAULT_AGENTS = {
  'blue-agent': {
    id: 'blue-agent',
    name: 'Cubi Scout',
    role: 'Compute & Stock Analyzer',
    color: '#0284c7',
    pos: STATIONS.workstation_desk,
    targetPos: STATIONS.workstation_desk,
    rotationY: Math.PI,
    isWalking: false,
    isTyping: true,
    isScanning: false,
    statusText: 'Monitoring Stock & Catalog',
    station: 'Workstation Desk',
  },
  'purple-agent': {
    id: 'purple-agent',
    name: 'Cubi Scribe',
    role: 'AI Pitch Drafter',
    color: '#9333ea',
    pos: STATIONS.kanban_board,
    targetPos: STATIONS.kanban_board,
    rotationY: Math.PI,
    isWalking: false,
    isTyping: false,
    isScanning: false,
    statusText: 'Sprint Task Ready',
    station: 'Kanban Wall',
  },
  'green-agent': {
    id: 'green-agent',
    name: 'Cubi Gate',
    role: 'Approval & Dispatch',
    color: '#16a34a',
    pos: STATIONS.security_gate,
    targetPos: STATIONS.security_gate,
    rotationY: -Math.PI / 3,
    isWalking: false,
    isTyping: false,
    isScanning: false,
    statusText: 'WhatsApp Gateway Standby',
    station: 'Turnstile Gate',
  },
  'orange-agent': {
    id: 'orange-agent',
    name: 'Cubi Vault',
    role: 'Data & Deal Archivist',
    color: '#ea580c',
    pos: STATIONS.data_vault,
    targetPos: STATIONS.data_vault,
    rotationY: Math.PI / 4,
    isWalking: false,
    isTyping: false,
    isScanning: false,
    statusText: 'Database & Inventory Synced',
    station: 'Server Rack & Vault',
  },
}

export default function App() {
  const [bossConfig, setBossConfig] = useState(DEFAULT_BOSS)
  const [agents, setAgents] = useState(DEFAULT_AGENTS)
  const [selectedAgentId, setSelectedAgentId] = useState('boss')
  const [systemInfo, setSystemInfo] = useState(null)
  const [leads, setLeads] = useState([])
  const [activities, setActivities] = useState([])
  const [activeLead, setActiveLead] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pitchResult, setPitchResult] = useState(null)

  // Modals state
  const [isTeamSetupOpen, setIsTeamSetupOpen] = useState(false)
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false)

  // Fetch data dari FastAPI Backend
  const fetchData = async () => {
    try {
      // 1. Health
      const healthRes = await fetch(`${API_BASE}/api/v1/system/health`)
      if (healthRes.ok) {
        const data = await healthRes.json()
        setSystemInfo(data)
      }

      // 2. Team Config
      const teamRes = await fetch(`${API_BASE}/api/v1/team/config`)
      if (teamRes.ok) {
        const teamData = await teamRes.json()
        if (teamData.boss) {
          setBossConfig((prev) => ({ ...prev, ...teamData.boss }))
        }
        if (teamData.agents) {
          setAgents((prev) => {
            const next = { ...prev }
            for (const [k, v] of Object.entries(teamData.agents)) {
              if (next[k]) {
                next[k] = { ...next[k], ...v }
              }
            }
            return next
          })
        }
      }

      // 3. Leads
      const leadsRes = await fetch(`${API_BASE}/api/v1/leads/queue`)
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json()
        setLeads(leadsData.leads || [])
      }

      // 4. Activities
      const actRes = await fetch(`${API_BASE}/api/v1/system/activities`)
      if (actRes.ok) {
        const actData = await actRes.json()
        setActivities(actData.activities || [])
      }
    } catch {
      // Simulasi Fallback bila backend belum dinyalakan
      setSystemInfo({
        status: 'simulated',
        appliance: 'MSI Cubi NUC AI+ B206',
        local_llm: 'qwen2.5:3b',
      })
      setLeads([
        {
          id_lead: 'LD-001',
          nama: 'Budi Santoso',
          nomor_wa: '6281234567801',
          minat: 'harian lincah hemat irit komuter',
          budget_dp: '2500000',
          domisili: 'Purwokerto Timur',
          status_kontak: 'pending',
          score_priority: 'Warm',
        },
        {
          id_lead: 'LD-002',
          nama: 'Hendra Pratama',
          nomor_wa: '6281234567802',
          minat: 'touring jarak jauh nyaman',
          budget_dp: '5000000',
          domisili: 'Purwokerto Timur',
          status_kontak: 'pending',
          score_priority: 'Hot',
        },
        {
          id_lead: 'LD-003',
          nama: 'Siti Aminah',
          nomor_wa: '6281234567803',
          minat: 'sporty komuter kencang',
          budget_dp: '3500000',
          domisili: 'Banyumas Kota',
          status_kontak: 'pending',
          score_priority: 'Hot',
        },
      ])
    }
  }

  useEffect(() => {
    fetchData()
    // Cek apakah setup tim sudah pernah disimpan
    const hasSetup = localStorage.getItem('cubi_team_setup_done')
    if (!hasSetup) {
      setIsTeamSetupOpen(true)
    }

    const interval = setInterval(() => {
      fetchData()
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Simpan Konfigurasi Tim ke Backend & LocalStorage
  const handleSaveTeamConfig = async (newConfig) => {
    localStorage.setItem('cubi_team_setup_done', 'true')
    setBossConfig((prev) => ({ ...prev, ...newConfig.boss }))
    setAgents((prev) => {
      const next = { ...prev }
      for (const [k, v] of Object.entries(newConfig.agents || {})) {
        if (next[k]) {
          next[k] = { ...next[k], ...v }
        }
      }
      return next
    })

    try {
      await fetch(`${API_BASE}/api/v1/team/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      })
      fetchData()
    } catch {
      // offline mode
    }
  }

  // Tambah Lead Baru ke Backend
  const handleCreateLead = async (leadData) => {
    try {
      await fetch(`${API_BASE}/api/v1/leads/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })
      fetchData()
    } catch {
      // Offline fallback
      setLeads((prev) => [
        ...prev,
        {
          id_lead: `LD-${String(prev.length + 1).padStart(3, '0')}`,
          ...leadData,
          status_kontak: 'pending',
          score_priority: leadData.budget_dp >= 3500000 ? 'Hot' : 'Warm',
        },
      ])
    }
  }

  // Koreografi Eksekusi & Gerakan Berjalan Robot Sesuai Logika BE
  const handleSelectLead = async (lead) => {
    setActiveLead(lead)
    setIsGenerating(true)
    setPitchResult(null)

    const bossName = bossConfig.name || 'Pak Alfa'
    const scoutName = agents['blue-agent']?.name || 'Cubi Scout'
    const scribeName = agents['purple-agent']?.name || 'Cubi Scribe'
    const gateName = agents['green-agent']?.name || 'Cubi Gate'
    const vaultName = agents['orange-agent']?.name || 'Cubi Vault'

    // LANGKAH 1: Bos menugaskan tim dari meja eksekutif
    setSelectedAgentId('boss')
    setBossConfig((prev) => ({
      ...prev,
      statusText: `Menugaskan prospek ${lead.nama} ke ${scoutName}`,
    }))

    // LANGKAH 2: Cubi Scout berjalan dari meja kerja ke Server Rack & Vault untuk riset katalog & stok
    setTimeout(() => {
      setSelectedAgentId('blue-agent')
      setAgents((prev) => ({
        ...prev,
        'blue-agent': {
          ...prev['blue-agent'],
          isTyping: false,
          isWalking: true,
          targetPos: [-4.6, 0.18, -3.2], // Bergerak ke area vault
          statusText: `Berjalan ke Vault untuk riset ${lead.minat}...`,
        },
      }))
    }, 600)

    // LANGKAH 3: Cubi Scout tiba di Vault, melakukan scanning
    setTimeout(() => {
      setAgents((prev) => ({
        ...prev,
        'blue-agent': {
          ...prev['blue-agent'],
          isWalking: false,
          isScanning: true,
          statusText: `Mengecek ketersediaan unit & bundling di cabang ${lead.domisili}`,
        },
      }))
    }, 2000)

    // LANGKAH 4: Cubi Scribe berjalan dari Kanban ke meja kerja untuk mengetik draf via Qwen LLM
    setTimeout(() => {
      setSelectedAgentId('purple-agent')
      setAgents((prev) => ({
        ...prev,
        'purple-agent': {
          ...prev['purple-agent'],
          isWalking: true,
          targetPos: STATIONS.workstation_desk, // Menuju meja workstation
          statusText: `Berjalan ke Workstation untuk menyusun draf pitch...`,
        },
      }))
    }, 3200)

    // LANGKAH 5: Cubi Scribe duduk mengetik di meja, dan Cubi Scout kembali ke stasiun
    setTimeout(async () => {
      setAgents((prev) => ({
        ...prev,
        'purple-agent': {
          ...prev['purple-agent'],
          isWalking: false,
          isTyping: true,
          statusText: `Menyusun draf WhatsApp dengan Qwen 2.5...`,
        },
        'blue-agent': {
          ...prev['blue-agent'],
          isScanning: false,
          isWalking: true,
          targetPos: STATIONS.workstation_desk,
          statusText: `Analisis stok selesai. Unit siap ditawarkan!`,
        },
      }))

      // Panggil API Backend Generate Pitch
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

        // LANGKAH 6: Cubi Gate menuju Security Turnstile bersiap minta persetujuan Bos
        setAgents((prev) => ({
          ...prev,
          'purple-agent': {
            ...prev['purple-agent'],
            isTyping: false,
            targetPos: STATIONS.kanban_board,
            statusText: `Draf pitch selesai untuk ${lead.nama}`,
          },
          'green-agent': {
            ...prev['green-agent'],
            isWalking: true,
            targetPos: [1.8, 0.18, 2.2],
            statusText: `Menunggu Approval Bos untuk WhatsApp Dispatch`,
          },
        }))
        fetchData()
      } catch {
        // Fallback cerdas saat backend offline
        const fallbackData = {
          id_lead: lead.id_lead,
          unit_rekomendasi: 'Beat Street CBS',
          bundling_promo: 'Helm Retro Astra & Voucher Gratis Servis 1 Tahun',
          stok_info: `Ready di Cabang ${lead.domisili}`,
          draft_pitch: `Halo Kak ${lead.nama}, salam hangat dari Astra Motor! Kami perhatikan Kakak sedang mencari kendaraan untuk ${lead.minat}. Unit Beat Street CBS sedang ready di cabang ${lead.domisili} lengkap dengan promo bundling Helm Retro & Gratis Servis 1 Tahun serta diskon DP spesial. Apakah berkenan kami kirimkan rincian simulasi angsurannya?`,
          approval_required: true,
        }
        setPitchResult(fallbackData)
        setIsGenerating(false)
        setSelectedAgentId('green-agent')

        setAgents((prev) => ({
          ...prev,
          'purple-agent': {
            ...prev['purple-agent'],
            isTyping: false,
            statusText: `Draf pitch siap (Simulated)`,
          },
          'green-agent': {
            ...prev['green-agent'],
            statusText: `Menunggu Approval Bos untuk WhatsApp Dispatch`,
          },
        }))
      }
    }, 4500)
  }

  // Aksi: Setujui & Dispatch WhatsApp ke Calon Konsumen
  const handleApprovePitch = async (payload) => {
    if (!payload) {
      setPitchResult(null)
      setAgents((prev) => ({
        ...prev,
        'green-agent': {
          ...prev['green-agent'],
          statusText: 'WhatsApp Gateway Standby',
          targetPos: STATIONS.security_gate,
        },
      }))
      return
    }

    // Cubi Gate mengaktifkan transmisi pengiriman WhatsApp
    setSelectedAgentId('green-agent')
    setAgents((prev) => ({
      ...prev,
      'green-agent': {
        ...prev['green-agent'],
        statusText: `Mengirim pesan ke ${payload.nomor_wa}...`,
      },
      'orange-agent': {
        ...prev['orange-agent'],
        isWalking: true,
        targetPos: [-5.0, 0.18, -3.8],
        statusText: `Mengarsipkan data deal prospek ${payload.id_lead} ke CSV...`,
      },
    }))

    try {
      await fetch(`${API_BASE}/api/v1/leads/approve-and-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // offline
    }

    setPitchResult(null)
    setActiveLead(null)

    // Kembalikan semua agen ke stasiun semula dengan status sukses
    setTimeout(() => {
      fetchData()
      setBossConfig((prev) => ({
        ...prev,
        statusText: `Deal prospek ${payload.id_lead} berhasil didispatch!`,
      }))
      setAgents((prev) => ({
        ...prev,
        'green-agent': {
          ...prev['green-agent'],
          isWalking: false,
          targetPos: STATIONS.security_gate,
          statusText: 'Pesan terkirim ke WhatsApp Gateway!',
        },
        'orange-agent': {
          ...prev['orange-agent'],
          isWalking: false,
          targetPos: STATIONS.data_vault,
          statusText: 'Data prospek berhasil diperbarui di database.',
        },
        'purple-agent': {
          ...prev['purple-agent'],
          targetPos: STATIONS.kanban_board,
          statusText: 'Siap untuk prospek berikutnya',
        },
        'blue-agent': {
          ...prev['blue-agent'],
          targetPos: STATIONS.workstation_desk,
          isTyping: true,
          statusText: 'Monitoring Stock & Catalog',
        },
      }))
    }, 2000)
  }

  // Otomatisasi Pipeline untuk Memproses Semua Antrean Leads yang Belum Dispatched
  const handleRunAutoPipeline = async () => {
    const pendingLeads = leads.filter(
      (l) => l.status_kontak !== 'dispatched' && l.status_kontak !== 'approved'
    )
    if (pendingLeads.length === 0) {
      alert('Semua prospek dalam antrean sudah selesai diproses!')
      return
    }
    // Proses lead pertama yang pending
    handleSelectLead(pendingLeads[0])
  }

  return (
    <main className="w-screen h-screen relative bg-slate-200 overflow-hidden select-none">
      {/* 3D Diorama Kantor Virtual Modern MSI Cubi NUC */}
      <OfficeScene
        agents={agents}
        bossConfig={bossConfig}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
        leads={leads}
        activeLead={activeLead}
        pitchResult={pitchResult}
      />

      {/* Modern White & Blue Dashboard SaaS HUD */}
      <DashboardOverlay
        agents={agents}
        bossConfig={bossConfig}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
        leads={leads}
        activities={activities}
        systemInfo={systemInfo}
        activeLead={activeLead}
        isGenerating={isGenerating}
        pitchResult={pitchResult}
        onSelectLead={handleSelectLead}
        onApprovePitch={handleApprovePitch}
        onRefresh={fetchData}
        onOpenTeamSetup={() => setIsTeamSetupOpen(true)}
        onOpenCreateLead={() => setIsCreateLeadOpen(true)}
        onRunAutoPipeline={handleRunAutoPipeline}
      />

      {/* Modal Personalisasi Nama Bos & Tim Cubi */}
      <TeamSetupModal
        isOpen={isTeamSetupOpen}
        onClose={() => setIsTeamSetupOpen(false)}
        teamConfig={{ boss: bossConfig, agents }}
        onSave={handleSaveTeamConfig}
      />

      {/* Modal Tambah Lead Baru */}
      <CreateLeadModal
        isOpen={isCreateLeadOpen}
        onClose={() => setIsCreateLeadOpen(false)}
        onCreateLead={handleCreateLead}
      />
    </main>
  )
}
