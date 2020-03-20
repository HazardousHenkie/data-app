import { Reducer, Store } from 'redux'
import { RouterState } from 'connected-react-router'
import { Saga, Task } from 'redux-saga'
import { SagaInjectionModes } from 'redux-injectors'

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
}
