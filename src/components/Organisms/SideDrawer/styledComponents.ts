import styled from 'styled-components'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'

const StyledDrawer = styled(Drawer)`
    &&& {
        z-index: 1400 !important;
    }
`
export const DrawerChildren = styled.div`
    width: 250px;
`

export const IconButtonStyled = styled(IconButton)`
    padding-left: 18px;
`

export default StyledDrawer
