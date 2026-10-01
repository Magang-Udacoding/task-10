# FreelancePro Dashboard

> Advanced React Dashboard untuk tracking project dan revenue freelance developer.

![Dashboard Preview](https://via.placeholder.com/1200x630/3b82f6/ffffff?text=FreelancePro+Dashboard)

## 🚀 Live Demo

**[https://dashboard-pro-USERNAME.vercel.app](https://dashboard-pro-USERNAME.vercel.app)**

---

## ✨ Features

- 📊 **4 Interactive Charts** — Line, Stacked Bar, Donut, Radar (Chart.js)
- 🔍 **Debounced Search** — Filter real-time dengan delay 300ms
- 📋 **Advanced Table** — Sort, paginate, filter, column visibility, row selection
- 📥 **CSV Export** — Export selected atau semua data via PapaParse
- 🌙 **Dark/Light Mode** — Persistent via localStorage
- ⚡ **Real-time Revenue** — Auto-refresh setiap 30 detik
- 🏆 **Achievement System** — Unlock dengan confetti animation
- 📱 **Fully Responsive** — Mobile hamburger menu + stacked layout
- 🔧 **PWA Ready** — Installable + offline support
- ⚙️ **Performance Optimized** — React.memo, useCallback, lazy loading

---

## 🛠 Tech Stack

| Kategori  | Teknologi                     |
| --------- | ----------------------------- |
| Frontend  | React 19, Vite 8              |
| Styling   | Tailwind CSS v4               |
| State     | Context API + useReducer      |
| Charts    | Chart.js 4, react-chartjs-2   |
| Icons     | react-icons (Feather)         |
| Date      | date-fns                      |
| Export    | PapaParse                     |
| Animation | react-confetti                |
| PWA       | vite-plugin-pwa + Workbox     |

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/USERNAME/react-freelance-dashboard-pro.git
cd react-freelance-dashboard-pro

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🖥 Running Project

```bash
# Development
npm run dev          # http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview      # http://localhost:4173

# Lint
npm run lint
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── charts/          # RevenueLineChart, StatusStackedChart,
│   │                    # ClientDonutChart, SkillsRadarChart
│   ├── dashboard/       # StatsCard, StatsGrid
│   ├── layout/          # Navbar, Sidebar
│   ├── table/           # ProjectTable (sort, paginate, export)
│   └── ui/              # AchievementToast
│
├── context/
│   └── DashboardContext.jsx   # Global state + useReducer
│
├── data/
│   ├── Mock.js               # 20 projects, 8 clients, 30-day revenue
│   └── achievements.js       # Achievement definitions
│
├── hooks/
│   ├── useDashboard.js        # Context accessor
│   ├── useLocalStorage.js     # Generic persist hook
│   ├── useDebounce.js         # Delay hook (300ms)
│   ├── usePagination.js       # Paginate + auto-reset
│   ├── useSort.js             # Multi-type sort
│   ├── useRevenueSync.js      # Real-time revenue interval
│   └── useAchievements.js     # Achievement unlock system
│
├── pages/
│   └── Dashboard.jsx          # Main dashboard page
│
├── utils/
│   ├── chartUtils.js          # Chart.js setup + data transformers
│   ├── dateUtils.js           # Date & currency formatters
│   └── exportUtils.js         # CSV export via PapaParse
│
├── App.jsx                    # Root layout + theme sync
├── main.jsx                   # Entry point + SW registration
└── index.css                  # Tailwind v4 + dark mode config
```

---

## 📊 Chart Explanation

### 1. Revenue Line Chart

- **Data:** 30 hari actual vs target revenue
- **Config:** `tension: 0.4` untuk smooth Bezier curve
- **Features:** Zoom/pan, custom tooltip (format Rupiah), legend clickable
- **Library:** react-chartjs-2 + chartjs-plugin-zoom

### 2. Status Stacked Bar Chart

- **Data:** Jumlah project per status (completed/pending/on-hold)
- **Config:** `stacked: true` pada kedua sumbu x dan y
- **Colors:** Green (completed), Yellow (pending), Red (on-hold)

### 3. Revenue Donut Chart

- **Data:** Total revenue per client dari completed projects
- **Config:** `cutout: '65%'`, custom tooltip dengan persentase
- **Feature:** Dynamic color berdasarkan index client

### 4. Skills Radar Chart

- **Data:** 6 skill levels (0-100)
- **Config:** RadialLinearScale, `backdropColor: transparent`
- **Scale:** Sumbu r dengan `min: 0`, `max: 100`

---

## 🗂 State Management

**DashboardContext + useReducer**

`initState`: `{ projects, clients, revenue, filter, theme, favorites, notifications }`

**12 Action Types:**

| Action                   | Fungsi                          |
| ------------------------ | ------------------------------- |
| SET_PROJECTS             | Load semua project              |
| SET_CLIENTS              | Load semua client               |
| DELETE_PROJECTS          | Hapus project (bulk delete)     |
| SET_REVENUE              | Update total revenue statis     |
| SET_REVENUE_HISTORY      | Load histori grafik revenue     |
| PUSH_REVENUE_POINT       | Tambah titik data line chart    |
| SET_FILTER               | Update search query             |
| RESET_FILTER             | Hapus filter                    |
| TOGGLE_THEME             | Toggle dark/light               |
| SET_NOTIFICATIONS        | Load semua notifikasi           |
| ADD_NOTIFICATION         | Tambah satu notifikasi          |
| REMOVE_NOTIFICATION      | Hapus satu notifikasi           |
| MARK_NOTIFICATION_READ   | Tandai satu notifikasi dibaca   |
| MARK_ALL_NOTIFICATIONS_READ | Tandai semua dibaca          |

---

## 🪝 Custom Hooks

| Hook             | Input                   | Output                        | Tujuan                    |
| ---------------- | ----------------------- | ----------------------------- | ------------------------- |
| useDashboard     | —                       | `{ state, dispatch }`         | Context accessor          |
| useLocalStorage  | key, initialValue       | `[value, setValue]`           | Persistent state          |
| useDebounce      | value, delay            | debouncedValue                | Delay input 300ms         |
| usePagination    | data, itemsPerPage      | `{ currentData, ... }`        | Paginate array            |
| useSort          | data, key, dir          | `{ sortedData, ... }`         | Sort multi-type           |
| useRevenueSync   | interval                | —                             | Real-time update          |
| useAchievements  | —                       | `{ achievement, dismiss }`    | Achievement system        |

---

## ⚡ Performance

### Optimizations Applied

| Teknik       | Diterapkan pada        | Manfaat                              |
| ------------ | ---------------------- | ------------------------------------ |
| React.memo   | StatsCard              | Skip re-render saat props tidak berubah |
| useCallback  | Table handlers         | Stable function references           |
| React.lazy   | 4 chart components     | Code splitting per chart             |
| Suspense     | Chart wrappers         | Skeleton loading fallback            |
| useMemo      | Filter, sort, chart data | Hindari kalkulasi berulang          |

### Bundle Size (Production Build)

| File               | Raw     | Gzip   |
| ------------------ | ------- | ------ |
| Main bundle        | 320 kB  | 98 kB  |
| Chart.js (chartUtils) | 227 kB | 79 kB  |
| CSS                | 33 kB   | 7 kB   |
| Per chart chunk    | ~1-2 kB | <1 kB  |

---

## 📱 PWA

### Cara Kerja

1. Service Worker (Workbox) meng-cache semua asset saat install
2. Saat offline, app served dari cache
3. Saat koneksi kembali, SW update otomatis

### Install PWA

1. Buka app di Chrome
2. Klik ikon install (⊕) di address bar
3. App tersedia di desktop/home screen

### Test Offline

1. DevTools → Network → Offline
2. Refresh halaman → app tetap berjalan

### Cache Coverage

- 13 entries pre-cached (±593 kB)
- Semua JS, CSS, HTML, SVG, PNG

---

## 🚀 Deployment

Deployed ke Vercel:

```bash
npm run build
# Deploy via Vercel CLI atau GitHub integration
```

**Live URL:** https://dashboard-pro-USERNAME.vercel.app

---

## 📸 Screenshots

| Desktop Dark          | Desktop Light         |
| --------------------- | --------------------- |
| (tambahkan screenshot) | (tambahkan screenshot) |

| Mobile View           | Charts                |
| --------------------- | --------------------- |
| (tambahkan screenshot) | (tambahkan screenshot) |

---

## 👨‍💻 Author

**[Nama Anda]** — Fullstack Developer

- GitHub: [[FailHy](https://github.com/FailHy)]([Task 10](https://github.com/Magang-Udacoding/task-10))
- Task: Magang Udacoding — Task 10

---

## 📄 License

MIT License