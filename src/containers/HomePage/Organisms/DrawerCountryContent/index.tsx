import React from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import Grid from '@material-ui/core/Grid'
import CountryAdvisory from '../../Molecules/CountryAdvisory'

import Header from './styledComponents'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const DrawerCountryContent: React.FC = () => {
    const { country } = useSelector(stateSelector)
    const { i18n } = useTranslation()

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header>
                        {i18n.language === 'en'
                            ? country.name
                            : country.translations[i18n.language]}
                    </Header>
                </Grid>

                <Grid item xs={6}>
                    <CountryAdvisory />
                </Grid>
            </Grid>
        </>
    )
}

export default DrawerCountryContent
