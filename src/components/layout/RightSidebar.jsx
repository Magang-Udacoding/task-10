// src/components/layout/RightSidebar.jsx
import { FiPlus, FiDownload, FiSettings, FiAward } from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";
import { ACHIEVEMENTS, checkAchievement } from "../../data/achievements";

function RightSidebar() {
  const { state } = useDashboard();

  return (
    <aside className="w-full xl:w-[280px] shrink-0 space-y-6">
      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <FiPlus size={18} className="mb-2 text-blue-500" />
            <span className="text-xs font-medium">New Project</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <FiDownload size={18} className="mb-2 text-green-500" />
            <span className="text-xs font-medium">Export</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <FiSettings size={18} className="mb-2 text-slate-500" />
            <span className="text-xs font-medium">Settings</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <FiAward size={18} className="mb-2 text-yellow-500" />
            <span className="text-xs font-medium">Goals</span>
          </button>
        </div>
      </div>

      {/* Achievements Status */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Achievements
        </h3>
        <div className="space-y-4">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = checkAchievement(achievement.id, state);
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                  isUnlocked
                    ? "bg-blue-50/50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30"
                    : "bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50 opacity-60 grayscale"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isUnlocked
                      ? "bg-white shadow-sm dark:bg-slate-800"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      isUnlocked
                        ? achievement.iconClass
                        : "text-slate-400 dark:text-slate-500"
                    }
                  />
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${
                      isUnlocked
                        ? "text-slate-900 dark:text-slate-100"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {achievement.title}
                  </p>
                  <p className="text-[10px] leading-tight text-slate-500 dark:text-slate-400 mt-0.5">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
