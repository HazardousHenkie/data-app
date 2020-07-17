import React from 'react'

import { render, within, fireEvent } from 'utils/test-utils'

import LanguageSwitcher from '../index'

describe('<LanguageSwitcher />', () => {
    it('Should render like snapshot', () => {
        const component = render(<LanguageSwitcher />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <div> tag', () => {
        const { container } = render(<LanguageSwitcher />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })

    it("Shouldn't be initially disabled", () => {
        const { getByTestId } = render(<LanguageSwitcher />)

        const selectBox = getByTestId('languageSwitcher_select')

        const selectBoxButton = within(selectBox).getByRole('button')

        expect(selectBoxButton).not.toHaveAttribute('aria-disabled', 'true')
    })

    it("gets initial language and it's being passed", () => {
        const { container } = render(<LanguageSwitcher />)

        const selectInput = container.querySelector('input')

        expect(selectInput).toHaveProperty('value', 'en')
    })

    it('Check if language changes after select', () => {
        const { getByRole, container } = render(<LanguageSwitcher />)

        fireEvent.mouseDown(getByRole('button'))

        const listbox = within(getByRole('listbox'))

        fireEvent.click(listbox.getByText('ja'))

        expect(container.querySelector('input')).toHaveProperty('value', 'ja')
        expect(getByRole('button')).toHaveTextContent('ja')
    })

    it('Check listitems', () => {
        const { getByRole, getAllByRole } = render(<LanguageSwitcher />)

        fireEvent.mouseDown(getByRole('button'))

        const listItems = getAllByRole('option')
        expect(listItems).toHaveLength(3)
    })
})
