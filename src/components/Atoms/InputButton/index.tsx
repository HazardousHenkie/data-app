import React from 'react'

import Button, { ButtonProps } from '@material-ui/core/Button'

// this one is not used
const InputButton: React.FC<Omit<ButtonProps, 'contained'>> = props => {
    return <Button {...props} variant="contained" />
}

export default InputButton
