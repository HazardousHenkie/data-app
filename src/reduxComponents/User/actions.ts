import { action } from 'typesafe-actions'

import ActionTypes from './constants'

const setUser = (user: object) => action(ActionTypes.SET_USER, user)

export default setUser
