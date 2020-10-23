import React from 'react'

import { render } from 'utils/test-utils'

import { Helmet, HelmetTags, HelmetData } from 'react-helmet'

import { getFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'

import configureStore from 'store/configureStore'

import mockFetch, { mockFetchCleanUp } from 'utils/request-test-utils'
import useDarkMode from '../useDarkMode'

import App from '../App'

jest.mock('../useDarkMode')

describe('<App />', () => {
    // app has several errors which can't be solved since it's the main container component so silence them.
    // when developing uncomment this one.
    jest.spyOn(console, 'error').mockImplementation(() => {})

    beforeEach(() => {
        mockFetch({})
        ;(useDarkMode as jest.Mock).mockReturnValue({ darkMode: false })
    })

    afterEach(() => {
        mockFetchCleanUp()
    })

    it('should dispatch getRefreshTokenRequest when localStorage.getItem is set', () => {
        const store = configureStore({ authenticationData: { loggedIn: true } })
        const userId = '12'

        store.dispatch = jest.fn()
        localStorage.setItem('userId', userId)

        render(<App />, { store })

        expect(store.dispatch).toHaveBeenCalledWith(
            getRefreshTokenRequest(userId)
        )
    })

    it("shouldn't have darkmode from the start", () => {
        const { getByTestId } = render(<App />)

        const appDiv = getByTestId('app')

        expect(appDiv).not.toHaveClass('darkMode')
    })

    it('should have darkmode when userPrefersDarkMode is true', () => {
        ;(useDarkMode as jest.Mock).mockReturnValue({ darkMode: true })

        const { getByTestId } = render(<App />)

        const appDiv = getByTestId('app')

        expect(appDiv).toHaveClass('App darkmode')
    })

    it('should dispatch getFavoritedCountries when loggedIn', () => {
        const store = configureStore({ authenticationData: { loggedIn: true } })

        store.dispatch = jest.fn()

        render(<App />, {
            store
        })

        expect(store.dispatch).toHaveBeenCalledWith(getFavoritedCountries())
    })

    it('should set metaDescription', () => {
        render(<App />)

        const metaTags = [
            { name: 'description', content: 'A data app example' },
            { name: 'Home Page', content: 'Homepage description' }
        ]

        const helmet = Helmet.peek()
        expect((helmet as HelmetTags & HelmetData).metaTags).toEqual(metaTags)
    })

    it('should load ErrorSnackbars', () => {
        const { getByTestId } = render(<App />)

        const ErrorSnackbars = getByTestId('ErrorsSnackbarComponent')

        expect(ErrorSnackbars).toBeInTheDocument()
    })

    it('should load Routes', () => {
        const { getByTestId } = render(<App />)

        const routes = getByTestId('routes')

        expect(routes).toBeInTheDocument()
    })
})
