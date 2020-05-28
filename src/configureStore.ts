import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { History } from 'history'
import { createLogger } from 'redux-logger'

import { InjectedStore, ApplicationRootState } from 'types'
import authenticationRootSaga from 'reduxComponents/authentication/sagas'
import createReducer from './reducers'

export default function configureStore(
    initialState: ApplicationRootState | object,
    history: History
): InjectedStore {
    const sagaMiddleware = createSagaMiddleware()
    const { run: runSaga } = sagaMiddleware
    const middlewares = [sagaMiddleware, routerMiddleware(history)]

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        // change logger
        const logger = createLogger()
        middlewares.push(logger)
    }

    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga
        })
    ]

    const store = createStore(
        createReducer(),
        initialState as object,
        compose(...enhancers)
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
