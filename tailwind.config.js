/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        carbon: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
        },
        ash: {
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#d4d4d4',
          400: '#9a9a9a',
          500: '#737373',
          600: '#555555',
        },
        crimson: {
          400: '#ef4444',
          500: '#dc2626',
          600: '#b91c1c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'countUp 0.15s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { transform: 'translateY(4px)', opacity: '0.6' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 20px rgba(239,68,68,0.3)' },
          '50%': { textShadow: '0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.2)' },
        },
      },
    },
  },
  plugins: [],
}
