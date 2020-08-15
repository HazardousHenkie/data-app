import { put } from 'redux-saga/effects'

import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'
import { ResponseError } from 'utils/request'
import { setError } from 'globals/globalErrors/actions'

import { setFavoritedCountries, getFavoritedCountriesError } from '../actions'

import { initialFavoritedCountriesState } from '../constants'

import getFavoritedCountriesDataSaga from '../saga'

describe('getFavoritedCountriesDataSaga Saga', () => {
    let favoritedCountriesGenerator: Generator
    let callDescriptor: Response

    beforeEach(() => {
        favoritedCountriesGenerator = getFavoritedCountriesDataSaga()

        callDescriptor = favoritedCountriesGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the setFavoritedCountries action if call was successfull', () => {
        const response = { data: initialFavoritedCountriesState.countries }

        const putDescriptor = favoritedCountriesGenerator.next(response).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(setFavoritedCountries(response.data))
        )
    })

    it('should call refreshtoken if localstorage(userid) is set and there is responserror with a 401 error', () => {
        localStorage.setItem('userId', 'userId')

        const responseError = Response.error()
        // @ts-ignore
        responseError.status = 401

        const response = new ResponseError(responseError, 'Some error')

        const putDescriptor = favoritedCountriesGenerator.throw(response).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        )
    })

    it('should call the logoutRequest if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')

        const putDescriptor = favoritedCountriesGenerator.throw(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(logoutRequest()))
    })

    it('should call the setError and logoutError action if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        favoritedCountriesGenerator.throw(response).value
        const putDescriptorSecondError = favoritedCountriesGenerator.next(
            response
        ).value

        expect(putDescriptorSecondError).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(getFavoritedCountriesError(response))
        )

        const putDescriptorThirdError = favoritedCountriesGenerator.next(
            response
        ).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorThirdError).toEqual(put(setError(response)))
    })
})
