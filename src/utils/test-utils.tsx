import React from 'react'
import { render } from '@testing-library/react'
import configureStore from 'configureStore'

import history from 'utils/history'
import { Provider } from 'react-redux'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import lightTheme from 'styles/themeStyles'

const customRender = (
    ui: React.ReactElement,
    {
        initialState = {},
        store = configureStore(initialState, history),
        ...renderOptions
    } = {}
) => {
    const Wrapper: React.FC = ({ children }) => {
        return (
            <Provider store={store}>
                <ThemeProvider theme={variables}>
                    <MuiThemeProvider theme={lightTheme}>
                        <ThemeProvider theme={lightTheme}>
                            {children}
                        </ThemeProvider>
                    </MuiThemeProvider>
                </ThemeProvider>
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
