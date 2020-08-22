import React from 'react'

import { render } from 'utils/test-utils'

import ErrorPageDiv, { StyledTypographyTitle } from '../styledComponents'

import 'jest-styled-components'

describe('<ErrorPageDiv />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<ErrorPageDiv />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = render(<ErrorPageDiv />)

        expect(container.tagName).toBe('DIV')
    })
})

describe('<StyledTypographyTitle />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<StyledTypographyTitle />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <P> tag', () => {
        const { container } = render(<StyledTypographyTitle />)

        expect(container.querySelector('P')).toBeInTheDocument()
    })
})
