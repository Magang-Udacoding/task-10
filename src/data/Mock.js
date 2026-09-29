// src/data/mockData.js
// Realistic dummy data for the Freelance Developer Dashboard
// All revenue values are in Indonesian Rupiah (IDR)

// ─── CLIENTS ──────────────────────────────────────────────
export const mockClients = [
  { id: "c1", name: "PT. Nusantara Digital",  email: "hello@nusantara.id",   totalProjects: 6, totalRevenue: 87_000_000, status: "active"   },
  { id: "c2", name: "CV. Creative Youth",      email: "info@kreasimuda.com",  totalProjects: 4, totalRevenue: 52_000_000, status: "active"   },
  { id: "c3", name: "Fast Fintech Startup",    email: "dev@fintechcepat.io",  totalProjects: 8, totalRevenue: 134_000_000, status: "active"  },
  { id: "c4", name: "PT. Prima Logistics",     email: "tech@logistik.co.id",  totalProjects: 3, totalRevenue: 38_500_000, status: "inactive" },
  { id: "c5", name: "Smart Learning Edtech",   email: "hi@belajarpintar.id",  totalProjects: 5, totalRevenue: 61_000_000, status: "active"   },
  { id: "c6", name: "CV. Creative Media",      email: "contact@mediakre.com", totalProjects: 2, totalRevenue: 24_000_000, status: "inactive" },
  { id: "c7", name: "PT. Modern Retail",       email: "it@retailmodern.id",   totalProjects: 4, totalRevenue: 49_500_000, status: "active"   },
  { id: "c8", name: "Green Agritech Startup",  email: "tech@agrihijau.id",    totalProjects: 3, totalRevenue: 33_000_000, status: "active"   },
];

// ─── PROJECTS ─────────────────────────────────────────────
export const mockProjects = [
  { id: "p1",  name: "Dashboard Analytics v2",     clientId: "c1", client: "PT. Nusantara Digital",  revenue: 18_000_000, hours: 145, status: "completed", priority: "high",   startDate: "2025-01-05", endDate: "2025-02-28" },
  { id: "p2",  name: "Mobile App React Native",    clientId: "c3", client: "Fast Fintech Startup",   revenue: 32_000_000, hours: 210, status: "completed", priority: "high",   startDate: "2025-01-10", endDate: "2025-03-15" },
  { id: "p3",  name: "Landing Page Redesign",      clientId: "c2", client: "CV. Creative Youth",     revenue: 8_500_000,  hours: 60,  status: "completed", priority: "low",    startDate: "2025-02-01", endDate: "2025-02-20" },
  { id: "p4",  name: "REST API Payment Gateway",   clientId: "c3", client: "Fast Fintech Startup",   revenue: 27_000_000, hours: 180, status: "completed", priority: "high",   startDate: "2025-02-15", endDate: "2025-04-10" },
  { id: "p5",  name: "E-commerce Platform",        clientId: "c7", client: "PT. Modern Retail",      revenue: 24_500_000, hours: 200, status: "on-hold",   priority: "medium", startDate: "2025-03-01", endDate: "2025-05-30" },
  { id: "p6",  name: "Logistics Admin Panel",      clientId: "c4", client: "PT. Prima Logistics",    revenue: 19_000_000, hours: 155, status: "completed", priority: "medium", startDate: "2025-03-10", endDate: "2025-04-25" },
  { id: "p7",  name: "Online LMS System",          clientId: "c5", client: "Smart Learning Edtech",  revenue: 22_000_000, hours: 170, status: "pending",   priority: "high",   startDate: "2025-04-01", endDate: "2025-06-15" },
  { id: "p8",  name: "Company Profile Website",    clientId: "c6", client: "CV. Creative Media",     revenue: 12_000_000, hours: 80,  status: "completed", priority: "low",    startDate: "2025-04-05", endDate: "2025-04-30" },
  { id: "p9",  name: "IoT Dashboard Monitoring",   clientId: "c1", client: "PT. Nusantara Digital",  revenue: 21_000_000, hours: 165, status: "pending",   priority: "high",   startDate: "2025-04-15", endDate: "2025-06-30" },
  { id: "p10", name: "Point of Sale Application",  clientId: "c7", client: "PT. Modern Retail",      revenue: 15_000_000, hours: 120, status: "completed", priority: "medium", startDate: "2025-05-01", endDate: "2025-06-15" },
  { id: "p11", name: "Platform Crowdfunding",      clientId: "c3", client: "Fast Fintech Startup",   revenue: 38_000_000, hours: 250, status: "on-hold",   priority: "high",   startDate: "2025-05-10", endDate: "2025-08-30" },
  { id: "p12", name: "Warehouse Inventory System", clientId: "c4", client: "PT. Prima Logistics",    revenue: 16_500_000, hours: 130, status: "completed", priority: "medium", startDate: "2025-05-20", endDate: "2025-07-10" },
  { id: "p13", name: "Interactive Quiz App",       clientId: "c5", client: "Smart Learning Edtech",  revenue: 14_000_000, hours: 95,  status: "pending",   priority: "low",    startDate: "2025-06-01", endDate: "2025-07-31" },
  { id: "p14", name: "Website Portfolio Agency",   clientId: "c6", client: "CV. Creative Media",     revenue: 9_500_000,  hours: 65,  status: "completed", priority: "low",    startDate: "2025-06-10", endDate: "2025-07-05" },
  { id: "p15", name: "Supply Chain System",        clientId: "c8", client: "Green Agritech Startup", revenue: 19_000_000, hours: 150, status: "pending",   priority: "medium", startDate: "2025-06-15", endDate: "2025-08-31" },
  { id: "p16", name: "Internal CRM Dashboard",     clientId: "c1", client: "PT. Nusantara Digital",  revenue: 26_000_000, hours: 195, status: "completed", priority: "high",   startDate: "2025-07-01", endDate: "2025-09-15" },
  { id: "p17", name: "Mobile Attendance App",      clientId: "c2", client: "CV. Creative Youth",     revenue: 13_500_000, hours: 100, status: "pending",   priority: "medium", startDate: "2025-07-10", endDate: "2025-09-30" },
  { id: "p18", name: "Platform Marketplace B2B",   clientId: "c3", client: "Fast Fintech Startup",   revenue: 45_000_000, hours: 300, status: "on-hold",   priority: "high",   startDate: "2025-07-15", endDate: "2025-11-30" },
  { id: "p19", name: "Soil Sensor Monitoring",     clientId: "c8", client: "Green Agritech Startup", revenue: 11_000_000, hours: 85,  status: "completed", priority: "low",    startDate: "2025-08-01", endDate: "2025-09-10" },
  { id: "p20", name: "Banking App UI Redesign",    clientId: "c3", client: "Fast Fintech Startup",   revenue: 29_000_000, hours: 220, status: "pending",   priority: "high",   startDate: "2025-08-15", endDate: "2025-10-31" },
];

