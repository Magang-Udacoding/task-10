import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DashboardProvider } from './context/DashboardContext.jsx'
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </StrictMode>,
)
const updateSW = registerSW({
  onNeedRefresh() {
    // App baru tersedia — bisa tampilkan notifikasi ke user
    if (confirm('Update tersedia! Muat ulang sekarang?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('FreelancePro siap digunakan offline!')
  },
})
