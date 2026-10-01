import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { formatCurrency, formatShortDate } from "./dateUtils.js";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  zoomPlugin
);

export const CHART_COLORS = {
  blue: "#3b82f6",
  indigo: "#6366f1",
  green: "#22c55e",
  yellow: "#eab308",
  red: "#ef4444",
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

export const CLIENT_COLORS = [
  "#3b82f6",
  "#6366f1",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#14b8a6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
];

import { startOfWeek, startOfMonth, format } from 'date-fns';

export const buildRevenueChartData = (revenueData, timeframe = 'daily') => {
  // Grouping logic
  const groupedData = {};

  revenueData.forEach((d) => {
    let groupKey = d.date; // daily default
    const dateObj = new Date(d.date);

    if (timeframe === 'weekly') {
      groupKey = format(startOfWeek(dateObj, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    } else if (timeframe === 'monthly') {
      groupKey = format(startOfMonth(dateObj), 'yyyy-MM-dd');
    }

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = { date: groupKey, actual: 0, target: 0, count: 0 };
    }
    
    groupedData[groupKey].actual += d.actual;
    groupedData[groupKey].target += d.target;
    groupedData[groupKey].count += 1;
  });

  const sortedKeys = Object.keys(groupedData).sort();
  
  // For weekly/monthly, we might want to average the target instead of sum, 
  // or just sum them. Assuming sum for both actual and target.
  const labels = sortedKeys.map((key) => {
    if (timeframe === 'monthly') return format(new Date(key), 'MMM yyyy');
    if (timeframe === 'weekly') return `Week of ${formatShortDate(key)}`;
    return formatShortDate(key);
  });

  const actualData = sortedKeys.map((key) => groupedData[key].actual);
  const targetData = sortedKeys.map((key) => groupedData[key].target);

  return {
    labels,
    datasets: [
      {
        label: "Actual",
        data: actualData,
        borderColor: CHART_COLORS.blue,
        backgroundColor: `${CHART_COLORS.blue}1a`, // hex opacity 10%
        tension: 0.4, // 0 = straight line, 1 = very curved (Bezier)
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: CHART_COLORS.blue,
      },
      {
        label: "Target",
        data: targetData,
        borderColor: CHART_COLORS.indigo,
        backgroundColor: "transparent",
        tension: 0.4,
        borderDash: [6, 4], // dashed line
        fill: false,
        pointRadius: 0, // points are not displayed
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };
};

export const buildStatusChartData = (projects) => {
  const completed = projects.filter((p) => p.status === 'completed').length
  const pending   = projects.filter((p) => p.status === 'pending').length
  const onHold    = projects.filter((p) => p.status === 'on-hold').length

  return {
    labels: ['Project Status'],
    datasets: [
      {
        label: 'Completed',
        data: [completed],
        backgroundColor: CHART_COLORS.green,
        borderRadius: 4,
      },
      {
        label: 'Pending',
        data: [pending],
        backgroundColor: CHART_COLORS.yellow,
        borderRadius: 4,
      },
      {
        label: 'On Hold',
        data: [onHold],
        backgroundColor: CHART_COLORS.red,
        borderRadius: 4,
      },
    ],
  }
}

export const buildClientChartData = (projects, clients) => {
  // Sum the total revenue per clientId from the completed projects
  const revenueMap = {}
  projects
    .filter((p) => p.status === 'completed')
    .forEach((p) => {
      revenueMap[p.clientId] = (revenueMap[p.clientId] || 0) + p.revenue
    })
  // Look up the client name from the clients array
  const labels  = []
  const data    = []
  const colors  = []
  Object.entries(revenueMap).forEach(([clientId, revenue], index) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      labels.push(client.name)
      data.push(revenue)
      colors.push(CLIENT_COLORS[index % CLIENT_COLORS.length])
    }
  })
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderWidth: 2,
      borderColor: 'transparent',
      hoverBorderColor: '#ffffff',
      hoverOffset: 15, // Requirement #37: Hover explode effect
    }],
  }
}
// For the Skills Radar Chart
// Input: mockSkills[]
// Output: radar data
export const buildSkillsChartData = (skills) => ({
  labels: skills.map((s) => s.skill),
  datasets: [{
    label: 'Skill Level',
    data: skills.map((s) => s.level),
    borderColor: CHART_COLORS.purple,
    backgroundColor: `${CHART_COLORS.purple}33`, // hex opacity 20%
    pointBackgroundColor: CHART_COLORS.purple,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: CHART_COLORS.purple,
    borderWidth: 2,
  }],
})

// Custom tooltip for the Revenue chart
export const revenueTooltipPlugin = {
  plugins: {
    tooltip: {
      callbacks: {
        // Format the value in the tooltip: 5200000 → "Rp 5.2M (+12%)"
        label: (context) => {
          const value = context.parsed.y
          const label = context.dataset.label
          let trend = ''

          // Requirement #31: Tooltip custom percentage
          if (label === 'Actual' && context.dataIndex > 0) {
            const prevValue = context.dataset.data[context.dataIndex - 1]
            if (prevValue > 0) {
              const percent = (((value - prevValue) / prevValue) * 100).toFixed(1)
              const sign = percent > 0 ? '+' : ''
              trend = ` (${sign}${percent}%)`
            }
          }
          
          return ` ${label}: ${formatCurrency(value)}${trend}`
        },
      },
    },
  },
}