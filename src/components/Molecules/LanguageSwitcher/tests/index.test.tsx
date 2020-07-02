import React from 'react'

import { render } from 'utils/test-utils'

import LanguageSwitcher from '../index'

// finish this one
describe('<LanguageSwitcher />', () => {
    it('should render like snapshot', () => {
        const component = render(<LanguageSwitcher />)

        expect(component).toMatchSnapshot()
    })
})
