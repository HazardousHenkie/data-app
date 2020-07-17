import React from 'react'

import { render, within, fireEvent } from 'utils/test-utils'

import GoogleLogoutButton from '../index'

describe('<GoogleLogoutButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<GoogleLogoutButton />)

        expect(component).toMatchSnapshot()
    })

    beforeAll(() => {
        process.env = Object.assign(process.env, {
            REACT_APP_GOOGLE_CLIENT_ID: 'google_client_id'
        })
    })

    test('Show component when REACT_APP_GOOGLE_CLIENT_ID is present', () => {
        const { getByTestId } = render(<GoogleLogoutButton />)

        const loadingComponent = getByTestId('googleLogoutWrapper')
        expect(loadingComponent).toBeInTheDocument()
    })

    test('Show loader when loading is true inside useSelector', () => {
        const { getByTestId } = render(<GoogleLogoutButton />, {
            initialState: {
                authenticationData: {
                    loading: true
                }
            }
        })

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()

        const button = getByTestId('googleLogoutInnerButton').querySelector(
            'button'
        )
        expect(button).toBeDisabled()
    })

    test("Don't show loader when loading is false inside useSelector", () => {
        const { queryByTestId } = render(<GoogleLogoutButton />, {
            initialState: {
                authenticationData: {
                    loading: false
                }
            }
        })

        const loadingComponent = queryByTestId('inlineLoader')

        expect(loadingComponent).toBeFalsy()
    })

    test('Show loader when googleLoading is active', () => {
        const { getByTestId } = render(<GoogleLogoutButton />)

        const button = getByTestId('googleLogoutInnerButton')
        fireEvent.click(button)

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()
    })

    test('Check if translation text is shown', () => {
        const { getByTestId } = render(<GoogleLogoutButton />)

        const button = getByTestId('googleLogoutInnerButton')
        const buttonText = within(button).getByText('Logout', {
            selector: 'span'
        })

        expect(buttonText).toBeInTheDocument()
    })
})
