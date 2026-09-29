import { useContext } from "react";
import DashboardContext from "../context/DashboardContext";

function useDashboard() {
    return useContext(DashboardContext)
}

export default useDashboard