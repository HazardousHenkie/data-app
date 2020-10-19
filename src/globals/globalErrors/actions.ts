import { action } from 'typesafe-actions'

import ActionTypes from './constants'

export const getErrors = () => action(ActionTypes.GET_ERRORS)

export const setError = (error: Error) => action(ActionTypes.SET_ERROR, error)

export const removeError = () => action(ActionTypes.REMOVE_ERROR)

export const setErrors = (errors: Error[]) =>
    action(ActionTypes.SET_ERRORS, errors)
