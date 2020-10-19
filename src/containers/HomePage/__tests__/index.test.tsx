import React from 'react'
import { render, act } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'

import { Helmet, HelmetTags, HelmetData } from 'react-helmet'

import mockFetch, { mockFetchCleanUp } from 'utils/request-test-utils'
import configureStore from 'store/configureStore'

import HomePage from '../index'

describe('<HomePage />', () => {
    let store = configureStore({})

    beforeEach(() => {
        mockFetch({})
    })

    afterEach(() => {
        store = configureStore({})
        mockFetchCleanUp()
    })

    it('should render like snapshot', () => {
        const component = render(<HomePage />)

        expect(component).toMatchSnapshot()
    })

    test('Check if translation text is shown', () => {
        render(<HomePage />)

        const helmet = Helmet.peek()
        expect(helmet.title).toEqual('Home Page')
    })

    it('should set metaDescription', () => {
        render(<HomePage />)

        const metaTags = [
            { name: 'Home Page', content: 'Homepage description' }
        ]

        const helmet = Helmet.peek()
        expect((helmet as HelmetTags & HelmetData).metaTags).toEqual(metaTags)
    })

    it('should render HeaderSearch', () => {
        const { getByTestId } = render(<HomePage />)

        expect(getByTestId('TopBar')).toBeInTheDocument()
    })

    it('should render OSMap', () => {
        const { getByTestId } = render(<HomePage />)

        expect(getByTestId('OSMap')).toBeInTheDocument()
    })

    it('should render drawer when country is set', () => {
        const { getByTestId } = render(<HomePage />, { store })

        act(() => {
            store.dispatch(
                setSelectedCountry({ ...CountryItem.country, alpha2Code: 'NL' })
            )
        })

        expect(getByTestId('drawer')).toBeInTheDocument()
    })
})
