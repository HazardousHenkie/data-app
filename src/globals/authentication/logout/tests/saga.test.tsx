import { put } from 'redux-saga/effects'

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

    it('should call the logoutError action if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')

        const putDescriptor = logoutSagaGenerator.throw(response).value
        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(logoutError(response)))

        const putDescriptorSecondError = logoutSagaGenerator.next(response)
            .value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorSecondError).toEqual(put(setError(response)))
    })
})
