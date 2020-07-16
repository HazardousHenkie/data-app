import React from 'react'
import { render, fireEvent } from 'utils/test-utils'

import configureStore from 'configureStore'
import history from 'utils/history'

import ListItem from '../index'
import { CountryItem } from '../constants'
import setSelectedCountry from '../actions'

const listItemRender = (
    <ListItem listCountry={CountryItem.country} setOpen={() => {}} />
)

describe('<ListItem />', () => {
    it('should render like snapshot', () => {
        const component = render(listItemRender)

        expect(component).toMatchSnapshot()
    })

    test('Should render CountriesListItem', () => {
        const { getByTestId } = render(listItemRender)

        const listItems = getByTestId('CountriesListItem')
        expect(listItems).toBeInTheDocument()
    })

    test('Should call onClickCountry when ListItem is clicked and pas the countries name', () => {
        const onClickCountry = jest.fn()

        // check if we can test the function
        const { getByTestId } = render(
            <ListItem
                // @ts-ignore since it's for testing ignore it
                onClick={onClickCountry(CountryItem.country.name)}
                listCountry={CountryItem.country}
                setOpen={() => {}}
            />
        )

        const CountriesListItem = getByTestId('CountriesListItem')

        fireEvent.click(CountriesListItem)

        expect(onClickCountry).toHaveBeenCalledWith(CountryItem.country.name)
        expect(onClickCountry).toHaveBeenCalledTimes(1)
    })

    test('onClickCountry should dispatch setSelectedCountry', () => {
        const mockStore = configureStore({}, history)
        mockStore.dispatch = jest.fn()

        const { getByTestId } = render(
            <ListItem listCountry={CountryItem.country} setOpen={() => {}} />,
            { store: mockStore }
        )

        const CountriesListItem = getByTestId('CountriesListItem')

        fireEvent.click(CountriesListItem)

        expect(mockStore.dispatch).toHaveBeenCalledWith(
            setSelectedCountry(CountryItem.country)
        )
    })

    test('Should render ListItemIcon', () => {
        const { getByTestId } = render(listItemRender)

        const ListItemIcon = getByTestId('CountriesListItemIcon')
        expect(ListItemIcon).toBeInTheDocument()
    })

    test('Should render an image in ListItemIcon', () => {
        const { getByTestId } = render(listItemRender)

        const ListItemIcon = getByTestId('CountriesListItemIcon').querySelector(
            'img'
        )

        expect(ListItemIcon?.tagName).toEqual('IMG')
    })

    test('Should render an the image src', () => {
        const { getByTestId } = render(
            <ListItem
                listCountry={{
                    ...CountryItem.country,
                    flag: 'https://www.exampleurl.com/nl_flag'
                }}
                setOpen={() => {}}
            />
        )

        const ListItemIcon = getByTestId('CountriesListItemIcon').querySelector(
            'img'
        )

        expect(ListItemIcon).toHaveAttribute(
            'src',
            'https://www.exampleurl.com/nl_flag'
        )
    })

    test('Should render the image alt text', () => {
        const { getByAltText } = render(
            <ListItem
                listCountry={{ ...CountryItem.country, name: 'japan' }}
                setOpen={() => {}}
            />
        )

        const imageAltText = getByAltText('japan')

        expect(imageAltText).toBeInTheDocument()
    })

    test('Should render CountriesListItemText', () => {
        const { getByTestId } = render(listItemRender)

        const CountriesListItemText = getByTestId('CountriesListItemText')

        expect(CountriesListItemText.tagName).toEqual('DIV')
    })

    test('Should render an the image src', () => {
        const { getByText } = render(
            <ListItem
                listCountry={{
                    ...CountryItem.country,
                    name: 'japan'
                }}
                setOpen={() => {}}
            />
        )

        const ListItemIcon = getByText('japan')

        expect(ListItemIcon).toBeInTheDocument()
    })
})
