import React from 'react'
import { render } from 'utils/test-utils'

import InlineLoader from '../index'

describe('<InlineLoader />', () => {
    it('should render like snapshot', () => {
        const component = render(<InlineLoader />)

        expect(component).toMatchSnapshot()
    })

    it('should render the wrapper component with a div', () => {
        const { getByTestId } = render(<InlineLoader />)

        const loadingComponent = getByTestId('inlineLoader')

        expect(loadingComponent.tagName).toEqual('DIV')
    })

    it('should render an <div> with role progressbar tag', () => {
        const { getByRole } = render(<InlineLoader />)

        const progressBar = getByRole('progressbar')

        expect(progressBar).toBeInTheDocument()
        expect(progressBar.tagName).toEqual('DIV')
    })

    it('should render a SVG', () => {
        const { container } = render(<InlineLoader />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
