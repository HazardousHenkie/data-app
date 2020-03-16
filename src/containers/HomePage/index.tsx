import React from 'react'

import Grid from '@material-ui/core/Grid'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const HomePage: React.FC = () => {
  const { t } = useTranslation('homePage')
  console.log('test')
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: 'test' }} />;
      <Helmet>
        <title>{t('homePage:title', 'Home Page')}</title>
        <meta
          name={t('homePage:title', 'Home Page')}
          content={t('homePage:description', 'Homepage description')}
        />
      </Helmet>
      <Grid container={true} spacing={3}>
        {t('homePage:title', 'Home Page')}
      </Grid>
    </>
  )
}

export default HomePage
