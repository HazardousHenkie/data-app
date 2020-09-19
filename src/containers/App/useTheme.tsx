import { useState, useEffect } from 'react'

import lightTheme, { darkTheme } from 'styles/themeStyles'
import usePrefersDarkMode from './usePrefersDarkMode'

const useTheme = () => {
    const { darkMode } = usePrefersDarkMode()
    const [theme, setTheme] = useState(lightTheme)

    useEffect(() => {
        setTheme(darkMode ? darkTheme : lightTheme)
    }, [darkMode])

    return {
        theme
    }
}

export default useTheme
