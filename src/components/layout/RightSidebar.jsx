import { useState } from "react";
import { FiAward, FiDownload } from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";
import { exportToCSV, exportToExcel, transformProjectsForExport } from "../../utils/exportUtils.js";
import AchievementsModal from "../AchievementsModal.jsx";

function RightSidebar() {
  const { state } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(transformProjectsForExport(state.projects), "freelance-projects");
  };

  const handleExportExcel = () => {
    exportToExcel(transformProjectsForExport(state.projects), "freelance-projects");
  };

  return (
    <>
      <aside className="fixed inset-y-0 right-0 z-20 hidden w-[280px] flex-col border-l border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 xl:flex">
        <div className="flex h-[61px] items-center px-5 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Quick Actions
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-slim">
          {/* Quick Actions */}
          <div className="space-y-3">
            <button
              onClick={handleExportCSV}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <FiDownload size={16} /> Export All to CSV
            </button>
            <button
              onClick={handleExportExcel}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <FiDownload size={16} /> Export All to Excel
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 hover:bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <FiAward size={16} /> View Achievements
            </button>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* Progress Section */}
          <div>
            {/* Bar */}
          </div>
        </div>
      </aside>

      {/* Modal Achievements */}
      {isModalOpen && (
        <AchievementsModal state={state} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default RightSidebar;
