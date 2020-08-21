import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import useFilteredCountries from '../useFilteredCountriesHook'

import { initialCountriesHeaderState } from '../constants'
import { getCountriesDataSuccess } from '../actions'

describe('useFilteredCountriesHook', () => {
    let store = configureStore({})
    const searchString = 'japan'

    afterEach(() => {
        store = configureStore({})
    })

    it(' If there is a searchstring it should return data from that specific country if that country is there', () => {
        const fixture = [
            {
                ...initialCountriesHeaderState.data[0],
                name: 'Netherlands'
            },
            {
                ...initialCountriesHeaderState.data[0],
                name: searchString
            }
        ]

        const { result } = renderHook(
            () => useFilteredCountries(searchString),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        act(() => {
            store.dispatch(getCountriesDataSuccess(fixture))
        })

        expect(result.current).toStrictEqual([fixture[1]])
    })

    it('If there is no searchstring and store data it should return store initial value', () => {
        const { result } = renderHook(() => useFilteredCountries(''), {
            wrapper: ({ children }) => {
                return <Provider store={store}>{children}</Provider>
            }
        })

        expect(result.current).toStrictEqual(initialCountriesHeaderState.data)
    })

    it('If there is no searchstring it should return store data', () => {
        const fixture = [
            {
                ...initialCountriesHeaderState.data[0],
                name: 'Netherlands'
            },
            {
                ...initialCountriesHeaderState.data[0],
                name: searchString
            }
        ]

        const { result } = renderHook(() => useFilteredCountries(''), {
            wrapper: ({ children }) => {
                return <Provider store={store}>{children}</Provider>
            }
        })

        act(() => {
            store.dispatch(getCountriesDataSuccess(fixture))
        })

        expect(result.current).toBe(fixture)
    })

    it('If there is no store data return empty array', () => {
        const { result } = renderHook(
            () => useFilteredCountries(searchString),
            {
                wrapper: ({ children }) => {
                    return <Provider store={store}>{children}</Provider>
                }
            }
        )

        expect(result.current).toStrictEqual([])
    })
})
