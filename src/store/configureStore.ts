import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import { InjectedStore, ApplicationRootState } from '../types'

import rootSaga from './sagas'
import createReducer from './reducers'

export default function configureStore(
    initialState: ApplicationRootState | object
): InjectedStore {
    const sagaMiddleware = createSagaMiddleware()
    const { run: runSaga } = sagaMiddleware
    const middlewares = [sagaMiddleware]

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
    store.runSaga(rootSaga, undefined)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            forceReducerReload(store)
        })
    }

    return store
}
