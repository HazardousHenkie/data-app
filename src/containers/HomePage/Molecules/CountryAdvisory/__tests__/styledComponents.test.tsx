import React from 'react'
import { render } from 'utils/test-utils'

import CardStyled, {
    CardBottomTypography,
    StyledLink
} from '../styledComponents'

import 'jest-styled-components'

describe('<CardStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<CardStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<CardStyled />)

        expect(container.tagName).toBe('DIV')
    })
})

describe('<StyledLink />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<StyledLink>Children</StyledLink>)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <A> tag', () => {
        const { container } = render(<StyledLink>Children</StyledLink>)

        expect(container.querySelector('A')).toBeInTheDocument()
    })
})

describe('<CardBottomTypography />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<CardBottomTypography />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <P> tag', () => {
        const { container } = render(<CardBottomTypography />)

        expect(container.querySelector('P')).toBeInTheDocument()
    })
})
