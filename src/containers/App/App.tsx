import React, { useEffect } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from 'styles/index'

import { useDispatch, useSelector } from 'react-redux'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'

import ThemeContext from 'components/Atoms/ThemeSwitcher/ThemeContext'
import { ThemeProvider } from 'styled-components'

import {
    ThemeProvider as MuiThemeProvider,
    StylesProvider
} from '@material-ui/styles'

import { useTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'

import { createSelector } from 'reselect'
import { makeSelectLoggedIn } from 'globals/authentication/selectors'
import { getFavoritedCountries } from 'globals/favoritedCountriesList/actions'

import ErrorSnackbars from 'containers/HomePage/Organisms/Errors'

import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

import useDarkMode from './useDarkMode'
import useTheme from './useTheme'

const stateSelector = createSelector(makeSelectLoggedIn(), loggedIn => ({
    loggedIn
}))

const App: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('app')

    const { loggedIn } = useSelector(stateSelector)

    const { darkMode, setDarkMode } = useDarkMode()

    const { theme } = useTheme(darkMode)

    useEffect(() => {
        if (loggedIn) {
            dispatch(getFavoritedCountries())
        }
    }, [loggedIn, dispatch])

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

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <CssBaseline />
                    <div
                        data-testid="app"
                        className={`App ${darkMode ? 'darkmode' : ''}`}
                    >
                        <Helmet
                            titleTemplate={t(
                                'app:titleTemplate',
                                '%s - Data app'
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
                            <Router>
                                <ErrorSnackbars />

                                <Routes />
                            </Router>
                        </ThemeContext.Provider>
                    </div>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    )
}

export default React.memo(App)
