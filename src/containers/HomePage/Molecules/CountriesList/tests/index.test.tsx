import React from 'react'
import { render } from 'utils/test-utils'

import CountriesList from '../index'

describe('<CountriesList />', () => {
    it('should render like snapshot', () => {
        const component = render(<CountriesList open setOpen={() => {}} />)

        expect(component).toMatchSnapshot()
    })
})

// more tests:
// shouldn't setcountries if no searchstring
// showing loader
// showing error when error
// set countries action?
// get countries action?
