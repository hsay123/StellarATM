import { useState } from 'react'
import { isValidStellarAddress } from '../lib/stellar'

export default function WithdrawScreen({ balance, onSubmit, onBack }) {
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState('input') // input | confirm | processing
  const [error, setError] = useState('')

  const destValid = isValidStellarAddress(destination)
  const amtNum = parseFloat(amount)
  const amtValid = !isNaN(amtNum) && amtNum > 0
  const hasFunds = amtValid && amtNum <= Number(balance)

  const handleNext = () => {
    if (!destValid) {
      setError('INVALID DESTINATION ADDRESS')
      return
    }
    if (!amtValid) {
      setError('INVALID AMOUNT')
      return
    }
    if (!hasFunds) {
      setError('INSUFFICIENT FUNDS')
      return
    }
    setError('')
    setStep('confirm')
  }

  const handleConfirm = () => {
    setStep('processing')
    onSubmit(destination.trim(), String(amtNum))
  }

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('input')
    } else {
      onBack()
    }
  }

  const truncatedAddr = destination
    ? `${destination.slice(0, 8)}...${destination.slice(-4)}`
    : ''

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 font-terminal text-base sm:text-lg">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-phosphor/20 mb-4">
        <div className="phosphor-dim text-xs sm:text-sm tracking-widest">
          WITHDRAWAL
        </div>
        <div className="phosphor-dim text-xs sm:text-sm">
          BAL: {Number(balance).toFixed(2)} XLM
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        {step === 'input' && (
          <div className="space-y-5 animate-slideUp">
            <div className="text-center mb-4">
              <div className="phosphor-bright text-lg sm:text-xl mb-1">
                SEND XLM
              </div>
              <div className="phosphor-dim text-xs sm:text-sm">
                Enter recipient and amount
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="phosphor-dim text-xs sm:text-sm block mb-1 tracking-wider">
                DESTINATION ADDRESS:
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  setError('')
                }}
                placeholder="G..."
                className="atm-input w-full text-sm sm:text-base"
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="phosphor-dim text-xs sm:text-sm block mb-1 tracking-wider">
                AMOUNT (XLM):
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '')
                  setAmount(val)
                  setError('')
                }}
                placeholder="0.00"
                className="atm-input w-full text-sm sm:text-base"
              />
            </div>

            {error && (
              <div className="phosphor-text text-red-400 text-xs sm:text-sm text-center animate-slideUp">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 'confirm' && (
          <div className="text-center space-y-4 animate-slideUp">
            <div className="phosphor-bright text-lg sm:text-xl mb-4">
              CONFIRM TRANSACTION
            </div>

            <div className="phosphor-dim text-xs sm:text-sm border border-phosphor/20 rounded-lg p-4 space-y-3">
              <div>
                <div className="phosphor-dim text-[10px] sm:text-xs tracking-widest">
                  TO
                </div>
                <div className="phosphor-text text-xs sm:text-sm font-mono break-all">
                  {destination}
                </div>
              </div>
              <div className="border-t border-phosphor/10" />
              <div>
                <div className="phosphor-dim text-[10px] sm:text-xs tracking-widest">
                  AMOUNT
                </div>
                <div className="phosphor-bright text-xl sm:text-2xl">
                  {amtNum.toFixed(7)} XLM
                </div>
              </div>
            </div>

            {error && (
              <div className="phosphor-text text-red-400 text-xs sm:text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4 animate-slideUp">
            <div className="phosphor-text text-base sm:text-lg animate-pulse">
              PROCESSING TRANSACTION...
            </div>
            <div className="phosphor-dim text-xs sm:text-sm">
              Building transaction...
            </div>
            <div className="phosphor-dim text-xs sm:text-sm">
              Signing with Freighter...
            </div>
            <div className="phosphor-dim text-xs sm:text-sm">
              Submitting to Horizon...
            </div>
            <div className="mt-4 phosphor-dim text-xs sm:text-sm font-mono">
              ████████████████████
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-2 mt-4">
        {step === 'input' && (
          <button
            onClick={handleNext}
            disabled={!destValid || !amtValid}
            className={`atm-btn w-full py-3 rounded-lg font-terminal text-base sm:text-lg uppercase tracking-wider animate-beepPress ${
              destValid && amtValid
                ? 'text-phosphor'
                : 'text-phosphor/30 cursor-not-allowed'
            }`}
          >
            CONTINUE ▶
          </button>
        )}

        {step === 'confirm' && (
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="atm-btn flex-1 py-3 rounded-lg font-terminal text-sm sm:text-base text-phosphor uppercase tracking-wider animate-beepPress"
            >
              ◀ MODIFY
            </button>
            <button
              onClick={handleConfirm}
              className="atm-btn flex-1 py-3 rounded-lg font-terminal text-sm sm:text-base text-phosphor uppercase tracking-wider animate-beepPress"
            >
              CONFIRM ✓
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="phosphor-dim text-xs text-center">
            Please do not close this window
          </div>
        )}

        {step !== 'processing' && (
          <button
            onClick={handleBack}
            className="atm-btn w-full py-2 rounded-lg font-terminal text-xs sm:text-sm text-phosphor/60 uppercase tracking-wider animate-beepPress"
          >
            ◀ BACK TO MENU
          </button>
        )}
      </div>
    </div>
  )
}
