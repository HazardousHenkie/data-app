import { put } from 'redux-saga/effects'

import { ActionType as typeSafeAction } from 'typesafe-actions'
import ActionTypes from '../constants'

import { setError, setErrors } from '../actions'
import { globalAddErrorSaga, globalRemoveErrorSaga } from '../saga'

describe('globalAddErrorSaga Saga', () => {
    let errorsGenerator: Generator
    const params = {
        type: ActionTypes.SET_ERROR,
        payload: new Error('some error')
    }

    beforeEach(() => {
        errorsGenerator = globalAddErrorSaga(
            params as typeSafeAction<typeof setError>
        )

        const selectDescriptor = errorsGenerator.next().value
        expect(selectDescriptor).toMatchSnapshot()
    })

    it('should dispatch the setErrors action if it selects the errors successfully', () => {
        const response = [new Error('some error')]
        const putDescriptor = errorsGenerator.next(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(setErrors(response)))
    })

    it('should call the setError action if the response errors', () => {
        const response = new Error('Some error')
        const putDescriptor = errorsGenerator.throw(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(setError(response)))
    })
})
