// src/pages/Dashboard.jsx
import StatsGrid from '../components/dashboard/StatsGrid'
import RevenueLineChart from '../components/charts/RevenueLineChart'
import StatusStackedChart from '../components/charts/StatusStackedChart'
import ClientDonutChart from '../components/charts/ClientDonutChart'
import SkillsRadarChart from '../components/charts/SkillsRadarChart'

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ringkasan performa freelance Anda
        </p>
      </div>

      {/* Stats Cards */}
      <StatsGrid />

      {/* Row 1: Revenue Line Chart (lebar penuh) */}
      <RevenueLineChart />

      {/* Row 2: Stacked + Donut + Radar (3 kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusStackedChart />
        <ClientDonutChart />
        <SkillsRadarChart />
      </div>
    </div>
  )
}

export default Dashboard