import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import BackdropStyled from './styledComponents'

const Loader: React.FC = () => {
    return (
        <BackdropStyled open>
            <CircularProgress color="inherit" />
        </BackdropStyled>
    )
}

export default Loader
