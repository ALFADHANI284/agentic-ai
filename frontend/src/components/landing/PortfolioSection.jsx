import React, { useState } from 'react'

export function PortfolioSection({ onNavigate }) {
  const [slideOffset, setSlideOffset] = useState(0)

  const projects = [
    {
      id: 0,
      category: 'Enterprise & Korporasi',
      title: 'Automated Deal Closing & Triage',
      agentId: 'boss',
      agentName: 'Cubi Commander (Director)',
      duty: 'Supervisi pipeline penjualan, verifikasi kelayakan deal final, dan tata kelola swarm otonom.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/6683c306ce0e91885c284b05_logoProject_cookie3.svg',
      metric1: 'Rp 450M',
      label1: 'Pipeline GTV',
      metric2: '1,000%',
      label2: 'Speed-to-Lead',
      metric3: '24/7',
      label3: 'Otonom Aktif',
      metric4: '99.9%',
      label4: 'Akurasi Triage'
    },
    {
      id: 1,
      category: 'Agency & Software House',
      title: 'Autonomous Full-Stack Dev Team',
      agentId: 'blue-agent',
      agentName: 'Cubi Scout (Sales Engineer)',
      duty: 'Analisis spesifikasi teknis unit katalog, alokasi akselerator NPU lokal, dan sinkronisasi stok cabang.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/66743c2250aaa7aa93be3369_Solidus.svg',
      metric1: '150+',
      label1: 'Repo Terkelola',
      metric2: '7x',
      label2: 'Sprint Velocity',
      metric3: '0 Egress',
      label3: 'Private Codebase',
      metric4: '< 1s',
      label4: 'Review Latency'
    },
    {
      id: 2,
      category: 'Solo Founder & Startup',
      title: '24/7 AI Co-Founders & Pitch Drafter',
      agentId: 'purple-agent',
      agentName: 'Cubi Scribe (AI Drafter)',
      duty: 'Draf percakapan penawaran WhatsApp otomatis via model lokal Qwen 2.5 tanpa latensi cloud.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/6683c331c44763e6f624fd3f_logoProject_chaingpt.svg',
      metric1: '10x',
      label1: 'Produktivitas',
      metric2: '85%',
      label2: 'Cost Reduction',
      metric3: '100+',
      label3: 'Skenario Validasi',
      metric4: 'Instant',
      label4: 'Pitch Proposal'
    },
    {
      id: 3,
      category: 'Dealer Otomotif & Retail',
      title: 'Katalog Motor & Simulasi DP Otonom',
      agentId: 'green-agent',
      agentName: 'Pipeline Analyst (Gatekeeper)',
      duty: 'Deal scoring prospek (Hot/Warm/Cold), kalkulasi simulasi DP, dan verifikasi nomor WhatsApp resmi.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/67682cfbf0c7469274dfa6be_BUBBLEMAPS.svg',
      metric1: '14,800+',
      label1: 'Leads WhatsApp',
      metric2: '92',
      label2: 'Showroom Aktif',
      metric3: '700%',
      label3: 'Konversi Penjualan',
      metric4: '41x',
      label4: 'Deal Velocity'
    },
    {
      id: 4,
      category: 'Finansial & Legal Vault',
      title: 'Sovereign On-Premise Appliance',
      agentId: 'orange-agent',
      agentName: 'Cubi Sentinel (Data Vault)',
      duty: 'Penyimpanan terenkripsi database pelanggan & riwayat penawaran lokal tanpa risiko cloud leak.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/6712603f62e76219f2dc7d18_dex_logo.svg',
      metric1: '0.00ms',
      label1: 'Cloud Leakage',
      metric2: '100%',
      label2: 'Local Sovereign',
      metric3: '48 TOPS',
      label3: 'NPU Hardware',
      metric4: 'MSI Cubi',
      label4: 'Appliance AI+'
    },
    {
      id: 5,
      category: 'Customer Care & Helpdesk',
      title: '24/7 Multi-Agent Smart Telemetry',
      agentId: 'blue-agent',
      agentName: 'Cubi Scout (Telemetry)',
      duty: 'Telemetri sistem, respon kilat pelanggan showroom Honda, dan pemeliharaan antrean lead realtime.',
      logo: '/assets/webflow/6649e26c9fdc8739cefdc48e/6697d1dd0cc6f32e7084f512_gt_protocol.svg',
      metric1: '< 2 Detik',
      label1: 'Respon Kilat',
      metric2: '98.6%',
      label2: 'CSAT Score',
      metric3: '5 Agen',
      label3: 'Mesh Standby',
      metric4: '100%',
      label4: 'Data Privacy'
    }
  ]

  const maxOffset = Math.max(0, projects.length - 3)

  const handlePrev = () => {
    setSlideOffset((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setSlideOffset((prev) => Math.min(maxOffset, prev + 1))
  }

  const handleOpenSetup = (p) => {
    onNavigate?.('office', { agentId: p.agentId })
  }

  return (
    <section id="portfolio-section" className="portfolio-section relative z-10 w-full bg-[#F8F5EC] border-b border-[#192A56]/20 py-12 sm:py-16 clear-both overflow-hidden">
      
      <div className="w-layout-blockcontainer container portfolio-container w-container relative z-10">
        
        {/* Top Header: Title Block on Left & All Projects Counter on Right (Sesuai targetpengguna1.png) */}
        <div className="portfolio-top flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          
          {/* Main Title Box */}
          <div className="portfolio-main bg-white border border-[#192A56]/30 p-6 sm:p-8 max-w-xl shadow-xs relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#192A56] block" />
              <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#192A56]/70">
                USE CASES &amp; SOLUSI
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#192A56] tracking-tight leading-none"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              TARGET PENGGUNA
            </h2>
          </div>

          {/* Setup Counter Box (Identik targetpengguna1.png: All Projects 06 with Arrow Button) */}
          <a
            href="/office"
            onClick={(e) => {
              e.preventDefault()
              onNavigate?.('office')
            }}
            className="portfolio-all flex items-stretch self-start border border-[#192A56]/30 bg-white hover:border-[#192A56] transition-all no-underline group shadow-xs cursor-pointer"
            title="Masuk ke Virtual Office untuk melihat setup agen"
          >
            <div className="portfolio-info p-3 sm:p-4 border-r border-[#192A56]/20 bg-white">
              <div className="text-[11px] font-mono text-[#576574] uppercase font-bold">
                All Projects (Setup)
              </div>
              <div className="portfolio-count font-mono font-bold text-3xl sm:text-4xl text-[#192A56] leading-none mt-1">
                0{projects.length}
              </div>
            </div>
            <div className="portfolio-link portfolio-item-link--sm bg-[#192A56] group-hover:bg-[#0E1A38] w-12 sm:w-14 flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z"
                  fill="#F8F5EC"
                />
              </svg>
            </div>
          </a>

        </div>

        {/* Navigation Buttons: Side-by-side square buttons on the left (Sesuai targetpengguna.png) */}
        <div className="portfolio-buttons flex items-center mb-6">
          <button
            onClick={handlePrev}
            disabled={slideOffset === 0}
            className="portfolio-button portfolio-button-prev w-12 h-14 bg-white border border-[#192A56]/30 hover:bg-[#192A56] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs group"
            title="Use Case Sebelumnya"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M14.3212 2.91429C14.3212 2.40934 13.9118 2 13.4069 2H11.5783C11.0734 2 10.664 2.40934 10.664 2.91429V4.28571C10.664 4.79066 10.2547 5.2 9.74975 5.2H8.37832C7.87337 5.2 7.46404 5.60934 7.46404 6.11429V7.48571C7.46404 7.99066 7.0547 8.4 6.54975 8.4H5.17832C4.67338 8.4 4.26404 8.80934 4.26404 9.31429V11.1429C11.1429 11.6478 11.6478 12.0571 12.0571 12.0571H7.00689C7.51184 12.0571 7.92118 12.4665 7.92118 12.9714V13.8857C7.92118 14.3907 8.33052 14.8 8.83546 14.8H10.2069C10.7118 14.8 11.1212 15.2093 11.1212 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z"
                fill="currentColor"
                className="text-[#192A56] group-hover:fill-[#F8F5EC] transition-colors"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={slideOffset >= maxOffset}
            className="portfolio-button portfolio-button-next w-12 h-14 bg-white border border-[#192A56]/30 border-l-0 hover:bg-[#192A56] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer shadow-xs group"
            title="Use Case Berikutnya"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z"
                fill="currentColor"
                className="text-[#192A56] group-hover:fill-[#F8F5EC] transition-colors"
              />
            </svg>
          </button>
        </div>

        {/* Carousel Slider Cards (Matching targetpengguna.png Layout) */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${slideOffset} * (360px + 24px)))`
            }}
          >
            {projects.map((p) => (
              <div
                key={p.id}
                className="shrink-0 w-[340px] sm:w-[360px]"
              >
                {/* Authentic Webflow Card (.portfolio-item.layout-diff) */}
                <div 
                  className="portfolio-item layout-diff bg-white border border-[#192A56]/30 hover:border-[#192A56] transition-all flex flex-col justify-between shadow-xs relative"
                >
                  {/* Top Card: Category Badge + Centered Logo + Duty */}
                  <div className="portfolio-item-top relative p-6 sm:p-7 flex flex-col items-center justify-between min-h-[230px] border-b border-[#192A56]/20 bg-white">
                    {/* Category tag at top-left border */}
                    <div className="portfolio-item-category border-r border-b border-[#192A56]/25 bg-white px-3 py-1 font-mono text-[11px] text-[#192A56] font-bold">
                      {p.category}
                    </div>

                    {/* BE SYNC status badge at top-right */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      BE SYNC
                    </div>

                    {/* Title & Duty */}
                    <div className="w-full text-center my-auto py-2">
                      <h3 className="font-bold text-base text-[#192A56] leading-snug mb-2.5">
                        {p.title}
                      </h3>
                      <div className="text-[11px] font-mono text-[#576574] leading-relaxed bg-[#F8F5EC] p-3 border border-[#192A56]/15 text-left">
                        <strong className="text-[#192A56] block mb-0.5">Tugas ({p.agentName}):</strong>
                        {p.duty}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card: 2x2 Metric Grid + Right Vertical Rectangular Arrow Button (Sesuai targetpengguna.png) */}
                  <div className="portfolio-item-bottom margin-top-auto flex items-stretch bg-white">
                    {/* 2x2 Metric List */}
                    <div className="portfolio-item-list grid grid-cols-2 flex-1 border-r border-[#192A56]/20">
                      <div className="p-3 border-r border-b border-[#192A56]/20 bg-white">
                        <div className="font-mono font-bold text-sm text-[#192A56] leading-tight">{p.metric1}</div>
                        <div className="text-[10px] font-mono text-[#576574] uppercase mt-0.5">{p.label1}</div>
                      </div>
                      <div className="p-3 border-b border-[#192A56]/20 bg-white">
                        <div className="font-mono font-bold text-sm text-[#192A56] leading-tight">{p.metric2}</div>
                        <div className="text-[10px] font-mono text-[#576574] uppercase mt-0.5">{p.label2}</div>
                      </div>
                      <div className="p-3 border-r border-[#192A56]/20 bg-white">
                        <div className="font-mono font-bold text-sm text-[#192A56] leading-tight">{p.metric3}</div>
                        <div className="text-[10px] font-mono text-[#576574] uppercase mt-0.5">{p.label3}</div>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="font-mono font-bold text-sm text-[#192A56] leading-tight">{p.metric4}</div>
                        <div className="text-[10px] font-mono text-[#576574] uppercase mt-0.5">{p.label4}</div>
                      </div>
                    </div>

                    {/* Vertical Rectangular Link Button (➔) */}
                    <div
                      onClick={() => handleOpenSetup(p)}
                      className="portfolio-item-link group w-16 sm:w-20 bg-white hover:bg-[#192A56] flex items-center justify-center transition-colors cursor-pointer select-none"
                      title="Lihat Alur Eksekusi Agen di Office"
                    >
                      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="portfolio-item-arrow transition-transform group-hover:translate-x-1">
                        <path
                          d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z"
                          fill="currentColor"
                          className="text-[#192A56] group-hover:fill-[#F8F5EC] transition-colors"
                        />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
