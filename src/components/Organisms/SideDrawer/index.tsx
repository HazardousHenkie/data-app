import React, { useState } from 'react'

import { DrawerProps } from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'

import StyledDrawer, {
    DrawerChildren,
    IconButtonStyled
} from './styledComponents'

const SideDrawer: React.FC<Omit<DrawerProps, 'anchor' | 'onClose'>> = ({
    children
}) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
            <IconButtonStyled
                data-testid="IconButtonStyled"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpenDrawer(true)}
                edge="start"
            >
                <MenuIcon />
            </IconButtonStyled>

            <StyledDrawer
                data-testid="StyledDrawer"
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <DrawerChildren>{children}</DrawerChildren>
            </StyledDrawer>
        </>
    )
}

export default SideDrawer
