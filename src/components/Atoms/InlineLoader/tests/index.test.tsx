import React from 'react'
import { render } from 'utils/test-utils'

import InlineLoader from '../index'

describe('<InlineLoader />', () => {
    it('should render like snapshot', () => {
        const component = render(<InlineLoader />)

        expect(component).toMatchSnapshot()
    })
})
