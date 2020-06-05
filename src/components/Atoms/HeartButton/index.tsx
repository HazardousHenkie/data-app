import React from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'

interface HeartButtonProps {
    label: string
    heartOnClick: () => void
}

const HeartButton: React.FC<HeartButtonProps> = ({ label, heartOnClick }) => {
    return (
        <IconButton onClick={heartOnClick} aria-label={label}>
            <FavoriteBorderIcon />
        </IconButton>
    )
}

export default HeartButton
