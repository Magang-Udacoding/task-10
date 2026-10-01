// src/components/charts/ClientDonutChart.jsx
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import useDashboard from '../../hooks/useDashboard'
import { buildClientChartData } from '../../utils/chartUtils.js'
import { formatCurrency } from '../../utils/dateUtils.js'

function ClientDonutChart() {
  const { state, dispatch } = useDashboard()
  const isDark = state.theme === 'dark'

  const chartData = useMemo(
    () => buildClientChartData(state.projects, state.clients),
    [state.projects, state.clients]
  )

  const labelColor = isDark ? '#f1f5f9' : '#334155'

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',   // donut hole size. 0% = full pie chart
    // Requirement #40: Tap slice → filter table
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const clientName = chartData.labels[index];
        dispatch({ type: 'SET_FILTER', payload: clientName });
        
        // Auto-scroll sedikit ke bawah agar tabel terlihat
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 12,
          color: labelColor,
          font: { size: 11 },
          // Truncate the client name if it is too long in the legend
          generateLabels: (chart) => {
            const datasets = chart.data.datasets
            return chart.data.labels.map((label, i) => ({
              text: label.length > 18 ? label.slice(0, 18) + '…' : label,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].backgroundColor[i],
              fontColor: labelColor,
              pointStyle: 'circle',
              index: i,
            }))
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const pct   = ((value / total) * 100).toFixed(1)
            return ` ${formatCurrency(value)} (${pct}%)`
          },
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Revenue per Client
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          From completed projects
        </p>
      </div>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}

export default ClientDonutChart