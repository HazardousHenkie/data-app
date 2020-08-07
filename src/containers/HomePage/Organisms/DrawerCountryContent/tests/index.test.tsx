import React from 'react'
import { render } from 'utils/test-utils'
import DrawerCountryContent from '../index'

describe('<FavoriteCountryButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<DrawerCountryContent />)

        expect(component).toMatchSnapshot()
    })
})
