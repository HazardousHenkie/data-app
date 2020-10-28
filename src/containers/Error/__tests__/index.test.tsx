import React from 'react'
import { render, within } from 'utils/test-utils'

import { Helmet, HelmetTags, HelmetData } from 'react-helmet'

import ErrorPage from '../index'

const errorPage = <ErrorPage errorCode={404} errorMessage="Page not found" />

describe('<ErrorPage />', () => {
    it('should render like snapshot', () => {
        const component = render(errorPage)

        expect(component).toMatchSnapshot()
    })

    it('should render helmet title', () => {
        render(errorPage)

        const helmet = Helmet.peek()
        expect(helmet.title).toEqual('Error Page')
    })

    it('should render helmet metTags', () => {
        render(errorPage)
        const metaTags = [
            { name: 'Error Page', content: 'A data application error page' }
        ]

        const helmet = Helmet.peek()
        expect((helmet as HelmetTags & HelmetData).metaTags).toEqual(metaTags)
    })

    it('should render ErrorPageDiv as a div', () => {
        const { getByTestId } = render(errorPage)

        const ErrorPageDiv = getByTestId('ErrorPageDiv')

        expect(ErrorPageDiv.tagName).toMatchSnapshot('DIV')
    })

    it('should render StyledTypographyTitle as a h1', () => {
        const { getByTestId } = render(errorPage)

        const StyledTypographyTitle = getByTestId('StyledTypographyTitle')

        expect(StyledTypographyTitle.tagName).toMatchSnapshot()
    })

    it('should render TypographyError as a p', () => {
        const { getByTestId } = render(errorPage)

        const TypographyError = getByTestId('TypographyError')

        expect(TypographyError.tagName).toMatchSnapshot('P')
    })

    it('should pass errorCode an render that errorCode', () => {
        const { getByTestId } = render(errorPage)

        const StyledTypographyTitle = getByTestId('StyledTypographyTitle')
        within(StyledTypographyTitle).getByText('404')

        expect(StyledTypographyTitle).toBeInTheDocument()
    })

    it('should pass errorCode an render that errorCode', () => {
        const { getByTestId } = render(errorPage)

        const TypographyError = getByTestId('TypographyError')
        within(TypographyError).getByText('Page not found')

        expect(TypographyError).toBeInTheDocument()
    })
})
