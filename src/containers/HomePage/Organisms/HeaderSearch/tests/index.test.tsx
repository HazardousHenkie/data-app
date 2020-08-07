import React from 'react'
import { render } from 'utils/test-utils'

import HeaderSearch from '../index'

describe('<HeaderSearch />', () => {
    it('should render like snapshot', () => {
        const component = render(<HeaderSearch />)

        expect(component).toMatchSnapshot()
    })
})
