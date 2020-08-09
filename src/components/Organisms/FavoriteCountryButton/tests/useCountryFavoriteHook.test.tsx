import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { render, within, fireEvent } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'

import { Provider } from 'react-redux'

import mockFetch, {
    mockFetchError,
    mockFetchCleanUp
} from 'utils/request-test-utils'

import configureStore from 'store/configureStore'

import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'
import FavoriteCountryButton from '../index'
import useCountryFavoriteHook from '../useCountryFavoriteHook'

describe('useCountryFavoriteHook', () => {
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

    let store = configureStore({})

    beforeEach(() => {
        mockFetch({})
    })

    afterAll(() => {
        store = configureStore({})
        mockFetchCleanUp()
    })

    it('If should start loading and return the data after a succesfull call', () => {
        // const { getByTestId } = render(
        //     <FavoriteCountryButton clickedCountry={CountryItem.country} />
        // )

        // act(() => {
        //     fireEvent.click(getByTestId('iconButton'))
        // })

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
        // act(() => {
        //     store.dispatch(
        //         setSelectedCountry({
        //             ...CountryItem.country,
        //             alpha2Code: 'NL'
        //         })
        //     )
        // })
        console.log(result.current)
        expect(result.current.loading).toEqual(true)
        // await waitForNextUpdate()
        // expect(result.current.countrySucessfullRequest).toEqual(fixture.data.NL)
    })

    // it('If should return an error after an unsuccesfull call', async () => {
    //     const error = Error('something went wrong')

    //     mockFetchError(error)

    //     const { result, waitForNextUpdate } = renderHook(
    //         () => useCountryFavoriteHook(),
    //         {
    //             wrapper: ({ children }) => {
    //                 return <Provider store={store}>{children}</Provider>
    //             }
    //         }
    //     )

    //     act(() => {
    //         store.dispatch(
    //             setSelectedCountry({
    //                 ...CountryItem.country
    //             })
    //         )
    //     })

    //     await waitForNextUpdate()

    //     expect(result.current.fetchingError).toEqual(error)
    // })

    // it('Loading should be false after call', async () => {
    //     const { result, waitForNextUpdate } = renderHook(
    //         () => useCountryFavoriteHook(),
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
