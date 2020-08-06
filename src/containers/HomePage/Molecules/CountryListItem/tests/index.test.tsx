import React from 'react'
import renderer from 'react-test-renderer'

import MockingAppComponent from 'utils/testing/MockingAppComponent'
import ListItem from '../index'
import { CountryItem } from '../constants'

describe('<ListItem />', () => {
    it('should render like snapshot', () => {
        const component = renderer.create(
            <MockingAppComponent>
                <ListItem
                    listCountry={CountryItem.country}
                    setOpen={() => {}}
                />
            </MockingAppComponent>
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
