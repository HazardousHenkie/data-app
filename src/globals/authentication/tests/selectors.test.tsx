import {
    selectAuthenticationData,
    makeSelectLoggedIn,
    makeSelectLoader,
    makeSelectUser
} from '../selectors'

import initialAuthenticationState from '../constants'

describe('selectAuthenticationData', () => {
    it('should select the authentication state', () => {
        const mockedState: any = {
            authenticationData: {
                ...initialAuthenticationState
            }
        }
        expect(selectAuthenticationData(mockedState)).toEqual(
            initialAuthenticationState
        )
    })
})

describe('makeSelectLoggedIn', () => {
    const dataSelector = makeSelectLoggedIn()

    it('should select the data', () => {
        const mockedState = {
            authenticationData: {
                loggedIn: initialAuthenticationState.loggedIn
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialAuthenticationState.loggedIn
        )
    })
})

describe('makeSelectLoader', () => {
    const dataSelector = makeSelectLoader()

    it('should select the data', () => {
        const mockedState = {
            authenticationData: {
                loading: initialAuthenticationState.loading
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialAuthenticationState.loading
        )
    })
})

describe('makeSelectUser', () => {
    const dataSelector = makeSelectUser()

    it('should select the data', () => {
        const mockedState = {
            authenticationData: {
                user: initialAuthenticationState.user
            }
        }

        expect(dataSelector(mockedState)).toEqual(
            initialAuthenticationState.user
        )
    })
})
