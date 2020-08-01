import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'
import history from 'utils/history'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import setSelectedCountry from 'containers/HomePage/Molecules/CountryListItem/actions'
import useCountryAdvisoryHook from '../useCountryAdvisoryHook'
import CountryAdvisory from '../index'

jest.mock('../useCountryAdvisoryHook')

describe('<CountryAdvisory />', () => {
    let store = configureStore({}, history)

    beforeEach(() => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            loading: false
        })
    })

    afterEach(() => {
        store = configureStore({}, history)
    })

    it('should render like snapshot', () => {
        jest.unmock('../useCountryAdvisoryHook')
        const component = render(<CountryAdvisory />)

        expect(component).toMatchSnapshot()
    })

    it('should render CountryAdvisory', () => {
        const { getByTestId } = render(<CountryAdvisory />)

        const countryAdvisory = getByTestId('CountryAdvisory')
        expect(countryAdvisory).toBeInTheDocument()
    })

    it('should render InlineLoader when loading', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            loading: true
        })

        const { getByTestId } = render(<CountryAdvisory />)

        const inlineLoader = getByTestId('inlineLoader')
        expect(inlineLoader).toBeInTheDocument()
    })

    it("shouldn't render InlineLoader when loading", () => {
        const { queryByTestId } = render(<CountryAdvisory />)

        const inlineLoader = queryByTestId('inlineLoader')
        expect(inlineLoader).toBeFalsy()
    })

    it('should render CountryAdvisoryHeader', () => {
        const { getByTestId } = render(<CountryAdvisory />)

        const CountryAdvisoryHeader = getByTestId('CountryAdvisoryHeader')
        expect(CountryAdvisoryHeader).toBeInTheDocument()
    })

    it('should render avatar and translated label inside avatar', () => {
        const { getByLabelText } = render(<CountryAdvisory />)

        const avatarLabel = getByLabelText('country')
        expect(avatarLabel).toBeInTheDocument()
    })

    it('should render a SVG WarningIcon inside CountryAdvisoryHeader avatar', () => {
        const { getByTestId } = render(<CountryAdvisory />)

        const CountryAdvisoryHeaderSVG = getByTestId(
            'CountryAdvisoryHeader'
        ).querySelector('svg')

        expect(CountryAdvisoryHeaderSVG).toBeInTheDocument()
    })

    it('should render a advisoryText inside CountryInformationCardHeader', () => {
        const { getByText } = render(<CountryAdvisory />, {
            store
        })

        store.dispatch(
            setSelectedCountry({ ...CountryItem.country, name: 'japan' })
        )

        const advisoryText = getByText('Advisory for japan')

        expect(advisoryText).toBeInTheDocument()
    })

    it('should render InlineLoader when loading', () => {
        const errorMessage = "Something wen't wrong"
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            fetchingError: errorMessage
        })

        const { getByText } = render(<CountryAdvisory />)

        const infoMessage = getByText(errorMessage)
        expect(infoMessage).toBeInTheDocument()
    })

    it('should render CountryAdvisoryCardContent', () => {
        const { getByTestId } = render(<CountryAdvisory />)

        const CountryAdvisoryCardContent = getByTestId(
            'CountryAdvisoryCardContent'
        )

        expect(CountryAdvisoryCardContent).toBeInTheDocument()
    })

    it('should render countryAdvisoryScore as a P', () => {
        const { getByTestId } = render(<CountryAdvisory />)

        const countryAdvisoryScore = getByTestId('countryAdvisoryScore')

        expect(countryAdvisoryScore.tagName).toBe('P')
    })

    it('should render score text inside countryAdvisoryScore', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    score: 7
                }
            }
        })

        const { getByText } = render(<CountryAdvisory />)

        const score = getByText('score:')

        expect(score).toBeInTheDocument()
    })

    it('should render score inside countryAdvisoryScore', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    score: 'test'
                }
            }
        })

        const { getByText } = render(<CountryAdvisory />)

        const score = getByText(/test/)

        expect(score).toBeInTheDocument()
    })

    it('should render a br countryAdvisoryScore', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    score: 'test'
                }
            }
        })

        const { getByTestId } = render(<CountryAdvisory />)

        const countryAdvisoryScoreBr = getByTestId(
            'CountryAdvisoryCardContent'
        ).querySelector('br')

        expect(countryAdvisoryScoreBr).toBeInTheDocument()
    })

    it('should render message label inside countryAdvisoryScore', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {}
            }
        })

        const { getByText } = render(<CountryAdvisory />)

        const message = getByText('message:')

        expect(message).toBeInTheDocument()
    })

    it('should render message inside countryAdvisoryScore', () => {
        const message = 'Everything is fine!'
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    message
                }
            }
        })

        const { getByText } = render(<CountryAdvisory />)

        const score = getByText(message)

        expect(score).toBeInTheDocument()
    })

    it('should render countryAdvisor notFound message if message is empty if countryAdvisoryScore', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    message: ''
                }
            }
        })

        const { getByText } = render(<CountryAdvisory />)

        const score = getByText('Advisory message not available.')

        expect(score).toBeInTheDocument()
    })

    it('should render advisoryNotFound if no advisory is empty if countryAdvisoryScore', () => {
        const { getByText } = render(<CountryAdvisory />)

        const advisoryNotFound = getByText('Advisory not found.')

        expect(advisoryNotFound).toBeInTheDocument()
    })

    it('should render CountryAdvisoryActions', () => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {}
            }
        })
        const { queryByTestId } = render(<CountryAdvisory />)

        const CountryAdvisoryActions = queryByTestId('CountryAdvisoryActions')
        expect(CountryAdvisoryActions).toBeInTheDocument()
    })

    it('should render updatedText inside CountryAdvisoryActions as P', () => {
        const date = '10 september 2019'
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    updated: date
                }
            }
        })
        const { getByText } = render(<CountryAdvisory />)

        const updatedText = getByText(date)
        expect(updatedText).toBeInTheDocument()
        expect(updatedText.tagName).toBe('P')
    })

    it('should render the source translation and should render inside CountryAdvisoryActions', () => {
        const link = 'https://www.myfakelinkisnicedot.com'
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            countryAdvisory: {
                advisory: {
                    source: link
                }
            }
        })
        const { getByText } = render(<CountryAdvisory />)

        const updatedText = getByText('source')
        expect(updatedText).toHaveAttribute('href', link)
    })
})
