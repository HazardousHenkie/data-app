import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'

import authenticationReducer from 'globals/authentication/reducer'

import history from 'utils/history'

export default function createReducer(injectedReducers = {}): Reducer {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        authenticationData: authenticationReducer,
        ...injectedReducers
    })

    return rootReducer
}
