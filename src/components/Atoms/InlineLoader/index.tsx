import React from 'react'

import CircularProgress, {
    CircularProgressProps
} from '@material-ui/core/CircularProgress'
import LoaderWrapper from './styledComponents'

const InlineLoader: React.FC<CircularProgressProps> = props => {
    return (
        <LoaderWrapper data-testid="inlineLoader">
            <CircularProgress {...props} color="inherit" />
        </LoaderWrapper>
    )
}

export default InlineLoader
