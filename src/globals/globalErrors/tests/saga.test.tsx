import { put } from 'redux-saga/effects'

import { ActionType as typeSafeAction } from 'typesafe-actions'
import ActionTypes from '../constants'

import { setError, setErrors } from '../actions'
import globalAddErrorSaga from '../saga'

describe('globalAddErrorSaga Saga', () => {
    let errorsGenerator: Generator
    const params = {
        type: ActionTypes.SET_ERROR,
        payload: Error('test')
    }
    beforeEach(() => {
        errorsGenerator = globalAddErrorSaga(
            params as typeSafeAction<typeof setError>
        )

        const selectDescriptor = errorsGenerator.next().value
        expect(selectDescriptor).toMatchSnapshot()
    })

    it('should dispatch the setErrors action if it selects the errors successfully', () => {
        const errors = [params.payload]
        const putDescriptor = errorsGenerator.next(errors).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(setErrors([...errors, params.payload]))
        )
    })

    it('should call the setError action if the response errors', () => {
        const response = new Error('Some error')
        const putDescriptor = errorsGenerator.throw(response).value
        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(setError(response)))
    })
})
