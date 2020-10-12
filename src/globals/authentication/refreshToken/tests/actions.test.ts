import { action } from 'typesafe-actions'
import ActionTypes from '../constants'
import { initialUserState } from '../../constants'

import {
    getRefreshTokenRequest,
    getRefreshTokenSuccess,
    getRefreshTokenError
} from '../actions'

describe('refreshToken Actions', () => {
    describe('getRefreshTokenRequest', () => {
        it('should return the correct type and pass id', () => {
            const id = 'id'

            const expectedResult = action(
                ActionTypes.GET_REFRESH_TOKEN_REQUEST,
                id
            )

            expect(getRefreshTokenRequest(id)).toEqual(expectedResult)
        })
    })

    describe('getRefreshTokenSuccess', () => {
        it('should return the correct type and pass use data', () => {
            const expectedResult = action(
                ActionTypes.GET_REFRESH_TOKEN_SUCCESS,
                initialUserState
            )

            expect(getRefreshTokenSuccess(initialUserState)).toEqual(
                expectedResult
            )
        })
    })

    describe('getRefreshTokenError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new Error('Something went wrong!')

            const expectedResult = action(
                ActionTypes.GET_REFRESH_TOKEN_ERROR,
                error
            )

            expect(getRefreshTokenError(error)).toEqual(expectedResult)
        })
    })
})
