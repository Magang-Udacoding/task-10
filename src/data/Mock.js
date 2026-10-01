// src/data/mockData.js
// Realistic dummy data for the Freelance Developer Dashboard
// All revenue values are in Indonesian Rupiah (IDR)

export const mockClients = [
  { id: "c1", name: "PT. Nusantara Digital",  email: "hello@nusantara.id",   totalProjects: 6, totalRevenue: 87_000_000, status: "active"   },
  { id: "c2", name: "CV. Creative Youth",      email: "info@kreasimuda.com",  totalProjects: 4, totalRevenue: 52_000_000, status: "active"   },
  { id: "c3", name: "Fast Fintech Startup",    email: "dev@fintechcepat.io",  totalProjects: 8, totalRevenue: 134_000_000, status: "active"  },
  { id: "c4", name: "PT. Prima Logistics",     email: "tech@logistik.co.id",  totalProjects: 3, totalRevenue: 38_500_000, status: "onHold" },
  { id: "c5", name: "Smart Learning Edtech",   email: "hi@belajarpintar.id",  totalProjects: 5, totalRevenue: 61_000_000, status: "active"   },
  { id: "c6", name: "CV. Creative Media",      email: "contact@mediakre.com", totalProjects: 2, totalRevenue: 24_000_000, status: "onHold" },
  { id: "c7", name: "PT. Modern Retail",       email: "it@retailmodern.id",   totalProjects: 4, totalRevenue: 49_500_000, status: "active"   },
  { id: "c8", name: "Green Agritech Startup",  email: "tech@agrihijau.id",    totalProjects: 3, totalRevenue: 33_000_000, status: "active"   },

  // ===== 30 Perusahaan Tambahan =====
  { id: "c9",  name: "PT. Bank Digital Nusantara",     email: "it@bankdigitalnusantara.co.id", totalProjects: 7, totalRevenue: 156_000_000, status: "active"   },
  { id: "c10", name: "CV. Kopi Kreatif Indonesia",     email: "hello@kopikreatif.id",          totalProjects: 2, totalRevenue: 18_500_000,  status: "active"   },
  { id: "c11", name: "PT. Telekomunikasi Cerdas",      email: "dev@telkomcerdas.co.id",        totalProjects: 9, totalRevenue: 198_000_000, status: "active"   },
  { id: "c12", name: "Startup HealthTech Sehatku",     email: "tech@sehatku.io",               totalProjects: 5, totalRevenue: 72_000_000,  status: "active"   },
  { id: "c13", name: "PT. Properti Maju Bersama",      email: "digital@propertimaju.id",       totalProjects: 3, totalRevenue: 41_000_000,  status: "onHold" },
  { id: "c14", name: "CV. Fashion Lokal Kita",         email: "admin@fashionlokal.id",         totalProjects: 4, totalRevenue: 35_500_000,  status: "active"   },
  { id: "c15", name: "PT. Energi Terbarukan",          email: "it@energiterbarukan.co.id",     totalProjects: 6, totalRevenue: 112_000_000, status: "active"   },
  { id: "c16", name: "Startup FoodTech RasaNusantara", email: "dev@rasanusantara.io",          totalProjects: 5, totalRevenue: 68_000_000,  status: "active"   },
  { id: "c17", name: "PT. Asuransi Aman Selalu",       email: "tech@amanselalu.co.id",         totalProjects: 4, totalRevenue: 89_000_000,  status: "active"   },
  { id: "c18", name: "CV. Wisata Bahari",              email: "info@wisatabahari.com",         totalProjects: 2, totalRevenue: 22_000_000,  status: "onHold" },
  { id: "c19", name: "PT. Manufaktur Presisi",         email: "digital@manufakturpresisi.id",  totalProjects: 5, totalRevenue: 97_500_000,  status: "active"   },
  { id: "c20", name: "Startup LegalTech Hukumku",      email: "hello@hukumku.id",              totalProjects: 3, totalRevenue: 45_000_000,  status: "active"   },
  { id: "c21", name: "PT. Otomotif Elektrik",          email: "it@otoelektrik.co.id",          totalProjects: 7, totalRevenue: 145_000_000, status: "active"   },
  { id: "c22", name: "CV. Percetakan Digital",         email: "cs@cetakdigital.id",            totalProjects: 2, totalRevenue: 15_500_000,  status: "onHold" },
  { id: "c23", name: "PT. Media Penyiaran Nusantara",  email: "tech@medianusantara.tv",        totalProjects: 6, totalRevenue: 103_000_000, status: "active"   },
  { id: "c24", name: "Startup Peternakan Pintar",      email: "dev@ternakpintar.io",           totalProjects: 4, totalRevenue: 48_000_000,  status: "active"   },
  { id: "c25", name: "PT. Konstruksi Bangun Negeri",   email: "digital@bangunnegeri.co.id",    totalProjects: 3, totalRevenue: 62_000_000,  status: "active"   },
  { id: "c26", name: "CV. Katering Sehat Bugar",       email: "order@sehatbugar.id",           totalProjects: 2, totalRevenue: 19_000_000,  status: "onHold" },
  { id: "c27", name: "PT. Keuangan Mikro Sejahtera",   email: "it@keuanganmikro.co.id",        totalProjects: 8, totalRevenue: 178_000_000, status: "active"   },
  { id: "c28", name: "Startup EduGames Cerdas",        email: "hello@edugames.id",             totalProjects: 5, totalRevenue: 58_000_000,  status: "active"   },
  { id: "c29", name: "PT. Farmasi Sehat Sentosa",      email: "tech@farmasisehat.co.id",       totalProjects: 4, totalRevenue: 76_500_000,  status: "active"   },
  { id: "c30", name: "CV. Dekorasi Rumah Indah",       email: "info@rumahindah.com",           totalProjects: 2, totalRevenue: 16_000_000,  status: "onHold" },
  { id: "c31", name: "PT. Perhotelan Bintang Lima",    email: "digital@bintanglima.co.id",     totalProjects: 6, totalRevenue: 94_000_000,  status: "active"   },
  { id: "c32", name: "Startup Marketplace Kerajinan",  email: "dev@kerajinanku.id",            totalProjects: 4, totalRevenue: 53_000_000,  status: "active"   },
  { id: "c33", name: "PT. Pertambangan Modern",        email: "it@tambangmodern.co.id",        totalProjects: 3, totalRevenue: 88_000_000,  status: "active"   },
  { id: "c34", name: "CV. Laundry Kilat",              email: "cs@laundrykilat.id",            totalProjects: 2, totalRevenue: 12_500_000,  status: "onHold" },
  { id: "c35", name: "PT. Perkapalan Samudra",         email: "tech@samudra.co.id",            totalProjects: 5, totalRevenue: 81_000_000,  status: "active"   },
  { id: "c36", name: "Startup Musik Nusantara",        email: "hello@musiknusantara.io",       totalProjects: 3, totalRevenue: 37_000_000,  status: "active"   },
  { id: "c37", name: "PT. Tekstil Adi Busana",         email: "digital@adibusana.co.id",       totalProjects: 4, totalRevenue: 69_000_000,  status: "active"   },
  { id: "c38", name: "CV. Fotografi Momen Indah",      email: "info@momenindah.com",           totalProjects: 2, totalRevenue: 21_000_000,  status: "onHold" },

  // ===== 5 Perusahaan Tambahan =====
  { id: "c39", name: "PT. Logistik Antar Nusa",        email: "it@logistikantarnusa.co.id",    totalProjects: 5, totalRevenue: 83_500_000,  status: "active"   },
  { id: "c40", name: "Startup FinPay Indonesia",       email: "dev@finpay.id",                 totalProjects: 6, totalRevenue: 128_000_000, status: "active"   },
  { id: "c41", name: "CV. Batik Warisan Nusantara",    email: "hello@batikwarisan.id",         totalProjects: 3, totalRevenue: 27_500_000,  status: "active"   },
  { id: "c42", name: "PT. Solusi Cloud Indonesia",     email: "tech@solusicloud.co.id",        totalProjects: 7, totalRevenue: 165_000_000, status: "active"   },
  { id: "c43", name: "Startup Tanaman Hidroponik",     email: "info@hidroponik.id",            totalProjects: 2, totalRevenue: 17_500_000,  status: "onHold" },
];

