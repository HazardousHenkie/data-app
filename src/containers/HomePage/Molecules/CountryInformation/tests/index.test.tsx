import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'
import history from 'utils/history'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'

import CountryInformation from '../index'

describe('<FavoriteCountryButton />', () => {
    let store = configureStore({}, history)

    afterEach(() => {
        store = configureStore({}, history)
    })

    it('should render like snapshot', () => {
        const component = render(<CountryInformation />)

        expect(component).toMatchSnapshot()
    })

    it('should render CountryInformationCard', () => {
        const { getByTestId } = render(<CountryInformation />)

        const CountryInformationCard = getByTestId('CountryInformationCard')
        expect(CountryInformationCard).toBeInTheDocument()
    })

    it('should render CountryInformationCardHeader', () => {
        const { getByTestId } = render(<CountryInformation />)

        const CountryInformationCardHeader = getByTestId(
            'CountryInformationCardHeader'
        )
        expect(CountryInformationCardHeader).toBeInTheDocument()
    })

    it('should render avatar and translated label inside avatar', () => {
        const { getByLabelText } = render(<CountryInformation />)

        const avatarLabel = getByLabelText('Country Information')
        expect(avatarLabel).toBeInTheDocument()
    })

    it('should render a SVG InfoIcon inside CountryInformationCardHeader avatar', () => {
        const { getByTestId } = render(<CountryInformation />)

        const CountryInformationCardHeaderSVG = getByTestId(
            'CountryInformationCardHeader'
        ).querySelector('svg')

        expect(CountryInformationCardHeaderSVG).toBeInTheDocument()
    })

    it('should render a informationText inside CountryInformationCardHeader', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, name: 'japan' })
        )

        const advisoryText = getByText('Information for japan')

        expect(advisoryText).toBeInTheDocument()
    })

    it('should render CountryInformationCardContent', () => {
        const { getByTestId } = render(<CountryInformation />)

        const CountryInformationCard = getByTestId(
            'CountryInformationCardContent'
        )

        expect(CountryInformationCard).toBeInTheDocument()
    })

    it('should render countryNativeName as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, nativeName: '日本' })
        )

        const countryNativeName = getByTestId('countryNativeName')

        expect(countryNativeName.tagName).toBe('P')
    })

    it('should render native name label inside countryNativeName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, nativeName: '日本' })
        )

        const nativeName = getByText('Native name:')

        expect(nativeName).toBeInTheDocument()
    })

    it('should render the countries native name inside countryNativeName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, nativeName: '日本' })
        )

        const nativeName = getByText('日本')

        expect(nativeName).toBeInTheDocument()
    })

    it('should render countryCapitalName as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, capital: 'Tokyo' })
        )

        const countryCapitalName = getByTestId('countryCapitalName')

        expect(countryCapitalName.tagName).toBe('P')
    })

    it('should render capital label inside countryCapitalName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, capital: 'Tokyo' })
        )

        const countryCapitalName = getByText('Capital:')

        expect(countryCapitalName).toBeInTheDocument()
    })

    it('should render the countries capital inside countryCapitalName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, capital: 'Tokyo' })
        )

        const countryCapitalName = getByText('Tokyo')

        expect(countryCapitalName).toBeInTheDocument()
    })

    it('should render countryRegionName as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, region: 'Asia' })
        )

        const countryRegionName = getByTestId('countryRegionName')

        expect(countryRegionName.tagName).toBe('P')
    })

    it('should render region label inside countryRegionName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, region: 'Asia' })
        )

        const countryRegionName = getByText('Region:')

        expect(countryRegionName).toBeInTheDocument()
    })

    it('should render the countries region inside countryCapitalName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, region: 'Asia' })
        )

        const countryCapitalName = getByText('Asia')

        expect(countryCapitalName).toBeInTheDocument()
    })

    it('should render countrySubRegionName as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, subregion: 'Japan' })
        )

        const countrySubRegionName = getByTestId('countrySubRegionName')

        expect(countrySubRegionName.tagName).toBe('P')
    })

    it('should render subregion label inside countrySubRegionName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, subregion: 'Japan' })
        )

        const countrySubRegionName = getByText('Subregion:')

        expect(countrySubRegionName).toBeInTheDocument()
    })

    it('should render the countries subregion inside countrySubRegionName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, subregion: 'Japan' })
        )

        const countrySubRegionName = getByText('Japan')

        expect(countrySubRegionName).toBeInTheDocument()
    })

    it('should render countryPopulation as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, population: 500 })
        )

        const countryPopulation = getByTestId('countryPopulation')

        expect(countryPopulation.tagName).toBe('P')
    })

    it('should render population label inside countrySubRegionName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, population: 500 })
        )

        const countryPopulation = getByText('Population:')

        expect(countryPopulation).toBeInTheDocument()
    })

    it('should render the countries population inside countrySubRegionName', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, population: 500 })
        )

        const countryPopulation = getByText('500')

        expect(countryPopulation).toBeInTheDocument()
    })

    it('should render countryLanguages as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                languages: [{ name: 'Japanese', nativeName: '日本語' }]
            })
        )

        const countryLanguages = getByTestId('countryLanguages')

        expect(countryLanguages.tagName).toBe('P')
    })

    it('should render languages label inside countryLanguages', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                languages: [{ name: 'Japanese', nativeName: '日本語' }]
            })
        )

        const countryLanguages = getByText('Languages:')

        expect(countryLanguages).toBeInTheDocument()
    })

    it('should render the countries languages inside countryLanguages', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                languages: [{ name: 'Japanese', nativeName: '日本語' }]
            })
        )

        const countryLanguages = getByText('Japanese(日本語)')

        expect(countryLanguages).toBeInTheDocument()
    })

    it('should render countryCurrencies as a P', () => {
        const { getByTestId } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                currencies: [{ code: 'JPY', symbol: '¥' }]
            })
        )

        const countryCurrencies = getByTestId('countryCurrencies')

        expect(countryCurrencies.tagName).toBe('P')
    })

    it('should render currencies label inside countryCurrencies', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                currencies: [{ code: 'JPY', symbol: '¥' }]
            })
        )

        const countryCurrencies = getByText('Currencies:')

        expect(countryCurrencies).toBeInTheDocument()
    })

    it('should render the countries currencies inside countryCurrencies', () => {
        const { getByText } = render(<CountryInformation />, {
            store
        })

        store.dispatch(
            setSelectedCountry({
                ...CountryItem.country,
                currencies: [{ code: 'JPY', symbol: '¥' }]
            })
        )

        const countryCurrencies = getByText('JPY(¥)')

        expect(countryCurrencies).toBeInTheDocument()
    })
})
