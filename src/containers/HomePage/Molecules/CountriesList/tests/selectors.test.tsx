import {
    selectCountriesData,
    makeSelectError,
    makeSelectLoader,
    makeSelectData
} from '../selectors'

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
        const countriesData = [
            {
                alpha2Code: 'AF',
                alpha3Code: 'AFG',
                altSpellings: ['AF', 'Afġānistān']
            }
        ]

        const mockedState: any = {
            countriesData: {
                data: countriesData
            }
        }

        expect(dataSelector(mockedState)).toEqual(countriesData)
    })
})
