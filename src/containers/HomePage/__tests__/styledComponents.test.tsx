import React from 'react'

import { render } from 'utils/test-utils'

import { Theme } from '@material-ui/core/styles'
import lightTheme, { darkTheme } from 'styles/themeStyles'

import StyledMap from '../styledComponents'

import 'jest-styled-components'

const renderWithTheme = (theme?: Theme) =>
    render(
        <StyledMap theme={theme || lightTheme} ref={null as any}>
            children
        </StyledMap>
    )

describe('<StyledMap />', () => {
    it('should render and match the snapshot', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = renderWithTheme()

        expect(container.tagName).toBe('DIV')
    })
})

describe('should use theme from props', () => {
    it('should render light variable when LightTheme is set', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toHaveStyle(
            `filter: ${lightTheme.palette.primary.contrastText}`
        )
    })

    it('should render light variable when darkmode is set', () => {
        const { container } = renderWithTheme(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `filter: ${darkTheme.palette.primary.contrastText}`
        )
    })
})
