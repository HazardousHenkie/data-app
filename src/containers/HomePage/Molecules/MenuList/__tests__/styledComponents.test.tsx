import React from 'react'
import { render } from 'utils/test-utils'

import ListStyled from '../styledComponents'

import 'jest-styled-components'

describe('<ListStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<ListStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <UL> tag', () => {
        const { container } = render(<ListStyled />)

        expect(container.querySelector('UL')).toBeInTheDocument()
    })
})
