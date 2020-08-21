import React from 'react'

import { query } from 'faunadb'

import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import mockFetch, {
    mockFetchError,
    mockFetchCleanUp
} from 'utils/request-test-utils'

import configureStore from 'store/configureStore'

import { ResponseError } from 'utils/request'
import { setError } from 'globals/globalErrors/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { setFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'

import useCountryFavoriteHook from '../useCountryFavoriteHook'

describe('useCountryFavoriteHook', () => {
    afterEach(() => {
        mockFetchCleanUp()
    })

    const deleteFixture = { message: 'Saved successfully.' }

    it('It should start loading and return the data after a succesfull call (delete)', async () => {
        mockFetch(deleteFixture)

        const store = configureStore({})

        const { result, waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0],
                        ref: {
                            '@ref': {
                                collection: query.Collection('country_user'),
                                id: 'countryId'
                            }
                        }
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        expect(result.current.loading).toEqual(true)

        await waitForNextUpdate()

        expect(result.current.countrySucessfullRequest).toEqual(
            initialFavoritedCountriesState.countries[0]
        )
    })

    it('It should dispatch setFavoritedCountries (delete)', async () => {
        mockFetch(deleteFixture)

        const store = configureStore({})

        store.dispatch = jest.fn()

        const { waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0],
                        ref: {
                            '@ref': {
                                collection: query.Collection('country_user'),
                                id: 'countryId'
                            }
                        }
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        await waitForNextUpdate()

        expect(store.getState().favoritedCountries).toBe(
            initialFavoritedCountriesState
        )
        expect(store.dispatch).toHaveBeenCalledWith(setFavoritedCountries([]))
    })

    it('It should start loading and return the data after a succesfull call (get)', async () => {
        mockFetch({
            ...initialFavoritedCountriesState.countries[0]
        })

        const store = configureStore({})

        const { result, waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0]
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        expect(result.current.loading).toEqual(true)

        await waitForNextUpdate()

        expect(result.current.countrySucessfullRequest).toEqual({
            ...initialFavoritedCountriesState.countries[0]
        })
    })

    it('It should dispatch setFavoritedCountries (get)', async () => {
        mockFetch({
            ...initialFavoritedCountriesState.countries[0]
        })

        const store = configureStore({})

        store.dispatch = jest.fn()

        const { waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0]
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        await waitForNextUpdate()

        expect(store.getState().favoritedCountries).toBe(
            initialFavoritedCountriesState
        )
        expect(store.dispatch).toHaveBeenCalledWith(
            setFavoritedCountries(initialFavoritedCountriesState.countries)
        )
    })

    it('If should return an error and lgout after an unsuccesfull call', async () => {
        const responseError = new ResponseError(
            new Response(),
            'something went wrong'
        )

        mockFetchError(responseError)

        const store = configureStore({})
        store.dispatch = jest.fn()

        const { waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0]
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        await waitForNextUpdate()

        expect(store.getState().errors).toStrictEqual({ errors: [] })

        expect(store.dispatch).toHaveBeenCalledWith(logoutRequest())
        expect(store.dispatch).toHaveBeenCalledWith(setError(Error('')))
    })

    it('If should return an error after and get a new token an unsuccesfull call if error code is 401 and userId is set in localstorage', async () => {
        const userId = '12'
        const responseError = new ResponseError(
            new Response(),
            'something went wrong'
        )

        mockFetchError(responseError)
        localStorage.setItem('userId', userId)

        const store = configureStore({})
        store.dispatch = jest.fn()

        const { waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0]
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        await waitForNextUpdate()

        expect(store.getState().errors).toStrictEqual({ errors: [] })
        expect(store.dispatch).toHaveBeenCalledWith(
            getRefreshTokenRequest(userId)
        )
        expect(store.dispatch).toHaveBeenCalledWith(setError(Error('')))
    })

    it('Loading should be false after call', async () => {
        mockFetch({
            ...initialFavoritedCountriesState.countries[0]
        })

        const store = configureStore({})

        const { result, waitForNextUpdate } = renderHook(
            () =>
                useCountryFavoriteHook(
                    {
                        ...initialFavoritedCountriesState.countries[0]
                    },
                    true
                ),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        await waitForNextUpdate()
        expect(result.current.loading).toEqual(false)
    })
})
