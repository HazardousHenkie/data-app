import React from 'react'
import { render } from 'utils/test-utils'

import GoogleLoginButton from '../index'

// finish this one
describe('<GoogleLoginButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<GoogleLoginButton />)

        expect(component).toMatchSnapshot()
    })
})
