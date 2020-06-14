import { ActionType } from 'typesafe-actions'
import CountriesListState from './types'

import * as actions from './actions'

import ActionTypes, { initialCountriesHeaderState } from './constants'

function countriesListReducer(
    state: CountriesListState = initialCountriesHeaderState,
    action: ActionType<typeof actions>
): CountriesListState {
    switch (action.type) {
        case ActionTypes.GET_COUNTRIES_DATA:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.GET_COUNTRIES_DATA_SUCCESS:
            return {
                error: false,
                loading: false,
                data: action.payload
            }
        case ActionTypes.GET_COUNTRIES_DATA_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default countriesListReducer
