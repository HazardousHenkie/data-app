import React from 'react'
import { render } from 'utils/test-utils'

import LoaderWrapper from '../styledComponents'

import 'jest-styled-components'

describe('<LoaderWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<LoaderWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<LoaderWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
