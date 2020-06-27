import React from 'react'
import { render } from 'utils/test-utils'

import Loader from '../index'

describe('<Loader />', () => {
    it('should render like snapshot', () => {
        const component = render(<Loader />)
        expect(component).toMatchSnapshot()
    })
})
