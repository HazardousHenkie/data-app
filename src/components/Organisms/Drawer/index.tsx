import React, { useContext } from 'react'

import { SwipeableDrawerProps } from '@material-ui/core/SwipeableDrawer'

import DrawerContext from 'components/Organisms/Drawer/DrawerContext'

import {
    SwipeableDrawerStyled,
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
    const { openDrawer, setOpenDrawer } = useContext(DrawerContext)

    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open)
    }

    return (
        <>
            <ClickIndicator
                data-testid="ClickIndicator"
                onClick={() => toggleDrawer(true)}
            >
                <SwipeIndicatorInner data-testid="SwipeIndicatorInnerUp" />
            </ClickIndicator>

            <DrawerWrapper data-testid="drawer">
                <HandleBar>
                    <SwipeIndicator onClick={() => toggleDrawer(true)}>
                        <SwipeIndicatorInner />
                    </SwipeIndicator>
                </HandleBar>

                <SwipeableDrawerStyled
                    anchor="bottom"
                    open={openDrawer}
                    onClose={() => toggleDrawer(false)}
                    onOpen={() => toggleDrawer(true)}
                >
                    <SwipeIndicator down onClick={() => toggleDrawer(false)}>
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
