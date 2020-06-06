import { action } from 'typesafe-actions'

import ActionTypes from './constants'

import { CountryState } from './types'

const setSelectedCountry = (country: CountryState['country']) =>
    action(ActionTypes.GET_FAVORITED_COUNTRIES, country)

export default setSelectedCountry
