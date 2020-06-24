import React, { useState, useEffect } from 'react'

// import Snackbar from '@material-ui/core/Snackbar'
// import InfoMessage from 'components/Atoms/InfoMessage'

// import { useDispatch, useSelector } from 'react-redux'

// import { createSelector } from 'reselect'

// const stateSelector = createSelector(makeSelectErrors(), errors => ({
//     errors
// }))

const ErrorSnackbars: React.FC = () => {
    // const { errors } = useSelector(stateSelector)
    // const [open, setOpen] = useState<boolean>(false)

    // useEffect(() => {
    //     if (errors.length !== 0) {
    //         setOpen(true)
    //     }
    // }, [errors])

    // const handleClose = () => {
    //     setOpen(false)
    // }

    return (
        <>
            {/* {errors.map(error => (
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
            ))} */}
        </>
    )
}

export default ErrorSnackbars
