import { action } from 'typesafe-actions'
import ActionTypes from '../constants'

import { logoutRequest, logoutSuccess, logoutError } from '../actions'

describe('logout Actions', () => {
    describe('logoutRequest', () => {
        it('should return the correct type', () => {
            const expectedResult = action(ActionTypes.LOGOUT_REQUEST)

            expect(logoutRequest()).toEqual(expectedResult)
        })
    })

    describe('logoutSuccess', () => {
        it('should return the correct type', () => {
            const expectedResult = action(ActionTypes.LOGOUT_SUCCESS)

            expect(logoutSuccess()).toEqual(expectedResult)
        })
    })

    describe('logoutError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new Error('Something went wrong!')

            const expectedResult = action(ActionTypes.LOGOUT_ERROR, error)

            expect(logoutError(error)).toEqual(expectedResult)
        })
    })
})
