import React from 'react'
import { render } from 'utils/test-utils'

import MenuList from '../index'

describe('<MenuList />', () => {
    it('should render like snapshot', () => {
        const component = render(<MenuList />)

        expect(component).toMatchSnapshot()
    })

    it('should render FavoritedCountriesList', () => {
        const { getByTestId } = render(<MenuList />)

        const FavoritedCountriesList = getByTestId('FavoritedCountriesList')

        expect(FavoritedCountriesList).toBeInTheDocument()
    })

    it('should rende ListStyled as a ul', () => {
        const { getByTestId } = render(<MenuList />)

        const ListStyled = getByTestId('ListStyled')

        expect(ListStyled.tagName).toBe('UL')
    })

    it('should render the aria label on ListStyled with text Mainmenu', () => {
        const { getByLabelText } = render(<MenuList />)

        const ListStyledAriaLabel = getByLabelText('Mainmenu')

        expect(ListStyledAriaLabel).toBeInTheDocument()
    })

    it('There should be 6 listitems', () => {
        const { getAllByRole } = render(<MenuList />)

        const listItems = getAllByRole('listitem')
        expect(listItems).toHaveLength(6)
    })

    it('The first listItem should render Data App text', () => {
        const { getByText } = render(<MenuList />)

        const firstListItemText = getByText('Data App')
        expect(firstListItemText).toBeInTheDocument()
    })

    it('Should render GoogleLogoutButton if logged in', () => {
        const { getByTestId } = render(<MenuList />, {
            initialState: {
                authenticationData: {
                    loggedIn: true
                }
            }
        })

        const googleLogoutButton = getByTestId('googleLogoutButton')
        expect(googleLogoutButton).toBeInTheDocument()
    })

    it('Should render GoogleLoginButton if logged out', () => {
        const { getByTestId } = render(<MenuList />)

        const GoogleLoginButton = getByTestId('googleLoginButton')
        expect(GoogleLoginButton).toBeInTheDocument()
    })

    it('The third listItem should render Language text', () => {
        const { getByText } = render(<MenuList />)

        const firstListItemText = getByText('Language')
        expect(firstListItemText).toBeInTheDocument()
    })

    it('The fifth listItem should render Language text', () => {
        const { getByText } = render(<MenuList />)

        const firstListItemText = getByText('Theme')
        expect(firstListItemText).toBeInTheDocument()
    })
})

it('should render languageSwitcher', () => {
    const { getByTestId } = render(<MenuList />)

    const languageSwitcher = getByTestId('languageSwitcher')

    expect(languageSwitcher).toBeInTheDocument()
})

it('should render ThemeSwitcher', () => {
    const { getByTestId } = render(<MenuList />)

    const ThemeSwitcher = getByTestId('ThemeSwitcher')

    expect(ThemeSwitcher).toBeInTheDocument()
})
