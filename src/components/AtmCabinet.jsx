import { useEffect, useState } from 'react'

export default function AtmCabinet({ children, isPrinting }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center p-4 sm:p-8 select-none">
      {/* Outer 3D Cabinet Shell */}
      <div className="relative w-full max-w-[440px] bg-[#e3dec3] rounded-[24px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(0,0,0,0.3)] border-4 border-[#b5ae95]">

        {/* Top CRT Monitor Hood / Recessed Bezel */}
        <div className="relative bg-[#222320] p-3 rounded-xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] border-b-4 border-[#c8c0a5]">

          {/* Header bar inside hood */}
          <div className="flex items-center justify-between mb-2 px-1 relative z-[2]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(51,255,51,0.6)]" />
              <span className="font-terminal text-[10px] sm:text-xs text-[#8a8573] tracking-widest uppercase">
                Stellar Testnet
              </span>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#6e6856]">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>

          {/* Brand label */}
          <div className="text-center mb-2 relative z-[2]">
            <div className="font-terminal text-sm sm:text-base text-[#b5ae95] tracking-[0.25em] uppercase">
              ⬡ Stellar ATM ⬡
            </div>
          </div>

          {/* CRT Screen Housing */}
          <div className="relative overflow-hidden rounded-lg bg-[#0a0f0d] border-2 border-[#1a1c18] scanline-effect">
            <div className="crt-scanlines crt-curve crt-noise relative bg-crt-black overflow-hidden"
                 style={{ minHeight: '480px' }}>
              <div className="relative z-[1] h-full min-h-[480px] overflow-y-auto">
                {children}
              </div>
              <div
                className="absolute inset-0 pointer-events-none z-[12]"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Angled Mid-Section Console (The Control Deck Bevel) */}
        <div className="mt-4 relative bg-gradient-to-b from-[#e3dec3] to-[#d3ccc0] p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.2)] border-t-2 border-white">

          {/* Side Option Keys (4 on left, 4 on right) */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex flex-col gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={`l-${i}`} className="w-6 h-3 bg-[#e8e3cc] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#b5ae95]" />
              ))}
            </div>

            {/* Central Card Insertion Slot */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-36 h-2 bg-[#1a1c18] rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)] border-b border-white/20" />
              <span className="text-[9px] font-mono tracking-widest text-[#8a8573]">CARD READER</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {[5, 6, 7, 8].map((i) => (
                <div key={`r-${i}`} className="w-6 h-3 bg-[#e8e3cc] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#b5ae95]" />
              ))}
            </div>
          </div>

          {/* Receipt Printer Slot */}
          <div className="mb-4">
            <div className={`receipt-slot relative z-10 h-8 w-[280px] sm:w-[340px] mx-auto ${isPrinting ? 'receipt-slot-printing' : ''}`} />
            <div className="font-mono text-[8px] sm:text-[10px] text-[#6e6856] mt-0.5 tracking-wider text-center">
              RECEIPT PRINTER
            </div>
            <div id="receipt-print-zone" className="receipt-print-zone" />
          </div>

          {/* Physical Keypad Matrix */}
          <div className="grid grid-cols-4 gap-2 bg-[#d0c8b2] p-3 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            {['1', '2', '3', 'C', '4', '5', '6', 'OK', '7', '8', '9', 'CLR', '*', '0', '#', 'E'].map((key) => {
              let keyBg = 'bg-[#f2efe4] hover:bg-[#fff]'
              if (key === 'OK') keyBg = 'bg-[#27ae60] text-white hover:bg-[#2ecc71]'
              if (key === 'E') keyBg = 'bg-[#d35400] text-white hover:bg-[#e67e22]'

              return (
                <button
                  key={key}
                  type="button"
                  className={`${keyBg} h-10 rounded font-mono font-bold text-sm shadow-[0_3px_0_#9c947c,0_4px_6px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-[0_1px_0_#9c947c] transition-all duration-75 flex items-center justify-center border border-[#c2b9a0]`}
                  aria-label={`Keypad ${key}`}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>

        {/* Machine Base Footer Info */}
        <div className="mt-3 text-center border-t border-[#c8c0a5] pt-2">
          <p className="text-[9px] font-mono text-[#6e6856] tracking-tight">
            STELLAR TESTNET TERMINAL v2.0.1
          </p>
          <p className="text-[8px] font-mono text-[#8a8573]">
            THIS IS A TEST APPLICATION — NO REAL FUNDS INVOLVED
          </p>
          <p className="text-[7px] font-mono text-[#6e6856] mt-0.5">
            Powered by Freighter · Stellar Development Foundation
          </p>
        </div>
      </div>
    </div>
  )
}
