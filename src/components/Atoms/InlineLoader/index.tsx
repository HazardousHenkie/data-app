import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import LoaderWrapper from './styledComponents'

const InlineLoader: React.FC = () => {
    return (
        <LoaderWrapper>
            <CircularProgress color="inherit" />
        </LoaderWrapper>
    )
}

export default InlineLoader
