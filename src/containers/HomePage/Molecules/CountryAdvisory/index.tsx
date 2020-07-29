import React from 'react'

import { createSelector } from 'reselect'
import { Reducer } from 'redux'
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

import { useTranslation } from 'react-i18next'

import reducer from 'containers/HomePage/Molecules/CountryListItem/reducer'
import { useInjectReducer } from 'utils/redux-injectors'

import CardStyled, {
    CardBottomTypography,
    StyledLink
} from './styledComponents'

import useCountryAdvisory from './useCountryAdvisoryHook'

const stateSelector = createSelector(makeSelectCountry(), country => ({
    country
}))

const CountryAdvisory: React.FC = () => {
    const { t, i18n } = useTranslation('homePage')
    const { country } = useSelector(stateSelector)
    const { loading, fetchingError, countryAdvisory } = useCountryAdvisory()

    useInjectReducer({ key: 'country', reducer: reducer as Reducer })

    return (
        <CardStyled data-testid="CountryAdvisory" variant="outlined">
            {loading && <InlineLoader />}

            <CardHeader
                data-testid="CountryAdvisoryHeader"
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
            <CardContent data-testid="CountryAdvisoryCardContent">
                {fetchingError && (
                    <InfoMessage severity="error" message={fetchingError} />
                )}

                <Typography
                    variant="body1"
                    component="p"
                    data-testid="countryAdvisoryScore"
                >
                    {countryAdvisory &&
                        countryAdvisory.advisory.score &&
                        !loading && (
                            <>
                                <strong>
                                    {t(
                                        'homePage:countryAdvisor.score',
                                        'score:'
                                    )}
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

export default CountryAdvisory
