import React, { useState } from 'react'
import { PlusCircle, X, Check, User, Phone, MapPin, DollarSign, Sparkles } from 'lucide-react'

export function CreateLeadModal({ isOpen, onClose, onCreateLead }) {
  const [nama, setNama] = useState('')
  const [nomorWa, setNomorWa] = useState('628')
  const [minat, setMinat] = useState('')
  const [budgetDp, setBudgetDp] = useState('3500000')
  const [domisili, setDomisili] = useState('Purwokerto Timur')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nama.trim() || !minat.trim()) return

    setIsSubmitting(true)
    try {
      await onCreateLead({
        nama: nama.trim(),
        nomor_wa: nomorWa.trim(),
        minat: minat.trim(),
        budget_dp: parseInt(budgetDp) || 2000000,
        domisili: domisili.trim() || 'Purwokerto Timur',
      })
      // Reset form
      setNama('')
      setMinat('')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const setPreset = (presetNama, presetMinat, presetDp, presetKota) => {
    setNama(presetNama)
    setMinat(presetMinat)
    setBudgetDp(presetDp)
    setDomisili(presetKota)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm pointer-events-auto select-none">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Tambah Prospek / Lead Baru
              </h3>
              <p className="text-[11px] text-slate-500">
                Data akan tersimpan di CSV backend & dianalisis robot
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="my-3 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-slate-400">Contoh Cepat:</span>
          <button
            type="button"
            onClick={() => setPreset('Diana Putri', 'harian lincah hemat komuter santai', '3000000', 'Purwokerto Timur')}
            className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-200 cursor-pointer"
          >
            + Diana (Beat Street)
          </button>
          <button
            type="button"
            onClick={() => setPreset('Dimas Pratama', 'kenyamanan touring elegan jarak jauh', '6000000', 'Banyumas Kota')}
            className="text-[10px] bg-slate-100 hover:bg-purple-50 hover:text-purple-600 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-200 cursor-pointer"
          >
            + Dimas (PCX 160)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Nama Calon Konsumen
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Farhan Maulana"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={nomorWa}
                onChange={(e) => setNomorWa(e.target.value)}
                placeholder="6281234..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Domisili / Cabang
              </label>
              <input
                type="text"
                value={domisili}
                onChange={(e) => setDomisili(e.target.value)}
                placeholder="Purwokerto Timur"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              Kebutuhan / Minat Unit
            </label>
            <input
              type="text"
              value={minat}
              onChange={(e) => setMinat(e.target.value)}
              placeholder="Contoh: motor gesit irit bensin untuk kuliah harian"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              Budget DP (Rupiah)
            </label>
            <input
              type="number"
              step="500000"
              value={budgetDp}
              onChange={(e) => setBudgetDp(e.target.value)}
              placeholder="3500000"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Tambahkan Lead'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
