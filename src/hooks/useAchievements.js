import { useCallback, useMemo } from "react";
import useDashboard from "./useDashboard";
import useLocalStorage from "./useLocalStorage";
import { ACHIEVEMENTS, checkAchievement } from "../data/achievements";

function useAchievements() {
  const { state } = useDashboard();

  const [seenIds, setSeenIds] = useLocalStorage("seen-achievements", []);

  // Diturunkan saat render, bukan lewat setState di dalam effect.
  // Setelah di-dismiss, id-nya masuk seenIds lalu `find` lanjut ke
  // achievement berikutnya (bisa null kalau sudah habis).
  const activeAchievement = useMemo(() => {
    if (state.projects.length === 0) return null;

    return (
      ACHIEVEMENTS.find(
        (a) => !seenIds.includes(a.id) && checkAchievement(a.id, state),
      ) ?? null
    );
  }, [state, seenIds]);

  const dismissAchievement = useCallback(() => {
    setSeenIds((prev) => [
      ...prev,
      ...(activeAchievement ? [activeAchievement.id] : []),
    ]);
  }, [activeAchievement, setSeenIds]);

  return { activeAchievement, dismissAchievement };
}

export default useAchievements;
