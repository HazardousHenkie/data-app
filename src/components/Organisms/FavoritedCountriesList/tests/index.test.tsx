import React from 'react'
import { render } from 'utils/test-utils'

import MenuList from '../index'

describe('<MenuList />', () => {
    it('should render like snapshot', () => {
        const component = render(<MenuList />)

        expect(component).toMatchSnapshot()
    })
})
