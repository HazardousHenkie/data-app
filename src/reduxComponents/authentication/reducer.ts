import { combineReducers } from 'redux'

import loginReducer from './login/reducer'
import logoutReducer from './logout/reducer'

const authenticationReducer = combineReducers({
    loginReducer,
    logoutReducer
})

export default authenticationReducer
