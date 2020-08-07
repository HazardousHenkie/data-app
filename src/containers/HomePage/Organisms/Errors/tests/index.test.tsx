import React from 'react'
import { render } from 'utils/test-utils'

import ErrorSnackbars from '../index'

describe('<ErrorSnackbars />', () => {
    it('should render like snapshot', () => {
        const component = render(<ErrorSnackbars />)

        expect(component).toMatchSnapshot()
    })
})
