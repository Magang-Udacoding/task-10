// src/components/charts/SkillsRadarChart.jsx
import { useMemo } from 'react'
import { Radar } from 'react-chartjs-2'
import useDashboard from '../../hooks/useDashboard'
import { buildSkillsChartData } from '../../utils/chartUtils.js'
import { mockSkills } from '../../data/Mock.js'

function SkillsRadarChart() {
  const { state } = useDashboard()
  const isDark = state.theme === 'dark'

  const chartData = useMemo(
    () => buildSkillsChartData(mockSkills),
    []
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },  // legenda disembunyikan, cukup dari label radar
      tooltip: {
        callbacks: {
          label: (context) => ` Level: ${context.parsed.r}/100`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 10 },
          backdropColor: 'transparent',  // hapus background di belakang angka tick
        },
        grid: {
          color: isDark ? '#334155' : '#e2e8f0',
        },
        pointLabels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 12, weight: '500' },
        },
        angleLines: {
          color: isDark ? '#334155' : '#e2e8f0',
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Skill Overview
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Level keahlian 0–100
        </p>
      </div>
      <div className="h-64">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default SkillsRadarChart