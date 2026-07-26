import { useState } from 'react'

function truncateAddress(addr) {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function MenuScreen({
  address,
  balance,
  onSelectBalance,
  onSelectWithdraw,
  onEject,
}) {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      {/* Header bar */}
      <div className="flex justify-between items-center pb-2 border-b border-phosphor/20 mb-4">
        <div className="phosphor-dim text-xs sm:text-sm tracking-widest">
          CARD INSERTED
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-phosphor animate-pulse" />
          <span className="phosphor-text text-xs sm:text-sm">
            {truncateAddress(address)}
          </span>
        </div>
      </div>

      {/* Main menu */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="phosphor-bright text-xl sm:text-2xl text-center mb-2">
          MAIN MENU
        </div>
        <div className="phosphor-dim text-xs text-center mb-8">
          Select an option below
        </div>

        <div className="space-y-3 max-w-xs mx-auto w-full">
          <button
            onClick={onSelectBalance}
            className="atm-btn w-full py-3 sm:py-4 rounded-lg font-terminal text-base sm:text-lg text-phosphor uppercase tracking-wider text-left px-5 animate-beepPress"
          >
            <span className="phosphor-dim mr-2">[1]</span> CHECK BALANCE
          </button>

          <button
            onClick={onSelectWithdraw}
            className="atm-btn w-full py-3 sm:py-4 rounded-lg font-terminal text-base sm:text-lg text-phosphor uppercase tracking-wider text-left px-5 animate-beepPress"
          >
            <span className="phosphor-dim mr-2">[2]</span> WITHDRAW XLM
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-phosphor/20">
        <button
          onClick={onEject}
          className="atm-btn w-full py-2 sm:py-3 rounded-lg font-terminal text-sm sm:text-base text-red-400 uppercase tracking-wider animate-beepPress"
        >
          ◀ EJECT CARD
        </button>
      </div>
    </div>
  )
}
