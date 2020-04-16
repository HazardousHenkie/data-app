import React from 'react'

import { TextFieldProps } from '@material-ui/core/TextField'
import TextFieldStyled from './styledComponents'

const InputField: React.FC<Omit<TextFieldProps, 'outlined'>> = props => {
    return <TextFieldStyled {...props} variant="outlined" />
}

export default InputField
