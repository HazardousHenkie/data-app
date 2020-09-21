import React from 'react'

import { createSelector } from 'reselect'
import { Reducer } from 'redux'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar'
import InfoIcon from '@material-ui/icons/Info'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import reducer from 'containers/HomePage/Molecules/CountryListItem/reducer'
import { useInjectReducer } from 'utils/redux-injectors'

import makeSelectCountry from 'containers/HomePage/Molecules/CountryListItem/selectors'

import { useTranslation } from 'react-i18next'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const CountryInformation: React.FC = () => {
    const { t, i18n } = useTranslation('homePage')
    const { country } = useSelector(stateSelector)

    useInjectReducer({ key: 'country', reducer: reducer as Reducer })

    return (
        <Card data-testid="CountryInformationCard" variant="outlined">
            <CardHeader
                data-testid="CountryInformationCardHeader"
                avatar={
                    <Avatar
                        aria-label={t(
                            'homePage:countryInformation.countryInformation',
                            'Country Information'
                        )}
                    >
                        <InfoIcon />
                    </Avatar>
                }
                title={`${t(
                    'homePage:countryInformation.informationTitle',
                    'Information for'
                )}
                ${
                    i18n.language === 'en'
                        ? country.name
                        : country.translations[i18n.language]
                }`}
            />
            <CardContent data-testid="CountryInformationCardContent">
                {country.nativeName && (
                    <Typography
                        data-testid="countryNativeName"
                        variant="body1"
                        component="p"
                    >
                        <strong>
                            {t(
                                'homePage:countryInformation.nativeName',
                                'Native name:'
                            )}
                        </strong>
                        {` ${country.nativeName}`}
                    </Typography>
                )}

                {country.region && (
                    <Typography
                        data-testid="countryRegionName"
                        variant="body1"
                        component="p"
                    >
                        <strong>
                            {t('homePage:countryInformation.region', 'Region:')}
                        </strong>
                        {` ${country.region}`}
                    </Typography>
                )}

                {country.subregion && (
                    <Typography
                        data-testid="countrySubRegionName"
                        variant="body1"
                        component="p"
                    >
                        <strong>
                            {t(
                                'homePage:countryInformation.subregion',
                                'Subregion:'
                            )}
                        </strong>
                        {` ${country.subregion}`}
                    </Typography>
                )}

                {country.population && (
                    <Typography
                        data-testid="countryPopulation"
                        variant="body1"
                        component="p"
                    >
                        <strong>
                            {t(
                                'homePage:countryInformation.population',
                                'Population:'
                            )}
                        </strong>
                        {` ${country.population}`}
                    </Typography>
                )}

                {country.currencies &&
                    country.currencies[0] &&
                    country.currencies[0].code && (
                        <Typography
                            data-testid="countryCurrencies"
                            variant="body1"
                            component="p"
                        >
                            <strong>
                                {t(
                                    'homePage:countryInformation.currencies',
                                    'Currencies:'
                                )}
                            </strong>
                            {` ${country.currencies.map(
                                currency =>
                                    ` ${currency.code}(${currency.symbol})`
                            )}`}
                        </Typography>
                    )}
            </CardContent>
        </Card>
    )
}

export default CountryInformation
