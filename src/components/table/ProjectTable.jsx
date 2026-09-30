import { useMemo, useState, useCallback, Fragment } from "react";
import { FiChevronUp, FiChevronDown, FiDownload, FiTrash2, FiColumns } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useDashboard from "../../hooks/useDashboard";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";
import { formatCurrency, formatShortDate } from "../../utils/dateUtils.js";
import { FaArrowsUpDown } from "react-icons/fa6";
import {
  exportToCSV,
  transformProjectsForExport,
} from "../../utils/exportUtils.js";

const COLUMNS = [
  {
    key: "name",
    label: "Project",
    sortable: true,
  },
  {
    key: "client",
    label: "Client",
    sortable: true,
  },
  {
    key: "revenue",
    label: "Revenue",
    sortable: true,
  },
  {
    key: "hours",
    label: "Hours",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "priority",
    label: "Priority",
    sortable: true,
  },
  {
    key: "startDate",
    label: "Start",
    sortable: true,
  },
  {
    key: "endDate",
    label: "End",
    sortable: true,
  },
];

const STATUS_STYLE = {
  completed:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  pending:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  onHold: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

const PRIORITY_STYLE = {
  high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  medium: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  low: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

function ProjectTable() {
  const { state } = useDashboard();

  const [selectedIds, setSelectedIds] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Filter from the navbar search
  const filteredProjects = useMemo(() => {
    const query = state.filter.toLowerCase().trim();
    if (!query) return state.projects;
    return state.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.status.toLowerCase().includes(query) ||
        p.priority.toLowerCase().includes(query),
    );
  }, [state.projects, state.filter]);

  //   2. Sort the filtered result
  const { sortedData, sortKey, sortDirection, handleSort } =
    useSort(filteredProjects);

  //   3. Paginate the sorted result
  const { currentData, currentPage, totalPage, nextPage, prevPage, goToPage } =
    usePagination(sortedData, itemsPerPage);

  //   Row selection
  const isAllSelected =
    currentData.length > 0 &&
    currentData.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentData.find((p) => p.id === id)),
      );
    } else {
      const newIds = currentData.map((p) => p.id);
      setSelectedIds((prev) => [...new Set([...prev, ...newIds])]);
    }
  }, [isAllSelected, currentData]);

  const toggleSelectOne = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const handleExport = useCallback(() => {
    const dataToExport =
      selectedIds.length > 0
        ? filteredProjects.filter((p) => selectedIds.includes(p.id))
        : filteredProjects;

    exportToCSV(transformProjectsForExport(dataToExport), "freelance-projects");
  }, [selectedIds, filteredProjects]);

  // State: kolom mana yang sedang ditampilkan
  // Lazy initializer -> object dibangun sekali saat mount, bukan tiap render
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(COLUMNS.map((col) => [col.key, true])),
  );

  const toggleColumn = useCallback((key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Kolom yang aktif ditampilkan, dipakai bersama di <thead> dan <tbody>
  const activeColumns = COLUMNS.filter((col) => visibleColumns[col.key]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/*   Table header   */}
      <TableToolbar
        total={filteredProjects.length}
        selectedCount={selectedIds.length}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setSelectedIds([]);
        }}
        onClearSelection={() => setSelectedIds([])}
        onExport={handleExport}
        columns={COLUMNS}
        visibleColumns={visibleColumns}
        onToggleColumn={toggleColumn}
        onBulkDelete={() => {
          alert(`${selectedIds.length} deleted projects (simulation)`);
          setSelectedIds([]);
        }}
      />
      {/*   Table   */}
      <div className="scrollbar-slim max-h-96 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {/* Checkbox select all */}
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-500"
                />
              </th>
              {activeColumns.map((col) => (
                <SortableHeader
                  key={col.key}
                  column={col}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length + 1}
                  className="py-16 text-center text-slate-400 dark:text-slate-500"
                >
                  No projects match your search
                </td>
              </tr>
            ) : (
              currentData.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isSelected={selectedIds.includes(project.id)}
                  onToggle={() => toggleSelectOne(project.id)}
                  activeColumns={activeColumns}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {/*   Pagination   */}
      <TablePagination
        currentPage={currentPage}
        totalPage={totalPage}
        totalItems={filteredProjects.length}
        itemsPerPage={itemsPerPage}
        onPrev={prevPage}
        onNext={nextPage}
        onGoTo={goToPage}
      />
    </div>
  );
}
//   Sub-component: SortableHeader
function SortableHeader({ column, sortKey, sortDirection, onSort }) {
  const isActive = sortKey === column.key;
  return (
    <th
      className={`px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap ${
        column.sortable
          ? "cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-100"
          : ""
      }`}
      onClick={() => column.sortable && onSort(column.key)}
    >
      <span className="flex items-center gap-1">
        {column.label}
        {column.sortable &&
          (isActive ? (
            sortDirection === "asc" ? (
              <FiChevronUp size={14} className="text-blue-500" />
            ) : (
              <FiChevronDown size={14} className="text-blue-500" />
            )
          ) : (
            <FaArrowsUpDown size={14} className="opacity-30" />
          ))}
      </span>
    </th>
  );
}
//   Sub-component: ProjectRow
function ProjectRow({ project, isSelected, onToggle, activeColumns }) {
  const cellMap = {
    name: (
      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100 max-w-[200px]">
        <span className="truncate block">{project.name}</span>
      </td>
    ),
    client: (
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
        {project.client}
      </td>
    ),
    revenue: (
      <td className="px-4 py-3 text-slate-900 dark:text-slate-100 font-medium whitespace-nowrap">
        {formatCurrency(project.revenue)}
      </td>
    ),
    hours: (
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        {project.hours}h
      </td>
    ),
    status: (
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[project.status] ?? ""}`}
        >
          {project.status}
        </span>
      </td>
    ),
    priority: (
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${PRIORITY_STYLE[project.priority] ?? ""}`}
        >
          {project.priority}
        </span>
      </td>
    ),
    startDate: (
      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {formatShortDate(project.startDate)}
      </td>
    ),
    endDate: (
      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {formatShortDate(project.endDate)}
      </td>
    ),
  };
  return (
    <tr
      className={`transition-colors ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-700/30"
      }`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="rounded border-slate-300 dark:border-slate-600 text-blue-500"
        />
      </td>
      {activeColumns.map((col) => (
        <Fragment key={col.key}>{cellMap[col.key]}</Fragment>
      ))}
    </tr>
  );
}
//   Sub-component: TableToolbar
function TableToolbar({
  total, selectedCount, itemsPerPage,
  onItemsPerPageChange, onClearSelection,
  onExport, columns, visibleColumns,
  onToggleColumn, onBulkDelete
}) {
  const [showColumns, setShowColumns] = useState(false);

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex-wrap gap-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Project List
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {total} project ditemukan
          {selectedCount > 0 && (
            <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
              · {selectedCount} dipilih
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Bulk actions — hanya muncul saat ada yang dipilih */}
        {selectedCount > 0 && (
          <>
            <button
              onClick={onClearSelection}
              className="text-xs px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Batal pilih
            </button>
            <button
              onClick={onBulkDelete}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
            >
              <FiTrash2 size={12} />
              Hapus {selectedCount} item
            </button>
          </>
        )}
        {/* Column Visibility Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowColumns((prev) => !prev)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <FiColumns size={13} />
            Kolom
            <FiChevronDown size={11} />
          </button>
          {/* Dropdown kolom */}
          {showColumns && (
            <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3 min-w-[160px]">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 px-1">
                Tampilkan Kolom
              </p>
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center gap-2 px-1 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns[col.key]}
                    onChange={() => onToggleColumn(col.key)}
                    className="rounded border-slate-300 dark:border-slate-600 text-blue-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    {col.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
        >
          <FiDownload size={13} />
          {selectedCount > 0 ? `Export ${selectedCount} baris` : 'Export CSV'}
        </button>
        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="text-xs px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value={10}>10 / halaman</option>
          <option value={25}>25 / halaman</option>
          <option value={50}>50 / halaman</option>
        </select>
      </div>
    </div>
  )
}
//   Sub-component: TablePagination─
function TablePagination({
  currentPage,
  totalPage,
  totalItems,
  itemsPerPage,
  onPrev,
  onNext,
  onGoTo,
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-700">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing {startItem}–{endItem} of {totalItems} projects
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FaArrowLeft size={8} /> Prev
        </button>
        {/* Page numbers */}
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onGoTo(page)}
            className={`w-8 h-8 text-xs rounded-lg transition-colors ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={onNext}
          disabled={currentPage === totalPage}
          className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <FaArrowRight size={8} />
        </button>
      </div>
    </div>
  );
}
export default ProjectTable;
