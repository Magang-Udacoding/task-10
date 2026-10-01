// src/App.jsx
import { useEffect, useState } from "react";
import useDashboard from "./hooks/useDashboard";
import { mockProjects, mockClients, mockNotifications, mockRevenueData } from "./data/Mock.js";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import AchievementToast from "./components/AchievementToast";
import useRevenueSync from "./hooks/useRevenueSync.js";
import useAchievements from "./hooks/useAchievements";
import RightSidebar from "./components/layout/RightSidebar";

function App() {
  const { state, dispatch } = useDashboard();

  // Dibutuh dua komponen sekaligus: Navbar (toggle) dan overlay (tutup)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { activeAchievement, dismissAchievement } = useAchievements();

  // Load the mock data once on mount
  useEffect(() => {
    dispatch({ type: "SET_PROJECTS", payload: mockProjects });
    dispatch({ type: "SET_CLIENTS", payload: mockClients });
    dispatch({ type: "SET_NOTIFICATIONS", payload: mockNotifications });

    const totalRevenue = mockProjects
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.revenue, 0);
    dispatch({ type: "SET_REVENUE", payload: totalRevenue });

    // Seed histori 30 hari terakhir supaya grafik revenue punya garis awal
    dispatch({ type: "SET_REVENUE_HISTORY", payload: mockRevenueData });
  }, [dispatch]);

  // Sync the theme to the <html> class
  useEffect(() => {
    const root = document.documentElement;
    state.theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [state.theme]);

  useRevenueSync(30_000);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Overlay — hanya di mobile saat sidebar terbuka */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-col lg:ml-64 xl:mr-[280px]">
        <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-6">
          <Dashboard />
        </main>
      </div>

      <RightSidebar />

      <AchievementToast
        achievement={activeAchievement}
        onDismiss={dismissAchievement}
      />
    </div>
  );
}

export default App;
