import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import useDebounce from "../../hooks/useDebounce";
import { MdWavingHand } from "react-icons/md";
import { FiSearch, FiBell, FiSun, FiMoon, FiX } from "react-icons/fi";

function Navbar() {
  const {state, dispatch} = useDashboard();

  const [searchInput, setSearchInput] = useState("");

  const debounceSearch = useDebounce(searchInput, 300);

  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    dispatch({ type: "SET_FILTER", payload: debounceSearch });
  }, [debounceSearch, dispatch]);

  const hanldeClearSearch = () => {
    setSearchInput("");
    dispatch({ type: "RESET_FILTER" });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="hidden md:block shrink-0">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Overview
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Welcome Back Again! <MdWavingHand color="#FFD700" size={18} />
        </p>
      </div>

      {/* search input */}
      <div className="relative flex-1 max-w-md">
        <FiSearch
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 pointer-events-none"
        />

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Project, Client..."
          className="w-full pl-9 pr-9 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
        />
        {searchInput && (
          <button
            onClick={hanldeClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      <div className="flex items-centr gap-1 shrink-0">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FiBell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-orange-500 rounded-full leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          aria-label="Toggle theme"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {state.theme === "dark" ? (
            <FiSun size={18} className="text-yellow-400" />
          ) : (
            <FiMoon size={18} className="text-blue-500" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
