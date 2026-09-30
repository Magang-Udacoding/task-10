import { useEffect, useRef } from "react";
import useDashboard from "./useDashboard";

function useRevenueSync(interval = 30_000) {
    const { state, dispatch } = useDashboard()

    // Disimpan di ref supaya interval tidak di-reset tiap projects berubah
    const projectsRef = useRef(state.projects)

    useEffect(() => {
        projectsRef.current = state.projects
    }, [state.projects])

    useEffect(() => {
        const syncRevenue = () => {
            const projects = projectsRef.current

            const updatedRevenue = projects
                .filter((p) => p.status === 'completed')
                .reduce((sum, p) => {
                    const fluctuation = 1 + (Math.random() - 0.5) * 0.1
                    return sum + Math.floor(p.revenue * fluctuation)
                }, 0)

            dispatch({
                type: 'SET_REVENUE',
                payload: updatedRevenue
            })

            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                    id: `rev-${Date.now()}`,
                    message: `Revenue Updated: Rp${(updatedRevenue / 1_000_000).toFixed(1)}M`,
                    isRead: false,
                    createdAt: new Date().toISOString()
                }
            })
        }

        const intervalId = setInterval(syncRevenue, interval)

        return () => clearInterval(intervalId)
    }, [dispatch, interval])
}

export default useRevenueSync
