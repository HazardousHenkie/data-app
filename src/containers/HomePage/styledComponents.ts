import styled from 'styled-components'

import { Map, MapProps } from 'react-leaflet'

export const StyledMap = styled(Map)<any>`
  width: 100%;
  height: 100vh;
  filter: ${props => props.theme.mapFilter};
`
