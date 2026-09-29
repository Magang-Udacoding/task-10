// src/data/mockData.js
// Data dummy realistis untuk Freelance Developer Dashboard
// Semua nilai revenue dalam Rupiah (IDR)

// ─── CLIENTS ──────────────────────────────────────────────
export const mockClients = [
  { id: "c1", name: "PT. Nusantara Digital",  email: "hello@nusantara.id",   totalProjects: 6, totalRevenue: 87_000_000, status: "active"   },
  { id: "c2", name: "CV. Kreasi Muda",        email: "info@kreasimuda.com",  totalProjects: 4, totalRevenue: 52_000_000, status: "active"   },
  { id: "c3", name: "Startup Fintech Cepat",  email: "dev@fintechcepat.io",  totalProjects: 8, totalRevenue: 134_000_000, status: "active"  },
  { id: "c4", name: "PT. Logistik Prima",     email: "tech@logistik.co.id",  totalProjects: 3, totalRevenue: 38_500_000, status: "inactive" },
  { id: "c5", name: "Edtech Belajar Pintar",  email: "hi@belajarpintar.id",  totalProjects: 5, totalRevenue: 61_000_000, status: "active"   },
  { id: "c6", name: "CV. Media Kreatif",      email: "contact@mediakre.com", totalProjects: 2, totalRevenue: 24_000_000, status: "inactive" },
  { id: "c7", name: "PT. Retail Modern",      email: "it@retailmodern.id",   totalProjects: 4, totalRevenue: 49_500_000, status: "active"   },
  { id: "c8", name: "Startup Agritech Hijau", email: "tech@agrihijau.id",    totalProjects: 3, totalRevenue: 33_000_000, status: "active"   },
];

