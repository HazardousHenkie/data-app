import CountryState from './types'

enum ActionTypes {
    SET_SELECTED_COUNTRY = 'components/CountriesList/SET_SELECTED_COUNTRY'
}

export const CountryItem: CountryState = {
    country: {
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
        currencies: [{ string: '' }],
        languages: [{ string: '' }],
        translations: { string: '' }
    }
}

export default ActionTypes
