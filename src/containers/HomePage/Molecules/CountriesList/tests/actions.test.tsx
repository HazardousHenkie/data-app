import { action } from 'typesafe-actions'
import ActionTypes, { initialCountriesHeaderState } from '../constants'

import {
    getCountriesData,
    getCountriesDataSuccess,
    getCountriesDataError
} from '../actions'

describe('CountriesList Actions', () => {
    describe('getCountriesData', () => {
        it('should return the correct type', () => {
            const expectedResult = action(ActionTypes.GET_COUNTRIES_DATA)

            expect(getCountriesData()).toEqual(expectedResult)
        })
    })

    describe('getCountriesDataSuccess', () => {
        it('should return the correct type and pass countriesData', () => {
            const expectedResult = action(
                ActionTypes.GET_COUNTRIES_DATA_SUCCESS,
                initialCountriesHeaderState.data
            )

            expect(
                getCountriesDataSuccess(initialCountriesHeaderState.data)
            ).toEqual(expectedResult)
        })
    })

    describe('getCountriesDataError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new Error('Something went wrong!')

            const expectedResult = action(
                ActionTypes.GET_COUNTRIES_DATA_ERROR,
                error
            )

            expect(getCountriesDataError(error)).toEqual(expectedResult)
        })
    })
})
