import React from 'react'
import { render } from 'utils/test-utils'

import HomePage from '../index'

describe('<HomePage />', () => {
    it('should render like snapshot', () => {
        const component = render(<HomePage />)

        expect(component).toMatchSnapshot()
    })
})
