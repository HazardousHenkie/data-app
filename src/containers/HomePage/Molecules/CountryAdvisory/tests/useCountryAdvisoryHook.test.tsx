import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import mockFetch, {
    mockFetchError,
    mockFetchCleanUp
} from 'utils/request-test-utils'
import history from 'utils/history'
import configureStore from 'store/configureStore'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'
import useCountryAdvisoryHook from '../useCountryAdvisoryHook'

describe('useCountryAdvisoryHook', () => {
    const fixture = {
        data: {
            NL: {
                iso_alpha2: 'NL',
                name: 'Netherlands',
                continent: 'EU',
                advisory: {
                    score: 3.4,
                    sources_active: 8
                }
            }
        }
    }

    let store = configureStore({}, history)

    beforeEach(() => {
        mockFetch(fixture)
    })

    afterAll(() => {
        store = configureStore({}, history)
        mockFetchCleanUp()
    })

    it('If should start loading and return the data after a succesfull call', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useCountryAdvisoryHook(),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )
        act(() => {
            store.dispatch(
                setSelectedCountry({
                    ...CountryItem.country,
                    alpha2Code: 'NL'
                })
            )
        })
        expect(result.current.loading).toEqual(true)
        await waitForNextUpdate()
        expect(result.current.countryAdvisory).toEqual(fixture.data.NL)
    })

    it('If should return an error after an unsuccesfull call', async () => {
        const error = Error('something went wrong')

        mockFetchError(error)

        const { result, waitForNextUpdate } = renderHook(
            () => useCountryAdvisoryHook(),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        act(() => {
            store.dispatch(
                setSelectedCountry({
                    ...CountryItem.country
                })
            )
        })

        await waitForNextUpdate()

        expect(result.current.fetchingError).toEqual(error)
    })

    it('Loading should be false after call', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useCountryAdvisoryHook(),
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
