// src/components/AchievementToast.jsx
import { useEffect, useMemo } from "react";
import { FiX } from "react-icons/fi";

// Keyframe di-inject sekali per-component agar index.css tetap minimal
const CONFETTI_STYLE = `
@keyframes achievement-pop {
  0%   { opacity: 0; transform: translateY(16px) scale(0.96) }
  100% { opacity: 1; transform: translateY(0) scale(1) }
}
@keyframes confetti-fall {
  0%   { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) }
  100% { opacity: 0; transform: translate3d(var(--drift, 0px), 140px, 0) rotate(var(--spin, 360deg)) }
}
@media (prefers-reduced-motion: reduce) {
  .achievement-pop, .achievement-confetti { animation: none }
}
`;

const CONFETTI_COLORS = [
  "#3b82f6", "#22c55e", "#eab308", "#ef4444", "#a855f7", "#06b6d4",
];

// Nilai acak dihitung sekali per toast, bukan tiap render
function buildConfetti() {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${(i * 41) % 100}%`,
    delay: `${(i % 8) * 0.09}s`,
    duration: `${1.4 + ((i * 7) % 9) / 10}s`,
    drift: `${((i % 5) - 2) * 14}px`,
    spin: `${180 + ((i * 53) % 360)}deg`,
    size: 6 + (i % 3) * 2,
  }));
}

function AchievementToast({ achievement, onDismiss, duration = 6000 }) {
  const confetti = useMemo(() => buildConfetti(), []);

  // Auto-dismiss setelah `duration` ms
  useEffect(() => {
    if (!achievement) return;

    const timeoutId = setTimeout(onDismiss, duration);
    return () => clearTimeout(timeoutId);
  }, [achievement, onDismiss, duration]);

  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-72"
      role="status"
      aria-live="polite"
    >
      <style>{CONFETTI_STYLE}</style>

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="achievement-confetti absolute top-0 block rounded-sm"
            style={{
              left: c.left,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              animation: `confetti-fall ${c.duration} ease-in ${c.delay} forwards`,
              "--drift": c.drift,
              "--spin": c.spin,
            }}
          />
        ))}
      </div>

      {/* Toast */}
      <div className="achievement-pop relative flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
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
  );
}

export default AchievementToast;
