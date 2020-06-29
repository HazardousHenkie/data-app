import React from 'react'

import IconButton from '@material-ui/core/IconButton'

import InlineLoader from 'components/Atoms/InlineLoader'

import HeartButtonWrapper, {
    FavoriteIconStyled,
    FavoriteBorderIconStyled
} from './styledComponents'

interface HeartButtonProps {
    loading: boolean
    active: boolean
    label: string
    heartOnClick: () => void
}

const HeartButton: React.FC<HeartButtonProps> = ({
    loading,
    active,
    label,
    heartOnClick
}) => {
    return (
        <HeartButtonWrapper>
            {loading && <InlineLoader />}

            <IconButton onClick={heartOnClick} aria-label={label}>
                {active ? <FavoriteIconStyled /> : <FavoriteBorderIconStyled />}
            </IconButton>
        </HeartButtonWrapper>
    )
}

export default HeartButton