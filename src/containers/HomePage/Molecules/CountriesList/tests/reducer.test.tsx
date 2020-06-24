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
            ...initialCountriesHeaderState,
            loading: true
        }

        expect(countriesListReducer(state, getCountriesData())).toEqual(
            expectedResult
        )
    })

    it('should handle the getCountriesDataSuccess action correctly', () => {
        expect(
            countriesListReducer(
                state,
                getCountriesDataSuccess(initialCountriesHeaderState.data)
            )
        ).toEqual(initialCountriesHeaderState)
    })

    it('should handle the getCountriesDataError action correctly', () => {
        const error = new Error('Something went wrong!')

        const expectedResult = {
            ...initialCountriesHeaderState,
            error
        }

        expect(
            countriesListReducer(state, getCountriesDataError(error))
        ).toEqual(expectedResult)
    })
})
