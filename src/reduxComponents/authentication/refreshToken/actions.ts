import { action } from 'typesafe-actions'

import AuthenticationState from '../types'
import ActionTypes from './constants'

export const getRefreshTokenRequest = (id: string) =>
    action(ActionTypes.GET_REFRESH_TOKEN_REQUEST, id)
export const getRefreshTokenSuccess = (user: AuthenticationState['user']) =>
    action(ActionTypes.GET_REFRESH_TOKEN_SUCCESS, user)
export const getRefreshTokenError = (error: Error | boolean) =>
    action(ActionTypes.GET_REFRESH_TOKEN_ERROR, error)
