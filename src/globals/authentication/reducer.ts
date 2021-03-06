import { ActionType } from 'typesafe-actions'
import { Reducer } from 'redux'
import AuthenticationState from './types'

import * as actionsRefreshToken from './refreshToken/actions'
import * as actionsLogin from './login/actions'
import * as actionsLogout from './logout/actions'

import ActionTypesRefreshToken from './refreshToken/constants'
import ActionTypesLogin from './login/constants'
import ActionTypesLogout from './logout/constants'

import initialAuthenticationState from './constants'

const AuthenticationReducer: Reducer<
    AuthenticationState,
    ActionType<
        typeof actionsLogin & typeof actionsLogout & typeof actionsRefreshToken
    >
> = (state = initialAuthenticationState, action) => {
    switch (action.type) {
        case ActionTypesRefreshToken.GET_REFRESH_TOKEN_REQUEST:
        case ActionTypesLogin.LOGIN_REQUEST:
        case ActionTypesLogout.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionTypesRefreshToken.GET_REFRESH_TOKEN_SUCCESS:
        case ActionTypesLogin.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
                user: action.payload
            }
        case ActionTypesLogout.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: false
            }
        case ActionTypesRefreshToken.GET_REFRESH_TOKEN_ERROR:
        case ActionTypesLogin.LOGIN_ERROR:
        case ActionTypesLogout.LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default AuthenticationReducer
