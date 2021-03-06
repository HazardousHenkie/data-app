import { call, put } from 'redux-saga/effects'

import request from 'utils/request'

import ERROR_STATUS_CODES from 'utils/errorStatusCodes'

import { logoutRequest } from 'globals/authentication/logout/actions'
import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import authToken from 'globals/authentication/authToken'
import { setError } from 'globals/globalErrors/actions'
import ENDPOINTS from 'utils/constants'
import { setFavoritedCountries, getFavoritedCountriesError } from './actions'

function* getFavoritedCountriesDataSaga() {
    try {
        const response = yield call(request, ENDPOINTS.FAVORITE_COUNTRIES, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        })

        yield put(setFavoritedCountries(response.data))
    } catch (error) {
        if (
            error.response.status === ERROR_STATUS_CODES.UNAUTHORIZED &&
            localStorage.getItem('userId')
        ) {
            yield put(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        } else {
            yield put(logoutRequest())
        }

        yield put(getFavoritedCountriesError(error))
        yield put(setError(error))
    }
}

export default getFavoritedCountriesDataSaga
