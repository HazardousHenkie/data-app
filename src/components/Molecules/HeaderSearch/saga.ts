import {
    call,
    put,
    takeLatest,
    ForkEffect,
    PutEffect,
    CallEffect
} from 'redux-saga/effects'

import request from 'utils/request'

// eslint-disable-next-line
import { getCountriesDataSuccess, getCountriesDataError } from './actions' // eslint-disable-line 
import ActionTypes from './constants' // eslint-disable-line 

function* getCountriesDataSaga(): Generator<
    | CallEffect<unknown>
    | PutEffect<getCountriesDataSuccess | getCountriesDataError>,
    void,
    unknown
> {
    try {
        const requestURL = 'https://restcountries.eu/rest/v2/all'

        yield call(request, requestURL, {
            method: 'GET'
        })

        yield put(getCountriesDataSuccess())
    } catch (error) {
        yield put(getCountriesDataError(error))
    }
}

export default function* getCountriesDataRootSaga(): Generator<
    ForkEffect<never>,
    void,
    unknown
> {
    yield takeLatest(ActionTypes.GET_COUNTRIES_DATA, getCountriesDataSaga)
}
