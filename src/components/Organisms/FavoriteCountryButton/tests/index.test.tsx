import React from 'react'
import { render } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import FavoriteCountryButton from '../index'

describe('<FavoriteCountryButton />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <FavoriteCountryButton clickedCountry={CountryItem.country} />
        )

        expect(component).toMatchSnapshot()
    })
})
