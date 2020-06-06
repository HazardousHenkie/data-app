import FavoritedCountriesState from './types'

enum ActionTypes {
    GET_FAVORITED_COUNTRIES = 'components/FavoritedCountriesList/GET_FAVORITED_COUNTRIES',
    GET_FAVORITED_COUNTRIES_SUCCESS = 'components/FavoritedCountriesList/GET_FAVORITED_COUNTRIES_SUCCESS',
    GET_FAVORITED_COUNTRIES_ERROR = 'components/FavoritedCountriesList/GET_FAVORITED_COUNTRIES_ERROR'
}

export const initialFavoritedCountriesState: FavoritedCountriesState = {
    error: false,
    loading: false,
    countries: [
        {
            name: ''
        }
    ]
}

export default ActionTypes
