import { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardContext = createContext(null);

const MAX_NOTIFICATIONS = 5;
const MAX_REVENUE_POINTS = 30;

const initState = {
  projects: [],
  clients: [],
  revenue: 0,
  revenueHistory: [],
  filter: "",
  theme: "dark",
  favorites: [],
  notifications: [
    { id: "n1", message: "Anda mendapat pembayaran baru Rp 25.000.000", isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: "n2", message: "Project E-Commerce Website berhasil diselesaikan", isRead: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: "n3", message: "Client baru: PT ABC Teknologi", isRead: false, createdAt: new Date(Date.now() - 86400000).toISOString() }
  ],
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    case "SET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };

    // Hapus project berdasarkan id (dipakai bulk delete di ProjectTable).
    // Revenue ikut dihitung ulang supaya kartu statistik tidak stale.
    case "DELETE_PROJECTS": {
      const removed = new Set(action.payload);
      const projects = state.projects.filter((p) => !removed.has(p.id));
      const revenue = projects
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.revenue, 0);

      return {
        ...state,
        projects,
        revenue,
      };
    }

    case "SET_REVENUE":
      return {
        ...state,
        revenue: action.payload,
      };

    // Menyimpan histori revenue supaya grafik tidak memakai data beku.
    // Dipanggil sekali saat mount dengan data mock.
    case "SET_REVENUE_HISTORY":
      return {
        ...state,
        revenueHistory: action.payload.slice(-MAX_REVENUE_POINTS),
      };

    // Titik baru dari useRevenueSync. Kalau tanggalnya sudah ada, titik
    // itu diganti (bukan ditumpuk) supaya label grafik tidak kembar.
    case "PUSH_REVENUE_POINT": {
      const { date, actual } = action.payload;
      const previous = state.revenueHistory.filter((d) => d.date !== date);
      const last = state.revenueHistory[state.revenueHistory.length - 1];

      return {
        ...state,
        revenueHistory: [
          ...previous,
          { date, actual, target: last?.target ?? 0 },
        ].slice(-MAX_REVENUE_POINTS),
      };
    }

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload.slice(-MAX_NOTIFICATIONS),
      };

    // Dibatasi supaya badge tidak tumbuh tanpa batas (useRevenueSync
    // menambah satu notifikasi tiap 30 detik).
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload].slice(
          -MAX_NOTIFICATIONS,
        ),
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };


    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification,
        ),
      };

    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "RESET_FILTER":
      return {
        ...state,
        filter: "",
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "TOGGLE_FAVORITE": {
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    }

    default:
      return state;
  }
};

function DashboardProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "dashboard-theme",
    initState.theme,
  );

  const [storedFavorites, setStoredFavorites] = useLocalStorage(
    "dashboard-favorites",
    initState.favorites,
  );

  const initialDashboardState = {
    ...initState,
    theme: storedTheme,
    favorites: storedFavorites,
  };

  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  useEffect(() => {
    setStoredTheme(state.theme);
  }, [state.theme, setStoredTheme]);

  useEffect(() => {
    setStoredFavorites(state.favorites);
  }, [state.favorites, setStoredFavorites]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardProvider };
export default DashboardContext;
