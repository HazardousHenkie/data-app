import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import history from 'utils/history'
import configureStore from 'store/configureStore'

import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'
import useCountryAdvisoryHook from '../useCountryAdvisoryHook'

// https://medium.com/@AndreCalvo/testing-custom-react-hooks-that-use-fetch-or-other-async-functions-5fb128d07f53

// move this to utils

const mockFetch = (mockData: { [key: string]: string | object }) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(mockData)
        })
    )
}

// const mockFetchError = error => {
//     global.fetch = jest.fn().mockImplementation(() => Promise.reject(error))
// }

// const mockFetchCleanUp = () => {
//     global.fetch.mockClear()
//     delete global.fetch
// }

// rename everyting
// check all test
describe('useFilteredCountriesHook', () => {
    // it should fetch the data
    // it should give an error if response errors

    it('If there is no searchstring it should return store data', async () => {
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

        mockFetch(fixture)

        // add the store
        const store = configureStore({}, history)

        const { result, waitForNextUpdate } = renderHook(
            () => useCountryAdvisoryHook(),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        store.dispatch(
            // add constants and only alpha2code
            setSelectedCountry({
                alpha2Code: 'NL',
                name: '',
                nativeName: '',
                capital: '',
                region: '',
                subregion: '',
                flag: '',
                currency: '',
                population: 0,
                latlng: [0, 0],
                currencies: [{ string: '' }],
                languages: [{ string: '' }],
                translations: { string: '' }
            })
        )

        expect(result.current.loading).toBe(true)

        await waitForNextUpdate()

        expect(result.current.countryAdvisory).toEqual(fixture.data.NL)
        // mockFetchCleanUp()
    })

    // it('If there is no searchstring it should return store data', async () => {
    //     const store = configureStore({}, history)

    //     const { result, waitForNextUpdate } = renderHook(
    //         () => useCountryAdvisoryHook(),
    //         {
    //             wrapper: ({ children }) => {
    //                 return <Provider store={store}>{children}</Provider>
    //             }
    //         }
    //     )

    //     expect(result.current.loading).toBe(true)

    //     await waitForNextUpdate()
    //     expect(result.current.loading).toEqual(false)
    // })

    // it('If there is no searchstring it should return store data', async () => {
    //     const store = configureStore({}, history)

    //     const { result, waitForNextUpdate } = renderHook(
    //         () => useCountryAdvisoryHook(),
    //         {
    //             wrapper: ({ children }) => {
    //                 return <Provider store={store}>{children}</Provider>
    //             }
    //         }
    //     )

    //     await waitForNextUpdate()
    //     expect(result.current.loading).toEqual(false)
    // })
})
