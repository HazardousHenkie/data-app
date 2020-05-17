import { action } from 'typesafe-actions'
import ActionTypes from '../constants'

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
            const fixture = [
                {
                    alpha2Code: '',
                    name: '',
                    nativeName: '',
                    capital: '',
                    region: '',
                    subregion: '',
                    flag: '',
                    currency: '',
                    population: 0,
                    latlng: [0, 0],
                    currencies: [{ currency: 'euro' }],
                    languages: [{ language: 'language' }],
                    translations: { japanese: '日本語' }
                }
            ]
            const expectedResult = action(
                ActionTypes.GET_COUNTRIES_DATA_SUCCESS,
                fixture
            )

            expect(getCountriesDataSuccess(fixture)).toEqual(expectedResult)
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
