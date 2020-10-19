import React from 'react'
import { render } from 'utils/test-utils'

import InfoMessage from '../index'

describe('<InfoMessage />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <InfoMessage severity="error" message="error" />
        )

        expect(component).toMatchSnapshot()
    })

    it('should render an <div> tag', () => {
        const { container } = render(
            <InfoMessage severity="error" message="error" />
        )
        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it('should render the content passed to it', () => {
        const { getByText, container } = render(
            <InfoMessage severity="error" message="error" />
        )

        expect(container.firstChild).toHaveClass('MuiAlert-standardError')
        expect(getByText('error')).toHaveTextContent('error')
    })
})
