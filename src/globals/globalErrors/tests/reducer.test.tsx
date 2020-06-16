import errorsReducer from '../reducer'
import { setErrors } from '../actions'

import CountryState from '../types'
import { initialErrorsState } from '../constants'

describe('countriesListItemReducer', () => {
    let state: CountryState
    beforeEach(() => {
        state = initialErrorsState
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(errorsReducer(undefined, {} as any)).toEqual(expectedResult)
    })

    it('should handle the setSelectedCountry action correctly', () => {
        const expectedResult = {
            errors: initialErrorsState.errors
        }

        expect(
            errorsReducer(state, setErrors(initialErrorsState.errors))
        ).toEqual(expectedResult)
    })
})
