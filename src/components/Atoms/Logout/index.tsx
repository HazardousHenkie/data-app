import React, { useState, useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'
import request from 'utils/request'

// fix this logout remove logout below
// const googleResponseSuccess = (
//     response: GoogleLoginResponse | GoogleLoginResponseOffline
// ) => {
//     setGoogleLoading(false)
//     if ((response as GoogleLoginResponse).getAuthResponse().id_token) {
//         dispatch(
//             loginRequest(
//                 (response as GoogleLoginResponse).getAuthResponse().id_token
//             )
//         )
//     }
// }

import { useDispatch } from 'react-redux'
// import setUser from 'reduxComponents/User/actions'

const LogoutButton: React.FC = () => {
    // check if we can do this in a custom hook
    // do something with error message
    // do something with success message

    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false)

    const [fetchingError, setFetchingError] = useState<Error>()
    const [logoutResponse, setlogoutResponse] = useState<object>()

    // const { loading, fetchingError, logoutResponse } = useLogoutResponse()

    useEffect(() => {
        // if (logoutResponse) {
        //     dispatch(setUser(logoutResponse))
        // }
    }, [logoutResponse, dispatch])

    useEffect(() => {
        if (fetchingError) {
            setOpen(true)
        }
    }, [fetchingError])

    const handleClose = () => {
        setOpen(false)
    }

    const onClickLogout = async () => {
        try {
            const result = await request(`/.netlify/functions/logout`, {
                method: 'POST'
            })

            if (result) {
                setlogoutResponse(result)
            }
        } catch (error) {
            const errorResponseMessage = await error.response.json()
            setFetchingError(errorResponseMessage)
        }
    }

    return (
        <>
            {/* {loading && <InlineLoader />} */}
            {fetchingError && (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    onClose={handleClose}
                >
                    <InfoMessage
                        message={fetchingError.message}
                        severity="error"
                    />
                </Snackbar>
            )}

            <button type="button" onClick={onClickLogout}>
                logout
            </button>
        </>
    )
}

export default LogoutButton
