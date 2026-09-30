import { FaMoneyBill, FaRocket, FaStar } from "react-icons/fa";

export const ACHIEVEMENTS = [
  {
    id: "revenue_100m",
    title: "Revenue 100M+",
    description: "Total revenue melampaui Rp 100 juta",
    icon: <FaMoneyBill size={12} className="text-green-500" />,
  },
  {
    id: "projects_10",
    title: "10 Projects Selesai",
    description: "Berhasil menyelesaikan 10 project",
    icon: <FaRocket size={12} className="text-red-500" />,
  },
  {
    id: "top_client",
    title: "Top Client Gold",
    description: "Satu client berkontribusi lebih dari Rp 50 juta",
    icon: <FaStar size={12} className="text-amber-500" />,
  },
];

export const checkAchievement = (id, state) => {
  switch (id) {
    case "revenue_100m":
      return state.revenue >= 100_000_000;
    case "projects_10":
      return (
        state.projects.filter((p) => p.status === "completed").length >= 10
      );
    case "top_client": {
      const revenueMap = {};
      state.projects
        .filter((p) => p.status === "completed")
        .forEach((p) => {
          revenueMap[p.clientId] = (revenueMap[p.clientId] || 0) + p.revenue;
        });
      return Object.values(revenueMap).some((r) => r >= 50_000_000);
    }
    default:
      return false;
  }
};
