import { Reducer, Store } from 'redux'
import { Saga, Task } from 'redux-saga'
import { SagaInjectionModes } from 'redux-injectors'

import { RouterState } from 'connected-react-router'

import { ContainerCountriesListState } from 'components/Molecules/CountriesList/types'
import { ContainerCountryState } from 'components/Molecules/CountryListItem/types'

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
    readonly countriesData: ContainerCountriesListState
    readonly country: ContainerCountryState
}
