import {
    selectFavoritedCountriesData,
    makeSelectFavoritedCountries,
    makeSelectLoader
} from '../selectors'

import { initialFavoritedCountriesState } from '../constants'

describe('selectFavoritedCountriesData', () => {
    it('should select the favoirtedCountries state', () => {
        const mockedState: any = {
            authenticationData: {
                ...initialFavoritedCountriesState
            }
        }
        expect(selectFavoritedCountriesData(mockedState)).toEqual(
            initialFavoritedCountriesState
        )
    })
})

describe('makeSelectFavoritedCountries', () => {
    const dataSelector = makeSelectFavoritedCountries()

    it('should select the data', () => {
        const mockedState = {
            favoritedCountries: {
                countries: initialFavoritedCountriesState.countries
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialFavoritedCountriesState.countries
        )
    })
})

describe('makeSelectLoader', () => {
    const dataSelector = makeSelectLoader()

    it('should select the data', () => {
        const mockedState = {
            favoritedCountries: {
                loading: initialFavoritedCountriesState.loading
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialFavoritedCountriesState.loading
        )
    })
})
