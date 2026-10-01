import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import Confetti from 'react-confetti';

function AchievementToast({ achievement, onDismiss, duration = 6000 }) {
  // Auto-dismiss setelah `duration` ms
  useEffect(() => {
    if (!achievement) return;

    const timeoutId = setTimeout(onDismiss, duration);
    return () => clearTimeout(timeoutId);
  }, [achievement, onDismiss, duration]);

  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} 
          numberOfPieces={400} 
          gravity={0.3}
        />
      </div>
      <div
        className="fixed bottom-4 right-4 z-[60] w-72"
        role="status"
        aria-live="polite"
      >
        <div className="achievement-pop relative flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <Icon size={18} className={achievement.iconClass} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Achievement unlocked
            </p>
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {achievement.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {achievement.description}
            </p>
          </div>

          <button
            onClick={onDismiss}
            aria-label="Dismiss achievement"
            className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          >
            <FiX size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AchievementToast;
