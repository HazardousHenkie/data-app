import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'

import { initialCountriesHeaderState } from '../constants'

import { getCountriesData, getCountriesDataSuccess } from '../actions'
import CountriesList from '../index'

describe('<CountriesList />', () => {
    let store = configureStore({})

    afterEach(() => {
        store = configureStore({})
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

    it('should dispatch getCountriesData on load', () => {
        store.dispatch = jest.fn()

        render(<CountriesList open setOpen={() => {}} />, {
            store
        })

        expect(store.dispatch).toHaveBeenCalledWith(getCountriesData())
    })
})

// more tests:
// shouldn't setcountries if no searchstring
// showing loader
// showing error when error
// set countries action?
// get countries action?
