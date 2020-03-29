import React, { useState } from 'react'

import SwipeableDrawer, {
    SwipeableDrawerProps
} from '@material-ui/core/SwipeableDrawer'

import {
    HandleBar,
    DrawerWrapper,
    ClickIndicator,
    SwipeIndicator,
    SwipeIndicatorInner,
    SwipeIndicatorInnerDown
} from './styledComponents'

const Drawer: React.FC<Omit<
    SwipeableDrawerProps,
    'open' | 'onClose' | 'onOpen'
>> = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ): void => {
        if (
            event &&
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
            <ClickIndicator onClick={toggleDrawer(true)}>
                <SwipeIndicatorInner />
            </ClickIndicator>

            <DrawerWrapper>
                <HandleBar>
                    <SwipeIndicator onClick={toggleDrawer(true)}>
                        <SwipeIndicatorInner />
                    </SwipeIndicator>
                </HandleBar>

                <SwipeableDrawer
                    anchor="bottom"
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <SwipeIndicator down onClick={toggleDrawer(false)}>
                        <SwipeIndicatorInnerDown />
                    </SwipeIndicator>

                    <HandleBar relative />

                    {children}
                </SwipeableDrawer>
            </DrawerWrapper>
        </>
    )
}

export default Drawer
