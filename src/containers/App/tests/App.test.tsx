import React from 'react'
import { render } from 'utils/test-utils'

import App from '../App'

describe('<App />', () => {
    it('should render like snapshot', () => {
        const component = render(<App />)

        expect(component).toMatchSnapshot()
    })
})
