import { put } from 'redux-saga/effects'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'

import { setError } from 'globals/globalErrors/actions'
import { ResponseError } from './request'

function* requestErrorCheck(error: ResponseError) {
    try {
        if (localStorage.getItem('userId')) {
            yield put(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        } else {
            yield put(logoutRequest())
        }
    } catch {
        // are we really getting here????
        yield put(logoutRequest())
        yield put(setError(error))
    }
}
export default requestErrorCheck
