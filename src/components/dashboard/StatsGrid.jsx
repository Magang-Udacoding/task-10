import { useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import { FiCheckCircle, FiDollarSign, FiFolder, FiUsers, FiAward, FiX, FiLock } from "react-icons/fi";
import StatsCard from "./StatsCard";
import { ACHIEVEMENTS, checkAchievement } from "../../data/achievements.js";

function StatsGrid() {
  const { state } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const unlockedCount = ACHIEVEMENTS.filter((ach) =>
    checkAchievement(ach.id, state)
  ).length;
  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
        {/* Card ke-5: Achievements */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="h-full w-full block text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <StatsCard 
            icon={FiAward}
            label="Achievements"
            value={`${unlockedCount}/${ACHIEVEMENTS.length}`}
            sub="Click to view details"
            color="purple"
          />
        </button>
      </div>

      {/* Modal Achievements */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                <FiAward className="text-yellow-500" size={20} />
                Your Achievements
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Progress Bar inside Modal */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Progress</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Modal Body (List) */}
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3 scrollbar-slim">
              {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = checkAchievement(achievement.id, state);
                const Icon = achievement.icon;

                return (
                  <div
                    key={achievement.id}
                    className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isUnlocked
                        ? "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 shadow-sm"
                        : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 opacity-60"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                        isUnlocked
                          ? "bg-slate-50 dark:bg-slate-700"
                          : "bg-slate-200/50 dark:bg-slate-700/30"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={
                          isUnlocked
                            ? achievement.iconClass
                            : "text-slate-400 dark:text-slate-600 grayscale"
                        }
                      />
                    </div>
                    <div className="flex-1 pr-6">
                      <p
                        className={`text-sm font-bold ${
                          isUnlocked
                            ? "text-slate-900 dark:text-slate-100"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {achievement.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {achievement.description}
                      </p>
                    </div>
                    {!isUnlocked && (
                      <div className="absolute top-4 right-4 text-slate-300 dark:text-slate-600">
                        <FiLock size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StatsGrid;
