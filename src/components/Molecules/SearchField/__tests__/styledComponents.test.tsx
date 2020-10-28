import React from 'react'
import { render } from 'utils/test-utils'

import InputFieldStyled from '../styledComponents'

import 'jest-styled-components'

describe('<InputFieldStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<InputFieldStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <INPUT> tag', () => {
        const { container } = render(<InputFieldStyled />)

        expect(container.querySelector('INPUT')).toBeInTheDocument()
    })
})
