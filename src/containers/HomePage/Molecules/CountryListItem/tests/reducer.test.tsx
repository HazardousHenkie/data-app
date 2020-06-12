import countriesListItemReducer from '../reducer'
import setSelectedCountry from '../actions'

import CountryState from '../types'
import { CountryItem } from '../constants'

describe('countriesListItemReducer', () => {
    let state: CountryState
    beforeEach(() => {
        state = CountryItem
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(countriesListItemReducer(undefined, {} as any)).toEqual(
            expectedResult
        )
    })

    it('should handle the setSelectedCountry action correctly', () => {
        const expectedResult = {
            country: CountryItem.country
        }

        expect(
            countriesListItemReducer(
                state,
                setSelectedCountry(CountryItem.country)
            )
        ).toEqual(expectedResult)
    })
})
