import { takeLatest } from 'redux-saga/effects'

import ActionTypesErrors from 'globals/globalErrors/constants'
import ActionTypesRefreshToken from 'globals/authentication/refreshToken/constants'
import ActionTypesLogin from 'globals/authentication/login/constants'
import ActionTypesLogout from 'globals/authentication/logout/constants'
import ActionTypesFavoritedCountries from 'globals/favoritedCountriesList/constants'

import globalAddErrorSaga from 'globals/globalErrors/saga'
import loginSaga from 'globals/authentication/login/saga'
import logoutSaga from 'globals/authentication/logout/saga'
import refreshTokenSaga from 'globals/authentication/refreshToken/saga'
import favoritedCountriesSaga from 'globals/favoritedCountriesList/saga'
import authenticationRootSaga from '../sagas'

describe('signInSaga Saga', () => {
    const authenticationRootSagaData = authenticationRootSaga()

    it('should start task to watch for GET_REFRESH_TOKEN_REQUEST action.', () => {
        const takeLatestDescriptor = authenticationRootSagaData.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(
                ActionTypesRefreshToken.GET_REFRESH_TOKEN_REQUEST,
                refreshTokenSaga
            )
        )
    })

    it('should start task to watch for SET_ERROR action.', () => {
        const takeLatestDescriptor = authenticationRootSagaData.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(ActionTypesErrors.SET_ERROR, globalAddErrorSaga)
        )
    })

    it('should start task to watch for LOGIN_REQUEST action.', () => {
        const takeLatestDescriptor = authenticationRootSagaData.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(ActionTypesLogin.LOGIN_REQUEST, loginSaga)
        )
    })

    it('should start task to watch for LOGOUT_REQUEST action.', () => {
        const takeLatestDescriptor = authenticationRootSagaData.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(ActionTypesLogout.LOGOUT_REQUEST, logoutSaga)
        )
    })

    it('should start task to watch for GET_FAVORITED_COUNTRIES action.', () => {
        const takeLatestDescriptor = authenticationRootSagaData.next().value

        expect(takeLatestDescriptor).toEqual(
            takeLatest(
                ActionTypesFavoritedCountries.GET_FAVORITED_COUNTRIES,
                favoritedCountriesSaga
            )
        )
    })
})
