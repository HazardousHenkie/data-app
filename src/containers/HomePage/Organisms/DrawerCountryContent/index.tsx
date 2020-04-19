import React from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import Grid from '@material-ui/core/Grid'
import CountryAdvisory from '../../Molecules/CountryAdvisory'

import Header from './styledComponents'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const DrawerCountryContent: React.FC = () => {
    const { country } = useSelector(stateSelector)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header>{country.name}</Header>
                </Grid>

                <Grid item xs={6}>
                    <CountryAdvisory />
                </Grid>
            </Grid>
        </>
    )
}

export default DrawerCountryContent
