import { useMemo, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import useDashboard from '../../hooks/useDashboard'
import { mockRevenueData } from '../../data/Mock.js'
import { buildRevenueChartData, revenueTooltipPlugin } from '../../utils/chartUtils.js'

function RevenueLineChart() {
  const { state } = useDashboard()
  const isDark    = state.theme === 'dark'
  const chartRef  = useRef(null)

  const chartData = useMemo(() => buildRevenueChartData(mockRevenueData), [])

  const handleResetZoom = () => {
    if (chartRef.current) chartRef.current.resetZoom()
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      ...revenueTooltipPlugin.plugins,
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16,
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 12 },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          maxTicksLimit: 10,
          font: { size: 11 },
        },
        grid: { color: isDark ? '#1e293b' : '#f1f5f9' },
      },
      y: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11 },
          callback: (value) => {
            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
            return value
          },
        },
        grid: { color: isDark ? '#1e293b' : '#f1f5f9' },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Revenue — 30 Hari Terakhir
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Scroll untuk zoom · Drag untuk pan
          </p>
        </div>
        <button
          onClick={handleResetZoom}
          className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          Reset Zoom
        </button>
      </div>
      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default RevenueLineChart