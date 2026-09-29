import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key)

            if (storedValue !== null) {
                return JSON.parse(storedValue)
            }
            return initialValue
        } catch (error) {
            console.warn(`useLocalStorage: failed to read key "${key}".`, error)
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue]
}

export default useLocalStorage