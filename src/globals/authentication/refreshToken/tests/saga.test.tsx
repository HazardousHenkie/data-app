import { put } from 'redux-saga/effects'

import { ActionType as typeSafeAction } from 'typesafe-actions'
import { ResponseError } from 'utils/request'
import { setError } from 'globals/globalErrors/actions'
import ActionTypes from '../constants'

import {
    getRefreshTokenRequest,
    getRefreshTokenSuccess,
    getRefreshTokenError
} from '../actions'

import refreshTokenSaga from '../saga'

describe('globalAddErrorSaga Saga', () => {
    let refreshTokenGenerator: Generator
    let callDescriptor: Response
    const params = {
        type: ActionTypes.GET_REFRESH_TOKEN_REQUEST,
        payload: 'userId'
    }

    beforeEach(() => {
        refreshTokenGenerator = refreshTokenSaga(
            params as typeSafeAction<typeof getRefreshTokenRequest>
        )

        callDescriptor = refreshTokenGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the getRefreshTokenSuccess action if call was successfull', () => {
        const response = { user: { id: 0, name: '' } }
        const putDescriptor = refreshTokenGenerator.next(response).value

        expect(putDescriptor).toEqual(
            // eslint-disable-next-line redux-saga/no-unhandled-errors
            put(getRefreshTokenSuccess(response.user))
        )
    })

    it('should call the getRefreshTokenError and setError action if the response errors', () => {
        const response = new ResponseError(callDescriptor, 'Some error')
        const putDescriptor = refreshTokenGenerator.throw(response).value
        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptor).toEqual(put(getRefreshTokenError(response)))

        const putDescriptorSecondError = refreshTokenGenerator.next(response)
            .value

        // eslint-disable-next-line redux-saga/no-unhandled-errors
        expect(putDescriptorSecondError).toEqual(put(setError(response)))
    })
})
