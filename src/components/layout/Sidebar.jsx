// src/components/layout/Sidebar.jsx
import { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiCircle,
  FiGrid,
  FiX,
} from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";

// Hanya Dashboard — Projects/Clients/Favourites belum ada routing,
// jadi menunya hanya ganti highlight tanpa mengganti konten.
const NAV_ITEMS = [{ id: "dashboard", label: "Dashboard", icon: FiGrid }];

const STATUS_COLOR = {
  completed: "text-green-500",
  pending: "text-yellow-500",
  onHold: "text-orange-500",
};

function Sidebar({ isOpen, onClose }) {
  const { state } = useDashboard();

  const [activeNav, setActiveNav] = useState("dashboard");
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const recentProjects = [...state.projects]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand + tombol tutup (mobile) */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500">
            <FiGrid size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FreelancePro
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dashboard
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200 lg:hidden"
        >
          <FiX size={18} />
        </button>
      </div>

      <nav className="scrollbar-slim flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                onClose(); // tutup sidebar setelah navigasi di mobile
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}

        <div className="px-3 pt-4 pb-2">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            Klien Aktif
          </p>
        </div>

        {state.clients
          .filter((c) => c.status === "active")
          .map((client) => (
            <div
              key={client.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                {client.name.charAt(0)}
              </div>
              <span className="truncate">{client.name}</span>
            </div>
          ))}

        <div className="pt-4 pb-1">
          <button
            onClick={() => setIsProjectsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <span>Recent Projects</span>
            {isProjectsOpen ? (
              <FiChevronDown size={12} />
            ) : (
              <FiChevronRight size={12} />
            )}
          </button>
        </div>

        {isProjectsOpen && (
          <div className="space-y-1">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
              >
                <FiCircle
                  size={8}
                  className={`shrink-0 ${STATUS_COLOR[project.status] ?? ""}`}
                />
                <span className="truncate">{project.name}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

    </aside>
  );
}

export default Sidebar;
