import React from 'react'

import { render } from 'utils/test-utils'

import GoogleLoginButton from '../index'

describe('<GoogleLogoutButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<GoogleLoginButton />)

        expect(component).toMatchSnapshot()
    })
})
