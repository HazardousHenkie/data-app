import React from 'react'
import { render } from 'utils/test-utils'

import CountryInformation from '../index'

describe('<FavoriteCountryButton />', () => {
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

    it('should render a advisoryText inside CountryInformationCardHeader', () => {
        const { getByText } = render(<CountryInformation />, {
            initialState: {
                country: { country: { name: 'japan' } }
            }
        })

        const advisoryText = getByText('Advisory for japan')

        expect(advisoryText).toBeInTheDocument()
    })
})
