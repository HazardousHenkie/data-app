import { action } from 'typesafe-actions'

import { ResponseError } from 'utils/request'
import ActionTypes from './constants'

import FavoritedCountriesState from './types'

export const getFavoritedCountries = () =>
    action(ActionTypes.GET_FAVORITED_COUNTRIES)

export const setFavoritedCountries = (
    favoritedCountries: FavoritedCountriesState['countries']
) => action(ActionTypes.SET_FAVORITED_COUNTRIES, favoritedCountries)

export const getFavoritedCountriesError = (error: ResponseError) =>
    action(ActionTypes.GET_FAVORITED_COUNTRIES_ERROR, error)
