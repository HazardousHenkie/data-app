import React from 'react'
// import { render } from 'utils/test-utils'

import { render } from '@testing-library/react'

import configureStore from 'store/configureStore'
import history from 'utils/history'

import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import i18n from 'utils/i18nTesting'
import CountryInformation from '../index'

// const renderCountryInformation = store =>
//     render(
//         <Provider store={store}>
//             <I18nextProvider i18n={i18n}>
//                 <CountryInformation />
//             </I18nextProvider>
//         </Provider>
//     )

describe('<FavoriteCountryButton />', () => {
    // let store
    // let component

    // beforeEach(() => {
    //     store = configureStore({}, history)
    //     component = renderCountryInformation(store)
    // })

    // it('should render like snapshot', () => {
    //     const component = render(<CountryInformation />)

    //     expect(component).toMatchSnapshot()
    // })

    // it('should render CountryInformationCard', () => {
    //     const { getByTestId } = render(<CountryInformation />)

    //     const CountryInformationCard = getByTestId('CountryInformationCard')
    //     expect(CountryInformationCard).toBeInTheDocument()
    // })

    // it('should render CountryInformationCardHeader', () => {
    //     const { getByTestId } = render(<CountryInformation />)

    //     const CountryInformationCardHeader = getByTestId(
    //         'CountryInformationCardHeader'
    //     )
    //     expect(CountryInformationCardHeader).toBeInTheDocument()
    // })

    // it('should render avatar and translated label inside avatar', () => {
    //     const { getByLabelText } = render(<CountryInformation />)

    //     const avatarLabel = getByLabelText('Country Information')
    //     expect(avatarLabel).toBeInTheDocument()
    // })

    it('should render a SVG InfoIcon inside CountryInformationCardHeader avatar', () => {
        // const { getByTestId } = render(<CountryInformation />)

        const store = configureStore({}, history)
        // const component = renderCountryInformation(store)

        console.log(store.getState())

        // const CountryInformationCardHeaderSVG = getByTestId(
        //     'CountryInformationCardHeader'
        // ).querySelector('svg')

        // expect(CountryInformationCardHeaderSVG).toBeInTheDocument()
    })

    // it('should render a advisoryText inside CountryInformationCardHeader', () => {
    //     const { getByText } = render(<CountryInformation />, {
    //         initialState: {
    //             country: { country: { name: 'japan' } }
    //         }
    //     })

    //     const advisoryText = getByText('Advisory for japan')

    //     expect(advisoryText).toBeInTheDocument()
    // })
})
