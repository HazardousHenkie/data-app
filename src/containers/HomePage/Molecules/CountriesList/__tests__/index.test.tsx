import React from 'react'
import { render, act } from 'utils/test-utils'

import configureStore from 'store/configureStore'

import { ResponseError } from 'utils/request'

import mockFetch, { mockFetchCleanUp } from 'utils/request-test-utils'
import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import { initialCountriesHeaderState } from '../constants'

import {
    getCountriesData,
    getCountriesDataSuccess,
    getCountriesDataError
} from '../actions'

import useFilteredCountries from '../useFilteredCountriesHook'

import CountriesList from '../index'

jest.mock('../useFilteredCountriesHook')

describe('<CountriesList />', () => {
    beforeEach(() => {
        // @ts-ignore
        useFilteredCountries.mockReturnValue([CountryItem.country])
        mockFetch({})
    })

    afterAll(() => {
        mockFetchCleanUp()
    })

    it('should render like snapshot', () => {
        const component = render(<CountriesList open setOpen={() => {}} />)

        expect(component).toMatchSnapshot()
    })

    it('should dispatch getCountriesData on load', () => {
        const store = configureStore({})
        store.dispatch = jest.fn()

        render(<CountriesList open setOpen={() => {}} />, {
            store
        })

        expect(store.dispatch).toHaveBeenCalledWith(getCountriesData())
    })

    it('should render a advisoryText inside CountryInformationCardHeader', () => {
        const store = configureStore({})

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

    it("shouldn't render loader when not loading", () => {
        const store = configureStore({})

        const { queryByTestId } = render(
            <CountriesList open setOpen={() => {}} />,
            { store }
        )

        store.dispatch(
            getCountriesDataSuccess(initialCountriesHeaderState.data)
        )

        const loader = queryByTestId('inlineLoader')
        expect(loader).toBeFalsy()
    })

    it('should render loader when loading', () => {
        const { getByTestId } = render(
            <CountriesList open setOpen={() => {}} />
        )

        const loader = getByTestId('inlineLoader')
        expect(loader).toBeInTheDocument()
    })

    it("shouldn't render error when there is no error", () => {
        const { queryByTestId } = render(
            <CountriesList open setOpen={() => {}} />
        )

        const error = queryByTestId('countriesList_error')
        expect(error).toBeFalsy()
    })

    it('should render error when there is a error', () => {
        const responseError = new ResponseError(
            new Response('string'),
            "something wen't wrong"
        )

        const store = configureStore({})

        const { getByText } = render(
            <CountriesList open setOpen={() => {}} />,
            { store }
        )

        store.dispatch(getCountriesDataError(responseError))

        const error = getByText("something wen't wrong")
        expect(error).toBeInTheDocument()
    })

    it('should render list with one item', () => {
        // @ts-ignore
        useFilteredCountries.mockReturnValue([
            { ...CountryItem.country, name: 'japan' }
        ])

        const store = configureStore({})

        const { getByTestId } = render(
            <CountriesList open setOpen={() => {}} />,
            { store }
        )

        store.dispatch(
            getCountriesDataSuccess([
                {
                    ...CountryItem.country,
                    name: 'japan'
                }
            ])
        )

        const countryItem = getByTestId('countryItem')
        expect(countryItem).toBeInTheDocument()
    })
})
