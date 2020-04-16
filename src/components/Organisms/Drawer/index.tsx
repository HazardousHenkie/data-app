import React, { useState, useEffect } from 'react'

import { SwipeableDrawerProps } from '@material-ui/core/SwipeableDrawer'

import {
    SwipeableDrawerStyled,
    HandleBar,
    DrawerWrapper,
    ClickIndicator,
    SwipeIndicator,
    SwipeIndicatorInner,
    SwipeIndicatorInnerDown
} from './styledComponents'

interface DrawerCustomProps {
    externalOpenDrawer: any
}

const Drawer: React.FC<DrawerCustomProps &
    Omit<SwipeableDrawerProps, 'open' | 'onClose' | 'onOpen'>> = ({
    externalOpenDrawer,
    children
}) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        if (externalOpenDrawer) {
            setOpenDrawer(true)
        }
    }, [externalOpenDrawer])

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
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

                <SwipeableDrawerStyled
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
                </SwipeableDrawerStyled>
            </DrawerWrapper>
        </>
    )
}

export default Drawer
