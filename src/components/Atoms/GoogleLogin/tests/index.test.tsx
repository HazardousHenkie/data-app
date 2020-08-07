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

    test('Shows loader when loading', () => {
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

    test("Don't show loader when not loading", () => {
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
})

// check if translations is there
// check if googleLogin (hook data is there)
// test hooks
