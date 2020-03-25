import React from 'react'

import Typography from '@material-ui/core/Typography'

import { withTranslation, WithTranslation } from 'react-i18next'

import { Helmet } from 'react-helmet'
import { ErrorPageDiv, StyledTypographyTitle } from './styledComponents'

interface ErrorType {
    errorCode: number
    errorMessage: string
}

const ErrorPage: React.FC<WithTranslation & ErrorType> = ({
    t,
    errorCode = 404,
    errorMessage = t('error:notFound', 'Page not found')
}) => {
    return (
        <ErrorPageDiv>
            <Helmet>
                <title>{t('error:title', 'Error Page')}</title>
                <meta
                    name={t('error:title', 'Error Page')}
                    content={t(
                        'error:description',
                        'A data application error page'
                    )}
                />
            </Helmet>
            <StyledTypographyTitle align="center" variant="h1">
                {errorCode}
            </StyledTypographyTitle>

            <Typography align="center" variant="body1">
                {errorMessage}
            </Typography>
        </ErrorPageDiv>
    )
}

export default withTranslation('error')(ErrorPage)
