import { call, put } from 'redux-saga/effects'

import requestErrorCheck from 'utils/errorCheckRequest'
import request from 'utils/request'

import { logoutSuccess, logoutError } from './actions'

import authToken from '../authToken'

export default function* logoutSaga() {
    const requestURL = '/.netlify/functions/googleLogout'

    try {
        yield call(request, requestURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        })

        localStorage.removeItem('userId')
        yield put(logoutSuccess())
    } catch (error) {
        yield requestErrorCheck(error)
        yield put(logoutError(error))
    }
}
