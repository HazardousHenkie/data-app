import React from 'react'
import { render } from 'utils/test-utils'

import CountryInformation from '../index'

describe('<FavoriteCountryButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<CountryInformation />)

        expect(component).toMatchSnapshot()
    })
})
