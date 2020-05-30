import React, { useState, useEffect, ComponentType } from 'react'

import { GoogleLogout, GoogleLogoutProps } from 'react-google-login'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'

import { createStructuredSelector } from 'reselect'

import {
    makeSelectError,
    makeSelectLoader
} from 'reduxComponents/authentication/selectors'

import { logoutRequest } from 'reduxComponents/authentication/logout/actions'

import GoogleLogoutWrapper from './styledComponents'

const stateSelector = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoader()
})

const GoogleLogoutButton: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('logoutButton')
    const [open, setOpen] = useState<boolean>(false)
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const { error: fetchingError, loading } = useSelector(stateSelector)

    useEffect(() => {
        if (fetchingError) {
            setOpen(true)
            setError(fetchingError.toString())
        }
    }, [fetchingError])

    const onGoogleLogoutRequest = () => {
        setGoogleLoading(true)
    }

    const googleResponseSuccess = () => {
        dispatch(logoutRequest())
        setGoogleLoading(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const googleResponseError = () => {
        setOpen(true)
        t('logout:error', 'Logout error')
        setError('logout failed')
        setGoogleLoading(false)
    }

    interface GoogleLogoutCustomButtonProps extends GoogleLogoutProps {
        customOnClick: () => void
    }

    const GoogleLogoutCustomButton: React.FC<GoogleLogoutCustomButtonProps> = ({
        customOnClick,
        ...props
    }) => {
        return (
            <div
                onClick={customOnClick}
                onKeyDown={customOnClick}
                role="button"
                tabIndex={0}
            >
                <GoogleLogout {...props} />
            </div>
        )
    }

    return (
        <>
            {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
                <GoogleLogoutWrapper>
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

                    <GoogleLogoutCustomButton
                        customOnClick={onGoogleLogoutRequest}
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText={t('logout:button', 'Logout')}
                        disabled={loading || googleLoading}
                        onLogoutSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLogoutWrapper>
            )}
        </>
    )
}

export default GoogleLogoutButton
