import React from 'react'
import { render } from '@testing-library/react'

import MockingAppComponent from 'utils/testing/MockingAppComponent'

import HomePage from '../index'

describe('<HomePage />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <MockingAppComponent>
                <HomePage />
            </MockingAppComponent>
        )

        expect(component).toMatchSnapshot()
    })
})
