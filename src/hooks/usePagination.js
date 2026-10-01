/* eslint-disable react-hooks/set-state-in-effect */
import { useMemo, useState, useEffect } from "react";

function usePagination(data, itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPage = Math.max(
        1,
        Math.ceil(data.length / itemsPerPage)
    )
    
    useEffect(() => {
        setCurrentPage(1);
    }, [data.length])
    
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        
        return data.slice(startIndex, endIndex)
    }, [data, currentPage, itemsPerPage])

    const nextPage = () => {
        setCurrentPage((page) => Math.min(page +1, totalPage))
    }

    const prevPage = () => {
        setCurrentPage((page) => Math.max(page -1, 1))
    }

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPage))
    }

    return {
        currentData, currentPage, totalPage, 
        nextPage, prevPage, goToPage
    }
}

export default usePagination