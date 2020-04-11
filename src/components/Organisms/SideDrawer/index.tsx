import React, { useState } from 'react'

import { DrawerProps } from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import StyledDrawer from './styledComponents'

const SideDrawer: React.FC<Omit<DrawerProps, 'anchor' | 'onClose'>> = ({
    children
}) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setOpenDrawer(open)
    }

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
            >
                <MenuIcon />
            </IconButton>

            <StyledDrawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                {children}
            </StyledDrawer>
        </>
    )
}

export default SideDrawer
