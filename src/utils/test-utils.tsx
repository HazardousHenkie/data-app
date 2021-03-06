import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import lightTheme from 'styles/themeStyles'
import ThemeContext from 'components/Atoms/ThemeSwitcher/ThemeContext'

import { BrowserRouter as Router } from 'react-router-dom'

import { I18nextProvider } from 'react-i18next'

import i18n from 'utils/i18nTesting'
import configureStore from 'store/configureStore'

const customRender = (
    ui: React.ReactElement,
    {
        initialState = {},
        store = configureStore(initialState),
        ...renderOptions
    } = {},
    darkMode = false
) => {
    const Wrapper: React.FC = ({ children }) => {
        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider theme={variables}>
                        <MuiThemeProvider theme={lightTheme}>
                            <ThemeProvider theme={lightTheme}>
                                <ThemeContext.Provider
                                    value={{
                                        darkMode,
                                        setDarkMode: () => {}
                                    }}
                                >
                                    <Router>{children}</Router>
                                </ThemeContext.Provider>
                            </ThemeProvider>
                        </MuiThemeProvider>
                    </ThemeProvider>
                </I18nextProvider>
            </Provider>
        )
    }

    return render(ui, {
        wrapper: Wrapper,
        ...renderOptions
    })
}

export * from '@testing-library/react'

export { customRender as render }
