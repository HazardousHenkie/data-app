import React from 'react'
import { render } from 'utils/test-utils'

import configureStore from 'store/configureStore'

import ErrorSnackbars from '../index'

describe('<ErrorSnackbars />', () => {
    it('should render like snapshot', () => {
        const component = render(<ErrorSnackbars />)

        expect(component).toMatchSnapshot()
    })

    it('should render Snackbar', () => {
        const { getByTestId } = render(<ErrorSnackbars />, {
            initialState: { errors: { errors: [Error('testError')] } }
        })

        const Snackbar = getByTestId('Snackbar')

        expect(Snackbar).toBeInTheDocument()
    })

    it('should render InfoMessage with message inside Snackbar', () => {
        const { getByText } = render(<ErrorSnackbars />, {
            initialState: { errors: { errors: [Error('testError')] } }
        })

        const Snackbar = getByText('testError')

        expect(Snackbar).toBeInTheDocument()
    })

    it('should render Snackbar with style', () => {
        const { getByTestId } = render(<ErrorSnackbars />, {
            initialState: { errors: { errors: [Error('testError')] } }
        })

        const Snackbar = getByTestId('Snackbar')

        expect(Snackbar).toHaveAttribute('style', 'top: 0px;')
    })

    it('should call handleClose when is closed', () => {
        const mockStore = configureStore({})
        mockStore.dispatch = jest.fn()

        const handleClose = jest.fn()

        // @ts-ignore since it's for testing ignore it
        render(<ErrorSnackbars onClose={handleClose()} />, { store: mockStore })

        expect(handleClose).toHaveBeenCalledTimes(1)
        expect(mockStore.getState().errors).toMatchObject({ errors: [] })
    })
})
