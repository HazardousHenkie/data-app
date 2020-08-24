import { useState, useEffect } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkmode') === 'true'
    )

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        if (!localStorage.getItem('darkmode')) {
            setDarkMode(prefersDarkMode)
        }
    }, [prefersDarkMode, setDarkMode])

    return { darkMode, setDarkMode }
}

export default useDarkMode
