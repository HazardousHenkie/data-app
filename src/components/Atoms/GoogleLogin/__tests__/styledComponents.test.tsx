import React from 'react'
import { render } from 'utils/test-utils'

import GoogleLoginWrapper from '../styledComponents'

import 'jest-styled-components'

describe('<GoogleLoginWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<GoogleLoginWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<GoogleLoginWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
