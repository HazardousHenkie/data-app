import { createContext } from 'react'

interface ThemeContextInterface {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextInterface>({
    darkMode: false,
    setDarkMode: (): void => {}
})

export default ThemeContext
