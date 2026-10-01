import { useMemo, useState } from "react";

function useSort(data, initialKey = null, initialDirection = 'asc') {
    // Array of { key, direction }
    const [sortConfig, setSortConfig] = useState(
        initialKey ? [{ key: initialKey, direction: initialDirection }] : []
    );

    const sortedData = useMemo(() => {
        if (sortConfig.length === 0) {
            return data;
        }

        return [...data].sort((a, b) => {
            for (let i = 0; i < sortConfig.length; i++) {
                const { key, direction } = sortConfig[i];
                const valA = a[key];
                const valB = b[key];

                if (valA === valB) continue;

                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;

                const comparison =
                    typeof valA === 'string' && typeof valB === 'string'
                        ? valA.localeCompare(valB)
                        : valA > valB ? 1 : -1;

                return direction === 'asc' ? comparison : -comparison;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const handleSort = (key, multi = false) => {
        setSortConfig((prevConfig) => {
            const existingIndex = prevConfig.findIndex((item) => item.key === key);
            let newConfig = [...prevConfig];

            if (existingIndex >= 0) {
                const existing = newConfig[existingIndex];
                if (existing.direction === 'asc') {
                    newConfig[existingIndex] = { ...existing, direction: 'desc' };
                } else {
                    newConfig.splice(existingIndex, 1);
                }
            } else {
                if (multi) {
                    newConfig.push({ key, direction: 'asc' });
                } else {
                    newConfig = [{ key, direction: 'asc' }];
                }
            }
            return newConfig;
        });
    };

    return {
        sortedData,
        sortConfig,
        handleSort
    };
}

export default useSort