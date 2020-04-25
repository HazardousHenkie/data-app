import React from 'react'

import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import InfoIcon from '@material-ui/icons/Info'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import { useTranslation } from 'react-i18next'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const CountryInformation: React.FC = () => {
    const { t, i18n } = useTranslation('homePage')
    const { country } = useSelector(stateSelector)

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar
                        aria-label={t(
                            'homePage:countryAdvisor.countryInformation',
                            'Country Information'
                        )}
                    >
                        <InfoIcon />
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
                {country.nativeName && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.nativeName',
                                    'Native name'
                                )}
                                :
                            </strong>
                            {` ${country.nativeName}`}
                        </>
                    </Typography>
                )}

                {country.capital && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.capital',
                                    'Capital'
                                )}
                                :
                            </strong>
                            {` ${country.capital}`}
                        </>
                    </Typography>
                )}

                {country.region && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.region',
                                    'Region'
                                )}
                                :
                            </strong>
                            {` ${country.region}`}
                        </>
                    </Typography>
                )}

                {country.subregion && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.subregion',
                                    'Subregion'
                                )}
                                :
                            </strong>
                            {` ${country.region}`}
                        </>
                    </Typography>
                )}

                {country.population && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.population',
                                    'Population'
                                )}
                                :
                            </strong>
                            {` ${country.population}`}
                        </>
                    </Typography>
                )}

                {country.languages && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.languages',
                                    'Languages'
                                )}
                                :
                            </strong>
                            {` ${country.languages.map(
                                (language: Record<string, string>) =>
                                    ` ${language.name}(${language.nativeName})`
                            )}`}
                        </>
                    </Typography>
                )}

                {country.currencies && (
                    <Typography variant="body1" component="p">
                        <>
                            <strong>
                                {t(
                                    'homePage:countryInformation.currencies',
                                    'Currencies'
                                )}
                                :
                            </strong>
                            {` ${country.currencies.map(
                                (currency: Record<string, string>) =>
                                    ` ${currency.code}(${currency.symbol})`
                            )}`}
                        </>
                    </Typography>
                )}
            </CardContent>
            {/* {countryAdvisory && !loading && (
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
            )} */}
        </Card>
    )
}

export default CountryInformation
