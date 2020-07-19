import React from 'react'
import { render } from 'utils/test-utils'

import CountriesList from '../index'

import { initialCountriesHeaderState } from '../constants'

describe('<CountriesList />', () => {
    it('should render like snapshot', () => {
        const component = render(<CountriesList open setOpen={() => {}} />)

        expect(component).toMatchSnapshot()
    })

    // not finished
    it('should render a advisoryText inside CountryInformationCardHeader', () => {
        const { getByLabelText } = render(
            <CountriesList open setOpen={() => {}} />,
            {
                initialState: {
                    countriesData: {
                        ...initialCountriesHeaderState,
                        loading: false
                    }
                }
            }
        )

        const advisoryText = getByLabelText('countries')

        expect(advisoryText).toBeInTheDocument()
    })
})

// more tests:
// shouldn't setcountries if no searchstring
// showing loader
// showing error when error
// set countries action?
// get countries action?
