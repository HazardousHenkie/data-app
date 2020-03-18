import React from 'react'

import Routes from './routes'

import lightTheme from 'styles/themeStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from 'styles/index'

import { ThemeProvider, StylesProvider } from '@material-ui/styles'

import { useTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'

const App: React.FC = () => {
    const { t } = useTranslation('app')

    return (
        <StylesProvider injectFirst={true}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <CssBaseline />
                <div className="App">
                    <Helmet
                        titleTemplate={t(
                            'app:titleTemplate',
                            '%s - React shop example'
                        )}
                        defaultTitle={t(
                            'app:defaultTitle',
                            'React shop example'
                        )}
                    >
                        <meta
                            name="description"
                            content={t(
                                'app:descriptionTitle',
                                'A React shop example'
                            )}
                        />
                    </Helmet>

                    <Routes />
                </div>
            </ThemeProvider>
        </StylesProvider>
    )
}

export default React.memo(App)
