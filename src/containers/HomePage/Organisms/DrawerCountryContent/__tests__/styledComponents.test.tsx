import React from 'react'

import { render } from 'utils/test-utils'

import HeaderStyled, { FavoriteCountryButtonWrapper } from '../styledComponents'

import 'jest-styled-components'

describe('<Header />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<HeaderStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <H1> tag', () => {
        const { container } = render(<HeaderStyled />)

        expect(container.querySelector('H1')).toBeInTheDocument()
    })
})

describe('<FavoriteCountryButtonWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<FavoriteCountryButtonWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = render(<FavoriteCountryButtonWrapper />)

        expect(container.tagName).toBe('DIV')
    })
})
