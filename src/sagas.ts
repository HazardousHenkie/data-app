import { takeLatest } from 'redux-saga/effects'

import ActionTypesRefreshToken from 'globals/authentication/refreshToken/constants'
import ActionTypesLogin from 'globals/authentication/login/constants'
import ActionTypesLogout from 'globals/authentication/logout/constants'

import ActionTypesFavoritedCountries from 'globals/favoritedCountriesList/constants'

import loginSaga from 'globals/authentication/login/saga'
import logoutSaga from 'globals/authentication/logout/saga'
import refreshTokenSaga from 'globals/authentication/refreshToken/saga'

export default function* authenticationRootSaga() {
    yield takeLatest(
        ActionTypesRefreshToken.GET_REFRESH_TOKEN_REQUEST,
        refreshTokenSaga
    )
    yield takeLatest(ActionTypesLogin.LOGIN_REQUEST, loginSaga)
    yield takeLatest(ActionTypesLogout.LOGOUT_REQUEST, logoutSaga)
}
