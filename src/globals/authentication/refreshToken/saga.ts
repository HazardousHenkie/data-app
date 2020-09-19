import { call, put } from 'redux-saga/effects'

import request from 'utils/request'

import serialize from 'serialize-javascript'

import { ActionType as typeSafeAction } from 'typesafe-actions'

import { setError } from 'globals/globalErrors/actions'

import {
    getRefreshTokenRequest,
    getRefreshTokenSuccess,
    getRefreshTokenError
} from './actions'

import authToken from '../authToken'

export default function* refreshTokenSaga(
    params: typeSafeAction<typeof getRefreshTokenRequest>
) {
    const requestURL = '/.netlify/functions/refreshToken'

    try {
        const response = yield call(request, requestURL, {
            method: 'POST',
            body: serialize({
                userId: params.payload
            })
        })

        authToken.token = response.authToken

        yield put(getRefreshTokenSuccess(response.user))
    } catch (error) {
        if (error && error.response && error.response.status !== 400) {
            yield put(getRefreshTokenError(error))
            yield put(setError(error))
        }
    }
}
