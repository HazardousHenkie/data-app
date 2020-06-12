import React from 'react'
import { render } from '@testing-library/react'

import MockingAppComponent from 'utils/testing/MockingAppComponent'

import CountriesList from '../index'

describe('<CountriesList />', () => {
    it('should render like snapshot', () => {
        const {
            container: { firstChild }
        } = render(
            <MockingAppComponent>
                <CountriesList open setOpen={() => {}} />
            </MockingAppComponent>
        )

        expect(firstChild).toMatchSnapshot()
    })
})

// more tests:
// shouldn't setcountries if no searchstring
// showing loader
// showing error when error
// set countries action?
// get countries action?
