import React, { useState } from 'react'
import { PlusCircle, X, Check, User, Phone, MapPin, DollarSign, PackageCheck } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#192A56]/40 backdrop-blur-xs pointer-events-auto select-none font-mono">
      <div className="bg-[#F8F5EC] border-2 border-[#192A56] max-w-md w-full p-6 shadow-[8px_8px_0px_0px_#192A56] relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#192A56]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#192A56] text-[#F8F5EC] flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#192A56] uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Tambah Prospek / Lead Baru
              </h3>
              <p className="text-[11px] text-[#576574]">
                Tersimpan di CSV lokal NUC & dianalisis agen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white hover:bg-[#192A56] text-[#192A56] hover:text-[#F8F5EC] flex items-center justify-center transition cursor-pointer border border-[#192A56]/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="my-3 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-[#576574]">Preset:</span>
          <button
            type="button"
            onClick={() => setPreset('Diana Putri', 'harian lincah hemat komuter santai', '3000000', 'Purwokerto Timur')}
            className="text-[10px] bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] text-[#192A56] px-2 py-0.5 border border-[#192A56]/30 transition cursor-pointer font-bold"
          >
            + Diana (Beat Street)
          </button>
          <button
            type="button"
            onClick={() => setPreset('Dimas Pratama', 'kenyamanan touring elegan jarak jauh', '6000000', 'Banyumas Kota')}
            className="text-[10px] bg-white hover:bg-[#192A56] hover:text-[#F8F5EC] text-[#192A56] px-2 py-0.5 border border-[#192A56]/30 transition cursor-pointer font-bold"
          >
            + Dimas (PCX 160)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#192A56] mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#192A56]" />
              Nama Calon Konsumen
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Farhan Maulana"
              required
              className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] text-xs focus:outline-none focus:border-[#192A56]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-[#192A56] mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#192A56]" />
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={nomorWa}
                onChange={(e) => setNomorWa(e.target.value)}
                placeholder="6281234..."
                required
                className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] text-xs font-mono focus:outline-none focus:border-[#192A56]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#192A56] mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#192A56]" />
                Domisili / Cabang
              </label>
              <input
                type="text"
                value={domisili}
                onChange={(e) => setDomisili(e.target.value)}
                placeholder="Purwokerto Timur"
                required
                className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] text-xs focus:outline-none focus:border-[#192A56]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#192A56] mb-1 flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5 text-[#192A56]" />
              Kebutuhan / Minat Unit
            </label>
            <input
              type="text"
              value={minat}
              onChange={(e) => setMinat(e.target.value)}
              placeholder="Contoh: motor gesit irit bensin untuk kuliah harian"
              required
              className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] text-xs focus:outline-none focus:border-[#192A56]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#192A56] mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#192A56]" />
              Budget DP (Rupiah)
            </label>
            <input
              type="number"
              step="500000"
              value={budgetDp}
              onChange={(e) => setBudgetDp(e.target.value)}
              placeholder="3500000"
              required
              className="w-full bg-white border border-[#192A56]/30 px-3 py-2 text-[#192A56] text-xs font-mono focus:outline-none focus:border-[#192A56]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#192A56]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#192A56]/30 bg-white hover:bg-[#F0ECE1] text-[#192A56] font-bold text-xs transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#192A56] hover:bg-[#0E1A38] text-[#F8F5EC] font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#192A56] transition cursor-pointer disabled:opacity-50 text-xs uppercase"
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
