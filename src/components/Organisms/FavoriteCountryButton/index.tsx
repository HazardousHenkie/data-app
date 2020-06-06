import React, { useState, useEffect } from 'react'

import HeartButton from 'components/Molecules/HeartButton'

import { useTranslation } from 'react-i18next'

import request from 'utils/request'

const useCountryFavorite = (buttonClicked: boolean) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingError, setFetchingError] = useState<Error>()

    useEffect(() => {
        if (buttonClicked) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const result = await request(
                        '/.netlify/functions/saveCountry'
                    )

                    console.log(result)
                } catch (error) {
                    if (error.response.status !== 404) {
                        setFetchingError(error)
                    }
                }

                setLoading(false)
            }

            fetchData()
        }
    }, [buttonClicked])

    return { loading, fetchingError }
}

const FavoriteCountryButton: React.FC = () => {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false)
    // const [loading, fetchingError] = useCountryFavorite(buttonClicked)
    const { t } = useTranslation('FavoriteCountryButton')

    const toggleFavorite = () => {
        setButtonClicked(!buttonClicked)
    }

    return (
        <HeartButton
            // loading={loading}
            label={t('FavoriteCountryButton:label', 'Toggle favorite country')}
            active={false}
            heartOnClick={toggleFavorite}
        />
    )
}

export default FavoriteCountryButton
