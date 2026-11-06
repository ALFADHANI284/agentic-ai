import React, { useState } from 'react'
import { Crown, Sparkles, Check, X, Shield, Bot, Server, Send, Briefcase, UserCheck } from 'lucide-react'

export function TeamSetupModal({ isOpen, onClose, teamConfig, onSave }) {
  const [bossName, setBossName] = useState(teamConfig?.boss?.name || 'Pak Alfa')
  const [bossRole, setBossRole] = useState(teamConfig?.boss?.role || 'Chief Executive / Sales Director')
  const [scoutName, setScoutName] = useState(teamConfig?.agents?.['blue-agent']?.name || 'Cubi Scout')
  const [scribeName, setScribeName] = useState(teamConfig?.agents?.['purple-agent']?.name || 'Cubi Scribe')
  const [gateName, setGateName] = useState(teamConfig?.agents?.['green-agent']?.name || 'Cubi Gate')
  const [vaultName, setVaultName] = useState(teamConfig?.agents?.['orange-agent']?.name || 'Cubi Vault')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = {
      boss: {
        name: bossName.trim() || 'Pak Alfa',
        role: bossRole.trim() || 'Chief Executive / Sales Director',
        color: '#f59e0b',
        badge: 'DIRECTOR',
        station: 'boss_desk'
      },
      agents: {
        'blue-agent': {
          ...teamConfig?.agents?.['blue-agent'],
          id: 'blue-agent',
          name: scoutName.trim() || 'Cubi Scout',
          role: 'Compute & Stock Analyzer',
          color: '#0284c7',
        },
        'purple-agent': {
          ...teamConfig?.agents?.['purple-agent'],
          id: 'purple-agent',
          name: scribeName.trim() || 'Cubi Scribe',
          role: 'AI Pitch Drafter',
          color: '#9333ea',
        },
        'green-agent': {
          ...teamConfig?.agents?.['green-agent'],
          id: 'green-agent',
          name: gateName.trim() || 'Cubi Gate',
          role: 'Approval & Dispatch',
          color: '#16a34a',
        },
        'orange-agent': {
          ...teamConfig?.agents?.['orange-agent'],
          id: 'orange-agent',
          name: vaultName.trim() || 'Cubi Vault',
          role: 'Data & Deal Archivist',
          color: '#ea580c',
        },
      }
    }
    onSave(updated)
    onClose()
  }

  const applyPreset = (preset) => {
    if (preset === 'official') {
      setBossName('Pak Alfa')
      setBossRole('Sales Director')
      setScoutName('Cubi Scout')
      setScribeName('Cubi Scribe')
      setGateName('Cubi Gate')
      setVaultName('Cubi Vault')
    } else if (preset === 'nuc') {
      setBossName('Chief Alfa')
      setBossRole('Cubi AI Maestro')
      setScoutName('NUC-Compute')
      setScribeName('NUC-Writer')
      setGateName('NUC-Dispatch')
      setVaultName('NUC-Vault')
    } else if (preset === 'astra') {
      setBossName('Alfa Dhani')
      setBossRole('Head of Digital Sales')
      setScoutName('Analis Stok')
      setScribeName('Penulis Promo WA')
      setGateName('Gerbang Validasi')
      setVaultName('Arsip Database')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm pointer-events-auto select-none">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Dekoratif */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>Personalisasi Kantor & Tim Cubi NUC</span>
              </h2>
              <p className="text-xs text-slate-500">
                Atur nama Bos dan 4 Robot Mini MSI Cubi NUC untuk operasional kantor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Cepat */}
        <div className="flex items-center gap-2 my-3">
          <span className="text-[11px] text-slate-400 font-medium">Preset Cepat:</span>
          <button
            type="button"
            onClick={() => applyPreset('official')}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-600 transition cursor-pointer border border-slate-200"
          >
            Astra Motor Hub
          </button>
          <button
            type="button"
            onClick={() => applyPreset('nuc')}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-amber-50 hover:text-amber-600 rounded-lg text-slate-600 transition cursor-pointer border border-slate-200"
          >
            MSI Cubi Maestro
          </button>
          <button
            type="button"
            onClick={() => applyPreset('astra')}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg text-slate-600 transition cursor-pointer border border-slate-200"
          >
            Nusantara Sales
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Card Profil Bos */}
          <div className="p-3.5 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/40 border border-amber-200/90 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>Profil Bos / Direktur Utama</span>
              </div>
              <span className="text-[9px] bg-amber-200/80 text-amber-900 font-mono px-2 py-0.5 rounded-full font-semibold">
                Meja Eksekutif 3D
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                  Nama Panggilan Bos:
                </label>
                <input
                  type="text"
                  value={bossName}
                  onChange={(e) => setBossName(e.target.value)}
                  placeholder="Contoh: Pak Alfa"
                  className="w-full bg-white border border-amber-300/80 rounded-xl px-2.5 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                  Jabatan / Gelar:
                </label>
                <input
                  type="text"
                  value={bossRole}
                  onChange={(e) => setBossRole(e.target.value)}
                  placeholder="Contoh: Sales Director"
                  className="w-full bg-white border border-amber-300/80 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Form 4 Agen Cubi */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Nama 4 Robot Mini Cubi NUC</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">Tersinkron ke Backend & 3D Billboard</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Cubi Scout */}
              <div className="p-2.5 bg-slate-50 hover:bg-slate-50/90 border border-slate-200/90 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>Cubi Biru</span>
                  </div>
                  <span className="text-[9px] text-blue-600 bg-blue-100/70 px-1.5 py-0.2 rounded font-mono">
                    Scout
                  </span>
                </div>
                <input
                  type="text"
                  value={scoutName}
                  onChange={(e) => setScoutName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:border-blue-500 text-xs"
                />
                <span className="text-[9px] text-slate-400 mt-1 block truncate">
                  Tugas: Riset Stok & Katalog Motor
                </span>
              </div>

              {/* Cubi Scribe */}
              <div className="p-2.5 bg-slate-50 hover:bg-slate-50/90 border border-slate-200/90 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Cubi Ungu</span>
                  </div>
                  <span className="text-[9px] text-purple-600 bg-purple-100/70 px-1.5 py-0.2 rounded font-mono">
                    Scribe
                  </span>
                </div>
                <input
                  type="text"
                  value={scribeName}
                  onChange={(e) => setScribeName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:border-purple-500 text-xs"
                />
                <span className="text-[9px] text-slate-400 mt-1 block truncate">
                  Tugas: Draf WhatsApp via Qwen LLM
                </span>
              </div>

              {/* Cubi Gate */}
              <div className="p-2.5 bg-slate-50 hover:bg-slate-50/90 border border-slate-200/90 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Cubi Hijau</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 bg-emerald-100/70 px-1.5 py-0.2 rounded font-mono">
                    Gate
                  </span>
                </div>
                <input
                  type="text"
                  value={gateName}
                  onChange={(e) => setGateName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:border-emerald-500 text-xs"
                />
                <span className="text-[9px] text-slate-400 mt-1 block truncate">
                  Tugas: Approval & Suar WhatsApp
                </span>
              </div>

              {/* Cubi Vault */}
              <div className="p-2.5 bg-slate-50 hover:bg-slate-50/90 border border-slate-200/90 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-orange-700 font-bold text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Cubi Oranye</span>
                  </div>
                  <span className="text-[9px] text-orange-600 bg-orange-100/70 px-1.5 py-0.2 rounded font-mono">
                    Vault
                  </span>
                </div>
                <input
                  type="text"
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:border-orange-500 text-xs"
                />
                <span className="text-[9px] text-slate-400 mt-1 block truncate">
                  Tugas: Arsip Data Deal ke Database
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer text-xs"
            >
              <Check className="w-4 h-4" />
              <span>Simpan & Terapkan ke Kantor 3D</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
