import React, { useState, useEffect } from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import WarningIcon from '@material-ui/icons/Warning'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import InfoMessage from 'components/Atoms/InfoMessage'
import InlineLoader from 'components/Atoms/InlineLoader'
import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import request from 'utils/request'

import { useTranslation } from 'react-i18next'
import CountryAdvisoryInterface from './types'
import CardStyled, {
    CardBottomTypography,
    StyledLink
} from './styledComponents'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const useCountryAdvisory = () => {
    const { country } = useSelector(stateSelector)
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<Error>()
    const [countryAdvisory, setCountryAdvisory] = useState<
        CountryAdvisoryInterface
    >()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await request(
                    `https://www.travel-advisory.info/api?countrycode=${country.alpha2Code}`
                )

                if (result) {
                    const { data } = result as any
                    setCountryAdvisory(data[country.alpha2Code])
                }
            } catch (error) {
                if (error.response.status !== 404) {
                    setFetchingError(error)
                }
            }

            setLoading(false)
        }

        fetchData()
    }, [country])

    return { loading, fetchingError, countryAdvisory }
}

const DrawerCountryContent: React.FC = () => {
    const { t, i18n } = useTranslation('homePage')
    const { country } = useSelector(stateSelector)
    const { loading, fetchingError, countryAdvisory } = useCountryAdvisory()

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
                        <WarningIcon />
                    </Avatar>
                }
                title={`${t(
                    'homePage:countryAdvisor.advisoryTitle',
                    'Advisory for'
                )}
                ${
                    i18n.language === 'en'
                        ? country.name
                        : country.translations[i18n.language]
                }`}
            />
            <CardContent>
                {fetchingError && (
                    <InfoMessage
                        severity="error"
                        message={fetchingError.toString()}
                    />
                )}

                <Typography variant="body1" component="p">
                    {countryAdvisory &&
                        countryAdvisory.advisory.score &&
                        !loading && (
                            <>
                                <strong>
                                    {t(
                                        'homePage:countryAdvisor.score',
                                        'score'
                                    )}
                                    :
                                </strong>
                                {` ${countryAdvisory.advisory.score}`}
                            </>
                        )}

                    {countryAdvisory &&
                        countryAdvisory.advisory.score &&
                        !loading && <br />}

                    {countryAdvisory && !loading && (
                        <>
                            <strong>
                                {t(
                                    'homePage:countryAdvisor.message',
                                    'message'
                                )}
                                :
                            </strong>
                            {` ${countryAdvisory.advisory.message}`}
                        </>
                    )}

                    {countryAdvisory &&
                        countryAdvisory.advisory.message === '' &&
                        !loading &&
                        t(
                            'homePage:countryAdvisor.notFound',
                            'Advisory message not available.'
                        )}

                    {!countryAdvisory &&
                        !loading &&
                        !fetchingError &&
                        t(
                            'homePage:countryAdvisor.notFound',
                            'Advisory not found.'
                        )}
                </Typography>
            </CardContent>
            {countryAdvisory && !loading && (
                <CardActions>
                    <CardBottomTypography variant="body2" color="inherit">
                        {countryAdvisory.advisory.updated}

                        <StyledLink
                            href={countryAdvisory.advisory.source}
                            color="inherit"
                            target="_blank"
                        >
                            {t('homePage:countryAdvisor.source', 'source')}
                        </StyledLink>
                    </CardBottomTypography>
                </CardActions>
            )}
        </CardStyled>
    )
}

export default DrawerCountryContent
