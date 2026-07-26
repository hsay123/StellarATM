import { useEffect, useState } from 'react'

export default function IdleScreen({ onInsertCard }) {
  const [showCursor, setShowCursor] = useState(true)
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const dots = '.'.repeat(dotCount || 1)

  return (
    <div className="h-full flex flex-col items-center justify-between p-4 sm:p-6 font-terminal text-base sm:text-lg">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="phosphor-bright text-2xl sm:text-4xl mb-2 tracking-wider">
          STELLAR ATM
        </div>
        <div className="phosphor-dim text-xs sm:text-sm tracking-widest uppercase mb-8">
          Testnet Terminal
        </div>

        <div className="phosphor-text text-sm sm:text-base animate-pulse">
          WELCOME{dots}
        </div>
        <div className="phosphor-dim text-xs sm:text-sm mt-2">
          Please insert your card to begin
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onInsertCard}
          className="atm-btn w-full py-3 sm:py-4 rounded-lg font-terminal text-lg sm:text-xl text-phosphor uppercase tracking-wider animate-beepPress"
        >
          ▶ INSERT CARD
        </button>

        <div className="card-slot rounded-md h-3 w-48 mx-auto" />

        <div className="flex justify-between items-center px-2 mt-4">
          <div className="phosphor-dim text-[10px] sm:text-xs tracking-widest">
            STELLAR · TESTNET
          </div>
          <div className="phosphor-dim text-[10px] sm:text-xs">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
