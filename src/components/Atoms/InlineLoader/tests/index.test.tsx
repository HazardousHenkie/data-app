import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import InlineLoader from '../index'

describe('<InlineLoader />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <InlineLoader />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
