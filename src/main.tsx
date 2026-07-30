import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

const isProdHost =
  typeof window !== 'undefined' &&
  !window.location.hostname.includes('localhost') &&
  !window.location.hostname.includes('127.0.0.1');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {isProdHost && <Analytics />}
    {isProdHost && <SpeedInsights />}
  </StrictMode>,
)
