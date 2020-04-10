import { ContainerCountryState, ContainerCountryActions } from './types'

import ActionTypes from './constants'

export const initialCountryState: ContainerCountryState = {
    country: {}
}

function countriesListReducer(
    state: ContainerCountryState = initialCountryState,
    action: ContainerCountryActions
): ContainerCountryState {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_COUNTRY:
            return {
                country: action.payload
            }
        default:
            return state
    }
}

export default countriesListReducer
