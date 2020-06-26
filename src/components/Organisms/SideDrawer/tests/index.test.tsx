import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import SideDrawer from '../index'

describe('<SideDrawer />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <SideDrawer />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
