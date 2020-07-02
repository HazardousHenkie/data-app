import React from 'react'

import { render } from 'utils/test-utils'

import HeartButton from '../index'

const heartComponent = (
    <HeartButton loading={false} active label="label" heartOnClick={() => {}} />
)

describe('<HeartButton />', () => {
    it('should render like snapshot', () => {
        const component = render(heartComponent)

        expect(component).toMatchSnapshot()
    })

    it('should render the wrapper component with a div', () => {
        const { container } = render(heartComponent)

        expect(container.tagName).toEqual('DIV')
    })

    it('it should render a button because there is an onclick', () => {
        const { getByTestId } = render(heartComponent)

        const button = getByTestId('iconButton')

        expect(button.tagName).toEqual('BUTTON')
    })

    it('it should render the IconButton and aria label', () => {
        const { getByLabelText } = render(heartComponent)

        const button = getByLabelText('label')

        expect(button).toBeInTheDocument()
    })

    it('it should render the FavoriteIconStyled component if active is true', () => {
        const { getByTestId } = render(heartComponent)

        const icon = getByTestId('favoriteIcon')
        expect(icon).toBeInTheDocument()
    })

    it('it should render the FavoriteBorderIconStyled component if active is false', () => {
        const { getByTestId } = render(
            <HeartButton
                loading
                active={false}
                label="label"
                heartOnClick={() => {}}
            />
        )

        const icon = getByTestId('favoriteIconBorder')
        expect(icon).toBeInTheDocument()
    })

    test('Show loader when loading is true', () => {
        const { getByTestId } = render(
            <HeartButton loading active label="label" heartOnClick={() => {}} />
        )

        const loadingComponent = getByTestId('inlineLoader')

        expect(loadingComponent).toBeInTheDocument()
    })

    test("Don't show loader when loading is false", () => {
        const { queryByTestId } = render(heartComponent)

        const loadingComponent = queryByTestId('inlineLoader')

        expect(loadingComponent).toBeFalsy()
    })
})
