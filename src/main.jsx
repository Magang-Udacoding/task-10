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
// Jika di mode development, matikan Service Worker agar tidak ada cache nyangkut (stuck di versi lama)
if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
  }
} else {
  // Mode Production
  const updateSW = registerSW({
    immediate: true, // Langsung paksa cek update saat dimuat
    onNeedRefresh() {
      // App baru tersedia — bisa tampilkan notifikasi ke user
      if (confirm('Update fitur baru tersedia! Muat ulang sekarang?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('FreelancePro siap digunakan offline!')
    },
  })
}
