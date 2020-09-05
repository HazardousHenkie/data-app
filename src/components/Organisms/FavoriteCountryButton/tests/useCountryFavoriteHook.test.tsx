// change to ts and remove all
import React from 'react'

import { render } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import FavoriteCountryButton from '../index'

const heartComponent = (
    <FavoriteCountryButton clickedCountry={CountryItem.country} />
)

describe('test', () => {
    it('should return a store with injected enhancers', () => {
        it('should render like snapshot', () => {
            const component = render(heartComponent)

            expect(component).toMatchSnapshot()
        })
    })
})
