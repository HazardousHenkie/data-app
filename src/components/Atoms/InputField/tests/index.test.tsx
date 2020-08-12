import React from 'react'
import { render } from 'utils/test-utils'

import InputField from '../index'

describe('<InputField />', () => {
    it('should render like snapshot', () => {
        const component = render(<InputField />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <input> tag', () => {
        const { container } = render(<InputField />)

        const input = container.querySelector('input')
        expect(input?.tagName).toEqual('INPUT')
    })
})
