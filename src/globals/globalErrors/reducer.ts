import { ActionType } from 'typesafe-actions'
import ErrorsState from './types'

import * as actions from './actions'

import ActionTypes, { initialErrorsState } from './constants'

function errorsReducer(
    state: ErrorsState = initialErrorsState,
    action: ActionType<typeof actions>
): ErrorsState {
    switch (action.type) {
        case ActionTypes.SET_ERRORS:
            return {
                errors: action.payload
            }
        case ActionTypes.REMOVE_ERROR:
            return {
                ...initialErrorsState
            }
        default:
            return state
    }
}

export default errorsReducer
