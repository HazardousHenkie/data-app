import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import Drawer from '../index'

describe('<Drawer />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <Drawer />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
