import React, { useState } from 'react'
import { 
  Bot, 
  Cpu, 
  Send, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Sparkles, 
  PhoneCall, 
  Activity, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Terminal
} from 'lucide-react'

export function DashboardOverlay({
  leads,
  systemInfo,
  logs,
  activeLead,
  isGenerating,
  pitchResult,
  onSelectLead,
  onApprovePitch,
  onRefresh
}) {
  const [editedPitch, setEditedPitch] = useState('')
  const [waNumber, setWaNumber] = useState('081234567890')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Sync draft when pitchResult arrives
  React.useEffect(() => {
    if (pitchResult?.draft_pitch) {
      setEditedPitch(pitchResult.draft_pitch)
    }
  }, [pitchResult])

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 select-none">
      {/* Top Header Glassmorphism */}
      <header className="pointer-events-auto flex items-center justify-between bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-2xl px-5 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Agentic Sales Hub <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">3D Office</span>
            </h1>
            <p className="text-[11px] text-slate-400">Autonomous Sales Multi-Agent System</p>
          </div>
        </div>

        {/* Appliance & Model Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>{systemInfo?.appliance || 'MSI Cubi NUC AI+'}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="font-mono text-purple-300">{systemInfo?.local_llm || 'qwen2.5:3b'}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium capitalize">{systemInfo?.status || 'Online'}</span>
          </div>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
            title="Refresh Leads & System"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Overlay: Left Drawer (Leads Queue) & Right Logs */}
      <div className="flex-1 flex justify-between items-start gap-4 mt-4 overflow-hidden pointer-events-none">
        
        {/* Left Drawer: Leads Radar */}
        <aside
          className={`pointer-events-auto transition-all duration-300 bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 shadow-2xl flex flex-col max-h-[calc(100vh-170px)] ${
            isSidebarOpen ? 'w-84' : 'w-14'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Antrean Leads ({leads.length})</span>
              </div>
            ) : (
              <Layers className="w-5 h-5 text-cyan-400 mx-auto" />
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
              {leads.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Belum ada leads dalam antrean.
                </div>
              ) : (
                leads.map((lead) => {
                  const isHot = lead.score_priority === 'Hot'
                  const isWarm = lead.score_priority === 'Warm'
                  const isSelected = activeLead?.id_lead === lead.id_lead

                  return (
                    <div
                      key={lead.id_lead}
                      className={`p-3 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-white">{lead.nama}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHot
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : isWarm
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {lead.score_priority || 'Warm'}
                        </span>
                      </div>

                      <div className="text-slate-400 text-[11px] space-y-0.5 mb-2">
                        <div>Minat: <span className="text-slate-200">{lead.minat}</span></div>
                        <div>Kota: <span className="text-slate-200">{lead.domisili}</span></div>
                        <div>Budget DP: <span className="text-emerald-400 font-mono">Rp {parseInt(lead.budget_dp || 0).toLocaleString('id-ID')}</span></div>
                      </div>

                      <button
                        onClick={() => onSelectLead(lead)}
                        disabled={isGenerating}
                        className={`w-full py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold'
                            : 'bg-slate-700/80 hover:bg-cyan-600 text-white'
                        }`}
                      >
                        {isSelected && isGenerating ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>AI Sedang Berpikir...</span>
                          </>
                        ) : (
                          <>
                            <span>Proses ke Sales AI</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </aside>

        {/* Right Panel: Live Agent Activity Terminal */}
        <aside className="pointer-events-auto w-80 bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-2xl p-4 shadow-2xl flex flex-col max-h-[calc(100vh-170px)]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3 text-xs font-semibold text-slate-200">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>Agent Mission Log</span>
          </div>

          <div className="overflow-y-auto space-y-2 pr-1 font-mono text-[11px] flex-1">
            {logs.map((log, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-800/40 border border-slate-800/60 leading-relaxed">
                <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                  <span className={`font-semibold ${
                    log.sender === 'Scout' ? 'text-cyan-400' :
                    log.sender === 'Scribe' ? 'text-purple-400' :
                    log.sender === 'Commander' ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    [{log.sender}]
                  </span>
                  <span>{log.time}</span>
                </div>
                <div className="text-slate-200 text-[10px]">{log.message}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Approval Gate Modal (Human-in-the-Loop) */}
      {pitchResult && (
        <div className="pointer-events-auto fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Approval Gate (Sales Pitch Review)</h3>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Action Required
              </span>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">Calon Konsumen:</span>
                  <span className="font-semibold text-white">{activeLead?.nama} ({activeLead?.domisili})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Rekomendasi Unit AI:</span>
                  <span className="font-semibold text-cyan-300">{pitchResult.unit_rekomendasi}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Nomor WhatsApp Calon Konsumen:
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="08xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Draft Pesan WhatsApp (Dihasilkan oleh Qwen 2.5 Local LLM):
                </label>
                <textarea
                  rows={4}
                  value={editedPitch}
                  onChange={(e) => setEditedPitch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-xs leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 italic">
                  * Anda dapat mengedit teks sebelum disetujui untuk dikirim.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => onApprovePitch(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => onApprovePitch({ id_lead: pitchResult.id_lead, nomor_wa: waNumber, pesan_final: editedPitch })}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
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
