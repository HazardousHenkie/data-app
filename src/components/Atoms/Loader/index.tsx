import React from 'react'
import CircularProgress, {
    CircularProgressProps
} from '@material-ui/core/CircularProgress'

import BackdropStyled from './styledComponents'

const Loader: React.FC<CircularProgressProps> = props => {
    return (
        <BackdropStyled open>
            <CircularProgress {...props} color="inherit" />
        </BackdropStyled>
    )
}

export default Loader
