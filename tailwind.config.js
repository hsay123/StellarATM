/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        phosphor: {
          dim: '#0d3b0d',
          DEFAULT: '#33ff33',
          bright: '#66ff66',
          glow: '#00ff41',
        },
        amber: {
          dim: '#3b2f0d',
          DEFAULT: '#ffb833',
          bright: '#ffd066',
        },
        crt: {
          black: '#0a0a0a',
          dark: '#0d0d0d',
          bezel: '#2a2a2a',
          bezelLight: '#3a3a3a',
          bezelDark: '#1a1a1a',
          plastic: '#222222',
          plasticLight: '#333333',
        },
        cream: {
          light: '#e8e1cc',
          DEFAULT: '#dfdac4',
          mid: '#c8c0a5',
          dark: '#8a8270',
          trim: '#2f3b2f',
        },
      },
      fontFamily: {
        terminal: ['"VT323"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '5%': { opacity: '0.95' },
          '10%': { opacity: '0.98' },
          '15%': { opacity: '0.96' },
          '20%': { opacity: '0.99' },
          '50%': { opacity: '0.96' },
          '80%': { opacity: '0.98' },
          '90%': { opacity: '0.95' },
          '100%': { opacity: '0.97' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        typewrite: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        bootGlow: {
          '0%': { opacity: '0', textShadow: '0 0 0px #33ff33' },
          '50%': { opacity: '1', textShadow: '0 0 20px #33ff33, 0 0 40px #33ff33' },
          '100%': { opacity: '1', textShadow: '0 0 10px #33ff33, 0 0 20px #33ff33' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        beepPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        flicker: 'flicker 0.15s infinite',
        scanline: 'scanline 8s linear infinite',
        typewrite: 'typewrite 0.5s steps(30) forwards',
        bootGlow: 'bootGlow 1.5s ease-out forwards',
        pulse: 'pulse 1.2s ease-in-out infinite',
        slideUp: 'slideUp 0.3s ease-out',
        beepPress: 'beepPress 0.1s ease-out',
      },
    },
  },
  plugins: [],
}
