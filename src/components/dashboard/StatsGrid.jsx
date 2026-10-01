import useDashboard from "../../hooks/useDashboard";
import { FiCheckCircle, FiDollarSign, FiFolder, FiUsers} from "react-icons/fi";
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

  const revenueTrend = (() => {
    const history = state.revenueHistory;
    if (history.length < 14) return null;

    const sum = (points) => points.reduce((a, d) => a + d.actual, 0);
    const current = sum(history.slice(-7));
    const previous = sum(history.slice(-14, -7));

    if (previous === 0) return null;
    return Math.round(((current - previous) / previous) * 100);
  })();

 
  const STATS = [
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: formatRevenue(state.revenue),
      sub: `dari ${completedProjects.length} project selesai`,
      color: "green",
      trend: revenueTrend,
    },
    {
      icon: FiFolder,
      label: "Total Projects",
      value: state.projects.length,
      sub: `${pendingProjects.length} in progress`,
      color: "blue",
    },
    {
      icon: FiUsers,
      label: "Active Clients",
      value: activeClients.length,
      sub: `of ${state.clients.length} total clients`,
      color: "purple",
    },
    {
      icon: FiCheckCircle,
      label: "Completed Projects",
      value: completedProjects.length,
      sub: `${Math.round(
        (completedProjects.length / Math.max(state.projects.length, 1)) * 100,
      )}% completion rate`,
      color: "yellow",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
        {/* Card ke-5: Achievements */}
      </div>
    </>
  );
}

export default StatsGrid;
