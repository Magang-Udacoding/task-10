import { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardContext = createContext(null);

const initState = {
  projects: [],
  clients: [],
  revenue: 0,
  filter: "",
  theme: "dark",
  favorites: [],
  notifications: [],
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

    case "SET_REVENUE":
      return {
        ...state,
        revenue: action.payload,
      };

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
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

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
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

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification,
        ),
      };

    case "RESET_DASHBOARD":
      return {
        ...initState,
      };

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
