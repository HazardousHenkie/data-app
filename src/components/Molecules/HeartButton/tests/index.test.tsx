import React from 'react'

import { render } from 'utils/test-utils'

import HeartButton from '../index'

describe('<HeartButton />', () => {
    it('should render like snapshot', () => {
        const component = render(
            <HeartButton loading active label="label" heartOnClick={() => {}} />
        )

        expect(component).toMatchSnapshot()
    })
})
