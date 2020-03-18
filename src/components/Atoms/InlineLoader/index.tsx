import React from 'react'

import { LoaderWrapper } from './styledComponents'

import CircularProgress from '@material-ui/core/CircularProgress'

const InlineLoader: React.FC = () => {
    return (
        <LoaderWrapper>
            <CircularProgress color="inherit" />
        </LoaderWrapper>
    )
}

export default InlineLoader
