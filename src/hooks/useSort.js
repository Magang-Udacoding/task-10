import { useMemo, useState } from "react";

function useSort(data, initialKey = null, initialDirection = 'asc') {
    const [sortKey, setSortKey] = useState(initialKey)
    const [sortDirection, setSortDirection] = useState(initialDirection)

    const sortedData = useMemo(() => {
        if (!sortKey) {
            return data
        }

        return [...data].sort((a, b) => {
            const valA = a[sortKey]
            const valB = b[sortKey]

            if (valA === valB) {
                return 0
            }
            if (valA === null || valA === undefined) {
                return 1
            }

            if (valB === null || valB === undefined) {
                return -1
            }

            const comparison = 
            typeof valA === 'string' &&
            typeof valB === 'string'
            ? valA.localeCompare(valB)
            : valA > valB
                ? 1
                : -1
            
            return sortDirection === 'asc'
                ? comparison
                : -comparison
        })
    }, [data, sortKey, sortDirection])

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDirection((direction) => direction === 'asc' 
                ? 'desc'
                : 'asc'
            )
            return
        }
        setSortKey(key)
        setSortDirection('asc')
    }

    return {
        sortedData, sortKey,
        sortDirection, handleSort
    }
}

export default useSort