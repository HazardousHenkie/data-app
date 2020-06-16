import { ActionType as typeSafeAction } from 'typesafe-actions'

import { select, put } from 'redux-saga/effects'

import { initialErrorsState } from './constants'
import { makeSelectErrors } from './selectors'
import { setError, setErrors } from './actions'

export function* globalAddErrorSaga(params: typeSafeAction<typeof setError>) {
    try {
        const errors = yield select(makeSelectErrors())

        yield put(setErrors([...errors, params.payload]))
    } catch (error) {
        // eslint-disable-next-line no-console
        yield put(setError(error))
    }
}

export function* globalRemoveErrorSaga() {
    try {
        yield put(setErrors(initialErrorsState.errors))
    } catch (error) {
        yield put(setError(error))
    }
}
