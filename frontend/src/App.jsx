import React, { useState, useEffect } from 'react'
import { OfficeScene } from './components/OfficeScene'
import { DashboardOverlay } from './components/DashboardOverlay'

const API_BASE = 'http://127.0.0.1:8000'

// Desk & Lounge Coordinates
const POSITIONS = {
  SCOUT_DESK: [-3.2, 0, -1.75],
  SALES_DESK: [0.6, 0, -1.75],
  SALES_LOUNGE: [-6.2, 0, 3.0],
  COMMANDER_DESK: [5.5, 0, -1.75],
}

const INITIAL_AGENTS = {
  scout: {
    pos: POSITIONS.SCOUT_DESK,
    statusText: 'Scouting Leads CSV',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI, // Facing desk
  },
  sales: {
    pos: POSITIONS.SALES_LOUNGE, // Resting at lounge sofa initially
    statusText: 'Coffee Break / Standby',
    isBusy: false,
    isWalking: false,
    rotationY: 0, // Facing lounge
  },
  dispatcher: {
    pos: POSITIONS.COMMANDER_DESK,
    statusText: 'Executive Approval Ready',
    isBusy: false,
    isWalking: false,
    rotationY: Math.PI, // Facing desk
  },
}

export default function App() {
  const [agentsState, setAgentsState] = useState(INITIAL_AGENTS)
  const [systemInfo, setSystemInfo] = useState(null)
  const [leads, setLeads] = useState([])
  const [activeLead, setActiveLead] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pitchResult, setPitchResult] = useState(null)
  const [logs, setLogs] = useState([
    {
      sender: 'System',
      message: 'Minimalist 3D AI Agent Office initialized.',
      time: new Date().toLocaleTimeString(),
    },
  ])

  const addLog = (sender, message) => {
    setLogs((prev) => [
      { sender, message, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 30),
    ])
  }

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
        addLog('Scout', `Sinkronisasi data antrean: ${data.total || 0} leads siap diproses.`)
      }
    } catch (err) {
      console.warn('Backend offline fallback:', err)
      addLog('System', 'Backend belum berjalan di port 8000. Mode simulasi aktif.')
      setSystemInfo({
        status: 'simulated',
        appliance: 'MSI Cubi NUC AI+ B206 (Local)',
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

  // Action: Select lead to process with AI Sales
  const handleSelectLead = async (lead) => {
    setActiveLead(lead)
    setIsGenerating(true)
    setPitchResult(null)

    // Step 1: Scout reviews lead, Scribe gets up from sofa
    setAgentsState((prev) => ({
      ...prev,
      scout: { ...prev.scout, isBusy: true, statusText: `Analisis minat ${lead.nama}...` },
      sales: { 
        ...prev.sales, 
        pos: [-2.0, 0, 0.5], // Intermediate walking waypoint
        isWalking: true, 
        statusText: 'Berjalan ke Meja Kerja...',
        rotationY: -Math.PI / 3 
      },
    }))
    addLog('Scout', `Menganalisis Lead #${lead.id_lead} (${lead.nama}) - DP Rp ${parseInt(lead.budget_dp).toLocaleString('id-ID')}`)

    // Step 2: Scribe sits at desk and starts typing
    setTimeout(() => {
      setAgentsState((prev) => ({
        ...prev,
        scout: { ...prev.scout, isBusy: false, statusText: 'Monitoring Radar Leads' },
        sales: {
          pos: POSITIONS.SALES_DESK,
          isWalking: false,
          isBusy: true,
          statusText: `Drafting WhatsApp via Qwen2.5...`,
          rotationY: Math.PI, // Facing monitor
        },
      }))
      addLog('Scribe', `Mencocokkan katalog & menyusun penawaran WhatsApp untuk ${lead.nama}...`)
    }, 1200)

    // Step 3: Call backend to generate pitch
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

      setAgentsState((prev) => ({
        ...prev,
        sales: { ...prev.sales, isBusy: false, statusText: 'Draft Siap! Menunggu Review' },
        dispatcher: { ...prev.dispatcher, isBusy: true, statusText: 'Menunggu Approval Anda' },
      }))
      addLog('Scribe', `Draft penawaran unit ${data.unit_rekomendasi} selesai. Dikirim ke Commander.`)
      addLog('Commander', 'Menunggu persetujuan user pada Approval Gate.')
    } catch {
      // Fallback response if local backend or Ollama is offline
      const fallbackData = {
        id_lead: lead.id_lead,
        unit_rekomendasi: 'Beat Street',
        draft_pitch: `Halo Kak ${lead.nama}, kami lihat Kakak butuh motor untuk ${lead.minat}. Unit Beat Street sedang ready di ${lead.domisili} dengan diskon DP spesial hari ini. Apakah berkenan kami kirimkan rincian simulasinya?`,
        approval_required: true,
      }
      setPitchResult(fallbackData)
      setIsGenerating(false)
      setAgentsState((prev) => ({
        ...prev,
        sales: { ...prev.sales, isBusy: false, statusText: 'Draft Siap (Simulasi)' },
        dispatcher: { ...prev.dispatcher, isBusy: true, statusText: 'Menunggu Approval Anda' },
      }))
      addLog('Scribe', 'Draft selesai dibuat (mode fallback). Menunggu verifikasi human-in-the-loop.')
    }
  }

  // Action: Approve & Send outreach
  const handleApprovePitch = async (payload) => {
    if (!payload) {
      // User cancelled
      setPitchResult(null)
      setAgentsState((prev) => ({
        ...prev,
        dispatcher: { ...prev.dispatcher, isBusy: false, statusText: 'Executive Approval Ready' },
      }))
      addLog('Commander', 'Pengiriman dibatalkan oleh pengguna.')
      return
    }

    setAgentsState((prev) => ({
      ...prev,
      dispatcher: { ...prev.dispatcher, isBusy: true, statusText: 'Mengirim Pesan ke Gateway...' },
    }))

    try {
      const res = await fetch(`${API_BASE}/api/v1/leads/approve-and-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        addLog('Commander', `SUKSES: Pesan terkirim ke WhatsApp ${data.target_wa}!`)
      } else {
        addLog('Commander', `Pesan berhasil diproses ke antrean WhatsApp!`)
      }
    } catch {
      addLog('Commander', `Simulasi pengiriman WhatsApp ke ${payload.nomor_wa} berhasil diproses!`)
    }

    setPitchResult(null)
    setActiveLead(null)

    // Agents smoothly reset to resting positions
    setTimeout(() => {
      setAgentsState((prev) => ({
        ...prev,
        sales: {
          ...prev.sales,
          isWalking: true,
          statusText: 'Kembali ke Lounge Area...',
          pos: POSITIONS.SALES_LOUNGE,
          rotationY: 0,
        },
        dispatcher: {
          ...prev.dispatcher,
          isBusy: false,
          statusText: 'Executive Approval Ready',
        },
      }))
      setTimeout(() => {
        setAgentsState(INITIAL_AGENTS)
        addLog('System', 'Misi selesai. Scribe kembali santai di lounge sofa.')
      }, 1200)
    }, 1500)
  }

  return (
    <main className="w-screen h-screen relative bg-[#0b0f19] overflow-hidden select-none">
      {/* 3D WebGL Canvas Layer */}
      <OfficeScene agentsState={agentsState} />

      {/* Floating 2D Glassmorphism HUD Controls Layer */}
      <DashboardOverlay
        leads={leads}
        systemInfo={systemInfo}
        logs={logs}
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
