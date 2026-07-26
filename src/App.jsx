import { useState, useCallback, useEffect, useRef } from 'react'
import AtmChassis from './components/AtmChassis'
import BootScreen from './components/BootScreen'
import IdleScreen from './components/IdleScreen'
import MenuScreen from './components/MenuScreen'
import BalanceScreen from './components/BalanceScreen'
import WithdrawScreen from './components/WithdrawScreen'
import FundingScreen from './components/FundingScreen'
import ReceiptScreen from './components/ReceiptScreen'
import ErrorScreen from './components/ErrorScreen'
import {
  connectWallet,
  disconnectWallet,
  fetchXlmBalance,
  fundWithFriendbot,
  sendPayment,
} from './lib/stellar'

const SCREENS = {
  BOOT: 'BOOT',
  IDLE: 'IDLE',
  MENU: 'MENU',
  BALANCE: 'BALANCE',
  WITHDRAW: 'WITHDRAW',
  FUNDING: 'FUNDING',
  RECEIPT: 'RECEIPT',
  ERROR: 'ERROR',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.BOOT)
  const [walletAddress, setWalletAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((target, delay = 600) => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen(target)
      setTransitioning(false)
    }, delay)
  }, [])

  const playBeep = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'square'
      osc.frequency.value = 880
      gain.gain.value = 0.05
      osc.start()
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.stop(ctx.currentTime + 0.08)
    } catch {}
  }, [])

  const refreshBalance = useCallback(async (address) => {
    try {
      const bal = await fetchXlmBalance(address)
      setBalance(bal)
      return bal
    } catch (err) {
      setBalance('0')
      return '0'
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(SCREENS.IDLE)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleInsertCard = useCallback(async () => {
    playBeep()
    try {
      const address = await connectWallet()
      setWalletAddress(address)
      const bal = await refreshBalance(address)
      setBalance(bal)
      goTo(SCREENS.MENU, 400)
    } catch (err) {
      setError(err.message || 'UNKNOWN ERROR')
      goTo(SCREENS.ERROR, 400)
    }
  }, [playBeep, refreshBalance, goTo])

  const handleEjectCard = useCallback(() => {
    playBeep()
    disconnectWallet()
    setWalletAddress(null)
    setBalance(null)
    setReceipt(null)
    goTo(SCREENS.IDLE, 400)
  }, [playBeep, goTo])

  const handleSelectBalance = useCallback(() => {
    playBeep()
    goTo(SCREENS.BALANCE, 300)
  }, [playBeep, goTo])

  const handleSelectWithdraw = useCallback(() => {
    playBeep()
    goTo(SCREENS.WITHDRAW, 300)
  }, [playBeep, goTo])

  const handleBackToMenu = useCallback(() => {
    playBeep()
    goTo(SCREENS.MENU, 300)
  }, [playBeep, goTo])

  const handleFund = useCallback(async () => {
    playBeep()
    goTo(SCREENS.FUNDING, 200)
    try {
      await fundWithFriendbot(walletAddress)
      const bal = await refreshBalance(walletAddress)
      setBalance(bal)
      goTo(SCREENS.MENU, 800)
    } catch (err) {
      setError(err.message || 'FRIENDBOT FAILED')
      goTo(SCREENS.ERROR, 400)
    }
  }, [playBeep, walletAddress, refreshBalance, goTo])

  const handleWithdraw = useCallback(async (destination, amount) => {
    playBeep()
    setTransitioning(true)
    setTimeout(async () => {
      try {
        const { hash, ledger } = await sendPayment(walletAddress, destination, amount)
        const newBal = await refreshBalance(walletAddress)
        setBalance(newBal)
        setReceipt({
          amount,
          destination,
          hash,
          ledger,
          timestamp: new Date().toISOString(),
        })
        setScreen(SCREENS.RECEIPT)
        setTransitioning(false)
      } catch (err) {
        setError(err.message || 'TRANSACTION FAILED')
        setScreen(SCREENS.ERROR)
        setTransitioning(false)
      }
    }, 400)
  }, [walletAddress, refreshBalance, playBeep])

  const handleErrorDismiss = useCallback(() => {
    playBeep()
    if (walletAddress) {
      goTo(SCREENS.MENU, 300)
    } else {
      goTo(SCREENS.IDLE, 300)
    }
  }, [playBeep, walletAddress, goTo])

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.BOOT:
        return <BootScreen />
      case SCREENS.IDLE:
        return <IdleScreen onInsertCard={handleInsertCard} />
      case SCREENS.MENU:
        return (
          <MenuScreen
            address={walletAddress}
            balance={balance}
            onSelectBalance={handleSelectBalance}
            onSelectWithdraw={handleSelectWithdraw}
            onEject={handleEjectCard}
          />
        )
      case SCREENS.BALANCE:
        return (
          <BalanceScreen
            address={walletAddress}
            balance={balance}
            onRefresh={refreshBalance}
            onFund={handleFund}
            onBack={handleBackToMenu}
          />
        )
      case SCREENS.WITHDRAW:
        return (
          <WithdrawScreen
            balance={balance}
            onSubmit={handleWithdraw}
            onBack={handleBackToMenu}
          />
        )
      case SCREENS.FUNDING:
        return <FundingScreen />
      case SCREENS.RECEIPT:
        return (
          <ReceiptScreen
            receipt={receipt}
            onDone={() => goTo(SCREENS.MENU, 300)}
          />
        )
      case SCREENS.ERROR:
        return <ErrorScreen message={error} onDismiss={handleErrorDismiss} />
      default:
        return <IdleScreen onInsertCard={handleInsertCard} />
    }
  }

  return (
    <AtmChassis>
      <div
        className={`transition-opacity duration-300 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderScreen()}
      </div>
    </AtmChassis>
  )
}
