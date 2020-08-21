import AuthenticationReducer from '../reducer'

import * as actionsRefreshToken from '../refreshToken/actions'
import * as actionsLogin from '../login/actions'
import * as actionsLogout from '../logout/actions'

import AuthenticationState from '../types'
import initialAuthenticationState from '../constants'

describe('AuthenticationReducer', () => {
    let state: AuthenticationState

    beforeEach(() => {
        state = initialAuthenticationState
    })

    it('should return the initial state', () => {
        const expectedResult = state
        expect(AuthenticationReducer(undefined, {} as any)).toEqual(
            expectedResult
        )
    })

    const expectedRequestResult = {
        ...initialAuthenticationState,
        loading: true
    }

    it('should handle the getRefreshTokenRequest action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsRefreshToken.getRefreshTokenRequest(
                    initialAuthenticationState.user.id
                )
            )
        ).toEqual(expectedRequestResult)
    })

    it('should handle the loginRequest action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsLogin.loginRequest(initialAuthenticationState.user.id)
            )
        ).toEqual(expectedRequestResult)
    })

    it('should handle the logoutRequest action correctly', () => {
        expect(
            AuthenticationReducer(state, actionsLogout.logoutRequest())
        ).toEqual(expectedRequestResult)
    })

    const expectedSuccessResult = {
        ...initialAuthenticationState,
        loggedIn: true,
        loading: false,
        user: initialAuthenticationState.user
    }

    it('should handle the getRefreshTokenSuccess action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsRefreshToken.getRefreshTokenSuccess(
                    expectedSuccessResult.user
                )
            )
        ).toEqual(expectedSuccessResult)
    })

    it('should handle the loginSuccess action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsLogin.loginSuccess(expectedSuccessResult.user)
            )
        ).toEqual(expectedSuccessResult)
    })

    it('should handle the logoutSuccess action correctly', () => {
        const expectedResult = {
            ...initialAuthenticationState,
            loggedIn: false,
            loading: false
        }

        expect(
            AuthenticationReducer(state, actionsLogout.logoutSuccess())
        ).toEqual(expectedResult)
    })

    const expectedErrorResult = {
        ...initialAuthenticationState,
        loading: false,
        error: new Error('This is an error')
    }

    it('should handle the getRefreshTokenError action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsRefreshToken.getRefreshTokenError(
                    expectedErrorResult.error
                )
            )
        ).toEqual(expectedErrorResult)
    })

    it('should handle the loginError action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsLogin.loginError(expectedErrorResult.error)
            )
        ).toEqual(expectedErrorResult)
    })

    it('should handle the logoutError action correctly', () => {
        expect(
            AuthenticationReducer(
                state,
                actionsLogout.logoutError(expectedErrorResult.error)
            )
        ).toEqual(expectedErrorResult)
    })
})
