import React from 'react'
import { render } from 'utils/test-utils'

import InfoMessage from '../index'

describe('<InfoMessage />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <InfoMessage severity="error" message="error" />
        )

        expect(component).toMatchSnapshot()
    })
})
