import { call, put, takeLatest } from 'redux-saga/effects'

import request from 'utils/request'

import ActionTypes from './constants'
import { logoutSuccess, logoutError } from './actions'

export function* logoutSaga() {
    const requestURL = '/.netlify/functions/logout'

    try {
        const response = yield call(request, requestURL, {
            method: 'POST'
        })

        yield put(logoutSuccess(response))
    } catch (error) {
        yield put(logoutError(error))
    }
}

export default function* logoutRootSaga() {
    yield takeLatest(ActionTypes.LOGOUT_REQUEST, logoutSaga)
}
