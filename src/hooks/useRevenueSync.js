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
        let intervalId;
        let ws;

        const syncRevenue = (isFromWs = false, payloadData = null) => {
            const projects = projectsRef.current;
            let updatedRevenue = 0;

            if (isFromWs && payloadData) {
                updatedRevenue = payloadData.revenue;
            } else {
                updatedRevenue = projects
                    .filter((p) => p.status === 'completed')
                    .reduce((sum, p) => {
                        const fluctuation = 1 + (Math.random() - 0.5) * 0.1;
                        return sum + Math.floor(p.revenue * fluctuation);
                    }, 0);
            }

            dispatch({
                type: 'SET_REVENUE',
                payload: updatedRevenue
            });

            dispatch({
                type: 'PUSH_REVENUE_POINT',
                payload: {
                    date: new Date().toISOString().slice(0, 10),
                    actual: updatedRevenue,
                }
            });
        };

        const setupWebSocket = () => {
            try {
                // Dummy WebSocket URL for architecture requirement
                ws = new WebSocket("wss://dummy.websocket.url/revenue");
                
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    syncRevenue(true, data);
                };

                ws.onerror = () => {
                    console.warn("WebSocket error, falling back to polling");
                    if (!intervalId) intervalId = setInterval(() => syncRevenue(false), interval);
                };

                ws.onclose = () => {
                    if (!intervalId) intervalId = setInterval(() => syncRevenue(false), interval);
                };
            } catch (error) {
                console.warn("WebSocket setup failed, falling back to polling");
                if (!intervalId) intervalId = setInterval(() => syncRevenue(false), interval);
            }
        };

        // Try WebSocket first
        setupWebSocket();

        return () => {
            if (ws) ws.close();
            if (intervalId) clearInterval(intervalId);
        };
    }, [dispatch, interval]);
}

export default useRevenueSync
