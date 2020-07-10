import React from 'react'
import { render } from 'utils/test-utils'

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

    // check useContext (wrapp context if possible )
    // check children
})
