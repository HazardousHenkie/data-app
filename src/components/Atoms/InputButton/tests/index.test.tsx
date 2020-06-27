import React from 'react'
import { render } from 'utils/test-utils'

import InputButton from '../index'

describe('<InputButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<InputButton>children</InputButton>)

        expect(component).toMatchSnapshot()
    })
})
