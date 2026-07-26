import { useState, useEffect } from 'react'

export default function BalanceScreen({ address, balance, onRefresh, onFund, onBack }) {
  const [loading, setLoading] = useState(true)
  const [displayBalance, setDisplayBalance] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      const bal = await onRefresh(address)
      if (!cancelled) {
        setDisplayBalance(bal)
        setTimeout(() => setLoading(false), 800)
      }
    }
    load()
    return () => { cancelled = true }
  }, [address, onRefresh])

  const isUnfunded = !loading && Number(displayBalance) === 0

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-phosphor/20 mb-4">
        <div className="phosphor-dim text-xs sm:text-sm tracking-widest">
          BALANCE INQUIRY
        </div>
        <div className="phosphor-dim text-xs sm:text-sm">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {loading ? (
          <>
            <div className="phosphor-text text-sm sm:text-base mb-4 animate-pulse">
              PROCESSING
            </div>
            <div className="phosphor-dim text-xs sm:text-sm font-mono">
              ████████████████░░░░
            </div>
            <div className="phosphor-dim text-[10px] sm:text-xs mt-2">
              Querying Horizon testnet...
            </div>
          </>
        ) : isUnfunded ? (
          <div className="animate-slideUp">
            <div className="phosphor-dim text-sm sm:text-base mb-2">
              ACCOUNT UNFUNDED
            </div>
            <div className="phosphor-text text-xl sm:text-2xl mb-1">0.0000000 XLM</div>
            <div className="phosphor-dim text-xs sm:text-sm mb-6">
              This testnet account has no balance.
            </div>
            <button
              onClick={onFund}
              className="atm-btn w-full py-3 rounded-lg font-terminal text-base text-phosphor uppercase tracking-wider animate-beepPress"
            >
              ◈ FUND VIA FRIENDBOT
            </button>
          </div>
        ) : (
          <div className="animate-slideUp">
            <div className="phosphor-dim text-xs sm:text-sm mb-3 uppercase tracking-widest">
              Available Balance
            </div>
            <div className="phosphor-bright text-3xl sm:text-5xl font-terminal tracking-wider mb-2">
              {Number(displayBalance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 7,
              })}
            </div>
            <div className="phosphor-text text-lg sm:text-xl mb-1">XLM</div>
            <div className="phosphor-dim text-[10px] sm:text-xs mt-4 font-mono">
              ─────────────────────
            </div>
            <div className="phosphor-dim text-[10px] sm:text-xs mt-1">
              STELLAR TESTNET · UNFUNDED RISK: NONE
            </div>
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div className="space-y-2 mt-4">
        <button
          onClick={onBack}
          className="atm-btn w-full py-2 sm:py-3 rounded-lg font-terminal text-sm sm:text-base text-phosphor uppercase tracking-wider animate-beepPress"
        >
          ◀ BACK TO MENU
        </button>
      </div>
    </div>
  )
}
