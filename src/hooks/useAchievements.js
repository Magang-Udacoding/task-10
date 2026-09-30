import { useEffect, useState } from "react";
import useDashboard from "./useDashboard";
import useLocalStorage from "./useLocalStorage";
import { ACHIEVEMENTS, checkAchievment } from "../data/achievements";

function useAchievements() {
    const {state} = useDashboard()

    const [seenIds, setSeenIds] = useLocalStorage('seen-achievements', [])
    
    const [activeAchievement, setActiveAchievement] = useState(null)

    useEffect(() => {
        if (state.projects.length === 0) return 

        // check all achievements, search newly unlocekd and not seen
        const newUnlocked = ACHIEVEMENTS.find(
            (a) => !seenIds.includes(a.id) && checkAchievment(a.id, state)
        )

        if (newUnlocked && !activeAchievement) {
            setActiveAchievement(newUnlocked)
        }
    }, [state.revenue, state.projects, seenIds, activeAchievement])

    // called when user dismiss or auto-dismiss
    const dismissAchievement = () => {
        if (activeAchievement) {
            setSeenIds((prev) => [...prev, activeAchievement.id])
            setActiveAchievement(null)
        }
    }
    return {activeAchievement, dismissAchievement}  
}

export default useAchievements