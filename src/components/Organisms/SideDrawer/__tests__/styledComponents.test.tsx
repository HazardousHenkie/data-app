import React from 'react'
import { render } from 'utils/test-utils'

import StyledDrawer, {
    DrawerChildren,
    IconButtonStyled
} from '../styledComponents'

import 'jest-styled-components'

describe('<StyledDrawer />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<StyledDrawer />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<StyledDrawer />)

        expect(container.tagName).toEqual('DIV')
    })
})

describe('<DrawerChildren />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<DrawerChildren />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<DrawerChildren />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('<IconButtonStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<IconButtonStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = render(<IconButtonStyled />)

        expect(container.firstElementChild?.tagName).toEqual('BUTTON')
    })
})
