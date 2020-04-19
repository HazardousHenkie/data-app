import React, { useState, useEffect } from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import InlineLoader from 'components/Atoms/InlineLoader'
import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import request from 'utils/request'

import { useTranslation } from 'react-i18next'
import CardStyled from './styledComponents'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

// run translations
// error handle
const DrawerCountryContent: React.FC = () => {
    const { t, i18n } = useTranslation('homePage')
    const [loading, setLoading] = useState(false)
    const [countryAdvisory, setCountryAdvisory] = useState<
        Record<string, any>
    >()
    const { country } = useSelector(stateSelector)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = (await request(
                    `https://www.travel-advisory.info/api?countrycode=${country.alpha2Code}`
                )) as Record<string, any>

                if (result) {
                    setCountryAdvisory(result.data[country.alpha2Code])
                }
            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }

        fetchData()
    }, [country])

    return (
        <CardStyled variant="outlined">
            {loading && <InlineLoader />}

            <CardHeader
                avatar={
                    <Avatar
                        aria-label={t(
                            'homePage:countryAdvisor.avatar',
                            'country'
                        )}
                    >
                        {country.alpha2Code}
                    </Avatar>
                }
                title={t(
                    'homePage:countryAdvisor.advisoryTitle',
                    `Advisory for ${
                        i18n.language === 'en'
                            ? country.name
                            : country.translations[i18n.language]
                    }`
                )}
            />
            <CardContent>
                <Typography variant="body1" component="p">
                    {countryAdvisory &&
                        !loading &&
                        countryAdvisory.advisory.message}

                    {countryAdvisory &&
                        countryAdvisory.advisory.message === '' &&
                        !loading &&
                        t(
                            'homePage:countryAdvisor.notFound',
                            'Advisory not available'
                        )}

                    {!countryAdvisory &&
                        countryAdvisory &&
                        !loading &&
                        t(
                            'homePage:countryAdvisor.notFound',
                            'Advisory not found'
                        )}
                </Typography>
            </CardContent>
            {countryAdvisory && !loading && (
                <CardActions>
                    {/* style this an add link */}
                    <Typography variant="body2" component="p">
                        {countryAdvisory.advisory.updated}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {countryAdvisory.advisory.source}
                    </Typography>
                </CardActions>
            )}
        </CardStyled>
    )
}

export default DrawerCountryContent
