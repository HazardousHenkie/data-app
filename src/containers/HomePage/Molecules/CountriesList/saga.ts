import { call, put, takeLatest } from 'redux-saga/effects'

import request from 'utils/request'

import { setError } from 'globals/globalErrors/actions'
import ENDPOINTS from 'utils/constants'
import { getCountriesDataSuccess, getCountriesDataError } from './actions'
import ActionTypes from './constants'

export function* getCountriesDataSaga() {
    try {
        const response = yield call(request, ENDPOINTS.COUNTRIES, {
            method: 'GET'
        })

        yield put(getCountriesDataSuccess(response))
    } catch (error) {
        yield put(getCountriesDataError(error))
        yield put(setError(error))
    }
}

export default function* countriesListRootSaga() {
    yield takeLatest(ActionTypes.GET_COUNTRIES_DATA, getCountriesDataSaga)
}
