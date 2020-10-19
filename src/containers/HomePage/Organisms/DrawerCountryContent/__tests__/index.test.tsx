import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'

import DrawerCountryContent from '../index'

describe('<DrawerCountryContent />', () => {
    it('should render like snapshot', () => {
        const component = render(<DrawerCountryContent />)
        expect(component).toMatchSnapshot()
    })

    it('should render Header with countryName', () => {
        const mockStore = configureStore({})

        const { getByText } = render(<DrawerCountryContent />, {
            store: mockStore
        })

        mockStore.dispatch(
            setSelectedCountry({ ...CountryItem.country, name: 'japan' })
        )

        const header = getByText('japan')

        expect(header).toBeInTheDocument()
        expect(header.tagName).toBe('H1')
    })

    it('should render CountryAdvisory', () => {
        const { getByTestId } = render(<DrawerCountryContent />)

        const CountryAdvisory = getByTestId('CountryAdvisory')

        expect(CountryAdvisory).toBeInTheDocument()
    })

    it('should render CountryInformationCard', () => {
        const { getByTestId } = render(<DrawerCountryContent />)

        const CountryInformationCard = getByTestId('CountryInformationCard')

        expect(CountryInformationCard).toBeInTheDocument()
    })

    it('should render FavoriteCountryButtonWrapper', () => {
        const { getByTestId } = render(<DrawerCountryContent />, {
            initialState: { authenticationData: { loggedIn: true } }
        })

        const FavoriteCountryButtonWrapper = getByTestId(
            'FavoriteCountryButtonWrapper'
        )

        expect(FavoriteCountryButtonWrapper).toBeInTheDocument()
    })

    it('should render FavoriteCountryButton', () => {
        const { getByTestId } = render(<DrawerCountryContent />, {
            initialState: { authenticationData: { loggedIn: true } }
        })

        const heartButton = getByTestId('heartButton')

        expect(heartButton).toBeInTheDocument()
    })
})
