import React from 'react'
import { render } from 'utils/test-utils'

import BackdropStyled from '../styledComponents'

import 'jest-styled-components'

describe('<BackdropStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<BackdropStyled open />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<BackdropStyled open />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
