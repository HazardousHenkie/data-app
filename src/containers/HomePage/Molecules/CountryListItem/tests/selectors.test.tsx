import makeSelectCountry, { selectCountry } from '../selectors'
import { CountryItem } from '../constants'

// check selectors again
describe('selectCountry', () => {
    it('should select the country state', () => {
        // check if we can improve
        expect(selectCountry(CountryItem as any)).toEqual(CountryItem.country)
    })
})

describe('makeSelectCountry', () => {
    const dataSelector = makeSelectCountry()
    it('should select the data', () => {
        const mockedState: any = {
            countriesData: {
                country: CountryItem.country
            }
        }

        expect(dataSelector(mockedState)).toEqual(CountryItem.country)
    })
})
