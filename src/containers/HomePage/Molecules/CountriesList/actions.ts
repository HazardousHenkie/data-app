import { action } from 'typesafe-actions'

import ActionTypes from './constants'

export const getCountriesData = () => action(ActionTypes.GET_COUNTRIES_DATA)
export const getCountriesDataSuccess = (countriesData: []) =>
    action(ActionTypes.GET_COUNTRIES_DATA_SUCCESS, countriesData)
export const getCountriesDataError = (error: Error) =>
    action(ActionTypes.GET_COUNTRIES_DATA_ERROR, error)
