import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'
import history from 'utils/history'

import { initialCountriesHeaderState } from '../constants'
import { getCountriesDataSuccess } from '../actions'
import CountriesList from '../index'

describe('<CountriesList />', () => {
    let store = configureStore({}, history)

    afterEach(() => {
        store = configureStore({}, history)
    })

    it('should render like snapshot', () => {
        const component = render(<CountriesList open setOpen={() => {}} />)

        expect(component).toMatchSnapshot()
    })

    it('should render a advisoryText inside CountryInformationCardHeader', () => {
        const { getByLabelText } = render(
            <CountriesList open setOpen={() => {}} />,
            { store }
        )

        store.dispatch(
            getCountriesDataSuccess(initialCountriesHeaderState.data)
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
