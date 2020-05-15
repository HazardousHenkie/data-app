import { call, put, takeLatest } from 'redux-saga/effects'

import request from 'utils/request'

import { getCountriesDataSuccess, getCountriesDataError } from './actions'
import ActionTypes from './constants'

export function* getCountriesDataSaga() {
    const requestURL = 'https://restcountries.eu/rest/v2/all'

    try {
        const response = yield call(request, requestURL, {
            method: 'GET'
        })

        yield put(getCountriesDataSuccess(response))
    } catch (error) {
        yield put(getCountriesDataError(error))
    }
}

export default function* countriesListRootSaga() {
    yield takeLatest(ActionTypes.GET_COUNTRIES_DATA, getCountriesDataSaga)
}
