import { makeSelectInitialErrors, makeSelectErrors } from '../selectors'
import { initialErrorsState } from '../constants'

describe('globalErrors', () => {
    it('should select the errors state', () => {
        const mockedState: any = {
            errors: {
                errors: initialErrorsState.errors
            }
        }
        expect(makeSelectInitialErrors(mockedState)).toEqual(initialErrorsState)
    })
})

describe('makeSelectErrors', () => {
    const dataSelector = makeSelectErrors()

    it('should select the data', () => {
        const mockedState = {
            errors: {
                errors: initialErrorsState.errors
            }
        }

        expect(dataSelector(mockedState)).toEqual(initialErrorsState.errors)
    })
})
