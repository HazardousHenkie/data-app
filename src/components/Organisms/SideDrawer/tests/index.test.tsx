import React from 'react'
import { render, fireEvent } from 'utils/test-utils'

import StyledDrawer, { DrawerChildren } from '../styledComponents'

import SideDrawer from '../index'

describe('<SideDrawer />', () => {
    it('should render like snapshot', () => {
        const component = render(<SideDrawer />)

        expect(component).toMatchSnapshot()
    })

    it('should render IconButtonStyled', () => {
        const { getByTestId } = render(<SideDrawer />)

        const IconButtonStyled = getByTestId('IconButtonStyled')

        expect(IconButtonStyled).toBeInTheDocument()
    })

    it('should render aria-label on IconButtonStyled', () => {
        const { getByLabelText } = render(<SideDrawer />)

        const listLabel = getByLabelText('open drawer')

        expect(listLabel).toBeInTheDocument()
    })

    it('should render StyledDrawer when IconButtonStyled is clicked', () => {
        const { getByTestId } = render(<SideDrawer />)

        const IconButtonStyled = getByTestId('IconButtonStyled')
        fireEvent.click(IconButtonStyled)
        const StyledDrawerButton = getByTestId('StyledDrawer')

        expect(StyledDrawerButton).toBeInTheDocument()
    })

    it('It shouldn render StyledDrawer DrawerChildren', () => {
        const { getByText, getByTestId } = render(
            <SideDrawer>
                <StyledDrawer anchor="left" open>
                    <DrawerChildren>children</DrawerChildren>
                </StyledDrawer>
            </SideDrawer>
        )

        const IconButtonStyled = getByTestId('IconButtonStyled')
        fireEvent.click(IconButtonStyled)

        expect(getByText('children')).toBeInTheDocument()
    })
})
