import React from 'react'
import { render } from 'utils/test-utils'

import InputField from '../index'

describe('<InputField />', () => {
    it('should render like snapshot', () => {
        const component = render(<InputField />)

        expect(component).toMatchSnapshot()
    })
})
