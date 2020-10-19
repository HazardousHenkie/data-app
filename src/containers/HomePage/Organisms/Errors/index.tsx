import React, { useState, useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import InfoMessage from 'components/Atoms/InfoMessage'

import { removeError } from 'globals/globalErrors/actions'

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { makeSelectErrors } from 'globals/globalErrors/selectors'

const stateSelector = createSelector(makeSelectErrors(), errors => ({
    errors
}))

const ErrorSnackbars: React.FC = () => {
    const dispatch = useDispatch()
    const { errors } = useSelector(stateSelector)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (errors && errors.length !== 0) {
            setOpen(true)
        }
    }, [errors])

    const handleClose = () => {
        dispatch(removeError())
        setOpen(false)
    }

    return (
        <div data-testid="ErrorsSnackbarComponent">
            {errors.map((error, index) => (
                <Snackbar
                    data-testid="Snackbar"
                    key={error.message}
                    style={{ top: `${index * 50}px` }}
                    open={open}
                    autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    onExit={handleClose}
                    onClose={handleClose}
                >
                    <InfoMessage message={error.message} severity="error" />
                </Snackbar>
            ))}
        </div>
    )
}

export default ErrorSnackbars
