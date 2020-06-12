import makeSelectCountry, { selectCountry } from '../selectors'
import { CountryItem } from '../constants'

describe('selectCountry', () => {
    it('should select the country state', () => {
        const mockedState: any = {
            country: {
                country: CountryItem.country
            }
        }
        expect(selectCountry(mockedState)).toEqual(CountryItem)
    })
})

describe('makeSelectCountry', () => {
    const dataSelector = makeSelectCountry()
    it('should select the data', () => {
        const mockedState = {
            countriesData: {
                country: CountryItem.country
            }
        }

        expect(dataSelector(mockedState)).toEqual(CountryItem.country)
    })
})
