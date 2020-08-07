import React from 'react'
import { render } from 'utils/test-utils'

import ListItem from '../index'
import { CountryItem } from '../constants'

describe('<ListItem />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <ListItem listCountry={CountryItem.country} setOpen={() => {}} />
        )

        expect(component).toMatchSnapshot()
    })
})
