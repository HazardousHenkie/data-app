import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import { InjectedStore, ApplicationRootState } from 'types'
import { History } from 'history'
import { createLogger } from 'redux-logger'

export default function configureStore(
    initialState: ApplicationRootState | {} = {},
    history: History
) {
    const reduxSagaMonitorOptions = {}
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

    const middlewares = [sagaMiddleware, routerMiddleware(history)]

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        const logger = createLogger()
        middlewares.push(logger)
    }

    const enhancer = applyMiddleware(...middlewares)

    const store = (createStore(
        createReducer(),
        initialState,
        enhancer
    ) as unknown) as InjectedStore

    store.runSaga = sagaMiddleware.run
    store.injectedReducers = {}
    store.injectedSagas = {}

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers))
        })
    }

    return store
}
