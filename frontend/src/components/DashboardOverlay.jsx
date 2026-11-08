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
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-4 select-none">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR: Sleek Modern SaaS Glassmorphism                        */}
      {/* ========================================================================= */}
      <header className="pointer-events-auto flex items-center justify-between bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-sm gap-3">
        <div className="flex items-center gap-3">
          
          {/* Logo Title (Crisp Space Grotesk Typography) */}
          <div className="flex items-center gap-2">
            <span 
              className="font-extrabold text-[#192A56] text-base tracking-wider uppercase" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AICREW
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-700 text-xs truncate max-w-[160px] sm:max-w-xs" title={officeName}>
              {officeName || 'MSI CUBI HQ'}
            </span>
          </div>

          {/* Quick Route Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="px-3 py-1 font-semibold text-slate-600 hover:text-[#192A56] hover:bg-white rounded-lg transition cursor-pointer"
            >
              Beranda
            </button>
            <button
              className="px-3 py-1 font-bold bg-[#192A56] text-white rounded-lg shadow-xs cursor-default"
            >
              Office 3D
            </button>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="px-3 py-1 font-semibold text-slate-600 hover:text-[#192A56] hover:bg-white rounded-lg transition cursor-pointer"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Status Terhubung ke Backend & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs">
          
          {/* Status Koneksi Riil ke Backend */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-bold text-[#192A56]">
              {isBackendConnected ? 'Online :8000' : 'Offline'}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span>DB Synced</span>
            </span>
          </div>

          {/* Model Local LLM */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-[#192A56]">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold">{isBackendConnected ? systemInfo?.local_llm || 'qwen2.5:3b' : 'LLM Standby'}</span>
          </div>

          {/* Kamera & POV Selector (Integrated in Top-Right Header) */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={activePOV || 'overview'}
              onChange={(e) => onChangePOV && onChangePOV(e.target.value)}
              className="font-bold text-[11px] text-[#192A56] bg-transparent outline-none cursor-pointer pr-1"
              title="Pilih Sudut Pandang Kamera 3D"
            >
              <option value="overview">POV: Isometrik 3D</option>
              <option value="topdown">POV: Blueprint Atas</option>
              <option value="boss">POV: Meja Direktur</option>
              <option value="workstation">POV: Workstations</option>
              <option value="kanban">POV: Kanban Wall</option>
              <option value="vault">POV: Server Vault</option>
            </select>
            <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1 text-slate-600">
              <button
                type="button"
                onClick={() => onZoom && onZoom(8)}
                className="p-1 hover:bg-slate-200 rounded-md cursor-pointer transition"
                title="Perbesar (Zoom In)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onZoom && onZoom(-8)}
                className="p-1 hover:bg-slate-200 rounded-md cursor-pointer transition"
                title="Perkecil (Zoom Out)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onResetPOV}
                className="p-1 hover:bg-slate-200 rounded-md cursor-pointer transition"
                title="Reset Kamera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tombol Setup Kantor */}
          <button
            onClick={onOpenOfficeSetup || onOpenEntrance}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-[#192A56] font-semibold text-xs transition cursor-pointer shadow-xs"
            title="Setup Nama Kantor, Bos & Agen"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Setup</span>
          </button>

          {/* Tombol Tambah Lead (High Contrast Navy) */}
          <button
            onClick={onOpenCreateLead}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#192A56] hover:bg-[#0E1A38] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-white" />
            <span>Lead Baru</span>
          </button>

          {/* Tombol Auto Pipeline (High Contrast Orange with Dark Navy Text) */}
          <button
            onClick={onRunAutoPipeline}
            disabled={isGenerating}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF5B00] hover:bg-[#E04F00] text-[#0A0E1A] text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-50 shadow-xs"
            title="Proses antrean prospek secara berurutan"
          >
            <Play className="w-3 h-3 text-[#0A0E1A] fill-[#0A0E1A]" />
            <span>Auto Pipeline</span>
          </button>

          {/* Tombol Kelola Tim */}
          <button
            onClick={onOpenTeamSetup}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold transition cursor-pointer shadow-xs"
            title="Kelola Nama Bos & Tim Cubi"
          >
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>{bossConfig?.name || 'Pak Alfa'}</span>
          </button>

          {/* Mode Fullscreen 3D (Hanya Kantor & Karakter Bebas Distraksi) */}
          <button
            type="button"
            onClick={onTogglePure3D}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#192A56] hover:bg-[#0E1A38] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs"
            title="Tampilkan Hanya Kantor 3D & Karakter Full Screen (Tanpa HUD)"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#FF5B00]" />
            <span className="hidden xl:inline">Full Screen 3D</span>
          </button>

          {/* Toggle HUD Visibility */}
          <button
            onClick={() => setIsHudVisible(!isHudVisible)}
            className="p-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
            title={isHudVisible ? 'Sembunyikan HUD' : 'Tampilkan HUD'}
          >
            {isHudVisible ? (
              <EyeOff className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>

          {/* Refresh Data */}
          <button
            onClick={onRefresh}
            className="p-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
            title="Refresh Leads & Sistem"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
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
            className={`pointer-events-auto transition-all duration-300 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-lg flex flex-col max-h-[calc(100vh-230px)] ${
              isSidebarOpen ? 'w-80 sm:w-88' : 'w-12'
            }`}
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              {isSidebarOpen ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                      activeTab === 'leads'
                        ? 'bg-[#192A56] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-[#192A56]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Prospek ({leads.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                      activeTab === 'activity'
                        ? 'bg-[#192A56] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-[#192A56]'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Aktivitas ({activities.length})</span>
                  </button>
                </div>
              ) : (
                <Layers className="w-4 h-4 text-slate-600 mx-auto" />
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-500 hover:text-[#192A56] hover:bg-slate-100 text-xs cursor-pointer p-1.5 rounded-lg transition"
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
                    placeholder="Cari prospek / nama / kota..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#192A56] placeholder:text-slate-400 outline-none focus:border-[#192A56] focus:bg-white transition"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-slate-500 text-center py-8 text-xs bg-slate-50 rounded-xl border border-slate-100 p-4">
                    {isBackendConnected ? 'Tidak ada antrean prospek.' : 'Memuat data prospek...'}
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
                        className={`p-3 rounded-xl border transition-all text-xs cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-50/70 border-2 border-[#192A56] shadow-sm'
                            : isDispatched
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        {/* Reference & Priority Badge */}
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-semibold text-slate-500 font-mono">#{lead.id_lead}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                              isHot
                                ? 'bg-rose-100 text-rose-700'
                                : isWarm
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {lead.score_priority || 'Warm'}
                          </span>
                        </div>

                        <div className="font-bold text-[#192A56] text-sm truncate mb-1">
                          {lead.nama}
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 border-t border-slate-100 pt-1.5 mt-1.5">
                          <div className="truncate">Unit: <span className="text-[#192A56] font-semibold">{lead.minat || 'Unit Motor'}</span></div>
                          <div className="truncate text-right">Kota: <span className="text-[#192A56] font-semibold">{lead.domisili || 'Purwokerto'}</span></div>
                        </div>

                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-[#192A56]">
                            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              Sedang Diproses
                            </span>
                            <span className="font-bold text-[#192A56] hover:underline flex items-center gap-0.5">
                              Lihat Pitch <ChevronRight className="w-3 h-3" />
                            </span>
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
                  <div className="text-slate-500 text-center py-8 text-xs bg-slate-50 rounded-xl border border-slate-100 p-4">
                    Belum ada riwayat aktivitas tim.
                  </div>
                ) : (
                  activities.map((act, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-bold text-[#192A56]">{act.agent || 'SYSTEM'}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{act.time || 'NOW'}</span>
                      </div>
                      <div className="text-slate-700 text-xs leading-relaxed">{act.detail || act.action}</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Quick POV Camera Jump at Bottom of Left Panel */}
            {isSidebarOpen && (
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600 mb-1.5 font-semibold text-[11px]">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sudut Pandang Kamera:</span>
                  </span>
                  <span className="text-emerald-700 font-bold">3D Live</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[11px]">
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
                        className={`p-1.5 rounded-lg border text-center truncate cursor-pointer transition font-semibold ${
                          isActive
                            ? 'bg-[#192A56] text-white border-[#192A56] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        title={`Pindah POV: ${p.label}`}
                      >
                        {p.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* Right System Sidebar: Inspector & Agent Selection */}
          <aside className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-lg w-64 sm:w-72 flex flex-col gap-2.5 text-xs">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 font-bold text-[#192A56]">
                <Cpu className="w-4 h-4 text-[#FF5B00]" />
                <span className="text-xs uppercase tracking-wide">Tim AI Cubi</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
                5 Aktif
              </span>
            </div>

            {/* Daftar Agen Interaktif */}
            <div className="space-y-1.5">
              {/* Direktur / Bos */}
              <button
                onClick={() => onSelectAgent('boss')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer border ${
                  selectedAgentId === 'boss'
                    ? 'bg-amber-50/70 border-2 border-amber-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-[#192A56] border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs text-[#192A56] truncate">
                      {bossConfig?.name || 'Pak Alfa'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Direktur Sales
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </button>

              {/* Blue Agent: Scout */}
              <button
                onClick={() => onSelectAgent('blue-agent')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer border ${
                  selectedAgentId === 'blue-agent'
                    ? 'bg-sky-50/70 border-2 border-sky-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-[#192A56] border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs text-[#192A56] truncate">
                      {agents?.['blue-agent']?.name || 'Cubi Scout'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Hardware & Stock
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              {/* Purple Agent: Scribe */}
              <button
                onClick={() => onSelectAgent('purple-agent')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer border ${
                  selectedAgentId === 'purple-agent'
                    ? 'bg-purple-50/70 border-2 border-purple-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-[#192A56] border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs text-[#192A56] truncate">
                      {agents?.['purple-agent']?.name || 'Cubi Scribe'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      AI Pitch Drafter
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              {/* Green Agent: Gatekeeper */}
              <button
                onClick={() => onSelectAgent('green-agent')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer border ${
                  selectedAgentId === 'green-agent'
                    ? 'bg-emerald-50/70 border-2 border-emerald-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-[#192A56] border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs text-[#192A56] truncate">
                      {agents?.['green-agent']?.name || 'Cubi Gate'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Approval & WhatsApp
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              {/* Orange Agent: Vault */}
              <button
                onClick={() => onSelectAgent('orange-agent')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer border ${
                  selectedAgentId === 'orange-agent'
                    ? 'bg-orange-50/70 border-2 border-orange-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-[#192A56] border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs text-[#192A56] truncate">
                      {agents?.['orange-agent']?.name || 'Cubi Vault'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      CSV & Memory Vault
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>
            </div>

            {/* Detail Agen Terpilih */}
            <div className="mt-1 pt-2.5 border-t border-slate-100 bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-200 pb-1">
                <span className="font-bold text-[#192A56]">Detail Agen Aktif</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Siap
                </span>
              </div>
              <div className="flex items-center justify-between text-[#192A56]">
                <span className="font-bold">{currentAgent.name}</span>
                <span className="text-[11px] text-slate-500">{currentAgent.station}</span>
              </div>
              <div className="text-slate-600 text-[11px] leading-relaxed bg-white rounded-lg p-2 border border-slate-100">
                {currentAgent.feature}
              </div>
              <div className="text-[11px] text-emerald-800 font-bold flex items-center justify-between pt-0.5">
                <span>Penggunaan Token:</span>
                <span className="font-mono">{currentAgent.tokens}</span>
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
          className="pointer-events-auto flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2 shadow-sm mt-3"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#192A56] shrink-0">
            <Terminal className="w-4 h-4 text-[#FF5B00]" />
            <span>Perintah:</span>
          </div>
          <input
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Ketik instruksi (contoh: auto pipeline, proses prospek, sinkronkan data)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#192A56] placeholder:text-slate-400 outline-none focus:border-[#192A56] focus:bg-white transition"
          />
          <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-700 font-semibold truncate max-w-sm">
            <span>{commandFeedback}</span>
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#192A56] hover:bg-[#0E1A38] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Kirim</span>
          </button>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. BOTTOM INSPECTOR DOCK (Agent Control & Telemetry Bar)                  */}
      {/* ========================================================================= */}
      {isHudVisible && (
        <footer className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-sm mt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            
            {/* Karakter Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl font-bold text-[#192A56]">
                <Cpu className="w-3.5 h-3.5 text-[#192A56]" />
                <span>{currentAgent.name}</span>
                <span className="text-[11px] text-slate-500 font-normal">({currentAgent.role})</span>
              </div>
              <span className="text-xs text-slate-600 hidden md:inline">
                Status: {isGenerating ? 'Menyusun draf penawaran via Qwen 2.5 Local...' : currentAgent.statusText || 'Siap bertugas'}
              </span>
            </div>

            {/* Metrik Runtime & Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                <Activity className="w-3.5 h-3.5 text-slate-500" />
                <span>Runtime: <strong className="text-[#192A56] font-mono">{formattedRuntime}</strong></span>
              </div>
              <div className="w-24 sm:w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isGenerating ? 'bg-emerald-500 animate-pulse' : 'bg-[#192A56]'
                  }`}
                  style={{ width: isGenerating ? '85%' : activeLead ? '100%' : '65%' }}
                />
              </div>
              <span className="text-xs font-bold text-[#192A56]">
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
        <div className="pointer-events-auto fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#192A56]">
                    Approval Gate: Review Penawaran Sales
                  </h3>
                  <p className="text-xs text-slate-500">
                    Otorisasi direktur sebelum didispatch ke WhatsApp konsumen
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                Otorisasi Direktur
              </span>
            </div>

            <div className="my-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[11px] mb-0.5">Calon Konsumen:</span>
                  <span className="font-bold text-sm text-[#192A56] block">{activeLead?.nama}</span>
                  <span className="text-xs text-slate-500 block truncate">{activeLead?.domisili}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] mb-0.5">Unit Rekomendasi:</span>
                  <span className="font-bold text-sm text-[#192A56] flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-sky-600" />
                    {pitchResult.unit_rekomendasi}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold block truncate">
                    {pitchResult.stok_info || 'Stok Ready di Showroom'}
                  </span>
                </div>
              </div>

              {pitchResult.bundling_promo && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-center gap-2.5 text-amber-900 text-xs">
                  <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">Paket Promo: </span>
                    <span>{pitchResult.bundling_promo}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Calon Konsumen:
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#192A56] font-mono text-xs focus:border-[#192A56] focus:bg-white outline-none transition"
                  placeholder="628xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Draf Pesan WhatsApp (Dihasilkan Qwen 2.5 Local):
                </label>
                <textarea
                  rows={4}
                  value={editedPitch}
                  onChange={(e) => setEditedPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs leading-relaxed focus:border-[#192A56] focus:bg-white outline-none transition font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-slate-100">
              <button
                onClick={() => onApprovePitch(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => onApprovePitch({ id_lead: pitchResult.id_lead, nomor_wa: waNumber, pesan_final: editedPitch })}
                className="px-5 py-2 rounded-xl bg-[#192A56] hover:bg-[#0E1A38] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Setujui & Dispatch WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
