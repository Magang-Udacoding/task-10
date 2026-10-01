// src/components/layout/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import useDebounce from "../../hooks/useDebounce";
import {
  FiBell,
  FiCheck,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiTrash2,
  FiX,
} from "react-icons/fi";

function Navbar({ onMenuClick }) {
  const { state, dispatch } = useDashboard();

  const [searchInput, setSearchInput] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  const debounceSearch = useDebounce(searchInput, 300);

  const notifications = state.notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Tutup dropdown notifikasi saat klik di luar
  useEffect(() => {
    if (!showNotifications) return;

    const handleOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showNotifications]);

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
            Selamat datang kembali
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
          type="search"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari project, client..."
          className="w-full rounded-lg border border-slate-200 bg-slate-100 py-2 pr-9 pl-9 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-ms-clear]:hidden dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
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
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Notifikasi
                </p>
                <button
                  onClick={() =>
                    dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" })
                  }
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1 text-xs text-blue-600 transition-colors hover:text-blue-500 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400 dark:disabled:text-slate-600"
                >
                  <FiCheck size={12} />
                  Tandai semua dibaca
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  Belum ada notifikasi
                </p>
              ) : (
                <ul className="scrollbar-slim max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="flex items-start gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0 dark:border-slate-700/60"
                    >
                      <button
                        onClick={() =>
                          dispatch({
                            type: "MARK_NOTIFICATION_READ",
                            payload: n.id,
                          })
                        }
                        className={`flex-1 text-left text-xs ${
                          n.isRead
                            ? "text-slate-400 dark:text-slate-500"
                            : "font-medium text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {n.message}
                        {n.createdAt && (
                          <span className="mt-0.5 block text-[10px] text-slate-400 dark:text-slate-500">
                            {new Date(n.createdAt).toLocaleString("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_NOTIFICATION",
                            payload: n.id,
                          })
                        }
                        aria-label="Remove notification"
                        className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

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
