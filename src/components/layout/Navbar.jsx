// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import useDebounce from "../../hooks/useDebounce";
import { FiBell, FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";

function Navbar({ onMenuClick }) {
  const { state, dispatch } = useDashboard();

  const [searchInput, setSearchInput] = useState("");
  const debounceSearch = useDebounce(searchInput, 300);

  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    dispatch({ type: "SET_FILTER", payload: debounceSearch });
  }, [debounceSearch, dispatch]);

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch({ type: "RESET_FILTER" });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 md:px-6">
      {/* Kiri: hamburger (mobile) + greeting (desktop) */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 lg:hidden"
        >
          <FiMenu size={20} />
        </button>

        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Overview
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selamat datang kembali 👋
          </p>
        </div>
      </div>

      {/* Tengah: pencarian */}
      <div className="relative max-w-md flex-1">
        <FiSearch
          size={15}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari project, client..."
          className="w-full rounded-lg border border-slate-200 bg-slate-100 py-2 pr-9 pl-9 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        />

        {searchInput && (
          <button
            onClick={handleClearSearch}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Kanan: aksi */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <FiBell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          {state.theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
