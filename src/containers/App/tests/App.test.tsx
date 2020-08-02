import React from 'react'

import { render, act } from 'utils/test-utils'

import { initialUserState } from 'globals/authentication/constants'
import { loginSuccess } from 'globals/authentication/login/actions'

import { getFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'

import configureStore from 'store/configureStore'

import usePrefersDarkMode from '../usePrefersDarkMode'

import App from '../App'

jest.mock('../usePrefersDarkMode')

describe('<App />', () => {
    let mockStore = configureStore({})

    beforeEach(() => {
        // @ts-ignore
        usePrefersDarkMode.mockReturnValue({ darkMode: false })
    })

    afterEach(() => {
        mockStore = configureStore({})
    })

    it('should dispatch getRefreshTokenRequest when localStorage.getItem is set', () => {
        const userId = '12'

        mockStore.dispatch = jest.fn()
        localStorage.setItem('userId', userId)

        render(<App />, { store: mockStore })

        expect(mockStore.dispatch).toHaveBeenCalledWith(
            getRefreshTokenRequest(userId)
        )
    })

    it("shouldn't have darkmode from the start", () => {
        const { getByTestId } = render(<App />)

        const appDiv = getByTestId('app')

        expect(appDiv).not.toHaveClass('darkMode')
    })

    it('should have darkmode when userPrefersDarkMode is true', () => {
        // @ts-ignore
        usePrefersDarkMode.mockReturnValue({ darkMode: true })

        const { getByTestId } = render(<App />)

        const appDiv = getByTestId('app')

        expect(appDiv).toHaveClass('App darkmode')
    })

    // it('should dispatch getFavoritedCountries when loggedIn', () => {
    //     mockStore.dispatch = jest.fn()

    //     render(<App />, { store: mockStore })

    //     act(() => {
    //         mockStore.dispatch(loginSuccess(initialUserState))
    //     })

    //     expect(mockStore.dispatch).toHaveBeenCalledWith(getFavoritedCountries())
    // })

    // check if getFavoritedCountries is being dispatching when loggedIn

    // should set titleTemplate %s - Data app
    // should set defaultTitle data app example
    // should set metaDescription
    // should load ErrorSnackbars
    // should load Routes
})
