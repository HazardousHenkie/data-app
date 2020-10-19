import { useState, useEffect } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'

const usePrefersDarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkmode') === 'true'
    )
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        if (localStorage.getItem('darkmode') !== 'true') {
            setDarkMode(prefersDarkMode)
        }
    }, [prefersDarkMode])

    return {
        darkMode,
        setDarkMode
    }
}

export default usePrefersDarkMode
