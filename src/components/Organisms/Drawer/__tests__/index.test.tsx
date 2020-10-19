import React from 'react'
import { render, fireEvent } from 'utils/test-utils'

import DrawerContext from 'components/Organisms/Drawer/DrawerContext'
import Drawer from '../index'

describe('<Drawer />', () => {
    it('should render like snapshot', () => {
        const component = render(<Drawer />)

        expect(component).toMatchSnapshot()
    })

    it('should render ClickIndicator', () => {
        const { getByTestId } = render(<Drawer />)

        const clickIndicator = getByTestId('ClickIndicator')

        expect(clickIndicator.tagName).toEqual('DIV')
    })

    it('should render SwipeIndicatorInner as an SVG', () => {
        const { getByTestId } = render(<Drawer />)

        const clickIndicator = getByTestId('SwipeIndicatorInnerUp')

        expect(clickIndicator.tagName).toEqual('svg')
    })

    it('should call toggleDrawer when ClickIndicator is clicked', () => {
        const toggleDrawer = jest.fn()

        const { getByTestId } = render(<Drawer onClick={toggleDrawer()} />)
        const clickIndicator = getByTestId('ClickIndicator')

        fireEvent.click(clickIndicator)

        expect(toggleDrawer).toHaveBeenCalledTimes(1)
    })

    it('should render DrawerWrapper as a div', () => {
        const { getByTestId } = render(<Drawer />)

        const DrawerWrapper = getByTestId('drawer')

        expect(DrawerWrapper.tagName).toEqual('DIV')
    })

    it('should render handleBar as an div', () => {
        const { getByTestId } = render(<Drawer />)

        const handleBar = getByTestId('handleBar')

        expect(handleBar.tagName).toEqual('DIV')
    })

    it('should render SwipeIndicatorInner as an SVG', () => {
        const { getByTestId } = render(<Drawer />)

        const clickIndicator = getByTestId('SwipeIndicatorInner')

        expect(clickIndicator.tagName).toEqual('svg')
    })

    it('should call toggleDrawer when swipeIndicator is clicked', () => {
        const toggleDrawer = jest.fn()

        const { getByTestId } = render(<Drawer onClick={toggleDrawer()} />)
        const swipeIndicator = getByTestId('swipeIndicator')

        fireEvent.click(swipeIndicator)

        expect(toggleDrawer).toHaveBeenCalledTimes(1)
    })

    it('should render SwipeableDrawerStyled as an div when openDrawer from context is true', () => {
        const { getByTestId } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer />
            </DrawerContext.Provider>
        )

        const clickIndicator = getByTestId('swipeableDrawer')

        expect(clickIndicator.tagName).toEqual('DIV')
    })

    it('should render SwipeIndicatorInnerDown as an SVG', () => {
        const { getByTestId } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer />
            </DrawerContext.Provider>
        )
        const clickIndicator = getByTestId('SwipeIndicatorInnerDown')

        expect(clickIndicator.tagName).toEqual('svg')
    })

    it('should call toggleDrawer when swipeableDrawer is clicked', () => {
        const { getByTestId } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer />
            </DrawerContext.Provider>
        )

        const clickIndicator = getByTestId('swipeableDrawer')

        expect(clickIndicator.tagName).toEqual('DIV')
    })

    it('should render SwipeIndicator inside SwipeableDrawerStyled as an div', () => {
        const toggleDrawer = jest.fn()

        const { getByTestId } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer onClick={toggleDrawer()} />
            </DrawerContext.Provider>
        )

        const clickIndicator = getByTestId('swipeableDrawer')

        fireEvent.click(clickIndicator)

        expect(toggleDrawer).toHaveBeenCalledTimes(1)
    })

    it('should render handleBar inside SwipeableDrawerStyled as an div', () => {
        const { getByTestId } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer />
            </DrawerContext.Provider>
        )

        const clickIndicator = getByTestId('relativeHandleBar')

        expect(clickIndicator.tagName).toEqual('DIV')
    })

    it('should render children inside SwipeableDrawerStyled', () => {
        const { getByText } = render(
            <DrawerContext.Provider
                value={{ openDrawer: true, setOpenDrawer: () => {} }}
            >
                <Drawer>
                    <div>children</div>
                </Drawer>
            </DrawerContext.Provider>
        )

        expect(getByText('children')).toBeInTheDocument()
    })
})
