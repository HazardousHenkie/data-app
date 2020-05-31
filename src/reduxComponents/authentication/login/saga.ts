import { call, put } from 'redux-saga/effects'
import serialize from 'serialize-javascript'

import request from 'utils/request'

import { ActionType as typeSafeAction } from 'typesafe-actions'

import { loginSuccess, loginError, loginRequest } from './actions'

import authToken from '../authToken'

export default function* loginSaga(
    params: typeSafeAction<typeof loginRequest>
) {
    const requestURL = '/.netlify/functions/googleLogin'

    try {
        const response = yield call(request, requestURL, {
            method: 'POST',
            body: serialize({ authToken: params.payload })
        })

        authToken.token = response.authToken
        localStorage.setItem('userId', response.user.googleId)

        yield put(loginSuccess(response.user))
    } catch (error) {
        yield put(loginError(error))
    }
}
