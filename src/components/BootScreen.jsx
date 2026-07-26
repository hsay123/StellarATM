import { useEffect, useState } from 'react'

export default function BootScreen() {
  const [lines, setLines] = useState([])
  const bootLines = [
    'STELLAR ATM v2.0.1',
    '========================',
    '',
    'Initializing CRT display...',
    'Loading phosphor drivers... OK',
    'Connecting to Stellar Testnet...',
    'Horizon endpoint: LIVE',
    'Freighter bridge: STANDBY',
    '',
    'SYSTEM READY.',
    '',
    '  ███████╗████████╗██╗ ██████╗',
    '  ██╔════╝╚══██╔══╝██║██╔════╝',
    '  ███████╗   ██║   ██║██║     ',
    '  ╚════██║   ██║   ██║██║     ',
    '  ███████║   ██║   ██║╚██████╗',
    '  ╚══════╝   ╚═╝   ╚═╝ ╚═════╝',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col justify-end p-4 sm:p-6 font-terminal text-sm sm:text-base leading-relaxed">
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={`phosphor-text animate-slideUp ${
            line.startsWith('=') ? 'phosphor-dim' : ''
          }`}
          style={{ animationDelay: `${idx * 30}ms` }}
        >
          {line || '\u00A0'}
        </div>
      ))}
      <span className="phosphor-text cursor-blink mt-1">&nbsp;</span>
    </div>
  )
}
