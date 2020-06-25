import { query } from 'faunadb'
import FavoritedCountriesState from './types'

enum ActionTypes {
    GET_FAVORITED_COUNTRIES = 'components/FavoritedCountriesList/GET_FAVORITED_COUNTRIES',
    SET_FAVORITED_COUNTRIES = 'components/FavoritedCountriesList/SET_FAVORITED_COUNTRIES',
    GET_FAVORITED_COUNTRIES_ERROR = 'components/FavoritedCountriesList/GET_FAVORITED_COUNTRIES_ERROR'
}

export const initialFavoritedCountriesState: FavoritedCountriesState = {
    error: false,
    loading: false,
    countries: [
        {
            ref: {
                '@ref': {
                    collection: query.Collection('country_user'),
                    id: ''
                }
            },
            ts: 0,
            data: {
                userId: '',
                countryId: '',
                updatedAt: 0,
                createdAt: 0
            }
        }
    ]
}

export default ActionTypes
