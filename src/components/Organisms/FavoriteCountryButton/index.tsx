import React, { useState, useEffect } from 'react'

import HeartButton from 'components/Molecules/HeartButton'

import { useTranslation } from 'react-i18next'

import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'

import reducer from 'globals/favoritedCountriesList//reducer'
import saga from 'globals/favoritedCountriesList/saga'

import { FavoritedCountryInterface } from 'globals/favoritedCountriesList/types'
import { initialFavoritedCountriesState } from 'globals/favoritedCountriesList/constants'
import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

import {
    makeSelectFavoritedCountries,
    makeSelectLoader
} from 'globals/favoritedCountriesList/selectors'

import useCountryFavorite from './useCountryFavoriteHook'

const stateSelector = createStructuredSelector({
    favoritedCountries: makeSelectFavoritedCountries(),
    loading: makeSelectLoader()
})

interface FavoriteCountryButtonInterface {
    clickedCountry: CountryInterface
}

const FavoriteCountryButton: React.FC<FavoriteCountryButtonInterface> = ({
    clickedCountry
}) => {
    const key = 'favoritedCountries'
    const [favoritedCountry, setFavoritedCountry] = useState<
        FavoritedCountryInterface
    >({
        ...initialFavoritedCountriesState.countries[0]
    })
    const [active, setActive] = useState<boolean>(false)
    const [clicked, setClicked] = useState<boolean>(false)

    const { loading, countrySucessfullRequest } = useCountryFavorite(
        favoritedCountry,
        active,
        clicked
    )
    const { t } = useTranslation('FavoriteCountryButton')

    const { favoritedCountries } = useSelector(stateSelector)

    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })

    useEffect(() => {
        if (favoritedCountries) {
            const isAlreadyFavoriteCountry = favoritedCountries.find(
                favoriteCountry =>
                    favoriteCountry.data.countryId === clickedCountry.alpha2Code
            )

            if (isAlreadyFavoriteCountry) {
                setFavoritedCountry(isAlreadyFavoriteCountry)
                setActive(true)
            }
        }
    }, [favoritedCountries, clickedCountry])

    useEffect(() => {
        if (countrySucessfullRequest) {
            setActive(activeState => !activeState)
            setFavoritedCountry(countrySucessfullRequest)
            setClicked(false)
        }
    }, [countrySucessfullRequest])

    const toggleFavorite = () => {
        setClicked(true)

        if (favoritedCountry.ref['@ref'].id === '') {
            setFavoritedCountry({
                ...initialFavoritedCountriesState.countries[0],
                data: {
                    ...initialFavoritedCountriesState.countries[0].data,
                    countryId: clickedCountry.alpha2Code
                }
            })
        }
    }

    return (
        <HeartButton
            loading={loading}
            label={t('FavoriteCountryButton:label', 'Toggle favorite country')}
            active={active}
            heartOnClick={toggleFavorite}
        />
    )
}

export default FavoriteCountryButton
