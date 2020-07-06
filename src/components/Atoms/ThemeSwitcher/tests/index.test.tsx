import React from 'react'
import { render } from 'utils/test-utils'

import ThemeSwitcher from '../index'

describe('<ThemeSwitcher />', () => {
    it('should render like snapshot', () => {
        const component = render(<ThemeSwitcher />)

        expect(component).toMatchSnapshot()
    })

    it('should render an <input> with a checkbox', () => {
        const { container } = render(<ThemeSwitcher />)

        const selectInput = container.querySelector('input[type="checkbox"]')
        expect(selectInput).toBeInTheDocument()
    })

    it('should render the aria label text', () => {
        const { getByLabelText } = render(<ThemeSwitcher />)

        const button = getByLabelText('Theme switcher')

        expect(button).toBeInTheDocument()
    })

    it('should be unchecked when darkmode is false', () => {
        const { container } = render(<ThemeSwitcher />)

        const switchButton = container.querySelector('input[type="checkbox"]')

        expect(switchButton).toHaveProperty('checked', false)
    })

    it('should be checked when darkmode is true', () => {
        const { container } = render(<ThemeSwitcher />, {}, true)
        const switchButton = container.querySelector('input[type="checkbox"]')

        expect(switchButton).toHaveProperty('checked', true)
    })
})
