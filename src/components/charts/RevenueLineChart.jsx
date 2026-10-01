import { useMemo, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import useDashboard from '../../hooks/useDashboard'
import { buildRevenueChartData, revenueTooltipPlugin } from '../../utils/chartUtils.js'

function RevenueLineChart() {
  const { state } = useDashboard()
  const isDark    = state.theme === 'dark'
  const chartRef  = useRef(null)
  const [timeframe, setTimeframe] = useState('daily')

  // Baca histori dari context, bukan mock statis — grafik ikut bergerak
  // setiap kali useRevenueSync memperbarui revenue.
  const chartData = useMemo(
    () => buildRevenueChartData(state.revenueHistory, timeframe),
    [state.revenueHistory, timeframe]
  )

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
        limits: {
          x: {
            // Jangan bisa di-pan / di-zoom keluar dari jangkauan data
            min: 'original',
            max: 'original',
            // Zoom IN dibatasi: minimal 7 titik (≈1 minggu) tetap terlihat
            minRange: 7,
          },
        },
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
            Revenue — Last 30 Days
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {state.revenueHistory.length > 0
              ? 'Scroll to zoom · Drag to pan'
              : 'Memuat data revenue…'}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            onClick={handleResetZoom}
            disabled={state.revenueHistory.length === 0}
            className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset Zoom
          </button>
        </div>
      </div>
      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default RevenueLineChart