import { put } from 'redux-saga/effects'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'

import { setError } from 'globals/globalErrors/actions'
import { ResponseError } from './request'

// test this one?
function* requestErrorCheck(error: ResponseError) {
    try {
        if (localStorage.getItem('userId')) {
            yield put(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        } else {
            throw Error('No userId in local storage.')
        }
    } catch {
        yield put(logoutRequest())
        yield put(setError(error))
    }
}
export default requestErrorCheck
