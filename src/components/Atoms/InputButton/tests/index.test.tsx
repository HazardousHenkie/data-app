import React from 'react'
import { render } from 'utils/test-utils'

import InputButton from '../index'

describe('<InputButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<InputButton />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <button> ', () => {
        const { container } = render(<InputButton />)

        const button = container.querySelector('button')
        expect(button?.tagName).toEqual('BUTTON')
    })
})
