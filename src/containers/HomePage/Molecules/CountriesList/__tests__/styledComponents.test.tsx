import React from 'react'
import { render } from 'utils/test-utils'

import { Theme } from '@material-ui/core/styles'
import lightTheme, { darkTheme } from 'styles/themeStyles'

import 'jest-styled-components'

import CountriesListDiv from '../styledComponents'

const renderWithTheme = (theme?: Theme) =>
    render(<CountriesListDiv theme={theme || lightTheme} />)

describe('<LoaderWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = renderWithTheme()
        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = renderWithTheme()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('should use theme from props', () => {
    it('should render light variable when LightTheme is set', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toHaveStyle(
            `background: ${lightTheme.palette.primary.light}`
        )

        expect(container.firstChild).toHaveStyleRule(
            'background-color',
            lightTheme.palette.primary.light,
            {
                modifier: '::-webkit-scrollbar'
            }
        )

        expect(container.firstChild).toHaveStyleRule(
            'background',
            lightTheme.palette.primary.dark,
            {
                modifier: ' ::-webkit-scrollbar-thumb'
            }
        )
    })

    it('should render light variable when darkmode is set', () => {
        const { container } = renderWithTheme(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `background: ${darkTheme.palette.primary.light}`
        )

        expect(container.firstChild).toHaveStyleRule(
            'background-color',
            darkTheme.palette.primary.light,
            {
                modifier: '::-webkit-scrollbar'
            }
        )

        expect(container.firstChild).toHaveStyleRule(
            'background',
            darkTheme.palette.primary.dark,
            {
                modifier: ' ::-webkit-scrollbar-thumb'
            }
        )
    })
})
