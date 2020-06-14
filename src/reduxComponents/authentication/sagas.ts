import { takeLatest } from 'redux-saga/effects'

import ActionTypesLogin from './login/constants'
import ActionTypesLogout from './logout/constants'

import loginSaga from './login/saga'
import logoutSaga from './logout/saga'

export default function* authenticationRootSaga() {
    yield takeLatest(ActionTypesLogin.LOGIN_REQUEST, loginSaga)
    yield takeLatest(ActionTypesLogout.LOGOUT_REQUEST, logoutSaga)
}
