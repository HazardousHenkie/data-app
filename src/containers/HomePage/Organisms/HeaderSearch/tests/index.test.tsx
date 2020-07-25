import React from 'react'
import { render, fireEvent } from 'utils/test-utils'

import HeaderSearch from '../index'

describe('<HeaderSearch />', () => {
    it('should render like snapshot', () => {
        const component = render(<HeaderSearch />)

        expect(component).toMatchSnapshot()
    })

    it('should render TopBar', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const TopBar = getByTestId('TopBar')

        expect(TopBar).toBeInTheDocument()
    })

    it('should render IconButtonStyled when openCountriesList is false', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const IconButtonStyled = getByTestId('IconButtonStyled')

        expect(IconButtonStyled).toBeInTheDocument()
    })

    it('should render SearchFieldWrapper', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const SearchFieldWrapper = getByTestId('SearchFieldWrapper')

        expect(SearchFieldWrapper).toBeInTheDocument()
    })

    it('should render SearchField', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const SearchField = getByTestId('SearchFieldWrapper').querySelector(
            'input'
        )

        expect(SearchField).toBeInTheDocument()
    })

    it('should render CloseCountriesList when openCountriesList is true', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const SearchField = getByTestId('SearchFieldWrapper')
        fireEvent.click(SearchField)

        const CloseCountriesList = getByTestId('CloseCountriesList')

        expect(CloseCountriesList).toBeInTheDocument()
    })

    it('should render CountriesList when openCountriesList is true', () => {
        const { getByTestId } = render(<HeaderSearch />)

        const SearchField = getByTestId('SearchFieldWrapper')
        fireEvent.click(SearchField)

        const CountriesList = getByTestId('CountriesList')

        expect(CountriesList).toBeInTheDocument()
    })
})
