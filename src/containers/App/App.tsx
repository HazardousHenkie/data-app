import React, { useState, useEffect } from 'react'

import lightTheme, { darkTheme } from 'styles/themeStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from 'styles/index'

import { useDispatch, useSelector } from 'react-redux'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'

import ThemeContext from 'components/Atoms/ThemeSwitcher/ThemeContext'
import { ThemeProvider } from 'styled-components'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'

import {
    ThemeProvider as MuiThemeProvider,
    StylesProvider
} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { useTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'

import { createSelector } from 'reselect'
import { makeSelectError } from 'globals/authentication/selectors'
import Routes from './routes'

const stateSelector = createSelector(makeSelectError(), error => ({
    error
}))

const App: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('app')
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkmode') === 'true'
    )
    const [theme, setTheme] = useState(lightTheme)
    const [open, setOpen] = useState<boolean>(false)
    const { error } = useSelector(stateSelector)

    useEffect(() => {
        if (error) {
            setOpen(true)
        }
    }, [error])

    useEffect(() => {
        if (
            localStorage.getItem('userId') &&
            localStorage.getItem('userId') !== null
        ) {
            dispatch(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        }
    }, [dispatch])

    useEffect(() => {
        if (!localStorage.getItem('darkmode')) {
            setDarkMode(prefersDarkMode)
        }
    }, [prefersDarkMode])

    useEffect(() => {
        setTheme(darkMode ? darkTheme : lightTheme)
    }, [darkMode])

    const handleClose = () => {
        setOpen(false)
    }

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
                        {error && (
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}
                                onClose={handleClose}
                            >
                                <InfoMessage
                                    message={error.toString()}
                                    severity="error"
                                />
                            </Snackbar>
                        )}
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
