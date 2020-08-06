import React from 'react'
import { render } from '@testing-library/react'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import App from '../App'

describe('<App />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <MockingAppComponent>
                <App />
            </MockingAppComponent>
        )

        expect(component).toMatchSnapshot()
    })
})