// ─── PROJECTS ─────────────────────────────────────────────
export const mockProjects = [
  { id: "p1",  name: "Dashboard Analytics v2",     clientId: "c1", client: "PT. Nusantara Digital",  revenue: 18_000_000, hours: 145, status: "completed", priority: "high",   startDate: "2025-01-05", endDate: "2025-02-28" },
  { id: "p2",  name: "Mobile App React Native",    clientId: "c3", client: "Startup Fintech Cepat",  revenue: 32_000_000, hours: 210, status: "completed", priority: "high",   startDate: "2025-01-10", endDate: "2025-03-15" },
  { id: "p3",  name: "Landing Page Redesign",      clientId: "c2", client: "CV. Kreasi Muda",        revenue: 8_500_000,  hours: 60,  status: "completed", priority: "low",    startDate: "2025-02-01", endDate: "2025-02-20" },
  { id: "p4",  name: "REST API Payment Gateway",   clientId: "c3", client: "Startup Fintech Cepat",  revenue: 27_000_000, hours: 180, status: "completed", priority: "high",   startDate: "2025-02-15", endDate: "2025-04-10" },
  { id: "p5",  name: "E-commerce Platform",        clientId: "c7", client: "PT. Retail Modern",      revenue: 24_500_000, hours: 200, status: "on-hold",   priority: "medium", startDate: "2025-03-01", endDate: "2025-05-30" },
  { id: "p6",  name: "Admin Panel Logistik",       clientId: "c4", client: "PT. Logistik Prima",     revenue: 19_000_000, hours: 155, status: "completed", priority: "medium", startDate: "2025-03-10", endDate: "2025-04-25" },
  { id: "p7",  name: "Sistem LMS Online",          clientId: "c5", client: "Edtech Belajar Pintar",  revenue: 22_000_000, hours: 170, status: "pending",   priority: "high",   startDate: "2025-04-01", endDate: "2025-06-15" },
  { id: "p8",  name: "Company Profile Website",    clientId: "c6", client: "CV. Media Kreatif",      revenue: 12_000_000, hours: 80,  status: "completed", priority: "low",    startDate: "2025-04-05", endDate: "2025-04-30" },
  { id: "p9",  name: "IoT Dashboard Monitoring",   clientId: "c1", client: "PT. Nusantara Digital",  revenue: 21_000_000, hours: 165, status: "pending",   priority: "high",   startDate: "2025-04-15", endDate: "2025-06-30" },
  { id: "p10", name: "Aplikasi Point of Sale",     clientId: "c7", client: "PT. Retail Modern",      revenue: 15_000_000, hours: 120, status: "completed", priority: "medium", startDate: "2025-05-01", endDate: "2025-06-15" },
  { id: "p11", name: "Platform Crowdfunding",      clientId: "c3", client: "Startup Fintech Cepat",  revenue: 38_000_000, hours: 250, status: "on-hold",   priority: "high",   startDate: "2025-05-10", endDate: "2025-08-30" },
  { id: "p12", name: "Sistem Inventory Gudang",    clientId: "c4", client: "PT. Logistik Prima",     revenue: 16_500_000, hours: 130, status: "completed", priority: "medium", startDate: "2025-05-20", endDate: "2025-07-10" },
  { id: "p13", name: "Aplikasi Quiz Interaktif",   clientId: "c5", client: "Edtech Belajar Pintar",  revenue: 14_000_000, hours: 95,  status: "pending",   priority: "low",    startDate: "2025-06-01", endDate: "2025-07-31" },
  { id: "p14", name: "Website Portfolio Agency",   clientId: "c6", client: "CV. Media Kreatif",      revenue: 9_500_000,  hours: 65,  status: "completed", priority: "low",    startDate: "2025-06-10", endDate: "2025-07-05" },
  { id: "p15", name: "Sistem Supply Chain",        clientId: "c8", client: "Startup Agritech Hijau", revenue: 19_000_000, hours: 150, status: "pending",   priority: "medium", startDate: "2025-06-15", endDate: "2025-08-31" },
  { id: "p16", name: "CRM Dashboard Internal",     clientId: "c1", client: "PT. Nusantara Digital",  revenue: 26_000_000, hours: 195, status: "completed", priority: "high",   startDate: "2025-07-01", endDate: "2025-09-15" },
  { id: "p17", name: "Aplikasi Absensi Mobile",    clientId: "c2", client: "CV. Kreasi Muda",        revenue: 13_500_000, hours: 100, status: "pending",   priority: "medium", startDate: "2025-07-10", endDate: "2025-09-30" },
  { id: "p18", name: "Platform Marketplace B2B",   clientId: "c3", client: "Startup Fintech Cepat",  revenue: 45_000_000, hours: 300, status: "on-hold",   priority: "high",   startDate: "2025-07-15", endDate: "2025-11-30" },
  { id: "p19", name: "Monitoring Sensor Tanah",    clientId: "c8", client: "Startup Agritech Hijau", revenue: 11_000_000, hours: 85,  status: "completed", priority: "low",    startDate: "2025-08-01", endDate: "2025-09-10" },
  { id: "p20", name: "Redesign UI Aplikasi Bank",  clientId: "c3", client: "Startup Fintech Cepat",  revenue: 29_000_000, hours: 220, status: "pending",   priority: "high",   startDate: "2025-08-15", endDate: "2025-10-31" },
];

// ─── REVENUE (30 HARI TERAKHIR) ───────────────────────────
// Digunakan untuk Line Chart: Actual vs Target revenue harian
const generateRevenueData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const target = 4_000_000 + Math.floor(Math.random() * 1_500_000);
    // Actual bervariasi ±30% dari target untuk simulasi fluktuasi
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
// Digunakan untuk Radar/PolarArea Chart
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
  { id: "n1", message: "Pembayaran Rp 18jt dari PT. Nusantara diterima",  isRead: false, createdAt: "2025-09-27T09:00:00Z" },
  { id: "n2", message: "Project 'LMS Online' deadline dalam 3 hari",      isRead: false, createdAt: "2025-09-27T11:30:00Z" },
  { id: "n3", message: "Client baru: Startup Agritech Hijau bergabung",   isRead: false, createdAt: "2025-09-28T08:15:00Z" },
  { id: "n4", message: "Revenue bulan ini melampaui target 12%",          isRead: true,  createdAt: "2025-09-28T14:00:00Z" },
];