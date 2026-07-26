import { useEffect, useState } from 'react'

export default function AtmChassis({ children, isPrinting }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4 sm:p-8">
      {/* ATM Machine Body */}
      <div className="w-full max-w-lg">
        {/* Top decorative panel */}
        <div className="atm-bezel rounded-t-3xl px-6 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Power indicator */}
              <div className="w-3 h-3 rounded-full bg-phosphor shadow-[0_0_8px_rgba(51,255,51,0.6)]" />
              <div className="font-terminal text-xs sm:text-sm text-gray-400 tracking-widest uppercase">
                Stellar Testnet
              </div>
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-gray-500">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>

          {/* Brand label */}
          <div className="mt-3 text-center">
            <div className="font-terminal text-xl sm:text-2xl text-gray-300 tracking-[0.3em] uppercase">
              ⬡ STELLAR ATM ⬡
            </div>
          </div>
        </div>

        {/* Screen bezel */}
        <div className="atm-bezel-inner mx-2 sm:mx-3">
          {/* CRT Screen */}
          <div className="crt-scanlines crt-curve crt-noise relative bg-crt-black overflow-hidden"
               style={{ minHeight: '480px' }}>
            {/* Screen content */}
            <div className="relative z-[1] h-full min-h-[480px] overflow-y-auto">
              {children}
            </div>

            {/* CRT vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-[12]"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          </div>
        </div>

        {/* Physical side buttons */}
        <div className="atm-bezel mx-0 rounded-none">
          <div className="flex justify-between px-3 sm:px-4 py-3 sm:py-4">
            {/* Left buttons */}
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={`l-${i}`}
                  className="atm-btn block w-8 sm:w-10 h-6 sm:h-8 rounded-md"
                  aria-label={`Button ${i}`}
                />
              ))}
            </div>

            {/* Center: card slot area */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="card-slot rounded-md h-2.5 w-32 sm:w-40" />
              <div className="font-mono text-[8px] sm:text-[10px] text-gray-600 tracking-wider uppercase">
                Card Reader
              </div>
            </div>

            {/* Right buttons */}
            <div className="space-y-2">
              {[5, 6, 7, 8].map((i) => (
                <button
                  key={`r-${i}`}
                  className="atm-btn block w-8 sm:w-10 h-6 sm:h-8 rounded-md"
                  aria-label={`Button ${i}`}
                />
              ))}
            </div>
          </div>

          {/* Receipt slot */}
          <div className="px-6 sm:px-8 pb-3 sm:pb-4">
            <div className={`receipt-slot rounded-md h-3 w-[58%] max-w-[260px] mx-auto ${isPrinting ? 'receipt-slot-printing' : ''}`} />
            <div id="receipt-print-zone" className="receipt-print-zone" />
            <div className="font-mono text-[8px] sm:text-[10px] text-gray-600 tracking-wider uppercase text-center mt-1">
              Receipt Printer
            </div>
          </div>
        </div>

        {/* Bottom panel with numpad hint */}
        <div className="atm-bezel rounded-b-3xl px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 'C', 4, 5, 6, 'OK', 7, 8, 9, 'CLR', '*', 0, '#', 'E'].map((key) => (
              <button
                key={key}
                className="atm-btn h-8 sm:h-10 rounded-md font-terminal text-xs sm:text-sm text-gray-400"
                aria-label={`Keypad ${key}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Compliance text */}
          <div className="mt-4 text-center">
            <div className="font-mono text-[8px] sm:text-[10px] text-gray-600 leading-relaxed">
              STELLAR TESTNET TERMINAL v2.0.1
              <br />
              THIS IS A TEST APPLICATION — NO REAL FUNDS INVOLVED
              <br />
              Powered by Freighter · Stellar Development Foundation
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
