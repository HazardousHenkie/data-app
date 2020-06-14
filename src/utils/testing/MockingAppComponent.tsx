import React from 'react'

import { Provider } from 'react-redux'
import configureStore from 'configureStore'
import history from 'utils/history'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import lightTheme from 'styles/themeStyles'

const MockingAppComponent: React.FC = ({ children }) => {
    const initialState = {}
    const store = configureStore(initialState, history)

    return (
        <Provider store={store}>
            <ThemeProvider theme={variables}>
                <MuiThemeProvider theme={lightTheme}>
                    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
                </MuiThemeProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default MockingAppComponent
