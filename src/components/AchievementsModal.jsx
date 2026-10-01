import { FiAward, FiX, FiLock } from "react-icons/fi";
import { ACHIEVEMENTS, checkAchievement } from "../data/achievements.js";

function AchievementsModal({ state, onClose }) {
  const unlockedCount = ACHIEVEMENTS.filter((ach) =>
    checkAchievement(ach.id, state)
  ).length;
  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            <FiAward className="text-yellow-500" size={20} />
            Your Achievements
          </h3>
          <button 
            onClick={onClose}
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
  );
}

export default AchievementsModal;
