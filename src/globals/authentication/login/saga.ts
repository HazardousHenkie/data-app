import { call, put } from 'redux-saga/effects'
import serialize from 'serialize-javascript'

import request from 'utils/request'

import { ActionType as typeSafeAction } from 'typesafe-actions'

import { setError } from 'globals/globalErrors/actions'
import ENDPOINTS from 'utils/constants'
import { loginSuccess, loginError, loginRequest } from './actions'

import authToken from '../authToken'

export default function* loginSaga(
    params: typeSafeAction<typeof loginRequest>
) {
    try {
        const response = yield call(request, ENDPOINTS.lOGIN, {
            method: 'POST',
            body: serialize({ authToken: params.payload })
        })

        authToken.token = response.authToken
        localStorage.setItem('userId', response.user.googleId)

        yield put(loginSuccess(response.user))
    } catch (error) {
        yield put(loginError(error))
        yield put(setError(error))
    }
}
