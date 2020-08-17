import React from 'react'
import { render, screen } from 'utils/test-utils'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Routes from '../routes'

describe('<Routes />', () => {
    it('should render loader from start', () => {
        const { getByTestId } = render(<Routes />)

        const loader = getByTestId('loader')

        expect(loader).toBeInTheDocument()
    })

    test('HomePage should be loaded from the start', async () => {
        render(<Routes />)

        const ErrorPageDiv = await screen.findByTestId('HomePage')

        expect(ErrorPageDiv).toBeInTheDocument()
    })

    test('landing on a bad page shows 404 page', async () => {
        const history = createMemoryHistory()
        history.push('/bad-route')

        render(
            <Router history={history}>
                <Routes />
            </Router>
        )

        const ErrorPageDiv = await screen.findByTestId('ErrorPageDiv')

        expect(ErrorPageDiv).toBeInTheDocument()
    })

    it('should render like snapshot', () => {
        const component = render(<Routes />)

        expect(component).toMatchSnapshot()
    })
})
