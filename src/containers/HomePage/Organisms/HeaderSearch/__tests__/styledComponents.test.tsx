import React from 'react'

import { css, ThemeProvider } from 'styled-components'

import { render } from 'utils/test-utils'

import variables from 'styles/variables'

import { Theme } from '@material-ui/core/styles'
import lightTheme, { darkTheme } from 'styles/themeStyles'

import TopBar, {
    CloseCountriesList,
    SearchFieldWrapper,
    RotateNinetyDegrees
} from '../styledComponents'

import 'jest-styled-components'

const renderWithTheme = (theme?: Theme) =>
    render(
        <ThemeProvider theme={theme || lightTheme}>
            <TopBar />
        </ThemeProvider>
    )

const renderCloseCountriesList = (theme?: Theme) =>
    render(<CloseCountriesList theme={theme || lightTheme} />)

describe('<TopBar />', () => {
    it('should render and match the snapshot', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = renderWithTheme()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it('should render shadow variable', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toHaveStyle(
            `box-shadow: ${variables.shadow}`
        )
    })

    it('should render light variable when LightTheme is set', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toHaveStyle(
            `background: ${lightTheme.palette.primary.main}`
        )
    })

    it('should render light variable when darkmode is set', () => {
        const { container } = renderWithTheme(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `background: ${darkTheme.palette.primary.main}`
        )
    })
})

describe('<SearchFieldWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<SearchFieldWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <div> tag', () => {
        const { container } = render(<SearchFieldWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('<CloseCountriesList />', () => {
    it('should render and match the snapshot', () => {
        const { container } = renderCloseCountriesList()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = renderCloseCountriesList()

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('should render light variable when LightTheme is set', () => {
        const { container } = renderCloseCountriesList()

        expect(container.firstChild).toHaveStyle(
            `color: ${lightTheme.palette.common.black}`
        )
    })

    it('should render light variable when darkmode is set', () => {
        const { container } = renderCloseCountriesList(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `color: ${darkTheme.palette.common.black}`
        )
    })
})
