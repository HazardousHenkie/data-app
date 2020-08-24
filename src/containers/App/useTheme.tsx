import { useState, useEffect } from 'react'

import lightTheme, { darkTheme } from 'styles/themeStyles'

const useTheme = (darkMode: boolean) => {
    const [theme, setTheme] = useState(lightTheme)

    useEffect(() => {
        setTheme(darkMode ? darkTheme : lightTheme)
    }, [darkMode])

    return {
        theme,
        setTheme
    }
}

export default useTheme
