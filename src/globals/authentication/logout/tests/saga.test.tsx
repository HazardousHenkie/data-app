import { put } from 'redux-saga/effects'

import { getRefreshTokenRequest } from 'globals/authentication/refreshToken/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'
import { ResponseError } from 'utils/request'
import { setError } from 'globals/globalErrors/actions'

import { logoutSuccess, logoutError } from '../actions'

import logoutSaga from '../saga'

describe('logoutSaga Saga', () => {
    let logoutSagaGenerator: Generator
    let callDescriptor: Response

    beforeEach(() => {
        logoutSagaGenerator = logoutSaga()

        callDescriptor = logoutSagaGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the logoutSuccess action if call was successfull', () => {
        const putDescriptor = logoutSagaGenerator.next().value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(logoutSuccess())
        )

        expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    })

    it('should call refreshtoken if localstorage(userid) is set and there is responserror with a 401 error', () => {
        localStorage.setItem('userId', 'userId')

        const responseError = Response.error()
        // @ts-ignore
        responseError.status = 401

        const response = new ResponseError(responseError, 'Some error')

        const putDescriptor = logoutSagaGenerator.throw(response).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(
                getRefreshTokenRequest(localStorage.getItem('userId') as string)
            )
        )
    })

    it('should call the logoutRequest if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')

        const putDescriptor = logoutSagaGenerator.throw(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(logoutRequest()))
    })

    it('should call the setError and logoutError action if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        logoutSagaGenerator.throw(response).value
        const putDescriptorSecondError = logoutSagaGenerator.next(response)
            .value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorSecondError).toEqual(put(logoutError(response)))

        const putDescriptorThirdError = logoutSagaGenerator.next(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorThirdError).toEqual(put(setError(response)))
    })
})
