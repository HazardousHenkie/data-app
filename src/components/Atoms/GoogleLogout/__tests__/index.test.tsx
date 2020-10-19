import React from 'react'

import { render, within } from 'utils/test-utils'

import GoogleLogoutButton from '../index'

describe('<GoogleLogoutButton />', () => {
    beforeAll(() => {
        process.env = Object.assign(process.env, {
            REACT_APP_GOOGLE_CLIENT_ID: 'google_client_id'
        })
    })

    it('should render like snapshot', () => {
        const component = render(<GoogleLogoutButton />)

        expect(component).toMatchSnapshot()
    })

    test('Show component when REACT_APP_GOOGLE_CLIENT_ID is present', () => {
        const { getByTestId } = render(<GoogleLogoutButton />)

        const loadingComponent = getByTestId('googleLogoutWrapper')
        expect(loadingComponent).toBeInTheDocument()
    })

    test('Show loader when loading is true inside useSelector and button should be disabled', () => {
        const { getByTestId } = render(<GoogleLogoutButton />, {
            initialState: {
                authenticationData: {
                    loading: true
                }
            }
        })

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()

        const button = getByTestId('googleLogoutButton').querySelector('button')
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

    test('Check if translation text is shown', () => {
        const { getByTestId } = render(<GoogleLogoutButton />)

        const button = getByTestId('googleLogoutButton')
        const buttonText = within(button).getByText('Logout', {
            selector: 'span'
        })

        expect(buttonText).toBeInTheDocument()
    })
})
