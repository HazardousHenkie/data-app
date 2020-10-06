import { action } from 'typesafe-actions'
import { ResponseError } from 'utils/request'
import ActionTypes, { initialFavoritedCountriesState } from '../constants'

import {
    getFavoritedCountries,
    setFavoritedCountries,
    getFavoritedCountriesError
} from '../actions'

describe('favoritedCountriesList Actions', () => {
    describe('getFavoritedCountries', () => {
        it('should return the correct type', () => {
            const expectedResult = action(ActionTypes.GET_FAVORITED_COUNTRIES)

            expect(getFavoritedCountries()).toEqual(expectedResult)
        })
    })

    describe('setFavoritedCountries', () => {
        it('should return the correct type and pass favoritedCountriese data', () => {
            const expectedResult = action(
                ActionTypes.SET_FAVORITED_COUNTRIES,
                initialFavoritedCountriesState.countries
            )

            expect(
                setFavoritedCountries(initialFavoritedCountriesState.countries)
            ).toEqual(expectedResult)
        })
    })

    describe('getFavoritedCountriesError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new ResponseError(
                Response.error(),
                'Something went wrong!'
            )

            const expectedResult = action(
                ActionTypes.GET_FAVORITED_COUNTRIES_ERROR,
                error
            )

            expect(getFavoritedCountriesError(error)).toEqual(expectedResult)
        })
    })
})
