import React from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import Grid from '@material-ui/core/Grid'

import FavoriteCountryButton from 'components/Organisms/FavoriteCountryButton'
import Header, { FavoriteCountryButtonWrapper } from './styledComponents'
import CountryAdvisory from '../../Molecules/CountryAdvisory'
import CountryInformation from '../../Molecules/CountryInformation'

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

                    <FavoriteCountryButtonWrapper>
                        <FavoriteCountryButton clickedCountry={country} />
                    </FavoriteCountryButtonWrapper>
                </Grid>

                <Grid item xs={6}>
                    <CountryInformation />
                </Grid>

                <Grid item xs={6}>
                    <CountryAdvisory />
                </Grid>
            </Grid>
        </>
    )
}

export default DrawerCountryContent
