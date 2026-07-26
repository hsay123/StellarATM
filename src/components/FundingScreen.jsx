export default function FundingScreen() {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="phosphor-text text-base sm:text-lg mb-6 animate-pulse">
          FUNDING ACCOUNT...
        </div>

        <div className="phosphor-dim text-xs sm:text-sm space-y-2">
          <div>Contacting Friendbot...</div>
          <div>Requesting testnet XLM...</div>
          <div>Waiting for ledger confirmation...</div>
        </div>

        <div className="mt-6 phosphor-dim text-xs sm:text-sm font-mono">
          ████████████████████
        </div>

        <div className="mt-6 phosphor-dim text-[10px] sm:text-xs">
          This may take a few seconds.
        </div>
      </div>
    </div>
  )
}
