import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Layers, 
  Send, 
  RefreshCw, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  EyeOff, 
  Crown, 
  PlusCircle, 
  Play, 
  Activity, 
  CheckCircle2, 
  PackageCheck, 
  DoorOpen,
  Wifi,
  WifiOff,
  Terminal,
  AlertTriangle,
  Database,
  Building2,
  SlidersHorizontal,
  Home,
  LayoutDashboard,
  HardDrive,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react'

export function DashboardOverlay({
  agents,
  bossConfig,
  officeName = 'MSI Cubi Sovereign AI HQ',
  selectedAgentId,
  onSelectAgent,
  leads = [],
  systemInfo,
  isBackendConnected = false,
  activeLead,
  isGenerating,
  pitchResult,
  activities = [],
  onSelectLead,
  onApprovePitch,
  onRefresh,
  onOpenTeamSetup,
  onOpenOfficeSetup,
  onOpenCreateLead,
  onRunAutoPipeline,
  onOpenEntrance,
  onNavigate,
  activePOV = 'overview',
  onChangePOV,
  onZoom,
  onResetPOV,
  onTogglePure3D,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('leads') // 'leads' | 'activity'
  const [editedPitch, setEditedPitch] = useState('')
  const [waNumber, setWaNumber] = useState('081234567890')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isHudVisible, setIsHudVisible] = useState(true)
  const [commandText, setCommandText] = useState('')
  const [commandFeedback, setCommandFeedback] = useState('Sistem siap menerima instruksi terminal.')

  const handleSendCommand = (e) => {
    e.preventDefault()
    if (!commandText.trim()) return

    const cmd = commandText.trim()
    setCommandText('')
    const lower = cmd.toLowerCase()

    if (lower.includes('auto') || lower.includes('pipeline') || lower.includes('proses')) {
      setCommandFeedback('[PERINTAH DITERIMA]: Menjalankan Auto Pipeline prospek...')
      if (onRunAutoPipeline) onRunAutoPipeline()
    } else if (lower.includes('sync') || lower.includes('refresh') || lower.includes('sinkron')) {
      setCommandFeedback('[PERINTAH DITERIMA]: Sinkronisasi data real-time ke backend...')
      if (onRefresh) onRefresh()
    } else if (lower.includes('lead') || lower.includes('prospek')) {
      if (leads && leads.length > 0 && onSelectLead) {
        setCommandFeedback(`[PERINTAH DITERIMA]: Menugaskan Sales Engineer ke ${leads[0].nama}...`)
        onSelectLead(leads[0])
      } else {
        setCommandFeedback('[INFO]: Antrean prospek kosong atau sudah selesai.')
      }
    } else {
      setCommandFeedback(`[PERINTAH DIEKSEKUSI]: "${cmd}" -> Diteruskan ke ${getSelectedData().name}`)
    }
  }

  // Runtime timer counter
  const [elapsedSecs, setElapsedSecs] = useState(134.8)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSecs((prev) => prev + 0.5)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (pitchResult?.draft_pitch) {
      setEditedPitch(pitchResult.draft_pitch)
    }
  }, [pitchResult])

  useEffect(() => {
    if (activeLead?.nomor_wa) {
      setWaNumber(activeLead.nomor_wa)
    }
  }, [activeLead])

  // Cari data agent yang sedang aktif dipilih
  const getSelectedData = () => {
    if (selectedAgentId === 'boss') {
      return {
        id: 'boss',
        name: bossConfig?.name || 'Pak Alfa',
        role: bossConfig?.role || 'Sales Director',
        color: '#192A56',
        pos: bossConfig?.pos || [-5.8, 0.18, 2.3],
        statusText: bossConfig?.statusText || 'Supervising Office & Deals',
        station: 'Executive Suite',
        feature: 'Deal Approver & Management',
        tokens: isBackendConnected ? '4,120 tok' : '0 tok (Offline)',
      }
    }
    const ag = agents?.[selectedAgentId] || agents?.['blue-agent']
    const roleFeatures = {
      'blue-agent': { feature: 'Local Hardware Compute & Stock', tokens: '14,850 tok' },
      'purple-agent': { feature: 'Qwen 2.5 3B Local AI Drafter', tokens: '28,420 tok' },
      'green-agent': { feature: 'WhatsApp Cloud Gateway', tokens: '8,920 tok' },
      'orange-agent': { feature: 'Persistent CSV Data Vault', tokens: '6,100 tok' },
    }
    return {
      ...(ag || {
        name: 'Cubi Agent',
        role: 'Agent',
        color: '#0284c7',
        pos: [0, 0, 0],
        statusText: 'Active',
        station: 'Desk 01',
      }),
      feature: roleFeatures[ag?.id]?.feature || 'MSI Cubi NUC Appliance',
      tokens: isBackendConnected ? roleFeatures[ag?.id]?.tokens || '12,840 tok' : '0 tok (Offline)',
    }
  }

  const currentAgent = getSelectedData()

  // Filter leads berdasarkan search
  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase()
    return (
      (l.nama || '').toLowerCase().includes(q) ||
      (l.minat || '').toLowerCase().includes(q) ||
      (l.domisili || '').toLowerCase().includes(q)
    )
  })

  // Format runtime timer: mm:ss.s
  const mins = Math.floor(elapsedSecs / 60)
  const secs = (elapsedSecs % 60).toFixed(1)
  const formattedRuntime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(4, '0')}s`

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-4 select-none font-mono">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR (Clean Architectural Blueprint Canvas)                  */}
      {/* ========================================================================= */}
      <header className="pointer-events-auto flex items-center justify-between bg-[#F8F5EC] border-2 border-[#192A56] px-4 py-2.5 shadow-[4px_4px_0px_0px_#192A56] gap-3">
        <div className="flex items-center gap-3">
          
          {/* Logo Title (Crisp Space Grotesk Typography) */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-extrabold text-[#192A56] text-sm tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                AICREW
              </span>
              <span className="text-[#192A56]/40">//</span>
              <span className="font-bold text-[#192A56] text-xs truncate max-w-[180px] sm:max-w-xs" title={officeName}>
                {officeName || 'MSI CUBI HQ'}
              </span>
            </div>
          </div>

          {/* Quick Route Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-white p-0.5 border border-[#192A56]/20 text-[11px]">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              style={{ color: '#192A56' }}
              className="px-2.5 py-1 hover:bg-[#F8F5EC] transition cursor-pointer font-bold"
            >
              Beranda
            </button>
            <button
              style={{ backgroundColor: '#192A56', color: '#F8F5EC' }}
              className="px-2.5 py-1 font-bold cursor-default"
            >
              <span style={{ color: '#F8F5EC' }}>Office 3D</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              style={{ color: '#192A56' }}
              className="px-2.5 py-1 hover:bg-[#F8F5EC] transition cursor-pointer font-bold"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Status Terhubung ke Backend & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs">
          
          {/* Status Koneksi Riil ke Backend */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-white border border-[#192A56]/25 text-[11px] shadow-xs">
            <span className={`w-2 h-2 ${isBackendConnected ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`} />
            <span className="font-bold text-[#192A56]">
              {isBackendConnected ? 'BE ONLINE :8000' : 'BE OFFLINE'}
            </span>
            <span className="text-[#192A56]/30">|</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span>DB: SYNCED</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            </span>
          </div>

          {/* Model Local LLM */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#192A56]/25 text-[11px] text-[#192A56]">
            <Terminal className="w-3 h-3 text-[#192A56]" />
            <span className="font-bold">{isBackendConnected ? systemInfo?.local_llm || 'qwen2.5:3b' : 'LLM Standby'}</span>
          </div>

          {/* Kamera & POV Selector (Integrated in Top-Right Header) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white border border-[#192A56]/25 px-2 py-1 text-xs shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#192A56] shrink-0" />
            <select
              value={activePOV || 'overview'}
              onChange={(e) => onChangePOV && onChangePOV(e.target.value)}
              style={{ backgroundColor: 'transparent', color: '#192A56' }}
              className="font-bold text-[11px] outline-none cursor-pointer pr-1"
              title="Pilih Sudut Pandang Kamera 3D"
            >
              <option value="overview">POV: Isometrik 3D</option>
              <option value="topdown">POV: Blueprint Atas</option>
              <option value="boss">POV: Meja Direktur</option>
              <option value="workstation">POV: Workstations</option>
              <option value="kanban">POV: Kanban Wall</option>
              <option value="vault">POV: Server Vault</option>
            </select>
            <div className="flex items-center gap-0.5 border-l border-[#192A56]/20 pl-1 text-[#192A56]">
              <button
                type="button"
                onClick={() => onZoom && onZoom(8)}
                className="p-1 hover:bg-[#192A56]/10 cursor-pointer"
                title="Perbesar (Zoom In)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onZoom && onZoom(-8)}
                className="p-1 hover:bg-[#192A56]/10 cursor-pointer"
                title="Perkecil (Zoom Out)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onResetPOV}
                className="p-1 hover:bg-[#192A56]/10 cursor-pointer"
                title="Reset Kamera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tombol Setup Kantor */}
          <button
            onClick={onOpenOfficeSetup || onOpenEntrance}
            className="group flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] border border-[#192A56] text-[#192A56] font-bold text-xs transition cursor-pointer"
            title="Setup Nama Kantor, Bos & Agen"
          >
            <Building2 className="w-3.5 h-3.5 text-[#192A56] group-hover:text-[#F8F5EC] transition-colors" />
            <span className="hidden md:inline">Setup Kantor</span>
          </button>

          {/* Tombol Tambah Lead */}
          <button
            onClick={onOpenCreateLead}
            style={{ backgroundColor: '#192A56', color: '#F8F5EC' }}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#0E1A38] text-xs font-bold transition cursor-pointer uppercase shadow-xs border border-[#192A56]"
          >
            <PlusCircle className="w-3.5 h-3.5" style={{ color: '#F8F5EC', stroke: '#F8F5EC' }} />
            <span style={{ color: '#F8F5EC' }}>Lead Baru</span>
          </button>

          {/* Tombol Auto Pipeline (High Contrast Orange with Dark Text) */}
          <button
            onClick={onRunAutoPipeline}
            disabled={isGenerating}
            className="group hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5B00] hover:bg-[#E04F00] text-[#0A0E1A] text-xs font-mono font-bold transition cursor-pointer disabled:opacity-50 shadow-xs"
            title="Proses antrean prospek secara berurutan"
          >
            <Play className="w-3 h-3 text-[#0A0E1A] fill-[#0A0E1A]" />
            <span>Auto Pipeline</span>
          </button>

          {/* Tombol Kelola Tim */}
          <button
            onClick={onOpenTeamSetup}
            className="group hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] border border-[#192A56]/30 hover:border-[#192A56] text-[#192A56] text-xs font-bold transition cursor-pointer"
            title="Kelola Nama Bos & Tim Cubi"
          >
            <Crown className="w-3.5 h-3.5 text-[#192A56] group-hover:text-[#F8F5EC] transition-colors" />
            <span>{bossConfig?.name || 'Pak Alfa'}</span>
          </button>

          {/* Mode Fullscreen 3D (Hanya Kantor & Karakter Bebas Distraksi) */}
          <button
            type="button"
            onClick={onTogglePure3D}
            style={{ backgroundColor: '#192A56', color: '#F8F5EC' }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 font-bold text-xs transition cursor-pointer border border-[#192A56] hover:bg-[#0E1A38] shadow-xs"
            title="Tampilkan Hanya Kantor 3D & Karakter Full Screen (Tanpa HUD)"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#FF5B00]" />
            <span style={{ color: '#F8F5EC' }} className="hidden xl:inline">Full Screen 3D</span>
          </button>

          {/* Toggle HUD Visibility */}
          <button
            onClick={() => setIsHudVisible(!isHudVisible)}
            className="group p-1.5 bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] text-[#192A56] border border-[#192A56] transition cursor-pointer"
            title={isHudVisible ? 'Sembunyikan HUD' : 'Tampilkan HUD'}
          >
            {isHudVisible ? (
              <EyeOff className="w-3.5 h-3.5 text-[#192A56] group-hover:text-[#F8F5EC] transition-colors" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-[#192A56] group-hover:text-[#F8F5EC] transition-colors" />
            )}
          </button>

          {/* Refresh Data */}
          <button
            onClick={onRefresh}
            className="group p-1.5 bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] text-[#192A56] border border-[#192A56] transition cursor-pointer"
            title="Refresh Leads & Sistem"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#192A56] group-hover:text-[#F8F5EC] transition-colors" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CENTER ROW: Left Leads Drawer & Right System Sidebar                   */}
      {/* ========================================================================= */}
      {isHudVisible && (
        <div className="flex-1 flex justify-between items-start gap-3 mt-3 overflow-hidden pointer-events-none">
          
          {/* Left Drawer: Tab Antrean Leads & Activity Feed */}
          <aside
            className={`pointer-events-auto transition-all duration-300 bg-[#F8F5EC] border-2 border-[#192A56] p-3 shadow-[4px_4px_0px_0px_#192A56] flex flex-col max-h-[calc(100vh-230px)] ${
              isSidebarOpen ? 'w-80 sm:w-88' : 'w-11'
            }`}
          >
            {/* Header Drawer dengan Tab Monospace */}
            <div className="flex items-center justify-between pb-1.5 border-b border-[#192A56]/20 mb-2.5">
              {isSidebarOpen ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 transition cursor-pointer border ${
                      activeTab === 'leads'
                        ? 'bg-[#192A56] text-[#F8F5EC] border-[#192A56]'
                        : 'bg-white text-[#192A56] border-[#192A56]/30 hover:border-[#192A56]'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>[01_LEADS // {leads.length}]</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 transition cursor-pointer border ${
                      activeTab === 'activity'
                        ? 'bg-[#192A56] text-[#F8F5EC] border-[#192A56]'
                        : 'bg-white text-[#192A56] border-[#192A56]/30 hover:border-[#192A56]'
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>[02_LOGS]</span>
                  </button>
                </div>
              ) : (
                <Layers className="w-4 h-4 text-[#192A56] mx-auto" />
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-[#192A56] hover:bg-[#192A56] hover:text-[#F8F5EC] text-xs cursor-pointer px-1.5 py-0.5 border border-[#192A56]/30"
                title={isSidebarOpen ? 'Tutup Panel' : 'Buka Panel'}
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>

            {/* Konten Tab Leads */}
            {isSidebarOpen && activeTab === 'leads' && (
              <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                {/* Search Box */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter query / nama / kota..."
                    className="w-full bg-white border border-[#192A56]/30 px-2.5 py-1.5 text-xs text-[#192A56] placeholder:text-[#576574] outline-none focus:border-[#192A56]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#576574] absolute right-2.5 top-2.5 pointer-events-none" />
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-[#576574] text-center py-6 text-xs bg-white border border-[#192A56]/15 p-4 font-mono">
                    {isBackendConnected ? '[QUEUE_EMPTY]: Tidak ada prospek.' : '[OFFLINE_BUFFER]: Memuat data...'}
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isHot = lead.score_priority === 'Hot'
                    const isWarm = lead.score_priority === 'Warm'
                    const isSelected = activeLead?.id_lead === lead.id_lead
                    const isDispatched = lead.status_kontak === 'dispatched' || lead.status_kontak === 'approved'

                    return (
                      <div
                        key={lead.id_lead}
                        onClick={() => onSelectLead && onSelectLead(lead)}
                        className={`p-2.5 border transition-all text-xs cursor-pointer relative ${
                          isSelected
                            ? 'bg-white border-2 border-[#192A56] shadow-[2px_2px_0px_0px_#192A56]'
                            : isDispatched
                            ? 'bg-emerald-50/70 border-emerald-600/30 text-slate-800'
                            : 'bg-white/80 border-[#192A56]/20 hover:border-[#192A56] hover:bg-white'
                        }`}
                      >
                        {/* Monospace Reference & Priority */}
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#576574]">
                          <span className="font-bold text-[#192A56] tracking-wider">#{lead.id_lead}</span>
                          <span
                            className={`px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase tracking-wider border ${
                              isHot
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : isWarm
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-slate-50 text-slate-700 border-slate-300'
                            }`}
                          >
                            [{lead.score_priority || 'WARM'}]
                          </span>
                        </div>

                        <div className="font-bold text-[#192A56] text-xs truncate mb-1">
                          {lead.nama}
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[10px] text-[#576574] font-mono border-t border-[#192A56]/10 pt-1">
                          <div className="truncate">REQ: <span className="text-[#192A56] font-semibold">{lead.minat || 'Unit Motor'}</span></div>
                          <div className="truncate text-right">LOC: <span className="text-[#192A56] font-semibold">{lead.domisili || 'Purwokerto'}</span></div>
                        </div>

                        {isSelected && (
                          <div className="mt-1.5 pt-1.5 border-t border-[#192A56]/20 flex items-center justify-between text-[10px] font-mono text-[#192A56]">
                            <span className="font-bold text-emerald-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-600 animate-pulse"></span>
                              PROCESSING_SWARM
                            </span>
                            <span className="font-bold underline text-[#192A56]">PITCH ➔</span>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {/* Konten Tab Activity Log */}
            {isSidebarOpen && activeTab === 'activity' && (
              <div className="overflow-y-auto space-y-2 pr-1 flex-1 text-xs">
                {activities.length === 0 ? (
                  <div className="text-[#576574] text-center py-6 text-xs bg-white border border-[#192A56]/15 p-4 font-mono">
                    [LOGS_EMPTY]: Belum ada telemetry log.
                  </div>
                ) : (
                  activities.map((act, i) => (
                    <div key={i} className="p-2 bg-white border border-[#192A56]/15 text-[11px] space-y-1 font-mono">
                      <div className="flex items-center justify-between text-[#576574]">
                        <span className="font-bold text-[#192A56]">[{act.agent || 'SYSTEM'}]</span>
                        <span className="text-[10px]">{act.time || 'NOW'}</span>
                      </div>
                      <div className="text-[#192A56] text-[10px]">{act.detail || act.action}</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Quick POV Camera Jump at Bottom of Left Panel */}
            {isSidebarOpen && (
              <div className="pt-2 mt-2 border-t border-[#192A56]/20 text-[10px] font-mono">
                <div className="flex items-center justify-between text-[#576574] mb-1 font-bold">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3 h-3 text-[#192A56]" />
                    <span>POV // CAMERA_CONTROL:</span>
                  </span>
                  <span className="text-emerald-700 font-bold">3D_LIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-1 font-bold text-[10px]">
                  {[
                    { key: 'overview', label: 'Isometrik' },
                    { key: 'topdown', label: 'Atas' },
                    { key: 'boss', label: 'Direktur' },
                    { key: 'workstation', label: 'Meja Kerja' },
                    { key: 'kanban', label: 'Kanban' },
                    { key: 'vault', label: 'Vault' },
                  ].map((p) => {
                    const isActive = activePOV === p.key
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => onChangePOV && onChangePOV(p.key)}
                        style={{
                          backgroundColor: isActive ? '#192A56' : '#FFFFFF',
                          color: isActive ? '#F8F5EC' : '#192A56',
                        }}
                        className={`p-1 border text-center truncate cursor-pointer transition ${
                          isActive
                            ? 'border-[#192A56] shadow-xs'
                            : 'border-[#192A56]/20 hover:border-[#192A56]'
                        }`}
                        title={`Pindah POV: ${p.label}`}
                      >
                        <span style={{ color: isActive ? '#F8F5EC' : '#192A56' }}>{p.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* Right System Sidebar: Inspector & Agent Selection */}
          <aside className="pointer-events-auto bg-[#F8F5EC] border-2 border-[#192A56] p-3 shadow-[4px_4px_0px_0px_#192A56] w-64 sm:w-72 flex flex-col gap-2.5 text-xs font-mono">
            
            <div className="flex items-center justify-between pb-1.5 border-b border-[#192A56]/20">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#192A56]">
                <span className="text-[#FF5B00] font-mono">+</span>
                <span className="tracking-widest uppercase">SEC_02 // MESH_SWARM</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                [ACTIVE: 5/5]
              </span>
            </div>

            {/* Daftar Agen Interaktif */}
            <div className="space-y-1.5">
              {/* Direktur / Bos */}
              <button
                onClick={() => onSelectAgent('boss')}
                style={{
                  backgroundColor: selectedAgentId === 'boss' ? '#192A56' : '#FFFFFF',
                  color: selectedAgentId === 'boss' ? '#F8F5EC' : '#192A56',
                }}
                className={`w-full flex items-center justify-between p-2 text-left transition cursor-pointer border ${
                  selectedAgentId === 'boss'
                    ? 'border-[#192A56] font-bold shadow-xs'
                    : 'hover:bg-[#192A56]/10 text-[#192A56] border-[#192A56]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="w-4 h-4 shrink-0"
                    style={{ color: selectedAgentId === 'boss' ? '#FF5B00' : '#192A56' }}
                  />
                  <div className="flex flex-col text-left">
                    <span
                      className="truncate font-bold text-xs"
                      style={{ color: selectedAgentId === 'boss' ? '#F8F5EC' : '#192A56' }}
                    >
                      {bossConfig?.name || 'Pak Alfa'}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-tight"
                      style={{ color: selectedAgentId === 'boss' ? '#C8C2B3' : '#576574' }}
                    >
                      BAY_00 // DIRECTOR
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 ${selectedAgentId === 'boss' ? 'bg-[#FF5B00]' : 'bg-emerald-600'}`}></span>
                </div>
              </button>

              {/* Blue Agent: Scout */}
              <button
                onClick={() => onSelectAgent('blue-agent')}
                style={{
                  backgroundColor: selectedAgentId === 'blue-agent' ? '#192A56' : '#FFFFFF',
                  color: selectedAgentId === 'blue-agent' ? '#F8F5EC' : '#192A56',
                }}
                className={`w-full flex items-center justify-between p-2 text-left transition cursor-pointer border ${
                  selectedAgentId === 'blue-agent'
                    ? 'border-[#192A56] font-bold shadow-xs'
                    : 'hover:bg-[#192A56]/10 text-[#192A56] border-[#192A56]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu
                    className="w-4 h-4 shrink-0"
                    style={{ color: selectedAgentId === 'blue-agent' ? '#38bdf8' : '#0284c7' }}
                  />
                  <div className="flex flex-col text-left">
                    <span
                      className="truncate font-bold text-xs"
                      style={{ color: selectedAgentId === 'blue-agent' ? '#F8F5EC' : '#192A56' }}
                    >
                      {agents?.['blue-agent']?.name || 'Cubi Scout'}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-tight"
                      style={{ color: selectedAgentId === 'blue-agent' ? '#C8C2B3' : '#576574' }}
                    >
                      BAY_01 // COMPUTE
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 ${selectedAgentId === 'blue-agent' ? 'bg-[#38bdf8]' : 'bg-emerald-600'}`}></span>
                </div>
              </button>

              {/* Purple Agent: Scribe */}
              <button
                onClick={() => onSelectAgent('purple-agent')}
                style={{
                  backgroundColor: selectedAgentId === 'purple-agent' ? '#192A56' : '#FFFFFF',
                  color: selectedAgentId === 'purple-agent' ? '#F8F5EC' : '#192A56',
                }}
                className={`w-full flex items-center justify-between p-2 text-left transition cursor-pointer border ${
                  selectedAgentId === 'purple-agent'
                    ? 'border-[#192A56] font-bold shadow-xs'
                    : 'hover:bg-[#192A56]/10 text-[#192A56] border-[#192A56]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Terminal
                    className="w-4 h-4 shrink-0"
                    style={{ color: selectedAgentId === 'purple-agent' ? '#c084fc' : '#4F46E5' }}
                  />
                  <div className="flex flex-col text-left">
                    <span
                      className="truncate font-bold text-xs"
                      style={{ color: selectedAgentId === 'purple-agent' ? '#F8F5EC' : '#192A56' }}
                    >
                      {agents?.['purple-agent']?.name || 'Cubi Scribe'}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-tight"
                      style={{ color: selectedAgentId === 'purple-agent' ? '#C8C2B3' : '#576574' }}
                    >
                      BAY_02 // DRAFTER
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 ${selectedAgentId === 'purple-agent' ? 'bg-[#c084fc]' : 'bg-emerald-600'}`}></span>
                </div>
              </button>

              {/* Green Agent: Gatekeeper */}
              <button
                onClick={() => onSelectAgent('green-agent')}
                style={{
                  backgroundColor: selectedAgentId === 'green-agent' ? '#192A56' : '#FFFFFF',
                  color: selectedAgentId === 'green-agent' ? '#F8F5EC' : '#192A56',
                }}
                className={`w-full flex items-center justify-between p-2 text-left transition cursor-pointer border ${
                  selectedAgentId === 'green-agent'
                    ? 'border-[#192A56] font-bold shadow-xs'
                    : 'hover:bg-[#192A56]/10 text-[#192A56] border-[#192A56]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: selectedAgentId === 'green-agent' ? '#4ade80' : '#16a34a' }}
                  />
                  <div className="flex flex-col text-left">
                    <span
                      className="truncate font-bold text-xs"
                      style={{ color: selectedAgentId === 'green-agent' ? '#F8F5EC' : '#192A56' }}
                    >
                      {agents?.['green-agent']?.name || 'Pipeline Analyst'}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-tight"
                      style={{ color: selectedAgentId === 'green-agent' ? '#C8C2B3' : '#576574' }}
                    >
                      BAY_03 // GATEWAY
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 ${selectedAgentId === 'green-agent' ? 'bg-[#4ade80]' : 'bg-emerald-600'}`}></span>
                </div>
              </button>

              {/* Orange Agent: Vault */}
              <button
                onClick={() => onSelectAgent('orange-agent')}
                style={{
                  backgroundColor: selectedAgentId === 'orange-agent' ? '#192A56' : '#FFFFFF',
                  color: selectedAgentId === 'orange-agent' ? '#F8F5EC' : '#192A56',
                }}
                className={`w-full flex items-center justify-between p-2 text-left transition cursor-pointer border ${
                  selectedAgentId === 'orange-agent'
                    ? 'border-[#192A56] font-bold shadow-xs'
                    : 'hover:bg-[#192A56]/10 text-[#192A56] border-[#192A56]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <HardDrive
                    className="w-4 h-4 shrink-0"
                    style={{ color: selectedAgentId === 'orange-agent' ? '#fb923c' : '#334155' }}
                  />
                  <div className="flex flex-col text-left">
                    <span
                      className="truncate font-bold text-xs"
                      style={{ color: selectedAgentId === 'orange-agent' ? '#F8F5EC' : '#192A56' }}
                    >
                      {agents?.['orange-agent']?.name || 'Cubi Vault'}
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-tight"
                      style={{ color: selectedAgentId === 'orange-agent' ? '#C8C2B3' : '#576574' }}
                    >
                      BAY_04 // VAULT
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 ${selectedAgentId === 'orange-agent' ? 'bg-[#fb923c]' : 'bg-emerald-600'}`}></span>
                </div>
              </button>
            </div>

            {/* Detail Agen Terpilih */}
            <div className="mt-1 pt-2 border-t border-[#192A56]/20 bg-white p-2.5 border border-[#192A56]/20 text-[11px] space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[10px] text-[#576574] border-b border-[#192A56]/10 pb-1">
                <span className="font-bold text-[#192A56]">[DIAGNOSTIC_FRAME]</span>
                <span className="text-emerald-700 font-bold">● ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-[#192A56]">
                <span className="font-bold">{currentAgent.name}</span>
                <span className="text-[10px] text-[#576574]">{currentAgent.station}</span>
              </div>
              <div className="text-[#576574] text-[10px] leading-relaxed bg-[#F8F5EC] p-1.5 border border-[#192A56]/10">
                {currentAgent.feature}
              </div>
              <div className="text-[10px] text-emerald-800 font-bold flex items-center justify-between">
                <span>TELEMETRY: {currentAgent.tokens}</span>
                <span className="text-emerald-600">SYNCED</span>
              </div>
            </div>

          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2.5 INTERACTIVE COMMAND PROMPT (Terminal Perintah ke Agen / AI Team)     */}
      {/* ========================================================================= */}
      {isHudVisible && (
        <form
          onSubmit={handleSendCommand}
          className="pointer-events-auto flex items-center gap-2.5 bg-[#F8F5EC] border-2 border-[#192A56] px-4 py-2 shadow-[4px_4px_0px_0px_#192A56] mt-3"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#192A56] shrink-0">
            <Terminal className="w-4 h-4 text-[#192A56]" />
            <span>&gt; PERINTAH:</span>
          </div>
          <input
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Ketik instruksi swarm (contoh: auto pipeline, proses lead Honda, sinkronkan data)..."
            className="flex-1 bg-white border border-[#192A56]/30 px-3 py-1 text-xs text-[#192A56] placeholder:text-[#576574] outline-none focus:border-[#192A56]"
          />
          <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-800 font-bold truncate max-w-sm">
            <span>{commandFeedback}</span>
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#192A56', color: '#F8F5EC' }}
            className="px-3.5 py-1 hover:bg-[#0E1A38] text-xs font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs border border-[#192A56]"
          >
            <Send className="w-3.5 h-3.5" style={{ color: '#F8F5EC', stroke: '#F8F5EC' }} />
            <span style={{ color: '#F8F5EC' }}>Kirim ↵</span>
          </button>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. BOTTOM INSPECTOR DOCK (Agent Control & Telemetry Bar)                  */}
      {/* ========================================================================= */}
      {isHudVisible && (
        <footer className="pointer-events-auto bg-[#F8F5EC] border-2 border-[#192A56] px-4 py-2 shadow-[4px_4px_0px_0px_#192A56] mt-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            
            {/* Karakter Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#192A56] font-bold text-[#192A56]">
                <Cpu className="w-3.5 h-3.5 text-[#192A56]" />
                <span style={{ color: '#192A56' }}>{currentAgent.name}</span>
                <span className="text-[10px] text-[#576574] font-normal">[{currentAgent.role}]</span>
              </div>
              <span className="text-[11px] text-[#192A56] hidden md:inline">
                [STATE]: {isGenerating ? 'Menyusun Draf Pesan WhatsApp via Qwen 2.5...' : currentAgent.statusText || 'Siap bertugas'}
              </span>
            </div>

            {/* Metrik Runtime & Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[#576574] text-[11px]">
                <Activity className="w-3.5 h-3.5 text-[#192A56]" />
                <span>RUNTIME: <strong className="text-[#192A56]">{formattedRuntime}</strong></span>
              </div>
              <div className="w-24 sm:w-32 bg-white border border-[#192A56]/30 h-2.5 overflow-hidden p-0.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    isGenerating ? 'bg-emerald-600 animate-pulse' : 'bg-[#192A56]'
                  }`}
                  style={{ width: isGenerating ? '85%' : activeLead ? '100%' : '65%' }}
                />
              </div>
              <span className="text-[10px] font-bold text-[#192A56]">
                {isGenerating ? '85%' : activeLead ? '100%' : '65%'}
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* ========================================================================= */}
      {/* 4. APPROVAL GATE MODAL (Architectural Confirmation Window)               */}
      {/* ========================================================================= */}
      {pitchResult && (
        <div className="pointer-events-auto fixed inset-0 bg-[#192A56]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#F8F5EC] border-2 border-[#192A56] max-w-xl w-full p-6 shadow-[8px_8px_0px_0px_#192A56] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#192A56]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#192A56] text-[#F8F5EC] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#192A56] uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Approval Gate: Review Penawaran Sales
                  </h3>
                  <p className="text-[11px] text-[#576574]">
                    Wajib otorisasi direktur sebelum didispatch ke WhatsApp konsumen
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300">
                Action Required
              </span>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-[#192A56]/20">
                <div>
                  <span className="text-[#576574] block text-[10px]">Calon Konsumen:</span>
                  <span className="font-bold text-[#192A56]">{activeLead?.nama}</span>
                  <span className="text-[10px] text-[#576574] block truncate">({activeLead?.domisili})</span>
                </div>
                <div>
                  <span className="text-[#576574] block text-[10px]">Unit Rekomendasi:</span>
                  <span className="font-bold text-[#192A56] flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#192A56]" />
                    {pitchResult.unit_rekomendasi}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold block truncate">
                    {pitchResult.stok_info || 'Stok Ready di Showroom'}
                  </span>
                </div>
              </div>

              {pitchResult.bundling_promo && (
                <div className="p-2.5 bg-white border border-[#192A56]/20 flex items-center gap-2 text-[#192A56] text-[11px]">
                  <PackageCheck className="w-4 h-4 text-[#192A56] shrink-0" />
                  <div>
                    <span className="font-bold">Paket Promo Tambahan: </span>
                    <span>{pitchResult.bundling_promo}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#192A56] mb-1">
                  Nomor WhatsApp Calon Konsumen:
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] font-mono text-xs focus:border-[#192A56] outline-none"
                  placeholder="628xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#192A56] mb-1">
                  Draf Pesan WhatsApp (Dihasilkan Qwen 2.5 Local):
                </label>
                <textarea
                  rows={4}
                  value={editedPitch}
                  onChange={(e) => setEditedPitch(e.target.value)}
                  className="w-full bg-white border border-[#192A56]/30 p-3 text-[#192A56] text-xs leading-relaxed focus:border-[#192A56] outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#192A56]/20">
              <button
                onClick={() => onApprovePitch(null)}
                className="px-4 py-2 border border-[#192A56]/30 bg-white hover:bg-[#F0ECE1] text-[#192A56] text-xs font-bold transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => onApprovePitch({ id_lead: pitchResult.id_lead, nomor_wa: waNumber, pesan_final: editedPitch })}
                className="px-5 py-2 bg-[#192A56] hover:bg-[#0E1A38] text-[#F8F5EC] text-xs font-bold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#192A56] transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Setujui & Dispatch WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
