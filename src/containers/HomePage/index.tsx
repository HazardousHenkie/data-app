import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import DrawerContext from 'components/Organisms/Drawer/DrawerContext'
import Drawer from 'components/Organisms/Drawer'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'
import HeaderSearch from './Organisms/HeaderSearch'

import OSMap from './map'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const HomePage: React.FC = () => {
    const { t } = useTranslation('homePage')
    const { country } = useSelector(stateSelector)
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
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

                <Drawer>{country.name}</Drawer>
            </DrawerContext.Provider>
        </>
    )
}

export default HomePage
