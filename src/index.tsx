import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import App from 'containers/App/App'

import history from 'utils/history'
import { ConnectedRouter } from 'connected-react-router'

import variables from 'styles/variables'
import { ThemeProvider } from 'styled-components'

import 'typeface-roboto'

import { Provider } from 'react-redux'
import configureStore from './configureStore'

import './utils/i18n'

import * as serviceWorker from './serviceWorker'

const initialState = {}
const store = configureStore(initialState, history)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={variables}>
      <ConnectedRouter history={history}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
