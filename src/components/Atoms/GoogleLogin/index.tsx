import React, { useState, useEffect } from 'react'

import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from 'react-google-login'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'

import { useDispatch, useSelector } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import {
    makeSelectError,
    makeSelectLoader
} from 'reduxComponents/authentication/selectors'

import { loginRequest } from 'reduxComponents/authentication/login/actions'

import GoogleLoginWrapper from './styledComponents'

const stateSelector = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const GoogleLoginButton: React.FC = () => {
    const dispatch = useDispatch()
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const { error: fetchingError, loading } = useSelector(stateSelector)

    const onGoogleLoginRequest = () => {
        setGoogleLoading(true)
    }

    useEffect(() => {
        if (fetchingError) {
            setOpen(true)
            setError(fetchingError.toString())
        }
    }, [fetchingError])

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

    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

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
                        buttonText="Login"
                        disabled={googleLoading}
                        onSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLoginWrapper>
            )}
        </>
    )
}

export default GoogleLoginButton
