import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import App from 'containers/App/App'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'

import 'typeface-roboto'

import { Provider } from 'react-redux'
import Loader from 'components/Atoms/Loader'
import configureStore from './store/configureStore'

import './utils/i18n'

import * as serviceWorker from './serviceWorker'

const initialState = {}
const store = configureStore(initialState)

// strict mode is breaking the switcher so discard when finished

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={variables}>
                <Suspense fallback={<Loader />}>
                    <App />
                </Suspense>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
