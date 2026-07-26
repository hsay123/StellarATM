export default function ReceiptScreen({ receipt, onDone }) {
  if (!receipt) return null

  const truncatedDest = `${receipt.destination.slice(0, 8)}...${receipt.destination.slice(-4)}`
  const txHashShort = `${receipt.hash.slice(0, 10)}...${receipt.hash.slice(-6)}`
  const timestamp = new Date(receipt.timestamp)
  const dateStr = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const timeStr = timestamp.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-phosphor/20 mb-4">
        <div className="phosphor-bright text-xs sm:text-sm tracking-widest">
          ✓ APPROVED
        </div>
        <div className="phosphor-dim text-xs sm:text-sm">
          {timeStr}
        </div>
      </div>

      {/* Approved message */}
      <div className="text-center mb-4">
        <div className="phosphor-bright text-xl sm:text-3xl tracking-wider mb-1">
          APPROVED
        </div>
        <div className="phosphor-dim text-xs sm:text-sm">
          Transaction confirmed on Stellar Testnet
        </div>
      </div>

      {/* Thermal receipt */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="receipt-paper relative p-4 sm:p-6 w-full max-w-xs animate-slideUp receipt-torn">
          {/* Receipt content */}
          <div className="text-[10px] sm:text-xs space-y-1.5">
            {/* Logo area */}
            <div className="text-center text-sm sm:text-base font-bold tracking-wider mb-2">
              STELLAR ATM
            </div>
            <div className="text-center text-[8px] sm:text-[10px] opacity-60 mb-3">
              TESTNET TRANSACTION RECEIPT
            </div>

            <div className="border-t border-dashed border-gray-400 my-2" />

            <div className="flex justify-between">
              <span className="opacity-60">DATE</span>
              <span className="font-bold">{dateStr}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">TIME</span>
              <span className="font-bold">{timeStr}</span>
            </div>

            <div className="border-t border-dashed border-gray-400 my-2" />

            <div className="flex justify-between">
              <span className="opacity-60">TYPE</span>
              <span className="font-bold">WITHDRAWAL</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="opacity-60">AMOUNT</span>
              <span className="font-bold text-sm sm:text-base">
                {Number(receipt.amount).toFixed(7)} XLM
              </span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">TO</span>
              <span className="font-bold">{truncatedDest}</span>
            </div>

            <div className="border-t border-dashed border-gray-400 my-2" />

            <div className="text-[8px] sm:text-[10px] opacity-60">
              TX HASH:
            </div>
            <div className="text-[8px] sm:text-[10px] break-all font-bold">
              {receipt.hash}
            </div>
            <div className="text-[8px] sm:text-[10px] opacity-60">
              LEDGER: {receipt.ledger}
            </div>

            <div className="border-t border-dashed border-gray-400 my-2" />

            <div className="text-center text-[8px] sm:text-[10px] opacity-50">
              Thank you for using Stellar ATM
            </div>
            <div className="text-center text-[8px] sm:text-[10px] opacity-50">
              ◈ TESTNET — NOT REAL FUNDS ◈
            </div>

            {/* Barcode-style decoration */}
            <div className="text-center text-[6px] sm:text-[8px] mt-2 tracking-tighter opacity-40">
              ||||| |||| ||| |||| ||||| ||| |||| ||||| |||| |||
            </div>
          </div>
        </div>

        {/* Stellar Expert link */}
        <a
          href={`https://stellar.expert/explorer/testnet/tx/${receipt.hash}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 phosphor-text text-xs sm:text-sm underline hover:text-phosphor-bright transition-colors"
        >
          View on Stellar Expert →
        </a>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <button
          onClick={onDone}
          className="atm-btn w-full py-3 rounded-lg font-terminal text-base sm:text-lg text-phosphor uppercase tracking-wider animate-beepPress"
        >
          DONE ◀
        </button>
      </div>
    </div>
  )
}