// ─── REVENUE (LAST 30 DAYS) ────────────────────────────────
// Used by the Line Chart: daily actual vs target revenue
const generateRevenueData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const target = 4_000_000 + Math.floor(Math.random() * 1_500_000);
    // Actual varies ±30% from the target to simulate fluctuations
    const variance = (Math.random() - 0.4) * 0.6;
    const actual = Math.max(0, Math.floor(target * (1 + variance)));

    data.push({
      date: date.toISOString().split("T")[0], // Format: "2025-08-01"
      actual,
      target,
    });
  }

  return data;
};

export const mockRevenueData = generateRevenueData();

// ─── SKILLS ───────────────────────────────────────────────
// Used by the Radar/PolarArea Chart
export const mockSkills = [
  { skill: "React",       level: 92 },
  { skill: "TypeScript",  level: 85 },
  { skill: "Node.js",     level: 78 },
  { skill: "UI/UX Design",level: 70 },
  { skill: "PostgreSQL",  level: 75 },
  { skill: "Docker",      level: 65 },
];

// ─── NOTIFICATIONS ────────────────────────────────────────
export const mockNotifications = [
  { id: "n1", message: "Payment of Rp 18M from PT. Nusantara received",  isRead: false, createdAt: "2025-09-27T09:00:00Z" },
  { id: "n2", message: "Project 'Online LMS System' is due in 3 days",   isRead: false, createdAt: "2025-09-27T11:30:00Z" },
  { id: "n3", message: "New client: Green Agritech Startup has joined",  isRead: false, createdAt: "2025-09-28T08:15:00Z" },
  { id: "n4", message: "This month's revenue exceeded the target by 12%", isRead: true,  createdAt: "2025-09-28T14:00:00Z" },
];
