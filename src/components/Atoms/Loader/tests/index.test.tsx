import React from 'react'
import { render } from '@testing-library/react'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import Loader from '../index'

describe('<Loader />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <MockingAppComponent>
                <Loader />
            </MockingAppComponent>
        )
        expect(component).toMatchSnapshot()
    })
})
