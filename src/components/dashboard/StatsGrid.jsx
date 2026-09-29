import useDashboard from "../../hooks/useDashboard";
import { FiCheckCircle, FiDollarSign, FiFolder, FiUsers } from "react-icons/fi";
import StatsCard from "./StatsCard";

function StatsGrid() {
  const { state } = useDashboard();

  const completedProjects = state.projects.filter(
    (p) => p.status === "completed",
  );
  const pendingProjects = state.projects.filter((p) => p.status === "pending");
  const activeClients = state.clients.filter((c) => c.status === "active");

  const formatRevenue = (amount) => {
    if (amount >= 1_000_000_000)
      return `Rp ${(amount / 1_000_000_000).toFixed(1)}B`;
    if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)}M`;
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const STATS = [
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: formatRevenue(state.revenue),
      sub: "from completed projects",
      color: "green",
      trend: 12,
    },
    {
      icon: FiFolder,
      label: "Total Projects",
      value: state.projects.length,
      sub: `${pendingProjects.length} in progress`,
      color: "blue",
      trend: 5,
    },
    {
      icon: FiUsers,
      label: "Active Clients",
      value: activeClients.length,
      sub: `of ${state.clients.length} total clients`,
      color: "purple",
      trend: -2,
    },
    {
      icon: FiCheckCircle,
      label: "Completed Projects",
      value: completedProjects.length,
      sub: `${Math.round((completedProjects.length / Math.max(state.projects.length, 1)) * 100)}% completion rate`,
      color: "yellow",
      trend: 8,
    },
  ];

  return (
    <div
    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
        {STATS.map((stat) => (
            <StatsCard
            key={stat.label}

            {...stat}
            />
        ))}
    </div>
  )
}

export default StatsGrid