import {
    ContainerCountriesListState,
    ContainerCountriesListActions
} from './types'
import ActionTypes from './constants'

export const initialCountriesHeaderState: ContainerCountriesListState = {
    error: false,
    loading: false,
    data: []
}

function countriesListReducer(
    state: ContainerCountriesListState = initialCountriesHeaderState,
    action: ContainerCountriesListActions
): ContainerCountriesListState {
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
