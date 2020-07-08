import React from 'react'
import { render, fireEvent } from 'utils/test-utils'

import SearchField from '../index'

// check use effect testing
describe('<SearchField />', () => {
    it('should render like snapshot', () => {
        const component = render(<SearchField setValue={() => {}} />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <form> ', () => {
        const { container } = render(<SearchField setValue={() => {}} />)

        const input = container.querySelector('form')
        expect(input?.tagName).toEqual('FORM')
    })

    it('should render an <input> tag if translation is ready', () => {
        const { container } = render(<SearchField setValue={() => {}} />)

        const input = container.querySelector('input')
        expect(input?.tagName).toEqual('INPUT')
    })

    it('It should render the translation tag', () => {
        const { getByPlaceholderText } = render(
            <SearchField setValue={() => {}} />
        )

        const buttonText = getByPlaceholderText('search')

        expect(buttonText).toBeInTheDocument()
    })

    it('should render an <input> tag', () => {
        const { container } = render(<SearchField setValue={() => {}} />)

        const input = container.querySelector('input')

        fireEvent.change(input as Element, {
            target: { value: 'newValue' }
        })

        expect(input).toHaveProperty('value', 'newValue')
    })
})
