import { ResponseError } from 'utils/request'
import favoritedCountriesListReducer from '../reducer'

import {
    getFavoritedCountries,
    setFavoritedCountries,
    getFavoritedCountriesError
} from '../actions'
import CountriesListState from '../types'
import { initialFavoritedCountriesState } from '../constants'

describe('countriesListReducer', () => {
    let state: CountriesListState
    beforeEach(() => {
        state = initialFavoritedCountriesState
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(favoritedCountriesListReducer(undefined, {} as any)).toEqual(
            expectedResult
        )
    })

    it('should handle the getFavoritedCountries action correctly', () => {
        const expectedResult = {
            ...initialFavoritedCountriesState,
            loading: true
        }

        expect(
            favoritedCountriesListReducer(state, getFavoritedCountries())
        ).toEqual(expectedResult)
    })

    it('should handle the setFavoritedCountries action correctly', () => {
        expect(
            favoritedCountriesListReducer(
                state,
                setFavoritedCountries(initialFavoritedCountriesState.countries)
            )
        ).toEqual(initialFavoritedCountriesState)
    })

    it('should handle the getFavoritedCountriesError action correctly', () => {
        const error = new ResponseError(
            Response.error(),
            'Something went wrong!'
        )

        const expectedResult = {
            ...initialFavoritedCountriesState,
            error
        }

        expect(
            favoritedCountriesListReducer(
                state,
                getFavoritedCountriesError(error)
            )
        ).toEqual(expectedResult)
    })
})
