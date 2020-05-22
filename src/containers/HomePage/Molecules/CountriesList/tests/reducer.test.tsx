import countriesListReducer from '../reducer'
import {
    getCountriesData,
    getCountriesDataSuccess,
    getCountriesDataError
} from '../actions'
import { ContainerCountriesListState } from '../types'

describe('countriesListReducer', () => {
    let state: ContainerCountriesListState
    beforeEach(() => {
        state = {
            error: false,
            loading: false,
            data: []
        }
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(countriesListReducer(undefined, {} as any)).toEqual(
            expectedResult
        )
    })

    it('should handle the getCountriesData action correctly', () => {
        const expectedResult = { error: false, loading: true, data: [] }

        expect(countriesListReducer(state, getCountriesData())).toEqual(
            expectedResult
        )
    })

    it('should handle the getCountriesDataSuccess action correctly', () => {
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
        const expectedResult = { error: false, loading: false, data: fixture }

        expect(
            countriesListReducer(state, getCountriesDataSuccess(fixture))
        ).toEqual(expectedResult)
    })

    it('should handle the getCountriesDataError action correctly', () => {
        const error = new Error('Something went wrong!')
        const expectedResult = { error, loading: false, data: [] }

        expect(
            countriesListReducer(state, getCountriesDataError(error))
        ).toEqual(expectedResult)
    })
})
