import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'

import authenticationReducer from 'globals/authentication/reducer'
import favoritedCountriesListReducer from 'globals/favoritedCountriesList/reducer'
import errorsReducer from 'globals/globalErrors/reducer'

import history from 'utils/history'

export default function createReducer(injectedReducers = {}): Reducer {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        errors: errorsReducer,
        authenticationData: authenticationReducer,
        favoritedCountries: favoritedCountriesListReducer,
        ...injectedReducers
    })

    return rootReducer
}
