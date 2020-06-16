import { action } from 'typesafe-actions'
import ActionTypes from '../constants'

import { getErrors, setError, removeError, setErrors } from '../actions'

describe('globalErrors Actions', () => {
    describe('getErrors', () => {
        it('should return the correct type.', () => {
            const expectedResult = action(ActionTypes.GET_ERRORS)

            expect(getErrors()).toEqual(expectedResult)
        })
    })

    describe('setError', () => {
        it('should return the correct type and pass the error', () => {
            const error = new Error('Something went wrong!')

            const expectedResult = action(ActionTypes.SET_ERROR, error)

            expect(setError(error)).toEqual(expectedResult)
        })
    })

    describe('removeError', () => {
        it('should return the correct type.', () => {
            const expectedResult = action(ActionTypes.REMOVE_ERROR)

            expect(removeError()).toEqual(expectedResult)
        })
    })

    describe('setErrors', () => {
        it('should return the correct type and pass the error', () => {
            const errors = [new Error('Something went wrong!')]

            const expectedResult = action(ActionTypes.SET_ERRORS, errors)

            expect(setErrors(errors)).toEqual(expectedResult)
        })
    })
})
