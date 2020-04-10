import { action } from 'typesafe-actions'

import ActionTypes from './constants'

const setSelectedCountry = (country: object) =>
    action(ActionTypes.SET_SELECTED_COUNTRY, country)

export default setSelectedCountry
