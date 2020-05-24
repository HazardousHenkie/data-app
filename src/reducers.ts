import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'

import authenticationReducer from 'reduxComponents/authentication/reducer'

import history from 'utils/history'

export default function createReducer(
    injectedReducers = {}
): Reducer<any, any> {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        authenticationReducer,
        ...injectedReducers
    })

    return rootReducer
}
