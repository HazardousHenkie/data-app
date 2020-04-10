import React, { useState } from 'react'

import Drawer, { DrawerProps } from '@material-ui/core/Drawer'

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
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            {children}
        </Drawer>
    )
}

export default SideDrawer
