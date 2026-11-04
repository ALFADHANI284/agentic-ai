import React, { useState } from 'react'
import { 
  Search, 
  Layers, 
  Send, 
  RefreshCw, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Eye,
  EyeOff
} from 'lucide-react'

export function DashboardOverlay({
  agents,
  selectedAgentId,
  onSelectAgent,
  leads,
  systemInfo,
  activeLead,
  isGenerating,
  pitchResult,
  onSelectLead,
  onApprovePitch,
  onRefresh
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [editedPitch, setEditedPitch] = useState('')
  const [waNumber, setWaNumber] = useState('081234567890')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isHudVisible, setIsHudVisible] = useState(true)

  React.useEffect(() => {
    if (pitchResult?.draft_pitch) {
      setEditedPitch(pitchResult.draft_pitch)
    }
  }, [pitchResult])

  const selectedAgent = agents[selectedAgentId] || agents['blue-agent']

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none">
      
      {/* Top Header: Clean White Minimalist SaaS Bar */}
      <header className="pointer-events-auto flex items-center justify-between bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-slate-100/90 px-3 py-1 rounded-xl border border-slate-200/70 w-60 text-xs text-slate-500">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="search agents, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-slate-700 w-full placeholder:text-slate-400 text-xs"
            />
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          {/* Active Agents Badge */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Agents Active</span>
          </div>
        </div>

        {/* System & Model Status Badges */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-700 font-medium">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{systemInfo?.appliance || 'MSI Cubi NUC'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{systemInfo?.local_llm || 'qwen2.5:3b'}</span>
          </div>

          <button
            onClick={() => setIsHudVisible(!isHudVisible)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer border border-slate-200"
            title={isHudVisible ? 'Minimize HUD' : 'Show HUD'}
          >
            {isHudVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onRefresh}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer border border-slate-200"
            title="Refresh Leads & System"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Center Row: Left Leads Drawer & Right Control Menu */}
      {isHudVisible && (
        <div className="flex-1 flex justify-between items-start gap-4 mt-2 overflow-hidden pointer-events-none">
          
          {/* Left Drawer: Antrean Leads (Clean White Cards) */}
          <aside
            className={`pointer-events-auto transition-all duration-300 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-md flex flex-col max-h-[calc(100vh-230px)] ${
              isSidebarOpen ? 'w-72' : 'w-12'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              {isSidebarOpen ? (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Antrean Leads ({leads.length})</span>
                </div>
              ) : (
                <Layers className="w-4 h-4 text-blue-600 mx-auto" />
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer font-mono"
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>

            {isSidebarOpen && (
              <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                {leads.map((lead) => {
                  const isHot = lead.score_priority === 'Hot'
                  const isWarm = lead.score_priority === 'Warm'
                  const isSelected = activeLead?.id_lead === lead.id_lead

                  return (
                    <div
                      key={lead.id_lead}
                      className={`p-2.5 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-400 shadow-sm'
                          : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">{lead.nama}</span>
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

                      <div className="text-slate-500 text-[11px] space-y-0.5 mb-1.5">
                        <div>Minat: <span className="text-slate-700">{lead.minat}</span></div>
                        <div>Kota: <span className="text-slate-700">{lead.domisili}</span></div>
                        <div>DP: <span className="text-emerald-600 font-semibold">Rp {parseInt(lead.budget_dp || 0).toLocaleString('id-ID')}</span></div>
                      </div>

                      <button
                        onClick={() => onSelectLead(lead)}
                        disabled={isGenerating}
                        className={`w-full py-1 px-2 rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white hover:bg-blue-50 text-blue-600 border border-blue-200'
                        }`}
                      >
                        {isSelected && isGenerating ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>AI Memproses...</span>
                          </>
                        ) : (
                          <>
                            <span>Tugaskan ke Robot</span>
                            <ChevronRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </aside>

          {/* Right Sidebar: Clean Control Menu */}
          <aside className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-md w-48 text-xs space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              AGENT DIORAMA
            </div>

            <div className="space-y-1 font-medium text-slate-700">
              <button
                onClick={() => onSelectAgent('blue-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'blue-agent' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Robot Biru</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectAgent('orange-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'orange-agent' ? 'bg-orange-50 text-orange-700 font-semibold' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Robot Oranye</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectAgent('green-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'green-agent' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Robot Hijau</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectAgent('purple-agent')}
                className={`w-full flex items-center justify-between p-1.5 rounded-xl text-left transition cursor-pointer text-xs ${
                  selectedAgentId === 'purple-agent' ? 'bg-purple-50 text-purple-700 font-semibold' : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>Robot Ungu</span>
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
          {/* Pill header */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedAgent?.color || '#0284c7' }}
              />
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                • {selectedAgent?.name || selectedAgentId}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-md bg-slate-100 text-slate-600 font-medium">
                {selectedAgent?.role || 'Agent'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>pos: {selectedAgent?.pos ? `(${selectedAgent.pos[0].toFixed(1)}, ${selectedAgent.pos[2].toFixed(1)})` : '(0, 0)'}</span>
            </div>
          </div>

          {/* Grid Inspector */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                TASK
              </span>
              <span className="font-medium text-slate-800 truncate block text-[11px]">
                {isGenerating ? 'Drafting pitch via LLM' : selectedAgent?.statusText || 'Active Compute'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                FEATURE
              </span>
              <span className="font-medium text-slate-800 truncate block text-[11px]">
                {activeLead ? `Lead #${activeLead.id_lead}` : 'Kanban sync'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                RUNTIME
              </span>
              <span className="font-mono font-medium text-slate-800 block text-[11px]">
                {isGenerating ? '00:04.2s' : '02:14.8s'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                TOKENS
              </span>
              <span className="font-mono font-medium text-slate-800 block text-[11px]">
                {isGenerating ? '4,120' : '12,840'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                STATUS
              </span>
              <div className="flex items-center gap-2">
                <span className={`capitalize font-semibold text-[10px] ${
                  isGenerating ? 'text-blue-600 animate-pulse' : 'text-emerald-600'
                }`}>
                  {isGenerating ? 'running' : 'ready'}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                  style={{ width: isGenerating ? '78%' : '100%' }}
                />
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Approval Gate Modal */}
      {pitchResult && (
        <div className="pointer-events-auto fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Approval Gate (Sales Pitch Review)
                </h3>
              </div>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                Action Required
              </span>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px]">Calon Konsumen:</span>
                  <span className="font-semibold text-slate-900">{activeLead?.nama} ({activeLead?.domisili})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Rekomendasi Unit AI:</span>
                  <span className="font-semibold text-blue-600">{pitchResult.unit_rekomendasi}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Nomor WhatsApp Calon Konsumen:
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs focus:border-blue-500 focus:outline-none"
                  placeholder="08xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Draft Pesan WhatsApp (Dihasilkan oleh Qwen 2.5):
                </label>
                <textarea
                  rows={4}
                  value={editedPitch}
                  onChange={(e) => setEditedPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => onApprovePitch(null)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => onApprovePitch({ id_lead: pitchResult.id_lead, nomor_wa: waNumber, pesan_final: editedPitch })}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition cursor-pointer"
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
