import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { History } from 'history'
import { createLogger } from 'redux-logger'

import { InjectedStore, ApplicationRootState } from 'types'
import createReducer from './reducers'

export default function configureStore(
    initialState: ApplicationRootState | object,
    history: History
): InjectedStore {
    const reduxSagaMonitorOptions = {}
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
    const { run: runSaga } = sagaMiddleware
    const middlewares = [sagaMiddleware, routerMiddleware(history)]

    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga
        })
    ]

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        const logger = createLogger()
        middlewares.push(logger)
    }

    const enhancer = compose(...enhancers) as StoreEnhancer<InjectedStore, {}>

    const store = createStore(
        createReducer(),
        initialState as object,
        enhancer
    ) as InjectedStore

    // eslint-disable-next-line
    store.runSaga = sagaMiddleware.run
    store.injectedReducers = {}
    store.injectedSagas = {}

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            forceReducerReload(store)
        })
    }

    return store
}
