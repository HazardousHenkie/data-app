import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'configureStore'
import history from 'utils/history'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import lightTheme from 'styles/themeStyles'

import CountriesList from '../index'

describe('<CountriesList />', () => {
    it('should render like snapshot', () => {
        const initialState = {}
        const store = configureStore(initialState, history)

        const {
            container: { firstChild }
        } = render(
            <Provider store={store}>
                <ThemeProvider theme={variables}>
                    <MuiThemeProvider theme={lightTheme}>
                        <ThemeProvider theme={lightTheme}>
                            <CountriesList open setOpen={() => {}} />
                        </ThemeProvider>
                    </MuiThemeProvider>
                </ThemeProvider>
            </Provider>
        )

        expect(firstChild).toMatchSnapshot()
    })
})

// more tests:
// shouldn't setcountries if no searchstring
// showing loader
// showing error when error
// set countries action?
// get countries action?
