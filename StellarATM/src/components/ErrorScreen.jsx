export default function ErrorScreen({ message, onDismiss }) {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-red-500/30 mb-4">
        <div className="text-red-400 text-xs sm:text-sm tracking-widest">
          ERROR
        </div>
        <div className="text-red-400 text-xs sm:text-sm">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-red-400 text-4xl sm:text-6xl mb-4">
          ✕
        </div>
        <div className="text-red-400 text-lg sm:text-xl mb-4">
          TRANSACTION DECLINED
        </div>

        <div className="text-red-300/70 text-xs sm:text-sm font-mono border border-red-500/20 rounded-lg p-4 max-w-sm whitespace-pre-wrap break-words">
          {message}
        </div>

        <div className="text-red-400/50 text-[10px] sm:text-xs mt-4">
          Please try again or check your input.
        </div>
      </div>

      {/* Footer */}
      <div>
        <button
          onClick={onDismiss}
          className="atm-btn w-full py-3 rounded-lg font-terminal text-base sm:text-lg text-phosphor uppercase tracking-wider animate-beepPress"
        >
          ◀ CONTINUE
        </button>
      </div>
    </div>
  )
}
