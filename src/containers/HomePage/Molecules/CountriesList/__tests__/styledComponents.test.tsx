import React from 'react'
import { render } from '@testing-library/react'

import lightTheme from 'styles/themeStyles'

import LoaderWrapper from '../styledComponents'

const children = '<div>test</div>'

const renderComponent = (props = {}) => {
    const utils = render(
        <LoaderWrapper theme={lightTheme} {...props}>
            {children}
        </LoaderWrapper>
    )
    const link = utils.queryByText(children)
    return { ...utils, link }
}

describe('<LoaderWrapper />', () => {
    it('should render a <div> tag', () => {
        const { container } = renderComponent()
        expect(container).toBeInTheDocument()
        expect(container.tagName).toBe('DIV')
    })

    it('should not adopt an invalid attribute', () => {
        const { container } = renderComponent({ attribute: 'test' })
        expect(container).not.toHaveAttribute('attribute')
    })
})
