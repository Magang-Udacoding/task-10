import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

const COLOR_MAP = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green:  'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
}

function StatsCard({icon: Icon, label, value, sub, color = 'blue', trend}) {
    return(
        <div
        className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex items-start gap-4 h-full w-full"
        >
            <div
            className={`p-3 rounded-lg shrink-0 ${COLOR_MAP[color]}`}
            >
                <Icon
                size = {20}
                />
            </div>

            <div
            className="min-w-0"
            >
                <p
                className="text-xs font-medium text-slate-500 dark:text-slate-400"
                >
                    {label}
                </p>

                <p
                className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5 truncate"
                >
                    {value}
                </p>

                {trend !== undefined && trend !== null && (
                    <p
                    className={`text-xs mt-1 font-medium ${trend >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                    >
                        {trend >= 0 ? <FaArrowUp size={12}/> : <FaArrowDown size={12}/>} {Math.abs(trend)}% vs 7 hari sebelumnya
                    </p>
                )}

                {sub && (
                    <p
                    className="text-xs mt-1 text-slate-400 dark:text-slate-500"
                    >
                        {sub}
                    </p>
                )}
            </div>

        </div>
    )
}

export default React.memo(StatsCard)