import React, { useState } from 'react'

import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from 'react-google-login'

import { useTranslation } from 'react-i18next'

import InlineLoader from 'components/Atoms/InlineLoader'

import { useDispatch, useSelector } from 'react-redux'

import { createSelector } from 'reselect'

import { makeSelectLoader } from 'globals/authentication/selectors'

import { setError } from 'globals/globalErrors/actions'
import { loginRequest } from 'globals/authentication/login/actions'

import GoogleLoginWrapper from './styledComponents'

const stateSelector = createSelector(makeSelectLoader(), loading => ({
    loading
}))

const GoogleLoginButton: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('loginButton')
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)

    const { loading } = useSelector(stateSelector)

    const onGoogleLoginRequest = () => {
        setGoogleLoading(true)
    }

    const googleResponseSuccess = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        setGoogleLoading(false)
        if ((response as GoogleLoginResponse).getAuthResponse().id_token) {
            dispatch(
                loginRequest(
                    (response as GoogleLoginResponse).getAuthResponse().id_token
                )
            )
        }
    }

    const googleResponseError = (response: { [key: string]: string }) => {
        setGoogleLoading(false)
        setError(new Error(response.error))
    }

    return (
        <div data-testid="googleLoginButton">
            {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
                <GoogleLoginWrapper data-testid="googleLoginWrapper">
                    {(loading || googleLoading) && <InlineLoader />}

                    <GoogleLogin
                        data-cy="googleLogin"
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onRequest={onGoogleLoginRequest}
                        buttonText={t('logout:button', 'Login')}
                        disabled={loading || googleLoading}
                        onSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLoginWrapper>
            )}
        </div>
    )
}

export default GoogleLoginButton
