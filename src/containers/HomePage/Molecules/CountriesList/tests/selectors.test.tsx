import {
    selectCountriesData,
    makeSelectError,
    makeSelectLoader,
    makeSelectData
} from '../selectors'

import { initialCountriesHeaderState } from '../constants'

describe('selectHome', () => {
    it('should select the countries state', () => {
        const countriesDataState = {
            countriesData: {}
        }

        const mockedState: any = {
            countriesData: countriesDataState
        }
        expect(selectCountriesData(mockedState)).toEqual(countriesDataState)
    })
})

describe('makeSelectError', () => {
    const errorSelector = makeSelectError()
    it('should select the data', () => {
        const error = new Error('Something went wrong!')

        const mockedState: any = {
            countriesData: {
                error
            }
        }

        expect(errorSelector(mockedState)).toEqual(error)
    })
})

describe('makeSelectLoader', () => {
    const loaderSelector = makeSelectLoader()
    it('should select the data', () => {
        const loading = false

        const mockedState: any = {
            countriesData: {
                loading
            }
        }

        expect(loaderSelector(mockedState)).toEqual(loading)
    })
})

describe('makeSelectData', () => {
    const dataSelector = makeSelectData()
    it('should select the data', () => {
        const mockedState: any = {
            countriesData: {
                data: initialCountriesHeaderState.data
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialCountriesHeaderState.data
        )
    })
})
