import React from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const InputField: React.FC<Omit<TextFieldProps, 'variant'>> = () => {
    return <TextField variant="filled" />
}

export default InputField
