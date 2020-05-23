import { call, put, takeLatest } from 'redux-saga/effects'
import serialize from 'serialize-javascript'

import request from 'utils/request'

import { ActionType as typeSafeAction } from 'typesafe-actions'
import ActionTypes from './constants'
import { loginSuccess, loginError, loginRequest } from './actions'

// move all this to external components
export function* loginSaga(params: typeSafeAction<typeof loginRequest>) {
    console.log(params)
    const requestURL = '/.netlify/functions/googleLogin'

    try {
        const response = yield call(request, requestURL, {
            method: 'POST',
            body: serialize({ authToken: params.payload })
        })

        yield put(loginSuccess(response))
    } catch (error) {
        yield put(loginError(error))
    }
}

export default function* loginRootSaga() {
    yield takeLatest(ActionTypes.LOGIN_REQUEST, loginSaga)
}
