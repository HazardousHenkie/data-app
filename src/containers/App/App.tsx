import React, { useState, useEffect } from 'react'

import lightTheme, { darkTheme } from 'styles/themeStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from 'styles/index'

import ThemeContext from 'components/Atoms/ThemeSwitcher/ThemeContext'
import { ThemeProvider } from 'styled-components'

import {
    ThemeProvider as MuiThemeProvider,
    StylesProvider
} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { useTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'

import Routes from './routes'

const App: React.FC = () => {
    const { t } = useTranslation('app')
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkmode') === 'true'
    )
    const [theme, setTheme] = useState(lightTheme)

    useEffect(() => {
        if (!localStorage.getItem('darkmode')) {
            setDarkMode(prefersDarkMode)
        }
    }, [prefersDarkMode])

    useEffect(() => {
        setTheme(darkMode ? darkTheme : lightTheme)
    }, [darkMode])

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <CssBaseline />
                    <div className="App">
                        <Helmet
                            titleTemplate={t(
                                'app:titleTemplate',
                                '%s - Data app'
                            )}
                            defaultTitle={t(
                                'app:defaultTitle',
                                'data app example'
                            )}
                        >
                            <meta
                                name="description"
                                content={t(
                                    'app:descriptionTitle',
                                    'A data app example'
                                )}
                            />
                        </Helmet>
                        <ThemeContext.Provider
                            value={{ darkMode, setDarkMode }}
                        >
                            <Routes />
                        </ThemeContext.Provider>
                    </div>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    )
}

export default React.memo(App)
