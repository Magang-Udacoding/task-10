// src/pages/Dashboard.jsx
import { lazy, Suspense } from 'react'
import StatsGrid from '../components/dashboard/StatsGrid'
import ProjectTable from '../components/table/ProjectTable'
import RightSidebar from '../components/layout/RightSidebar'

const RevenueLineChart   = lazy(() => import('../components/charts/RevenueLineChart'))
const StatusStackedChart = lazy(() => import('../components/charts/StatusStackedChart'))
const ClientDonutChart   = lazy(() => import('../components/charts/ClientDonutChart'))
const SkillsRadarChart   = lazy(() => import('../components/charts/SkillsRadarChart'))

function Dashboard() {
  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Kolom Kiri: Main Dashboard */}
      <div className="flex-1 space-y-6 min-w-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Summary of your freelance performance
          </p>
        </div>

        <StatsGrid />

        <Suspense fallback={<ChartSkeleton/>}>
          <RevenueLineChart />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <StatusStackedChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <ClientDonutChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <SkillsRadarChart />
          </Suspense>
        </div>

        <ProjectTable />
      </div>

      {/* Kolom Kanan: Quick Actions & Achievements */}
      <RightSidebar />
    </div>
  )

  function ChartSkeleton() {
    return(
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse">
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="h-64 bg-slate-100 dark:bg-slate-700/50 rounded-lg" />
      </div>
    )
  }
}

export default Dashboard