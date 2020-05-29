import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import countriesListReducer from '../reducer'
import {
    getCountriesData,
    getCountriesDataSuccess,
    getCountriesDataError
} from '../actions'
import CountriesListState from '../types'
import { initialCountriesHeaderState } from '../constants'

describe('countriesListReducer', () => {
    let state: CountriesListState
    beforeEach(() => {
        state = initialCountriesHeaderState
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(countriesListReducer(undefined, {} as any)).toEqual(
            expectedResult
        )
    })

    it('should handle the getCountriesData action correctly', () => {
        const expectedResult = {
            error: false,
            loading: true,
            data: [CountryItem.country]
        }

        expect(countriesListReducer(state, getCountriesData())).toEqual(
            expectedResult
        )
    })

    it('should handle the getCountriesDataSuccess action correctly', () => {
        const fixture = [CountryItem.country]
        const expectedResult = { error: false, loading: false, data: fixture }

        expect(
            countriesListReducer(state, getCountriesDataSuccess(fixture))
        ).toEqual(expectedResult)
    })

    it('should handle the getCountriesDataError action correctly', () => {
        const error = new Error('Something went wrong!')
        const expectedResult = {
            error,
            loading: false,
            data: [CountryItem.country]
        }

        expect(
            countriesListReducer(state, getCountriesDataError(error))
        ).toEqual(expectedResult)
    })
})
