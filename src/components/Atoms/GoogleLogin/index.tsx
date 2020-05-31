import React, { useState } from 'react'

import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from 'react-google-login'

import { useTranslation } from 'react-i18next'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'

import { useDispatch, useSelector } from 'react-redux'

import { createSelector } from 'reselect'

import { makeSelectLoader } from 'reduxComponents/authentication/selectors'

import { loginRequest } from 'reduxComponents/authentication/login/actions'

import GoogleLoginWrapper from './styledComponents'

const stateSelector = createSelector(makeSelectLoader(), loading => ({
    loading
}))

const GoogleLoginButton: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('loginButton')
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>()

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

    const handleClose = () => {
        setOpen(false)
    }

    const googleResponseError = (response: { [key: string]: string }) => {
        setGoogleLoading(false)
        setOpen(true)
        setError(response.error)
    }

    return (
        <>
            {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
                <GoogleLoginWrapper>
                    {(loading || googleLoading) && <InlineLoader />}

                    {error && (
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                            onClose={handleClose}
                        >
                            <InfoMessage message={error} severity="error" />
                        </Snackbar>
                    )}

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onRequest={onGoogleLoginRequest}
                        buttonText={t('logout:button', 'Login')}
                        disabled={loading || googleLoading}
                        onSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLoginWrapper>
            )}
        </>
    )
}

export default GoogleLoginButton
