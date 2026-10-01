// src/pages/Dashboard.jsx
import { lazy, Suspense } from 'react'

const StatsGrid = lazy(() => import('../components/dashboard/StatsGrid'))
const ProjectTable = lazy(() => import('../components/table/ProjectTable'))
const RevenueLineChart   = lazy(() => import('../components/charts/RevenueLineChart'))
const StatusStackedChart = lazy(() => import('../components/charts/StatusStackedChart'))
const ClientDonutChart   = lazy(() => import('../components/charts/ClientDonutChart'))
const SkillsRadarChart   = lazy(() => import('../components/charts/SkillsRadarChart'))

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Summary of your freelance performance
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsGrid />
      </Suspense>

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

      <Suspense fallback={<TableSkeleton />}>
        <ProjectTable />
      </Suspense>
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

  function StatsSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 h-28" />
        ))}
      </div>
    )
  }

  function TableSkeleton() {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse h-[500px]">
        <div className="h-10 w-full bg-slate-100 dark:bg-slate-700/50 rounded-lg mb-4" />
        <div className="h-80 w-full bg-slate-100 dark:bg-slate-700/50 rounded-lg" />
      </div>
    )
  }
}

export default Dashboard