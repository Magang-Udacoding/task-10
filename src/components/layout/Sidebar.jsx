import { useState } from "react";
import { FiChevronDown, FiChevronRight, FiCircle, FiFolder, FiGrid, FiStar, FiUser } from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";

const NAV_ITEMS = [
    {
        id: 'dashboard', label: 'Dashboard', icon: FiGrid
    },
    {
        id: 'projects', label: 'Projects', icon: FiFolder
    },
    {
        id: 'clients', label: 'Clients', icon: FiUser
    },
    {
        id: 'favourites', label: 'Favourites', icon: FiStar
    },
]

function Sidebar() {
  const {state} = useDashboard()

  const [isProjectOpen, setIsProjectOpen] = useState(true)
  
  const [activeNav, setActiveNav] = useState('dashboard')

  const recentProjects = [...state.projects]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5)

    const statusColor = {
    completed   : 'text-green-500',
    pending     : 'text-yellow-500',
    onHold      : 'text-orange-500',
    }

    return (
        <aside
        className="fixed top-0 left-0 h-full w-64 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40"
        >
            <div
            className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800"
            >
                <div
                className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"
                >
                    <div
                    className="text-sm font-bold text-gray-900 dark:text-white"
                    >
                        Freelance
                        <p
                        className="text-xs text-gray-600 dark:text-gray-400"
                        >
                            Dashboard
                        </p>
                    </div>
                </div>
            </div>
            
            <nav
            className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.id

                return(
                    <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={
                        `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors 
                        ${isActive
                            ? 'bg-blue-500/15 text-blue-500'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Icon size={16}/>
                        {item.label}
                    </button>
                )
            })}
            
            <div
            className="pt-4 pb-2"
            >
                <p
                className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400"
                >
                    Active Clients
                </p>
            </div>
                
            {state.clients.filter((c) => c.status === 'active')
            .map((client) => (
                <div
                key={client.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >

                <div
                className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-500 shrink-0"
                >
                    {client.name.charAt(0)}
                </div>
                <span
                className="truncate">
                    {client.name}
                </span>
                </div>
            ))}

            <div
            className="pt-4 pb-1"
            >
                <button
                onClick={() => setIsProjectOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <span>Recent Projects</span>
                    {isProjectOpen
                        ? <FiChevronDown size={12}/>
                        : <FiChevronRight size={12}/>
                    }
                </button>
            </div>

            {isProjectOpen && (
                <div
                className="space-y-1"
                >
                {recentProjects.map((project) => (
                    <div
                    key={project.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                        <FiCircle
                        size={8}
                        className={`shrink-0 ${statusColor[project.status]}`}
                        />
                    <span
                    className="truncate"
                    >
                        {project.name}
                    </span>
                    </div>   
                ))}
                

                </div>
            )}

            </nav>
        
        <div
        className="px-6 py-4 border-t border-gray-200 dark:border-gray-800"
        >
            <p
            className="text-xs text-gray-600 dark:text-gray-400"
            >
                {state.projects.filter((p) => p.status === 'completed').length}
                Finish Projects
            </p>

            <p
            className="text-xs font-medium text-gray-900 dark:text-white mt-1"
            >
                Rp {(state.revenue/1_000_000).toFixed(1)}M Revenue
            </p>
        </div>
        </aside>
    )
}

export default Sidebar