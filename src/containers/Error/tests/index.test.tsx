import React from 'react'
import { render } from 'utils/test-utils'

import ErrorPage from '../index'

describe('<ErrorPage />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <ErrorPage errorCode={404} errorMessage="Page not found" />
        )

        expect(component).toMatchSnapshot()
    })
})
