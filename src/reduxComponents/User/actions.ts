import { action } from 'typesafe-actions'

import ActionTypes from './constants'
import UserState from './types'

const setUser = (user: UserState['user']) => action(ActionTypes.SET_USER, user)

export default setUser
