import { call, put } from 'redux-saga/effects'

import request from 'utils/request'

import ERROR_STATUS_CODES from 'utils/errorStatusCodes'
import { setError } from 'globals/globalErrors/actions'
import { setFavoritedCountries } from 'globals/favoritedCountriesList/actions'
import ENDPOINTS from 'utils/constants'
import { logoutSuccess, logoutError } from './actions'

import authToken from '../authToken'

export default function* logoutSaga() {
    try {
        yield call(request, ENDPOINTS.LOGOUT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        })

        localStorage.removeItem('userId')
        yield put(logoutSuccess())
        yield put(setFavoritedCountries([]))
    } catch (error) {
        if (
            error.response.status !== ERROR_STATUS_CODES.UNAUTHORIZED &&
            !localStorage.getItem('userId')
        ) {
            yield put(logoutSuccess())
        }

        yield put(logoutError(error))
        yield put(setError(error))
    }
}
