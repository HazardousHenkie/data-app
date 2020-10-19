import React from 'react'
import { render } from 'utils/test-utils'

import GoogleLogoutWrapper from '../styledComponents'

import 'jest-styled-components'

describe('<GoogleLogoutWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<GoogleLogoutWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<GoogleLogoutWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
