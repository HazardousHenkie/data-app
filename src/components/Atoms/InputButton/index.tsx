import React from 'react'

import Button, { ButtonProps } from '@material-ui/core/Button'

const InputButton: React.FC<Omit<ButtonProps, 'contained'>> = props => {
    return <Button {...props} variant="contained" />
}

export default InputButton
