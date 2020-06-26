import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'

import ErrorSnackbars from '../index'

describe('<ErrorSnackbars />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <ErrorSnackbars />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
