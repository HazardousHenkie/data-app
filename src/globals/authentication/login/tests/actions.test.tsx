import { action } from 'typesafe-actions'
import ActionTypes from '../constants'
import { initialUserState } from '../../constants'

import { loginRequest, loginSuccess, loginError } from '../actions'

describe('login Actions', () => {
    describe('loginRequest', () => {
        it('should return the correct type and pass loginToken', () => {
            const loginToken = 'loginToken'

            const expectedResult = action(ActionTypes.LOGIN_REQUEST, loginToken)

            expect(loginRequest(loginToken)).toEqual(expectedResult)
        })
    })

    describe('loginSuccess', () => {
        it('should return the correct type and pass user data', () => {
            const expectedResult = action(
                ActionTypes.LOGIN_SUCCESS,
                initialUserState
            )

            expect(loginSuccess(initialUserState)).toEqual(expectedResult)
        })
    })

    describe('loginError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new Error('Something went wrong!')

            const expectedResult = action(ActionTypes.LOGIN_ERROR, error)

            expect(loginError(error)).toEqual(expectedResult)
        })
    })
})
