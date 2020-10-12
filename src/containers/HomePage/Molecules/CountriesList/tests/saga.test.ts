import { put, takeLatest } from 'redux-saga/effects'

import Actions from '../constants'
import countriesListRootSaga, { getCountriesDataSaga } from '../saga'
import { getCountriesDataSuccess, getCountriesDataError } from '../actions'

describe('getCountriesData Saga', () => {
    let getCountriesDataGenerator: Generator

    beforeEach(() => {
        getCountriesDataGenerator = getCountriesDataSaga()

        const callDescriptor = getCountriesDataGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the getCountriesData action if it requests the data successfully', () => {
        const response = [
            {
                alpha2Code: '',
                name: '',
                nativeName: '',
                capital: '',
                region: '',
                subregion: '',
                flag: '',
                currency: '',
                population: 0,
                latlng: [0, 0],
                currencies: [{ currency: 'euro' }],
                languages: [{ language: 'language' }],
                translations: { japanese: '日本語' }
            }
        ]
        const putDescriptor = getCountriesDataGenerator.next(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(getCountriesDataSuccess(response)))
    })

    it('should call the repoLoadingError action if the response errors', () => {
        const response = new Error('Some error')
        const putDescriptor = getCountriesDataGenerator.throw(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(getCountriesDataError(response)))
    })
})

describe('signInSaga Saga', () => {
    const countriesList = countriesListRootSaga()

    it('should start task to watch for GET_COUNTRIES_DATA action.', () => {
        const takeLatestDescriptor = countriesList.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(Actions.GET_COUNTRIES_DATA, getCountriesDataSaga)
        )
    })
})
