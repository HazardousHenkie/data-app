import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'

import DrawerCountryContent from '../index'

describe('<DrawerCountryContent />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <DrawerCountryContent />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
