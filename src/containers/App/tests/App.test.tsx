import React from 'react'
import { render } from 'utils/test-utils'

import App from '../App'

// all the others have snapshot testing so we might not need it here
describe('<App />', () => {
    it('should render like snapshot', () => {
        const component = render(<App />)

        expect(component).toMatchSnapshot()
    })
})
