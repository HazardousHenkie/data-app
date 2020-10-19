import { action } from 'typesafe-actions'

import ActionTypes from './constants'

export const logoutRequest = () => action(ActionTypes.LOGOUT_REQUEST)
export const logoutSuccess = () => action(ActionTypes.LOGOUT_SUCCESS)
export const logoutError = (error: Error | boolean) =>
    action(ActionTypes.LOGOUT_ERROR, error)
