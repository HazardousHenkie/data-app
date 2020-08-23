import React from 'react'

import { GoogleLogout } from 'react-google-login'

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

    const { loading } = useSelector(stateSelector)

    const googleResponseSuccess = () => {
        dispatch(logoutRequest())
    }

    const googleResponseError = () => {
        setError(new Error('Logout failed'))
    }

    return (
        <div data-testid="googleLogoutButton">
            {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
                <GoogleLogoutWrapper data-testid="googleLogoutWrapper">
                    {loading && <InlineLoader />}

                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText={t('logout:button', 'Logout')}
                        disabled={loading}
                        onLogoutSuccess={googleResponseSuccess}
                        onFailure={googleResponseError}
                    />
                </GoogleLogoutWrapper>
            )}
        </div>
    )
}

export default GoogleLogoutButton
