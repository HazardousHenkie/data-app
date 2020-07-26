import React from 'react'
import { render } from 'utils/test-utils'

import CountryAdvisory from '../index'

import useCountryAdvisoryHook from '../useCountryAdvisoryHook'

jest.mock('../useCountryAdvisoryHook')

// finish
describe('<CountryAdvisory />', () => {
    beforeEach(() => {
        // @ts-ignore
        useCountryAdvisoryHook.mockReturnValue({
            loading: false
        })
    })

    it('should render like snapshot', () => {
        jest.unmock('../useCountryAdvisoryHook')
        const component = render(<CountryAdvisory />)

        expect(component).toMatchSnapshot()
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
})
