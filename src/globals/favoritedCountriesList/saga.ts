import { call, put, takeLatest } from 'redux-saga/effects'

import request from 'utils/request'

import authToken from 'globals/authentication/authToken'
import {
    getFavoritedCountriesSuccess,
    getFavoritedCountriesError
} from './actions'
import ActionTypes from './constants'

export function* getFavoritedCountriesDataSaga() {
    const requestURL = '/.netlify/functions/getFavoritedCountries'

    try {
        const response = yield call(request, requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken.token}`
            }
        })

        yield put(getFavoritedCountriesSuccess(response.data))
    } catch (error) {
        yield put(getFavoritedCountriesError(error))
    }
}

export default function* getFavoritedCountriesDataRootSaga() {
    yield takeLatest(
        ActionTypes.GET_FAVORITED_COUNTRIES,
        getFavoritedCountriesDataSaga
    )
}
