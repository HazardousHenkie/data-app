import React from 'react'
import { render } from 'utils/test-utils'

import SearchField from '../index'

// finish this one
describe('<SearchField />', () => {
    it('should render like snapshot', () => {
        const component = render(<SearchField setValue={() => {}} />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <input> tag', () => {
        const { container } = render(<SearchField setValue={() => {}} />)

        const input = container.querySelector('input')
        expect(input?.tagName).toEqual('INPUT')
    })
})
