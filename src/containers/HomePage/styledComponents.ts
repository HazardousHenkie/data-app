import styled from 'styled-components'

import { Map } from 'react-leaflet'

export const StyledMap = styled(Map)`
  width: 100%;
  height: 100vh;
  filter: ${props => props.theme.mapFilter};
`
