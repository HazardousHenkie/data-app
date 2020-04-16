import styled from 'styled-components'

import { Map, MapProps } from 'react-leaflet'

const StyledMap = styled(Map)<MapProps>`
    width: 100%;
    height: 100vh;
    filter: ${({ theme }) => theme.palette.primary.contrastText};
`

export default StyledMap
