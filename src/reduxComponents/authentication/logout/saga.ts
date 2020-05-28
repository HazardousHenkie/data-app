import { call, put } from 'redux-saga/effects'

import request from 'utils/request'

import { logoutSuccess, logoutError } from './actions'

export default function* logoutSaga() {
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
