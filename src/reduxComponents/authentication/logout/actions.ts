import { action } from 'typesafe-actions'

import AuthenticationState from '../types'
import ActionTypes from './constants'

export const logoutRequest = (loginToken: string) =>
    action(ActionTypes.LOGOUT_REQUEST, loginToken)
export const logoutSuccess = (user: AuthenticationState['user']) =>
    action(ActionTypes.LOGOUT_SUCCESS, user)
export const logoutError = (error: Error | boolean) =>
    action(ActionTypes.LOGOUT_ERROR, error)
