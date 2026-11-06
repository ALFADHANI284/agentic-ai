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
  Sparkles,
  Store
} from 'lucide-react'

export function DashboardOverlay({
  agents,
  bossConfig,
  selectedAgentId,
  onSelectAgent,
  leads,
  systemInfo,
  activeLead,
  isGenerating,
  pitchResult,
  activities = [],
  onSelectLead,
  onApprovePitch,
  onRefresh,
  onOpenTeamSetup,
  onOpenCreateLead,
  onRunAutoPipeline,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('leads') // 'leads' | 'activity'
  const [editedPitch, setEditedPitch] = useState('')
  const [waNumber, setWaNumber] = useState('081234567890')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isHudVisible, setIsHudVisible] = useState(true)

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

  // Cari agent yang sedang aktif dipilih
  const getSelectedData = () => {
    if (selectedAgentId === 'boss') {
      return {
        id: 'boss',
        name: bossConfig?.name || 'Pak Alfa',
        role: bossConfig?.role || 'Sales Director',
        color: '#f59e0b',
        pos: bossConfig?.pos || [-5.2, 0.18, 1.35],
        statusText: bossConfig?.statusText || 'Supervising Office & Deals',
        station: 'Executive Suite',
      }
    }
    const ag = agents?.[selectedAgentId] || agents?.['blue-agent']
    return ag || {
      name: 'Cubi Agent',
      role: 'Agent',
      color: '#0284c7',
      pos: [0, 0, 0],
      statusText: 'Active',
      station: 'Desk',
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

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none">
      
      {/* Top Header: Clean Minimalist SaaS Bar dengan Kontrol Lengkap */}
      <header className="pointer-events-auto flex items-center justify-between bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2 shadow-sm gap-2">
        <div className="flex items-center gap-3">
          
          {/* Tombol Profil Bos & Kelola Tim */}
          <button
            onClick={onOpenTeamSetup}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 transition-all cursor-pointer shadow-xs"
            title="Kelola Nama Bos & Tim Cubi"
          >
            <Crown className="w-4 h-4 text-amber-600" />
            <div className="text-left leading-none">
              <span className="text-[9px] uppercase font-bold text-amber-600 block">Bos Kantor</span>
              <span className="text-xs font-bold text-slate-800">{bossConfig?.name || 'Pak Alfa'}</span>
            </div>
          </button>

          <div className="h-5 w-[1px] bg-slate-200" />

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/90 px-3 py-1 rounded-xl border border-slate-200/70 w-52 text-xs text-slate-500">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari prospek / minat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-slate-700 w-full placeholder:text-slate-400 text-xs"
            />
          </div>

          {/* Tombol Tambah Lead Baru */}
          <button
            onClick={onOpenCreateLead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tambah Lead</span>
          </button>

          {/* Tombol Jalankan Pipeline Otomatis */}
          <button
            onClick={onRunAutoPipeline}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            title="Proses antrean prospek secara beruntun"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span className="hidden sm:inline">Auto Pipeline</span>
          </button>
        </div>

        {/* System & Model Status Badges */}
        <div className="flex items-center gap-2">
          {/* Badge Appliance MSI Cubi NUC */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-700 font-medium">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{systemInfo?.appliance || 'MSI Cubi NUC AI+ B206'}</span>
          </div>

          {/* Badge Local LLM */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{systemInfo?.local_llm || 'qwen2.5:3b'}</span>
          </div>

          {/* Toggle HUD */}
          <button
            onClick={() => setIsHudVisible(!isHudVisible)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer border border-slate-200"
            title={isHudVisible ? 'Sembunyikan HUD' : 'Tampilkan HUD'}
          >
            {isHudVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer border border-slate-200"
            title="Refresh Leads & System"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Center Row: Left Leads & Activity Drawer & Right Agent Control Menu */}
      {isHudVisible && (
        <div className="flex-1 flex justify-between items-start gap-4 mt-2 overflow-hidden pointer-events-none">
          
          {/* Left Drawer: Tab Antrean Leads & Activity Feed */}
          <aside
            className={`pointer-events-auto transition-all duration-300 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-md flex flex-col max-h-[calc(100vh-230px)] ${
              isSidebarOpen ? 'w-80' : 'w-12'
            }`}
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              {isSidebarOpen ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-lg transition cursor-pointer ${
                      activeTab === 'leads'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Leads ({leads.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-lg transition cursor-pointer ${
                      activeTab === 'activity'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-purple-600" />
                    <span>Aktivitas</span>
                  </button>
                </div>
              ) : (
                <Layers className="w-4 h-4 text-blue-600 mx-auto" />
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer font-mono p-1"
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>

            {/* Konten Tab Leads */}
            {isSidebarOpen && activeTab === 'leads' && (
              <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                {filteredLeads.map((lead) => {
                  const isHot = lead.score_priority === 'Hot'
                  const isWarm = lead.score_priority === 'Warm'
                  const isSelected = activeLead?.id_lead === lead.id_lead
                  const isDispatched = lead.status_kontak === 'dispatched' || lead.status_kontak === 'approved'

                  return (
                    <div
                      key={lead.id_lead}
                      className={`p-2.5 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-400 shadow-sm'
                          : isDispatched
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{lead.nama}</span>
                          {isDispatched && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Dispatched" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              isHot
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : isWarm
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {lead.score_priority || 'Hot'}
                          </span>
                        </div>
                      </div>

                      <div className="text-slate-500 text-[11px] space-y-0.5 mb-1.5">
                        <div className="truncate">Minat: <span className="text-slate-700 font-medium">{lead.minat}</span></div>
                        <div className="flex items-center justify-between">
                          <span>Kota: <span className="text-slate-700">{lead.domisili}</span></span>
                          <span>DP: <span className="text-emerald-600 font-semibold">Rp {parseInt(lead.budget_dp || 0).toLocaleString('id-ID')}</span></span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectLead(lead)}
                        disabled={isGenerating}
                        className={`w-full py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : isDispatched
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-white hover:bg-blue-50 text-blue-600 border border-blue-200'
                        }`}
                      >
                        {isSelected && isGenerating ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Robot Memproses...</span>
                          </>
                        ) : isDispatched ? (
                          <>
                            <span>Proses Ulang Pitch</span>
                            <ChevronRight className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            <span>Tugaskan ke Tim Cubi</span>
                            <ChevronRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Konten Tab Activity Feed */}
            {isSidebarOpen && activeTab === 'activity' && (
              <div className="overflow-y-auto space-y-2 pr-1 flex-1 text-xs">
                {activities.length === 0 ? (
                  <div className="text-slate-400 text-center py-6 text-xs">
                    Belum ada log aktivitas.
                  </div>
                ) : (
                  activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-slate-800">{act.agent}</span>
                        <span className="font-mono text-slate-400">{act.time}</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-700">
                        {act.action}
                      </div>
                      {act.detail && (
                        <div className="text-[10px] text-slate-500 leading-tight">
                          {act.detail}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </aside>

          {/* Right Sidebar: Agent Diorama Selector */}
          <aside className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-md w-52 text-xs space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              TIM KANTOR CUBI
            </div>

            <div className="space-y-1 font-medium text-slate-700">
              {/* Bos */}
              <button
                onClick={() => onSelectAgent('boss')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'boss' ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">{bossConfig?.name || 'Pak Alfa'}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              {/* Cubi Scout */}
              <button
                onClick={() => onSelectAgent('blue-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'blue-agent' ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="truncate">{agents?.['blue-agent']?.name || 'Cubi Scout'}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              {/* Cubi Scribe */}
              <button
                onClick={() => onSelectAgent('purple-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'purple-agent' ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="truncate">{agents?.['purple-agent']?.name || 'Cubi Scribe'}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              {/* Cubi Gate */}
              <button
                onClick={() => onSelectAgent('green-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'green-agent' ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="truncate">{agents?.['green-agent']?.name || 'Cubi Gate'}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              {/* Cubi Vault */}
              <button
                onClick={() => onSelectAgent('orange-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'orange-agent' ? 'bg-orange-50 text-orange-700 font-semibold border border-orange-200' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="truncate">{agents?.['orange-agent']?.name || 'Cubi Vault'}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Bottom Panel: The Sims Agent Inspector */}
      {isHudVisible && (
        <footer className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-md mt-2">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentAgent.color || '#0284c7' }}
              />
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                • {currentAgent.name}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-md bg-slate-100 text-slate-600 font-medium">
                {currentAgent.role}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>pos: ({currentAgent.pos[0].toFixed(1)}, {currentAgent.pos[2].toFixed(1)})</span>
            </div>
          </div>

          {/* Grid Detail Inspector */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                STASIUN KERJA
              </span>
              <span className="font-semibold text-slate-800 truncate block text-[11px]">
                {currentAgent.station || 'Virtual Office'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                AKTIVITAS REAL-TIME
              </span>
              <span className="font-medium text-slate-800 truncate block text-[11px]">
                {isGenerating ? 'Menjalankan Analisis & LLM...' : currentAgent.statusText || 'Siap'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                PROSPEK AKTIF
              </span>
              <span className="font-semibold text-blue-600 truncate block text-[11px]">
                {activeLead ? `${activeLead.nama} (${activeLead.id_lead})` : 'Standby / Idle'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                APPLIANCE RUNTIME
              </span>
              <span className="font-mono font-medium text-slate-800 block text-[11px]">
                MSI Cubi NUC AI+
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                STATUS KONEKSI BE
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${
                  isGenerating ? 'bg-blue-500 animate-ping' : 'bg-emerald-500'
                }`} />
                <span className="capitalize font-semibold text-[11px] text-emerald-700">
                  {isGenerating ? 'Processing' : 'Connected'}
                </span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Approval Gate Modal (Human-in-the-Loop Sales Pitch Review) */}
      {pitchResult && (
        <div className="pointer-events-auto fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200/90 rounded-3xl max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Approval Gate: Review Penawaran Sales
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Diverifikasi sebelum dikirimkan ke calon pembeli
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                Action Required
              </span>
            </div>

            <div className="my-4 space-y-3 text-xs">
              {/* Insight Hasil Analisis BE */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px]">Calon Konsumen:</span>
                  <span className="font-bold text-slate-900">{activeLead?.nama}</span>
                  <span className="text-[10px] text-slate-500 block truncate">({activeLead?.domisili})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Unit Rekomendasi:</span>
                  <span className="font-bold text-blue-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    {pitchResult.unit_rekomendasi}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium block truncate">
                    {pitchResult.stok_info || 'Stok Ready'}
                  </span>
                </div>
              </div>

              {pitchResult.bundling_promo && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-center gap-2 text-amber-900 text-[11px]">
                  <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-semibold">Paket Bundling Tambahan: </span>
                    <span>{pitchResult.bundling_promo}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Calon Konsumen:
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono text-xs focus:border-blue-500 focus:outline-none"
                  placeholder="628xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Draf Pesan WhatsApp (Dihasilkan oleh Qwen 2.5 Local):
                </label>
                <textarea
                  rows={4}
                  value={editedPitch}
                  onChange={(e) => setEditedPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                onClick={() => onApprovePitch(null)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => onApprovePitch({ id_lead: pitchResult.id_lead, nomor_wa: waNumber, pesan_final: editedPitch })}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer"
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
