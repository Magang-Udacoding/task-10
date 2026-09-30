// src/App.jsx
import { useEffect } from 'react'
import useDashboard from './hooks/useDashboard'
import { mockProjects, mockClients, mockRevenueData, mockNotifications } from './data/Mock.js'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import useRevenueSync from './hooks/useRevenueSync.js'

function App() {
  const { state, dispatch } = useDashboard()

  // Load the mock data once on mount
  useEffect(() => {
    dispatch({ type: 'SET_PROJECTS',      payload: mockProjects })
    dispatch({ type: 'SET_CLIENTS',       payload: mockClients })
    dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications })

    const totalRevenue = mockProjects
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + p.revenue, 0)
    dispatch({ type: 'SET_REVENUE', payload: totalRevenue, mockRevenueData})
  }, [dispatch])

  // Sync the theme to the <html> class
  useEffect(() => {
    const root = document.documentElement
    state.theme === 'dark'
      ? root.classList.add('dark')
      : root.classList.remove('dark')
  }, [state.theme])

  useRevenueSync(30_000)
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App