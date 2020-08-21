import { action } from 'typesafe-actions'
import ActionTypes, { CountryItem } from '../constants'

import setSelectedCountry from '../actions'

describe('CountryListItem Actions', () => {
    describe('setSelectedCountry', () => {
        it('should return the correct type and pass country data', () => {
            const expectedResult = action(
                ActionTypes.SET_SELECTED_COUNTRY,
                CountryItem.country
            )

            expect(setSelectedCountry(CountryItem.country)).toEqual(
                expectedResult
            )
        })
    })
})
