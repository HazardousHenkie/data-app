import { ActionType } from 'typesafe-actions'
import CountryState from './types'

import * as actions from './actions'

import ActionTypes, { CountryItem } from './constants'

const initialCountryState = CountryItem

function countriesListItemReducer(
    state: CountryState = initialCountryState,
    action: ActionType<typeof actions>
): CountryState {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_COUNTRY:
            return {
                country: action.payload
            }
        default:
            return state
    }
}

export default countriesListItemReducer
