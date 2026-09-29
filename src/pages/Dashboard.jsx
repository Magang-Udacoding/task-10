// src/pages/Dashboard.jsx
import StatsGrid from '../components/dashboard/StatsGrid'
import RevenueLineChart from '../components/charts/RevenueLineChart'
import StatusStackedChart from '../components/charts/StatusStackedChart'
import ClientDonutChart from '../components/charts/ClientDonutChart'
import SkillsRadarChart from '../components/charts/SkillsRadarChart'
import ProjectTable from '../components/table/ProjectTable'

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Summary of your freelance performance
        </p>
      </div>

      <StatsGrid />

      <RevenueLineChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusStackedChart />
        <ClientDonutChart />
        <SkillsRadarChart />
      </div>

      <ProjectTable />

    </div>
  )
}

export default Dashboard