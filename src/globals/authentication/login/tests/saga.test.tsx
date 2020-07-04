import { put } from 'redux-saga/effects'

import { ActionType as typeSafeAction } from 'typesafe-actions'
import { ResponseError } from 'utils/request'
import { setError } from 'globals/globalErrors/actions'
import ActionTypes from '../constants'

import { loginRequest, loginSuccess, loginError } from '../actions'

import loginSaga from '../saga'

describe('loginSaga Saga', () => {
    let loginSagaGenerator: Generator
    let callDescriptor: Response

    const params = {
        type: ActionTypes.LOGIN_REQUEST,
        payload: 'userId'
    }

    beforeEach(() => {
        loginSagaGenerator = loginSaga(
            params as typeSafeAction<typeof loginRequest>
        )

        callDescriptor = loginSagaGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the loginSuccess action if call was successfull', () => {
        const response = { user: { id: '', name: '' } }
        const putDescriptor = loginSagaGenerator.next(response).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(loginSuccess(response.user))
        )
    })

    it('should call the loginError and setError action if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')
        const putDescriptor = loginSagaGenerator.throw(response).value
        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(loginError(response)))

        const putDescriptorSecondError = loginSagaGenerator.next(response).value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorSecondError).toEqual(put(setError(response)))
    })
})
