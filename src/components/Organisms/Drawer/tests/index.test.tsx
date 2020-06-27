import React from 'react'
import { render } from 'utils/test-utils'

import Drawer from '../index'

describe('<Drawer />', () => {
    it('should render like snapshot', () => {
        const component = render(<Drawer />)

        expect(component).toMatchSnapshot()
    })
})
