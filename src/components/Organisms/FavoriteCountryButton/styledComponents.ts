import styled from 'styled-components'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

const HeartButtonWrapper = styled.div`
    position: relative;
`

export const FavoriteIconStyled = styled(FavoriteIcon)`
    font-size: 2rem;
`

export const FavoriteBorderIconStyled = styled(FavoriteBorderIcon)`
    font-size: 2rem;
`

export default HeartButtonWrapper
