import { action } from 'typesafe-actions'

import AuthenticationState from '../types'
import ActionTypes from './constants'

export const loginRequest = (loginToken: string) =>
    action(ActionTypes.LOGIN_REQUEST, loginToken)
export const loginSuccess = (user: AuthenticationState['user']) =>
    action(ActionTypes.LOGIN_SUCCESS, user)
export const loginError = (error: Error | boolean) =>
    action(ActionTypes.LOGIN_ERROR, error)