export const mockProjects = [
  { id: "p1",  name: "Dashboard Analytics v2",       clientId: "c1", client: "PT. Nusantara Digital",     revenue: 18_000_000, hours: 145, status: "completed", priority: "high",   startDate: "2025-01-05", endDate: "2025-02-28" },
  { id: "p2",  name: "Mobile App React Native",      clientId: "c3", client: "Fast Fintech Startup",      revenue: 32_000_000, hours: 210, status: "completed", priority: "high",   startDate: "2025-01-10", endDate: "2025-03-15" },
  { id: "p3",  name: "Landing Page Redesign",        clientId: "c2", client: "CV. Creative Youth",        revenue: 8_500_000,  hours: 60,  status: "completed", priority: "low",    startDate: "2025-02-01", endDate: "2025-02-20" },
  { id: "p4",  name: "REST API Payment Gateway",     clientId: "c3", client: "Fast Fintech Startup",      revenue: 27_000_000, hours: 180, status: "completed", priority: "high",   startDate: "2025-02-15", endDate: "2025-04-10" },
  { id: "p5",  name: "E-commerce Platform",          clientId: "c7", client: "PT. Modern Retail",         revenue: 24_500_000, hours: 200, status: "completed", priority: "medium", startDate: "2025-03-01", endDate: "2025-05-30" },
  { id: "p6",  name: "Logistics Admin Panel",        clientId: "c4", client: "PT. Prima Logistics",       revenue: 19_000_000, hours: 155, status: "completed", priority: "medium", startDate: "2025-03-10", endDate: "2025-04-25" },
  { id: "p7",  name: "Online LMS System",            clientId: "c5", client: "Smart Learning Edtech",     revenue: 22_000_000, hours: 170, status: "completed", priority: "high",   startDate: "2025-04-01", endDate: "2025-06-15" },
  { id: "p8",  name: "Company Profile Website",      clientId: "c6", client: "CV. Creative Media",        revenue: 12_000_000, hours: 80,  status: "completed", priority: "low",    startDate: "2025-04-05", endDate: "2025-04-30" },
  { id: "p9",  name: "IoT Dashboard Monitoring",     clientId: "c1", client: "PT. Nusantara Digital",     revenue: 21_000_000, hours: 165, status: "completed", priority: "high",   startDate: "2025-04-15", endDate: "2025-06-30" },
  { id: "p10", name: "Point of Sale Application",    clientId: "c7", client: "PT. Modern Retail",         revenue: 15_000_000, hours: 120, status: "completed", priority: "medium", startDate: "2025-05-01", endDate: "2025-06-15" },
  { id: "p11", name: "Platform Crowdfunding",        clientId: "c3", client: "Fast Fintech Startup",      revenue: 38_000_000, hours: 250, status: "completed", priority: "high",   startDate: "2025-05-10", endDate: "2025-08-30" },
  { id: "p12", name: "Warehouse Inventory System",   clientId: "c4", client: "PT. Prima Logistics",       revenue: 16_500_000, hours: 130, status: "completed", priority: "medium", startDate: "2025-05-20", endDate: "2025-07-10" },
  { id: "p13", name: "Interactive Quiz App",         clientId: "c5", client: "Smart Learning Edtech",     revenue: 14_000_000, hours: 95,  status: "completed", priority: "low",    startDate: "2025-06-01", endDate: "2025-07-31" },
  { id: "p14", name: "Website Portfolio Agency",     clientId: "c6", client: "CV. Creative Media",        revenue: 9_500_000,  hours: 65,  status: "completed", priority: "low",    startDate: "2025-06-10", endDate: "2025-07-05" },
  { id: "p15", name: "Supply Chain System",          clientId: "c8", client: "Green Agritech Startup",    revenue: 19_000_000, hours: 150, status: "completed", priority: "medium", startDate: "2025-06-15", endDate: "2025-08-31" },
  { id: "p16", name: "Internal CRM Dashboard",       clientId: "c1", client: "PT. Nusantara Digital",     revenue: 26_000_000, hours: 195, status: "completed", priority: "high",   startDate: "2025-07-01", endDate: "2025-09-15" },
  { id: "p17", name: "Mobile Attendance App",        clientId: "c2", client: "CV. Creative Youth",        revenue: 13_500_000, hours: 100, status: "completed", priority: "medium", startDate: "2025-07-10", endDate: "2025-09-30" },
  { id: "p18", name: "Platform Marketplace B2B",     clientId: "c3", client: "Fast Fintech Startup",      revenue: 45_000_000, hours: 300, status: "completed", priority: "high",   startDate: "2025-07-15", endDate: "2025-11-30" },
  { id: "p19", name: "Soil Sensor Monitoring",       clientId: "c8", client: "Green Agritech Startup",    revenue: 11_000_000, hours: 85,  status: "completed", priority: "low",    startDate: "2025-08-01", endDate: "2025-09-10" },
  { id: "p20", name: "Banking App UI Redesign",      clientId: "c3", client: "Fast Fintech Startup",      revenue: 29_000_000, hours: 220, status: "completed", priority: "high",   startDate: "2025-08-15", endDate: "2025-10-31" },

  // ===== Proyek untuk 30 Klien Tambahan (c9 – c38) =====
  { id: "p21", name: "Mobile Banking App",           clientId: "c9",  client: "PT. Bank Digital Nusantara",     revenue: 42_000_000, hours: 280, status: "completed", priority: "high",   startDate: "2025-01-15", endDate: "2025-04-20" },
  { id: "p22", name: "Website E-Commerce Kopi",      clientId: "c10", client: "CV. Kopi Kreatif Indonesia",     revenue: 14_000_000, hours: 95,  status: "completed", priority: "medium", startDate: "2025-02-05", endDate: "2025-03-20" },
  { id: "p23", name: "Dashboard Monitoring Jaringan", clientId: "c11", client: "PT. Telekomunikasi Cerdas",     revenue: 38_000_000, hours: 245, status: "completed", priority: "high",   startDate: "2025-01-20", endDate: "2025-04-15" },
  { id: "p24", name: "Aplikasi Telemedicine",        clientId: "c12", client: "Startup HealthTech Sehatku",     revenue: 31_000_000, hours: 215, status: "completed", priority: "high",   startDate: "2025-05-01", endDate: "2025-07-31" },
  { id: "p25", name: "Portal Listing Properti",      clientId: "c13", client: "PT. Properti Maju Bersama",      revenue: 18_000_000, hours: 140, status: "completed", priority: "medium", startDate: "2025-03-15", endDate: "2025-05-30" },
  { id: "p26", name: "Website Fashion Store",        clientId: "c14", client: "CV. Fashion Lokal Kita",         revenue: 16_500_000, hours: 110, status: "completed", priority: "medium", startDate: "2025-02-10", endDate: "2025-03-25" },
  { id: "p27", name: "IoT Solar Panel Dashboard",    clientId: "c15", client: "PT. Energi Terbarukan",          revenue: 29_000_000, hours: 195, status: "completed", priority: "high",   startDate: "2025-01-25", endDate: "2025-04-10" },
  { id: "p28", name: "Aplikasi Food Delivery",       clientId: "c16", client: "Startup FoodTech RasaNusantara", revenue: 34_000_000, hours: 240, status: "completed", priority: "high",   startDate: "2025-06-01", endDate: "2025-08-31" },
  { id: "p29", name: "Sistem Klaim Asuransi",        clientId: "c17", client: "PT. Asuransi Aman Selalu",       revenue: 26_000_000, hours: 175, status: "completed", priority: "high",   startDate: "2025-03-01", endDate: "2025-05-15" },
  { id: "p30", name: "Website Booking Wisata",       clientId: "c18", client: "CV. Wisata Bahari",              revenue: 12_000_000, hours: 85,  status: "completed", priority: "low",    startDate: "2025-02-20", endDate: "2025-04-05" },
  { id: "p31", name: "MES Manufacturing System",     clientId: "c19", client: "PT. Manufaktur Presisi",         revenue: 36_000_000, hours: 230, status: "completed", priority: "high",   startDate: "2025-04-01", endDate: "2025-06-30" },
  { id: "p32", name: "Platform Konsultasi Hukum",    clientId: "c20", client: "Startup LegalTech Hukumku",      revenue: 21_000_000, hours: 155, status: "completed", priority: "medium", startDate: "2025-05-15", endDate: "2025-07-31" },
  { id: "p33", name: "Aplikasi Booking Service EV",  clientId: "c21", client: "PT. Otomotif Elektrik",          revenue: 39_000_000, hours: 255, status: "completed", priority: "high",   startDate: "2025-01-10", endDate: "2025-04-05" },
  { id: "p34", name: "Sistem Order Cetak Online",    clientId: "c22", client: "CV. Percetakan Digital",         revenue: 11_000_000, hours: 75,  status: "completed", priority: "low",    startDate: "2025-03-05", endDate: "2025-04-15" },
  { id: "p35", name: "CMS Portal Berita",            clientId: "c23", client: "PT. Media Penyiaran Nusantara",  revenue: 28_000_000, hours: 185, status: "completed", priority: "medium", startDate: "2025-02-01", endDate: "2025-04-25" },
  { id: "p36", name: "Monitoring Ternak IoT",        clientId: "c24", client: "Startup Peternakan Pintar",      revenue: 19_000_000, hours: 145, status: "completed", priority: "medium", startDate: "2025-06-10", endDate: "2025-08-20" },
  { id: "p37", name: "ERP Konstruksi",               clientId: "c25", client: "PT. Konstruksi Bangun Negeri",   revenue: 27_000_000, hours: 190, status: "completed", priority: "high",   startDate: "2025-03-20", endDate: "2025-06-10" },
  { id: "p38", name: "Website Katering Online",      clientId: "c26", client: "CV. Katering Sehat Bugar",       revenue: 10_500_000, hours: 70,  status: "completed", priority: "low",    startDate: "2025-04-10", endDate: "2025-05-15" },
  { id: "p39", name: "Core Banking System",          clientId: "c27", client: "PT. Keuangan Mikro Sejahtera",   revenue: 48_000_000, hours: 320, status: "completed", priority: "high",   startDate: "2025-01-05", endDate: "2025-05-20" },
  { id: "p40", name: "Game Edukasi Interaktif",      clientId: "c28", client: "Startup EduGames Cerdas",        revenue: 22_000_000, hours: 165, status: "completed", priority: "medium", startDate: "2025-07-01", endDate: "2025-09-15" },
  { id: "p41", name: "Sistem Distribusi Farmasi",    clientId: "c29", client: "PT. Farmasi Sehat Sentosa",      revenue: 25_000_000, hours: 170, status: "completed", priority: "high",   startDate: "2025-02-15", endDate: "2025-05-01" },
  { id: "p42", name: "Website Dekorasi Interior",    clientId: "c30", client: "CV. Dekorasi Rumah Indah",       revenue: 9_000_000,  hours: 60,  status: "completed", priority: "low",    startDate: "2025-04-20", endDate: "2025-05-25" },
  { id: "p43", name: "Sistem Reservasi Hotel",       clientId: "c31", client: "PT. Perhotelan Bintang Lima",    revenue: 30_000_000, hours: 205, status: "completed", priority: "high",   startDate: "2025-03-01", endDate: "2025-05-30" },
  { id: "p44", name: "Marketplace Kerajinan",        clientId: "c32", client: "Startup Marketplace Kerajinan",  revenue: 20_000_000, hours: 150, status: "completed", priority: "medium", startDate: "2025-06-15", endDate: "2025-08-31" },
  { id: "p45", name: "Dashboard Tambang Realtime",   clientId: "c33", client: "PT. Pertambangan Modern",        revenue: 33_000_000, hours: 220, status: "completed", priority: "high",   startDate: "2025-01-20", endDate: "2025-04-30" },
  { id: "p46", name: "Aplikasi Order Laundry",       clientId: "c34", client: "CV. Laundry Kilat",              revenue: 8_500_000,  hours: 55,  status: "completed", priority: "low",    startDate: "2025-04-01", endDate: "2025-05-05" },
  { id: "p47", name: "Sistem Manajemen Kapal",       clientId: "c35", client: "PT. Perkapalan Samudra",         revenue: 24_000_000, hours: 165, status: "completed", priority: "medium", startDate: "2025-02-25", endDate: "2025-05-10" },
  { id: "p48", name: "Platform Streaming Musik",     clientId: "c36", client: "Startup Musik Nusantara",        revenue: 17_000_000, hours: 130, status: "completed", priority: "medium", startDate: "2025-06-20", endDate: "2025-08-25" },
  { id: "p49", name: "ERP Tekstil",                  clientId: "c37", client: "PT. Tekstil Adi Busana",         revenue: 23_000_000, hours: 160, status: "completed", priority: "high",   startDate: "2025-03-10", endDate: "2025-05-25" },
  { id: "p50", name: "Website Portofolio Foto",      clientId: "c38", client: "CV. Fotografi Momen Indah",      revenue: 10_000_000, hours: 65,  status: "completed", priority: "low",    startDate: "2025-04-15", endDate: "2025-05-20" },

  // ===== 5 Proyek Tambahan untuk Klien Baru (c39 – c43) =====
  { id: "p51", name: "Sistem Tracking Pengiriman",   clientId: "c39", client: "PT. Logistik Antar Nusa",     revenue: 26_000_000, hours: 185, status: "completed", priority: "high",   startDate: "2025-02-01", endDate: "2025-04-30" },
  { id: "p52", name: "Aplikasi Dompet Digital",      clientId: "c40", client: "Startup FinPay Indonesia",    revenue: 35_000_000, hours: 250, status: "completed", priority: "high",   startDate: "2025-07-01", endDate: "2025-09-30" },
  { id: "p53", name: "E-Commerce Batik Online",      clientId: "c41", client: "CV. Batik Warisan Nusantara", revenue: 15_000_000, hours: 100, status: "completed", priority: "medium", startDate: "2025-03-15", endDate: "2025-05-10" },
  { id: "p54", name: "Platform Cloud Management",    clientId: "c42", client: "PT. Solusi Cloud Indonesia",  revenue: 41_000_000, hours: 270, status: "completed", priority: "high",   startDate: "2025-05-01", endDate: "2025-08-15" },
  { id: "p55", name: "IoT Monitoring Hidroponik",    clientId: "c43", client: "Startup Tanaman Hidroponik",  revenue: 13_500_000, hours: 90,  status: "pending",   priority: "medium", startDate: "2025-06-01", endDate: "2025-07-31" },
];

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

// Used by the Radar/PolarArea Chart
export const mockSkills = [
  { skill: "React",        level: 92 },
  { skill: "TypeScript",   level: 85 },
  { skill: "Node.js",      level: 78 },
  { skill: "UI/UX Design", level: 70 },
  { skill: "PostgreSQL",   level: 75 },
  { skill: "Docker",       level: 65 },
];

export const mockNotifications = [
  { id: "n1", message: "Payment of Rp 18M from PT. Nusantara received",   isRead: false, createdAt: "2025-09-27T09:00:00Z" },
  { id: "n2", message: "Project 'Online LMS System' is due in 3 days",    isRead: false, createdAt: "2025-09-27T11:30:00Z" },
  { id: "n3", message: "New client: Green Agritech Startup has joined",   isRead: false, createdAt: "2025-09-28T08:15:00Z" },
  { id: "n4", message: "This month's revenue exceeded the target by 12%", isRead: true,  createdAt: "2025-09-28T14:00:00Z" },
];