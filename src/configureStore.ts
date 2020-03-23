import { applyMiddleware, createStore, compose } from 'redux'
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

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        const logger = createLogger()
        middlewares.push(logger)
    }

    const store = createStore(
        createReducer(),
        initialState as object,
        compose(...enhancers)
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
