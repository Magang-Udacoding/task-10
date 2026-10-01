import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const COLOR_MAP = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green:
    "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

const TREND_STYLE = {
  up: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  down: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  flat: "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
};

const TREND_LABEL = {
  up: "naik",
  down: "turun",
  flat: "tetap",
};

function StatsCard({ icon: Icon, label, value, sub, color = "blue", trend }) {
  const hasTrend = typeof trend === "number" && Number.isFinite(trend);

  // 0% bukan "naik" — kalau dipaksa jadi hijau/merah, misrepresentasi data
  const trendState = !hasTrend ? null : trend > 0 ? "up" : trend < 0 ? "down" : "flat";
  const TrendIcon =
    trendState === "down" ? FaArrowDown : trendState === "up" ? FaArrowUp : null;

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      {/* Header: icon + label */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${COLOR_MAP[color]}`}
        >
          <Icon size={18} />
        </div>
        <p className="min-w-0 truncate text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
      </div>

      {/* Value */}
      <p className="truncate text-3xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-slate-100">
        {value}
      </p>

      {/* Footer: trend + sub, always pinned to the bottom */}
      <div className="mt-auto flex items-center gap-2 pt-1">
        {hasTrend && (
          <span
            className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-semibold tabular-nums ${TREND_STYLE[trendState]}`}
            title={`${TREND_LABEL[trendState]} ${Math.abs(trend)}% vs 7 hari sebelumnya`}
          >
            {TrendIcon && <TrendIcon size={8} />}
            {Math.abs(trend)}%
          </span>
        )}

        <p className="min-w-0 truncate text-xs text-slate-400 dark:text-slate-500">
          {sub}
        </p>
      </div>
    </div>
  );
}

export default React.memo(StatsCard);