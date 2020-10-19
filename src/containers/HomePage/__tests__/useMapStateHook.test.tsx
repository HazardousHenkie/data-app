import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'

import useMapState from '../useMapStateHook'

describe('useMapState', () => {
    let store = configureStore({})

    afterEach(() => {
        store = configureStore({})
    })

    it('If there is a country return the lat/lng from tht country', () => {
        const { result } = renderHook(() => useMapState(), {
            wrapper: ({ children }) => {
                return <Provider store={store}>{children}</Provider>
            }
        })

        act(() => {
            store.dispatch(setSelectedCountry(CountryItem.country))
        })

        expect(result.current.mapState).toStrictEqual({
            lat: CountryItem.country.latlng[0],
            lng: CountryItem.country.latlng[1]
        })
    })

    it('If there is no country return empty lat/lng', () => {
        const { result } = renderHook(() => useMapState(), {
            wrapper: ({ children }) => {
                return <Provider store={store}>{children}</Provider>
            }
        })

        expect(result.current.mapState).toStrictEqual({ lat: 0, lng: 0 })
    })

    it('setMapState should be defned', () => {
        const { result } = renderHook(() => useMapState(), {
            wrapper: ({ children }) => {
                return <Provider store={store}>{children}</Provider>
            }
        })

        expect(result.current.setMapState).toBeDefined()
    })
})
