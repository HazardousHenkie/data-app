import { useState, useEffect } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'

// test this one by checking if setDarkMode is called?
// https://medium.com/@juliuskoronci/react-useeffect-real-world-example-with-tests-a76cc6fae611
const usePrefersDarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkmode') === 'true'
    )
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        if (!localStorage.getItem('darkmode')) {
            setDarkMode(prefersDarkMode)
        }
    }, [prefersDarkMode])

    return {
        darkMode,
        setDarkMode
    }
}

export default usePrefersDarkMode
