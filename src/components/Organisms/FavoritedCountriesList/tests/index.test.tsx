import React from 'react'
import { render } from 'utils/test-utils'

import { query } from 'faunadb'
import MenuList from '../index'

const countriesFixture = {
    countries: [
        {
            ref: {
                '@ref': {
                    collection: query.Collection('country_user'),
                    id: 'id'
                }
            },
            ts: 1,
            data: {
                userId: 'user',
                countryId: 'jpn',
                updatedAt: 0,
                createdAt: 0
            }
        }
    ]
}

describe('<MenuList />', () => {
    it('should render like snapshot', () => {
        const component = render(<MenuList />)

        expect(component).toMatchSnapshot()
    })

    it('should render the wrapper component with a div', () => {
        const { container } = render(<MenuList />)

        expect(container.tagName).toEqual('DIV')
    })

    test('Show loader when loading is true', () => {
        const { getByTestId } = render(<MenuList />, {
            initialState: {
                favoritedCountries: { loading: true }
            }
        })

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()
    })

    test('Show list if countriesData is present', () => {
        const { getByTestId } = render(<MenuList />, {
            initialState: {
                favoritedCountries: { loading: true }
            }
        })

        const loadingComponent = getByTestId('inlineLoader')
        expect(loadingComponent).toBeInTheDocument()
    })

    test('Show list if countriesData is present', () => {
        const { getByTestId } = render(<MenuList />, {
            initialState: {
                favoritedCountries: countriesFixture
            }
        })

        const FavoritedCountriesList = getByTestId(
            'FavoritedCountriesList_list'
        )
        expect(FavoritedCountriesList).toBeInTheDocument()
    })

    test('Check if translation text is shown', () => {
        const { getByLabelText } = render(<MenuList />, {
            initialState: {
                favoritedCountries: countriesFixture
            }
        })

        const listLabel = getByLabelText('Favorite countries')

        expect(listLabel).toBeInTheDocument()
    })

    test('Have one item in the list', () => {
        const { getAllByRole } = render(<MenuList />, {
            initialState: {
                favoritedCountries: countriesFixture
            }
        })

        const listItems = getAllByRole('listitem')
        expect(listItems).toHaveLength(1)
    })
})
