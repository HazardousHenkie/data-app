import React from 'react'

import { render } from 'utils/test-utils'

import GoogleLoginButton from '../index'

describe('<GoogleLoginButton />', () => {
    it('should render like snapshot', () => {
        const component = render(<GoogleLoginButton />)

        expect(component).toMatchSnapshot()
    })

    beforeAll(() => {
        process.env = Object.assign(process.env, {
            REACT_APP_GOOGLE_CLIENT_ID: 'google_client_id'
        })
    })

    test('Show component when REACT_APP_GOOGLE_CLIENT_ID is present', () => {
        const { getByTestId } = render(<GoogleLoginButton />)

        const loadingComponent = getByTestId('googleLoginWrapper')

        expect(loadingComponent).toBeInTheDocument()
    })

    test('Show loader when loading is true inside useSelector', () => {
        const { getByTestId } = render(<GoogleLoginButton />, {
            initialState: {
                authenticationData: {
                    loading: true
                }
            }
        })

        const loadingComponent = getByTestId('inlineLoader')

        expect(loadingComponent).toBeInTheDocument()
    })

    test("Don't show loader when loading is false inside useSelector", () => {
        const { queryByTestId } = render(<GoogleLoginButton />, {
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
        const { getByText } = render(<GoogleLoginButton />)

        const buttonText = getByText('Login', {
            selector: 'span'
        })

        expect(buttonText).toBeInTheDocument()
    })
})
