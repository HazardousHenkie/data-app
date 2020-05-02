import React, { useState, useEffect } from 'react'

import serialize from 'serialize-javascript'

import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from 'react-google-login'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'
import request from 'utils/request'

import { useDispatch } from 'react-redux'
import setUser from 'reduxComponents/User/actions'

import GoogleLoginWrapper from './styledComponents'

const useGoogleAuthResponse = (googleResponseToken: string | undefined) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<Error>()
    const [googleAuthServerResponse, setGoogleAuthServerResponse] = useState<
        object
    >()

    useEffect(() => {
        if (googleResponseToken && googleResponseToken !== '') {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const loginObject = { authToken: googleResponseToken }

                    const result = await request(
                        `/.netlify/functions/googleLogin`,
                        {
                            method: 'POST',
                            body: serialize(loginObject)
                        }
                    )

                    if (result) {
                        setGoogleAuthServerResponse(result)
                    }
                } catch (error) {
                    setFetchingError(error)
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [googleResponseToken])

    return { loading, fetchingError, googleAuthServerResponse }
}

const GoogleLoginButton: React.FC = () => {
    const dispatch = useDispatch()
    const [googleResponseToken, setGoogleResponseToken] = useState<string>()
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const [error, setError] = useState<string>()

    const {
        loading,
        fetchingError,
        googleAuthServerResponse
    } = useGoogleAuthResponse(googleResponseToken)

    const onGoogleLoginRequest = () => {
        setGoogleLoading(true)
    }

    useEffect(() => {
        if (googleAuthServerResponse) {
            dispatch(setUser(googleAuthServerResponse))
        }
    }, [googleAuthServerResponse, dispatch])

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
        if ((response as GoogleLoginResponse).accessToken) {
            setGoogleResponseToken(
                (response as GoogleLoginResponse).accessToken
            )
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const googleResponseError = (response: Record<string, string>) => {
        setGoogleLoading(false)
        setOpen(true)
        setError(response.error)
    }

    return (
        <>
            {process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID && (
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
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        onRequest={onGoogleLoginRequest}
                        buttonText="Login"
                        disabled={googleLoading}
                        // isSignedIn={true}
                        onSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLoginWrapper>
            )}
        </>
    )
}

export default GoogleLoginButton
