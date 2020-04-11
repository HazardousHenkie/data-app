import React from 'react'

import lightTheme from 'styles/themeStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from 'styles/index'

import { ThemeProvider } from 'styled-components'
import {
    ThemeProvider as MuiThemeProvider,
    StylesProvider
} from '@material-ui/styles'

import { useTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'
import Routes from './routes'

const App: React.FC = () => {
    const { t } = useTranslation('app')

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={lightTheme}>
                <ThemeProvider theme={lightTheme}>
                    <GlobalStyle />
                    <CssBaseline />
                    <div className="App">
                        <Helmet
                            titleTemplate={t(
                                'app:titleTemplate',
                                '%s - Data app'
                            )}
                            defaultTitle={t(
                                'app:defaultTitle',
                                'data app example'
                            )}
                        >
                            <meta
                                name="description"
                                content={t(
                                    'app:descriptionTitle',
                                    'A data app example'
                                )}
                            />
                        </Helmet>

                        <Routes />
                    </div>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    )
}

export default React.memo(App)
