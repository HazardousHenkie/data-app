import { ActionType } from 'typesafe-actions'
import FavoritedCountriesState from './types'

import * as actions from './actions'

import ActionTypes, { initialFavoritedCountriesState } from './constants'

function favoritedCountriesListReducer(
    state: FavoritedCountriesState = initialFavoritedCountriesState,
    action: ActionType<typeof actions>
): FavoritedCountriesState {
    switch (action.type) {
        case ActionTypes.GET_FAVORITED_COUNTRIES:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.GET_FAVORITED_COUNTRIES_SUCCESS:
            return {
                error: false,
                loading: false,
                countries: action.payload
            }
        case ActionTypes.GET_FAVORITED_COUNTRIES_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default favoritedCountriesListReducer
