import React from 'react'
import { render } from 'utils/test-utils'

import SideDrawer from '../index'

describe('<SideDrawer />', () => {
    it('should render like snapshot', () => {
        const component = render(<SideDrawer />)

        expect(component).toMatchSnapshot()
    })
})
