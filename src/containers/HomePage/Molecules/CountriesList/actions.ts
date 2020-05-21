import { action } from 'typesafe-actions'

import CountriesListState from './types'
import ActionTypes from './constants'

export const getCountriesData = () => action(ActionTypes.GET_COUNTRIES_DATA)
export const getCountriesDataSuccess = (
    countriesData: CountriesListState['data']
) => action(ActionTypes.GET_COUNTRIES_DATA_SUCCESS, countriesData)
export const getCountriesDataError = (error: Error) =>
    action(ActionTypes.GET_COUNTRIES_DATA_ERROR, error)
