import React from 'react'
import { render, within, fireEvent, act } from 'utils/test-utils'

import { CountryItem } from 'containers/HomePage/Molecules/CountryListItem/constants'
import mockFetch, { mockFetchCleanUp } from 'utils/request-test-utils'
import FavoriteCountryButton from '../index'

import useCountryFavorite from '../useCountryFavoriteHook'

jest.mock('../useCountryFavoriteHook')

const heartComponent = (
    <FavoriteCountryButton clickedCountry={CountryItem.country} />
)

describe('<FavoriteCountryButton />', () => {
    beforeEach(() => {
        mockFetch({})
        ;(useCountryFavorite as jest.Mock).mockReturnValue({})
    })

    afterEach(() => {
        mockFetchCleanUp()
    })

    it('should render like snapshot', () => {
        const component = render(heartComponent)

        expect(component).toMatchSnapshot()
    })

    it('should render the wrapper component with a div', () => {
        const { container } = render(heartComponent)

        expect(container.tagName).toEqual('DIV')
    })

    it('it should render a button because there is an onclick', () => {
        const { getByTestId } = render(heartComponent)

        const button = getByTestId('iconButton')

        expect(button.tagName).toEqual('BUTTON')
    })

    it('it should render the FavoriteIconStyled component if active is false', () => {
        const { getByTestId } = render(heartComponent)

        const icon = getByTestId('favoriteIcon')
        expect(icon).toBeInTheDocument()
    })

    test("Don't show loader when loading is false", () => {
        const { queryByTestId } = render(heartComponent)

        const loadingComponent = queryByTestId('inlineLoader')

        expect(loadingComponent).toBeFalsy()
    })

    test('Check if translation text is shown', () => {
        const { getByTestId } = render(heartComponent)

        const button = getByTestId('heartButton')
        const buttonText = within(button).getByLabelText(
            'Toggle favorite country'
        )

        expect(buttonText).toBeInTheDocument()
    })

    it('it should render the FavoriteBorderIconStyled component if active is true', () => {
        ;(useCountryFavorite as jest.Mock).mockReturnValue({
            countrySucessfullRequest: CountryItem
        })
        const { getByTestId } = render(heartComponent)

        act(() => {
            fireEvent.click(getByTestId('heartButton'))
        })

        const icon = getByTestId('favoriteIconBorder')
        expect(icon).toBeInTheDocument()
    })

    test('Show loader when loading is true', () => {
        ;(useCountryFavorite as jest.Mock).mockReturnValue({
            loading: true
        })

        const { getByTestId } = render(heartComponent)

        fireEvent.click(getByTestId('heartButton'))

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()
    })
})
