import React from 'react'
import { render } from 'utils/test-utils'

import SearchField from '../index'

describe('<SearchField />', () => {
    it('should render like snapshot', () => {
        const component = render(<SearchField setValue={() => {}} />)

        expect(component).toMatchSnapshot()
    })
})
