import { action } from 'typesafe-actions'

import ActionTypes from './constants'

import CountryState from './types'

const setSelectedCountry = (country: CountryState['country']) =>
    action(ActionTypes.SET_SELECTED_COUNTRY, country)

export default setSelectedCountry
