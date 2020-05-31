import { call, put } from 'redux-saga/effects'

import request from 'utils/request'

import { logoutSuccess, logoutError } from './actions'

import authToken from '../authToken'

export default function* logoutSaga() {
    const requestURL = '/.netlify/functions/googleLogout'

    try {
        const response = yield call(request, requestURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        })

        yield put(logoutSuccess(response))
    } catch (error) {
        yield put(logoutError(error))
    }
}
