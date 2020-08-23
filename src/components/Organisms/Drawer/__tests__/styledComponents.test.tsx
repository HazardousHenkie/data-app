import React from 'react'

import { render } from 'utils/test-utils'

import { css } from 'styled-components'

import { Theme } from '@material-ui/core/styles'
import lightTheme, { darkTheme } from 'styles/themeStyles'

import {
    SwipeableDrawerStyled,
    HandleBar,
    DrawerWrapper,
    ClickIndicator,
    SwipeIndicator,
    swipeAnimation,
    SwipeIndicatorInner,
    SwipeIndicatorInnerDown
} from '../styledComponents'

import 'jest-styled-components'

describe('<SwipeableDrawerStyled />', () => {
    const renderWithTheme = (theme?: Theme) =>
        render(
            <SwipeableDrawerStyled
                theme={theme || lightTheme}
                anchor="bottom"
                open
                onClose={() => {}}
                onOpen={() => {}}
            />
        )

    it('should render and match the snapshot', () => {
        const { container } = renderWithTheme()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = renderWithTheme()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('<HandleBar />', () => {
    const renderWithThemeHandleBar = (theme?: Theme) =>
        render(<HandleBar theme={theme || lightTheme} />)

    it('should render and match the snapshot', () => {
        const { container } = renderWithThemeHandleBar()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = renderWithThemeHandleBar()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it('should have position relative if relative props is passed', () => {
        const { container } = render(<HandleBar relative />)

        expect(container.firstChild).toHaveStyle('position: relative')
    })

    it('should have position relative if relative props is passed', () => {
        const { container } = render(<HandleBar />)

        expect(container.firstChild).toHaveStyle('position: fixed')
    })

    it('should render breakpoint and display none', () => {
        const { container } = renderWithThemeHandleBar()

        expect(container.firstChild).toHaveStyleRule('display', 'none', {
            media: `${lightTheme.breakpoints.up('md').slice(7)}`
        })
    })

    it('should render light variable when LightTheme is set', () => {
        const { container } = renderWithThemeHandleBar()

        expect(container.firstChild).toHaveStyle(
            `background: ${lightTheme.palette.common.black}`
        )

        expect(container.firstChild).toHaveStyle(
            ` border: 2px solid ${lightTheme.palette.common.black}`
        )
    })

    it('should render light variable when darkmode is set', () => {
        const { container } = renderWithThemeHandleBar(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `background: ${darkTheme.palette.common.black}`
        )

        expect(container.firstChild).toHaveStyle(
            ` border: 2px solid ${darkTheme.palette.common.black}`
        )
    })
})

describe('<DrawerWrapper />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<DrawerWrapper />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<DrawerWrapper />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})

describe('<ClickIndicator />', () => {
    const renderWithClickIndicator = (theme?: Theme) =>
        render(<ClickIndicator theme={theme || lightTheme} />)

    it('should render and match the snapshot', () => {
        const { container } = renderWithClickIndicator()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = renderWithClickIndicator()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it('should render breakpoint and display none', () => {
        const { container } = renderWithClickIndicator()

        expect(container.firstChild).toHaveStyleRule('display', 'none', {
            media: `${lightTheme.breakpoints.down('sm').slice(7)}`
        })
    })

    it('should render indicator with lightTheme', () => {
        const { container } = renderWithClickIndicator()

        expect(container.firstChild).toHaveStyle(
            `border: 2px solid ${lightTheme.palette.common.black}`
        )
    })

    it('should render indicator with darkTheme', () => {
        const { container } = renderWithClickIndicator(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `border: 2px solid ${darkTheme.palette.common.black}`
        )
    })
})

describe('<SwipeIndicator />', () => {
    const renderWithSwipeIndicator = (theme?: Theme) =>
        render(<SwipeIndicator theme={theme || lightTheme} />)

    it('should render and match the snapshot', () => {
        const { container } = renderWithSwipeIndicator()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = renderWithSwipeIndicator()

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it("should render bottom style when down prop isn't given", () => {
        const { container } = renderWithSwipeIndicator()

        expect(container.firstChild).toHaveStyle('bottom: 10px')
    })

    it('should render top style when down prop is given', () => {
        const { container } = render(<SwipeIndicator down />)

        expect(container.firstChild).toHaveStyle('top: -35px')
    })

    it('should render indicator with lightTheme', () => {
        const { container } = renderWithSwipeIndicator()

        expect(container.firstChild).toHaveStyle(
            `border: 2px solid ${lightTheme.palette.common.black}`
        )
    })

    it('should render indicator with darkTheme', () => {
        const { container } = renderWithSwipeIndicator(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `border: 2px solid ${darkTheme.palette.common.black}`
        )
    })
})

describe('<SwipeIndicatorInner />', () => {
    const renderWithSwipeIndicatorInner = (theme?: Theme) =>
        render(<SwipeIndicatorInner theme={theme || lightTheme} />)

    it('should render and match the snapshot', () => {
        const { container } = renderWithSwipeIndicatorInner()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = renderWithSwipeIndicatorInner()

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('should render animation style', () => {
        const { container } = renderWithSwipeIndicatorInner()

        expect(container.firstChild).toHaveStyleRule(
            (css`
                animation: ${swipeAnimation(false)} 2s infinite;
            ` as unknown) as string
        )
    })

    it('should render indicator with lightTheme', () => {
        const { container } = renderWithSwipeIndicatorInner()

        expect(container.firstChild).toHaveStyle(
            `color: ${lightTheme.palette.common.black}`
        )
    })

    it('should render indicator with darkTheme', () => {
        const { container } = renderWithSwipeIndicatorInner(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `color: ${darkTheme.palette.common.black}`
        )
    })
})

describe('<SwipeIndicatorInnerDown />', () => {
    const renderWithSwipeIndicatorInnerDown = (theme?: Theme) =>
        render(<SwipeIndicatorInnerDown theme={theme || lightTheme} />)

    it('should render and match the snapshot', () => {
        const { container } = renderWithSwipeIndicatorInnerDown()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <SVG> tag', () => {
        const { container } = renderWithSwipeIndicatorInnerDown()

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('should render animation style', () => {
        const { container } = renderWithSwipeIndicatorInnerDown()

        expect(container.firstChild).toHaveStyleRule(
            (css`
                animation: ${swipeAnimation(true)} 2s infinite;
            ` as unknown) as string
        )
    })

    it('should render indicator with lightTheme', () => {
        const { container } = renderWithSwipeIndicatorInnerDown()

        expect(container.firstChild).toHaveStyle(
            `color: ${lightTheme.palette.common.black}`
        )
    })

    it('should render indicator with darkTheme', () => {
        const { container } = renderWithSwipeIndicatorInnerDown(darkTheme)

        expect(container.firstChild).toHaveStyle(
            `color: ${darkTheme.palette.common.black}`
        )
    })
})
