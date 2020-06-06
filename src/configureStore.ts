import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { History } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'

import { InjectedStore, ApplicationRootState } from 'types'
import authenticationRootSaga from 'globals/authentication/sagas'
import createReducer from './reducers'

export default function configureStore(
    initialState: ApplicationRootState | object,
    history: History
): InjectedStore {
    const sagaMiddleware = createSagaMiddleware()
    const { run: runSaga } = sagaMiddleware
    const middlewares = [sagaMiddleware, routerMiddleware(history)]

    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga
        })
    ]

    let enhancer: StoreEnhancer<{}, {}>
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        enhancer = composeWithDevTools(...enhancers)
    } else {
        enhancer = compose(...enhancers)
    }

    const store = createStore(
        createReducer(),
        initialState,
        enhancer
    ) as InjectedStore

    // eslint-disable-next-line
    store.runSaga = sagaMiddleware.run
    store.injectedReducers = {}
    store.injectedSagas = {}
    store.runSaga(authenticationRootSaga, undefined)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            forceReducerReload(store)
        })
    }

    return store
}
