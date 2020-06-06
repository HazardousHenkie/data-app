import { put } from 'redux-saga/effects'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'
import ERROR_STATUS_CODES from 'utils/errorStatusCodes'
import { ResponseError } from './request'

function* requestErrorCheck(error: ResponseError) {
    try {
        if (
            error.response &&
            error.response.status === ERROR_STATUS_CODES.UNAUTHORIZED
        ) {
            if (localStorage.getItem('userId')) {
                yield put(
                    getRefreshTokenRequest(
                        localStorage.getItem('userId') as string
                    )
                )
            } else {
                yield put(logoutRequest())
            }
        } else if (
            error.response &&
            (error.response.status === ERROR_STATUS_CODES.SERVER_ERROR ||
                error.response.status ===
                    ERROR_STATUS_CODES.SERVICE_UNAVAILABLE)
        ) {
            yield put(logoutRequest())
        }
    } catch {
        yield put(logoutRequest())
    }
}
export default requestErrorCheck
