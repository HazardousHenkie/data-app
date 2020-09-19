import { combineReducers, Reducer } from 'redux'

import authenticationReducer from 'globals/authentication/reducer'
import favoritedCountriesListReducer from 'globals/favoritedCountriesList/reducer'
import errorsReducer from 'globals/globalErrors/reducer'

export default function createReducer(injectedReducers = {}): Reducer {
    const rootReducer = combineReducers({
        errors: errorsReducer,
        authenticationData: authenticationReducer,
        favoritedCountries: favoritedCountriesListReducer,
        ...injectedReducers
    })

    return rootReducer
}
