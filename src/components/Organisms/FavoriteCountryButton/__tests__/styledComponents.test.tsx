import React from 'react'
import { render } from 'utils/test-utils'

import HeartButtonWrapper, {
    FavoriteIconStyled,
    FavoriteBorderIconStyled
} from '../styledComponents'

import 'jest-styled-components'

describe('<HeartButtonWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<HeartButtonWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<HeartButtonWrapper />)

        expect(container.tagName).toBe('DIV')
    })
})

describe('<FavoriteIconStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<FavoriteIconStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = render(<FavoriteIconStyled />)

        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})

describe('<FavoriteBorderIconStyled />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<FavoriteBorderIconStyled />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = render(<FavoriteBorderIconStyled />)

        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
