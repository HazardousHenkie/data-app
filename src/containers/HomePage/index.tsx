import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import DrawerContext from 'components/Organisms/Drawer/DrawerContext'
import Drawer from 'components/Organisms/Drawer'

import HeaderSearch from './Organisms/HeaderSearch'
import DrawerCountryContent from './Organisms/DrawerCountryContent'

import OSMap from './map'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const HomePage: React.FC = () => {
    const { t } = useTranslation('homePage')
    const [openDrawer, setOpenDrawer] = useState(false)
    const { country } = useSelector(stateSelector)

    return (
        <div data-testid="HomePage">
            <Helmet>
                <title>{t('homePage:title', 'Home Page')}</title>
                <meta
                    name={t('homePage:title', 'Home Page')}
                    content={t('homePage:description', 'Homepage description')}
                />
            </Helmet>

            <HeaderSearch />

            <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
                <OSMap />

                {country && country.alpha2Code !== '' && (
                    <Drawer>
                        <DrawerCountryContent />
                    </Drawer>
                )}
            </DrawerContext.Provider>
        </div>
    )
}

export default HomePage
