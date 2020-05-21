import { ActionType } from 'typesafe-actions'
import UserState from './types'
import * as actions from './actions'

import ActionTypes from './constants'

export const initialUserState: UserState = {
    user: {}
}

function userReducer(
    state: UserState = initialUserState,
    action: ActionType<typeof actions>
): UserState {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer
