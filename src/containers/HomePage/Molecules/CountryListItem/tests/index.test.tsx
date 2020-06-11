import React from 'react'
import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'configureStore'
import history from 'utils/history'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import lightTheme from 'styles/themeStyles'

import ListItem from '../index'
import { CountryItem } from '../constants'

describe('<ListItem />', () => {
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
                            <ListItem
                                listCountry={CountryItem.country}
                                setOpen={() => {}}
                            />
                        </ThemeProvider>
                    </MuiThemeProvider>
                </ThemeProvider>
            </Provider>
        )

        expect(firstChild).toMatchSnapshot()
    })
})
