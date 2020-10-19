import React, { useContext } from 'react'

import Switch from '@material-ui/core/Switch'
import ThemeContext from './ThemeContext'

const ThemeSwitcher: React.FC = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext)

    const handleChange = () => {
        localStorage.setItem('darkmode', String(!darkMode))
        setDarkMode(!darkMode)
    }

    return (
        <Switch
            data-testid="ThemeSwitcher"
            checked={darkMode}
            onChange={handleChange}
            color="default"
            inputProps={{ 'aria-label': 'Theme switcher' }}
        />
    )
}

export default ThemeSwitcher
