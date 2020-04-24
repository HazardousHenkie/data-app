import React from 'react'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import Drawer from 'components/Organisms/Drawer'

import OSMap from './map'

const HomePage: React.FC = () => {
    const { t } = useTranslation('homePage')

    return (
        <>
            <Helmet>
                <title>{t('homePage:title', 'Home Page')}</title>
                <meta
                    name={t('homePage:title', 'Home Page')}
                    content={t('homePage:description', 'Homepage description')}
                />
            </Helmet>

            <OSMap />

            <Drawer>
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttest
            </Drawer>
        </>
    )
}

export default HomePage
