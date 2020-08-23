import React from 'react'
import { render } from 'utils/test-utils'

import TextFieldStyled from '../styledComponents'

import 'jest-styled-components'

describe('<TextFieldStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<TextFieldStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <INPUT> tag', () => {
        const { container } = render(<TextFieldStyled />)

        expect(container.querySelector('input')).toBeInTheDocument()
    })
})
