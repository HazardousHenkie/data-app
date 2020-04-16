import React from 'react'

import { Alert } from '@material-ui/lab'

type ErrorProps = {
    message: string
    severity?: 'success' | 'info' | 'warning' | 'error' | undefined
}

const InfoMessage: React.FC<ErrorProps> = ({ message, severity }) => {
    return <Alert severity={severity}>{message}</Alert>
}

export default InfoMessage
