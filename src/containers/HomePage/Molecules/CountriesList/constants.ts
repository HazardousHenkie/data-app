import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import CountriesListState from './types'

enum ActionTypes {
    GET_COUNTRIES_DATA = 'components/CountriesList/GET_COUNTRIES_DATA',
    GET_COUNTRIES_DATA_SUCCESS = 'components/CountriesList/GET_COUNTRIES_DATA_SUCCESS',
    GET_COUNTRIES_DATA_ERROR = 'components/CountriesList/GET_COUNTRIES_DATA_ERROR'
}

export const initialCountriesHeaderState: CountriesListState = {
    error: false,
    loading: false,
    data: [CountryItem.country]
}

export default ActionTypes
