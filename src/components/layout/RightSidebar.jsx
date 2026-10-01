// src/components/layout/RightSidebar.jsx
import { FiLock, FiAward } from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";
import { ACHIEVEMENTS, checkAchievement } from "../../data/achievements.js";

function RightSidebar() {
  const { state } = useDashboard();

  // Kalkulasi progress
  const unlockedCount = ACHIEVEMENTS.filter((ach) =>
    checkAchievement(ach.id, state)
  ).length;
  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

  return (
    <aside className="w-full xl:w-[280px] shrink-0 space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        
        {/* Header & Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              <FiAward className="text-yellow-500" size={18} />
              Achievements
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
              {unlockedCount} / {ACHIEVEMENTS.length}
            </span>
          </div>
          {/* Bar */}
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Achievement List */}
        <div className="space-y-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = checkAchievement(achievement.id, state);
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={`relative flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                  isUnlocked
                    ? "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 shadow-sm hover:border-blue-300 dark:hover:border-blue-500/50"
                    : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 opacity-70"
                }`}
              >
                {/* Icon Box */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isUnlocked
                      ? "bg-slate-50 dark:bg-slate-700"
                      : "bg-slate-200/50 dark:bg-slate-700/30"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isUnlocked
                        ? achievement.iconClass
                        : "text-slate-400 dark:text-slate-600 grayscale"
                    }
                  />
                </div>

                {/* Text Content */}
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
                  <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400 mt-1">
                    {achievement.description}
                  </p>
                </div>

                {/* Lock Indicator */}
                {!isUnlocked && (
                  <div className="absolute top-3.5 right-3 text-slate-300 dark:text-slate-600">
                    <FiLock size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </aside>
  );
}

export default RightSidebar;
