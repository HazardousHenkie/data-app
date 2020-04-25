import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const CardStyled = styled(Card)`
    position: relative;
`

export const CardBottomTypography = styled(Typography)`
    font-size: 0.75rem;
`

export const StyledLink = styled(Link)`
    margin-left: 5px;
    text-decoration: underline;
`

export default CardStyled
