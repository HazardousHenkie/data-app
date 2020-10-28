import React from 'react'
import { render, act, fireEvent } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'

import configureStore from 'store/configureStore'

import OSMap from '../map'
import HomePage from '../index'

describe('<OSMap />', () => {
    let store = configureStore({})

    afterEach(() => {
        store = configureStore({})
    })

    it('should render like snapshot', () => {
        const component = render(<OSMap />)

        expect(component).toMatchSnapshot()
    })

    it('loader should be invisible when not loading', () => {
        const { queryByTestId } = render(<OSMap />)

        const loader = queryByTestId('loader')

        expect(loader).toBeFalsy()
    })

    it('should render tileLayer with copyright message', () => {
        const { getByText } = render(<OSMap />)

        const copyRightMessage = getByText(/Leaflet | ©/)

        expect(copyRightMessage).toBeInTheDocument()
    })

    it("shouldn't render marker if country is set", () => {
        const { container } = render(<OSMap />)

        const markerImage = container.querySelector('.leaflet-marker-icon')

        expect(markerImage).not.toBeInTheDocument()
    })

    it('should render marker if country is set', () => {
        const { container } = render(<OSMap />, { store })

        act(() => {
            store.dispatch(
                setSelectedCountry({ ...CountryItem.country, alpha2Code: 'NL' })
            )
        })

        const markerImage = container.querySelector('.leaflet-marker-icon')

        expect(markerImage).toBeInTheDocument()
    })

    it('should open drawer if marker is clicked', () => {
        const { container, getByTestId } = render(<HomePage />, { store })

        act(() => {
            store.dispatch(
                setSelectedCountry({ ...CountryItem.country, alpha2Code: 'NL' })
            )
        })

        const markerImage = container.querySelector('.leaflet-marker-icon')
        fireEvent.click(markerImage as Element)

        expect(getByTestId('SwipeIndicatorInnerDown')).toBeInTheDocument()
    })
})
