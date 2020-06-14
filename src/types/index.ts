import { Reducer, Store } from 'redux'
import { Saga, Task } from 'redux-saga'
import { SagaInjectionModes } from 'redux-injectors'

import { RouterState } from 'connected-react-router'

import CountriesListState from 'containers/HomePage/Molecules/CountriesList/types'
import { CountryState } from 'containers/HomePage/Molecules/CountryListItem/types'
import AuthenticationState from 'globals/authentication/types'
import FavoritedCountriesState from 'globals/favoritedCountriesList/types'
import ErrorsState from 'globals/globalErrors/types'

export interface InjectedStore extends Store {
    injectedReducers: object
    injectedSagas: object
    runSaga(saga: Saga | undefined, args: object | undefined): Task
}

export interface InjectReducerParams {
    key: keyof ApplicationRootState
    reducer: Reducer
}

export interface InjectSagaParams {
    key: keyof ApplicationRootState
    saga: Saga
    mode?: SagaInjectionModes
}
export interface ApplicationRootState {
    readonly router: RouterState
    readonly errors: ErrorsState
    readonly countriesData: CountriesListState
    readonly favoritedCountries: FavoritedCountriesState
    readonly country: CountryState
    readonly authenticationData: AuthenticationState
}
