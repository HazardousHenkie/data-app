import {
    selectCountriesData,
    makeSelectError,
    makeSelectLoader,
    makeSelectData
} from '../selectors'

import { initialCountriesHeaderState } from '../constants'

describe('selectHome', () => {
    it('should select the countries state', () => {
        const mockedState: any = {
            countriesData: initialCountriesHeaderState
        }

        expect(selectCountriesData(mockedState)).toEqual(
            initialCountriesHeaderState
        )
    })
})

describe('makeSelectError', () => {
    const errorSelector = makeSelectError()
    it('should select the data', () => {
        const mockedState = {
            countriesData: {
                error: initialCountriesHeaderState.error
            }
        }

        expect(errorSelector(mockedState)).toEqual(
            initialCountriesHeaderState.error
        )
    })
})

describe('makeSelectLoader', () => {
    const loaderSelector = makeSelectLoader()
    it('should select the data', () => {
        const mockedState = {
            countriesData: {
                loading: initialCountriesHeaderState.loading
            }
        }

        expect(loaderSelector(mockedState)).toEqual(
            initialCountriesHeaderState.loading
        )
    })
})

describe('makeSelectData', () => {
    const dataSelector = makeSelectData()
    it('should select the data', () => {
        const mockedState = {
            countriesData: {
                data: initialCountriesHeaderState.data
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialCountriesHeaderState.data
        )
    })
})
