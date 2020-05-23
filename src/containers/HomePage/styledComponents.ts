import styled from 'styled-components'

import * as Leaflet from 'leaflet'
import { Map, MapProps } from 'react-leaflet'

const StyledMap = styled(Map)<
    MapProps & { ref: React.RefObject<Map<MapProps, Leaflet.Map>> }
>`
    width: 100%;
    height: 100vh;
    filter: ${({ theme }) => theme.palette.primary.contrastText};
`

export default StyledMap
