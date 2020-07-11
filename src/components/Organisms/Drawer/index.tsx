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

    return (
        <>
            <ClickIndicator
                data-testid="ClickIndicator"
                onClick={() => setOpenDrawer(true)}
            >
                <SwipeIndicatorInner data-testid="SwipeIndicatorInnerUp" />
            </ClickIndicator>

            <DrawerWrapper data-testid="drawer">
                <HandleBar data-testid="handleBar">
                    <SwipeIndicator
                        data-testid="swipeIndicator"
                        onClick={() => setOpenDrawer(true)}
                    >
                        <SwipeIndicatorInner data-testid="SwipeIndicatorInner" />
                    </SwipeIndicator>
                </HandleBar>

                <SwipeableDrawerStyled
                    anchor="bottom"
                    data-testid="swipeableDrawer"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    onOpen={() => setOpenDrawer(true)}
                >
                    <SwipeIndicator
                        data-testid="SwipeIndicator"
                        down
                        onClick={() => setOpenDrawer(false)}
                    >
                        <SwipeIndicatorInnerDown data-testid="SwipeIndicatorInnerDown" />
                    </SwipeIndicator>

                    <HandleBar data-testid="relativeHandleBar" relative />

                    {children}
                </SwipeableDrawerStyled>
            </DrawerWrapper>
        </>
    )
}

export default Drawer
