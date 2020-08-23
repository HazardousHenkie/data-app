import React from 'react'
import { render } from 'utils/test-utils'

import FavoritedCountriesList from '../styledComponents'

import 'jest-styled-components'

describe('<FavoritedCountriesList />', () => {
    it('should render and match the snapshot', () => {
        const { container } = render(<FavoritedCountriesList />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should render a <DIV> tag', () => {
        const { container } = render(<FavoritedCountriesList />)

        expect(container.firstElementChild?.tagName).toEqual('DIV')
    })
})
