import React from 'react'
import { render } from 'utils/test-utils'

import Loader from '../index'

describe('<Loader />', () => {
    it('should render like snapshot', () => {
        const component = render(<Loader />)
        expect(component).toMatchSnapshot()
    })

    it('should render the backdrop component with a div', () => {
        const { getByTestId } = render(<Loader />)

        const loadingComponent = getByTestId('loader')

        expect(loadingComponent.tagName).toEqual('DIV')
    })

    it('should render an <div> with role progressbar tag', () => {
        const { getByRole } = render(<Loader />)

        const progressBar = getByRole('progressbar', { hidden: true })

        expect(progressBar).toBeInTheDocument()
        expect(progressBar.tagName).toEqual('DIV')
    })

    it('should render a SVG', () => {
        const { container } = render(<Loader />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
