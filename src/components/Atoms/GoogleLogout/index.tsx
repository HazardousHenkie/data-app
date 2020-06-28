import React, { useState } from 'react'

import { GoogleLogout, GoogleLogoutProps } from 'react-google-login'

import InlineLoader from 'components/Atoms/InlineLoader'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'

import { createSelector } from 'reselect'

import { makeSelectLoader } from 'globals/authentication/selectors'

import { setError } from 'globals/globalErrors/actions'
import { logoutRequest } from 'globals/authentication/logout/actions'

import GoogleLogoutWrapper from './styledComponents'

const stateSelector = createSelector(makeSelectLoader(), loading => ({
    loading
}))

const GoogleLogoutButton: React.FC = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('logoutButton')
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)

    const { loading } = useSelector(stateSelector)

    const onGoogleLogoutRequest = () => {
        setGoogleLoading(true)
    }

    const googleResponseSuccess = () => {
        dispatch(logoutRequest())
    }

    const googleResponseError = () => {
        setError(new Error('Logout failed'))
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
                data-testid="googleLogoutButton"
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
                <GoogleLogoutWrapper data-testid="googleLogoutWrapper">
                    {(loading || googleLoading) && <InlineLoader />}

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
