import React, { useState, useEffect } from 'react'

import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline
} from 'react-google-login'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'
import request from 'utils/request'

import GoogleLoginWrapper from './styledComponents'

const useGoogleAuthResponse = (googleResponseToken: string | undefined) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<Error>()
    const [googleAuthServerResponse, setGoogleAuthServerResponse] = useState<
        Record<string, any>
    >()

    useEffect(() => {
        if (googleResponseToken && googleResponseToken !== '') {
            console.log('hre')
            const fetchData = async () => {
                console.log(googleResponseToken)
                setLoading(true)
                try {
                    // change to new backend endpoint when created
                    // post googleresponsetoken
                    const result = (await request(
                        `https://restcountries.eu/rest/v2/all`
                    )) as Record<string, any>

                    if (result) {
                        setGoogleAuthServerResponse(result.data)
                    }
                } catch (error) {
                    if (error.response.status !== 404) {
                        setFetchingError(error)
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [googleResponseToken])

    return { loading, fetchingError, googleAuthServerResponse }
}

const GoogleLoginButton: React.FC = () => {
    const [googleResponseToken, setGoogleResponseToken] = useState<string>()
    const [open, setOpen] = useState<boolean>(false)

    // remove ''
    const [error, setError] = useState<string>('')

    const {
        loading,
        fetchingError,
        googleAuthServerResponse
    } = useGoogleAuthResponse(googleResponseToken)

    useEffect(() => {
        if (googleAuthServerResponse) {
            console.log(
                'dispatch based on positive server response/show error and logout on negative response'
            )
        }
    }, [googleAuthServerResponse])

    useEffect(() => {
        if (fetchingError) {
            setOpen(true)
            // check error string
            setError(fetchingError.toString())
        }
    }, [fetchingError])

    const googleResponseSuccess = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
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
        setOpen(true)
        setError(response.error)
    }

    return (
        <GoogleLoginWrapper>
            {loading && <InlineLoader />}

            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleClose}
            >
                <InfoMessage message={error} severity="error" />
            </Snackbar>

            {/* //set loading when first clicked */}
            <GoogleLogin
                // make client id secret
                clientId=""
                buttonText="Login"
                // isSignedIn={true}
                onSuccess={googleResponseSuccess}
                onFailure={googleResponseError}
            />
        </GoogleLoginWrapper>
    )
}

export default GoogleLoginButton
