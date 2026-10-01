// src/components/charts/StatusStackedChart.jsx
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import useDashboard from '../../hooks/useDashboard'
import { buildStatusChartData } from '../../utils/chartUtils.js'

function StatusStackedChart() {
  const { state } = useDashboard()
  const isDark = state.theme === 'dark'

  const chartData = useMemo(
    () => buildStatusChartData(state.projects),
    [state.projects]
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16,
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            ` ${context.dataset.label}: ${context.parsed.y} project`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,  // ← required for a stacked chart
        ticks: { color: isDark ? '#94a3b8' : '#64748b' },
        grid:  { display: false },
      },
      y: {
        stacked: true,  // ← required on both axes
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          stepSize: 1,
        },
        grid: { color: isDark ? '#1e293b' : '#f1f5f9' },
      },
    },
    // Requirement #36: Animation stagger per bar
    animation: {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * 150 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Project Status
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Distribution of {state.projects.length} projects
        </p>
      </div>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default StatusStackedChart